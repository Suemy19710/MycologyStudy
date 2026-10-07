-- 0001_init: schema for Meet the Fungi (see docs/ARCHITECTURE.md, section 3).
-- Run as the database owner:  psql -d mycologystudy -v ON_ERROR_STOP=1 -f db/migrations/0001_init.sql
begin;

create extension if not exists pg_trgm;
create extension if not exists unaccent;

-- unaccent() is only STABLE; an IMMUTABLE wrapper is needed for indexes and generated columns.
create function f_unaccent(text) returns text
  language sql immutable parallel safe strict
  return public.unaccent('public.unaccent'::regdictionary, $1);

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------

-- Bilingual text: {"en": "...", "vi": "..."}, both required and non-empty.
create domain localized_text as jsonb
  check (
    jsonb_typeof(value) = 'object'
    and value ?& array['en', 'vi']
    and length(trim(value->>'en')) > 0
    and length(trim(value->>'vi')) > 0
  );

create type content_status       as enum ('draft', 'published', 'archived');
create type rank_tier            as enum ('principal', 'secondary', 'infraspecific', 'informal');
create type rank_key             as enum ('kingdom', 'subkingdom', 'phylum', 'subphylum', 'class', 'subclass',
                                          'order', 'family', 'genus', 'subgenus', 'section', 'series',
                                          'species', 'variety', 'forma', 'forma_specialis', 'strain');
create type section_key          as enum ('identity', 'morphology', 'physiology', 'ecology',
                                          'chemistry', 'pathogenicity', 'susceptibility', 'dna');
create type strain_status        as enum ('ex_type', 'typical', 'reference', 'genome_reference', 'other');
create type locus                as enum ('ITS', 'LSU', 'BenA', 'CaM', 'RPB2', 'TEF1');
create type reference_kind       as enum ('article', 'book', 'website', 'guideline');
create type photo_license_status as enum ('unverified', 'verified');
create type term_group           as enum ('naming', 'tree', 'collections');

-- Bumps version and updated_at on every update (optimistic concurrency, section 3.1).
create function touch_row() returns trigger language plpgsql as $$
begin
  new.version := old.version + 1;
  new.updated_at := now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- Taxonomy
-- ---------------------------------------------------------------------------

create table rank (
  key         rank_key primary key,
  tier        rank_tier not null,
  label       localized_text not null,
  description localized_text not null,
  ending      text check (ending ~ '^-[a-z]+$'),
  sort_order  smallint not null unique
);

create table taxon (
  id          uuid primary key default gen_random_uuid(),
  parent_id   uuid references taxon(id) on delete restrict,
  rank        rank_key not null references rank(key),
  name        text not null check (length(name) between 2 and 200),
  authority   text,
  year        smallint check (year between 1700 and 2100),
  mycobank_id integer unique,
  is_accepted boolean not null default true,
  version     integer not null default 1,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique nulls not distinct (parent_id, rank, name),
  check (parent_id is not null or rank = 'kingdom')
);
create index taxon_parent_idx on taxon (parent_id);
create index taxon_name_trgm on taxon using gin (lower(f_unaccent(name)) gin_trgm_ops);
create trigger taxon_touch before update on taxon for each row execute function touch_row();

create table taxon_synonym (
  taxon_id uuid not null references taxon(id) on delete cascade,
  name     text not null,
  note     localized_text,
  primary key (taxon_id, name)
);

-- Every taxon with all its ancestors (depth 0 = itself). Refresh after taxonomy edits:
--   refresh materialized view concurrently taxon_lineage;
create materialized view taxon_lineage as
with recursive up as (
  select t.id as taxon_id, t.id as ancestor_id, 0 as depth from taxon t
  union all
  select up.taxon_id, p.parent_id, up.depth + 1
  from up join taxon p on p.id = up.ancestor_id
  where p.parent_id is not null
)
select up.taxon_id, up.depth, a.id as ancestor_id, a.rank, a.name
from up join taxon a on a.id = up.ancestor_id;
create unique index taxon_lineage_pk on taxon_lineage (taxon_id, ancestor_id);

-- ---------------------------------------------------------------------------
-- Photos and references
-- ---------------------------------------------------------------------------

create table photo (
  id             uuid primary key default gen_random_uuid(),
  commons_file   text,                         -- Wikimedia Commons file name
  storage_key    text,                         -- or a file we host ourselves
  alt            localized_text not null,
  caption        localized_text not null,
  author         text not null,
  license        text not null,
  license_status photo_license_status not null default 'unverified',
  source_url     text check (source_url ~ '^https://'),
  ratio          text check (ratio ~ '^\d+ / \d+$'),
  fit            text check (fit in ('cover', 'contain')),
  version        integer not null default 1,
  updated_at     timestamptz not null default now(),
  check ((commons_file is null) <> (storage_key is null))  -- exactly one source
);
create unique index photo_commons_file_key on photo (commons_file) where commons_file is not null;
create trigger photo_touch before update on photo for each row execute function touch_row();

create table reference (
  id         text primary key check (id ~ '^[a-z0-9]+$'),   -- 'samson2014'
  kind       reference_kind not null,
  authors    text not null,
  year       text not null,                                 -- '2014' or 'online'
  title      text not null,
  source     text not null,
  url        text not null check (url ~ '^https://'),
  doi        text unique check (doi ~ '^10\.\d{4,9}/\S+$'),
  used_for   localized_text not null,
  sort_order smallint not null unique,                      -- the [n] shown on the site
  version    integer not null default 1,
  updated_at timestamptz not null default now()
);
create trigger reference_touch before update on reference for each row execute function touch_row();

-- ---------------------------------------------------------------------------
-- Species profiles
-- ---------------------------------------------------------------------------

create table species_profile (
  id            uuid primary key default gen_random_uuid(),
  taxon_id      uuid not null unique references taxon(id),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  common_name   localized_text not null,
  form          localized_text not null,
  tags          localized_text[] not null default '{}',
  hero_photo_id uuid references photo(id),
  status        content_status not null default 'draft',
  published_at  timestamptz,
  version       integer not null default 1,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  check (status <> 'published' or published_at is not null)
);
create trigger species_profile_touch before update on species_profile for each row execute function touch_row();

create table profile_section (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid not null references species_profile(id) on delete cascade,
  key        section_key not null,
  summary    localized_text not null,
  version    integer not null default 1,
  updated_at timestamptz not null default now(),
  unique (profile_id, key)                     -- one of each of the 8 categories
);
create trigger profile_section_touch before update on profile_section for each row execute function touch_row();

create table profile_fact (
  id         uuid primary key default gen_random_uuid(),
  section_id uuid not null references profile_section(id) on delete cascade,
  label      localized_text not null,
  value      localized_text not null,
  sort_order smallint not null,
  unique (section_id, sort_order)
);

create table section_photo (
  section_id uuid references profile_section(id) on delete cascade,
  photo_id   uuid references photo(id) on delete restrict,
  sort_order smallint not null,
  primary key (section_id, photo_id)
);
create index section_photo_photo_idx on section_photo (photo_id);

create table section_reference (
  section_id   uuid references profile_section(id) on delete cascade,
  reference_id text references reference(id) on delete restrict,
  primary key (section_id, reference_id)
);
create index section_reference_ref_idx on section_reference (reference_id);

-- A profile cannot be published while any of its photos has an unverified licence.
create function assert_publishable() returns trigger language plpgsql as $$
begin
  if new.status = 'published' and exists (
    select 1
    from profile_section s
    join section_photo sp on sp.section_id = s.id
    join photo p on p.id = sp.photo_id
    where s.profile_id = new.id and p.license_status <> 'verified'
    union all
    select 1 from photo p
    where p.id = new.hero_photo_id and p.license_status <> 'verified'
  ) then
    raise exception 'profile "%" has photos with unverified licences', new.slug
      using errcode = 'check_violation';
  end if;
  return new;
end $$;
create trigger species_profile_publishable
  before insert or update of status, hero_photo_id on species_profile
  for each row execute function assert_publishable();

-- ---------------------------------------------------------------------------
-- Strains
-- ---------------------------------------------------------------------------

create table strain (
  id           uuid primary key default gen_random_uuid(),
  taxon_id     uuid not null references taxon(id),
  collection   text check (collection ~ '^[A-Z]{2,10}$'),  -- 'CBS'; null for lab names like 'Af293'
  accession    text not null,                              -- '133.61' or 'Af293'
  status       strain_status not null,
  note         localized_text not null,
  substrate    text,
  country      char(2) check (country ~ '^[A-Z]{2}$'),
  is_orderable boolean not null default false,
  version      integer not null default 1,
  updated_at   timestamptz not null default now(),
  unique nulls not distinct (collection, accession)
);
create index strain_taxon_idx on strain (taxon_id);
create trigger strain_touch before update on strain for each row execute function touch_row();

-- The same strain held in other collections ('= NRRL 163 = ATCC 1022 ...').
create table strain_xref (
  strain_id  uuid references strain(id) on delete cascade,
  collection text not null,
  accession  text not null,
  primary key (strain_id, collection, accession)
);

create table dna_sequence (
  strain_id uuid references strain(id) on delete cascade,
  locus     locus not null,
  genbank   text not null check (genbank ~ '^[A-Z]{1,2}[0-9]{5,8}(\.[0-9]+)?$'),
  primary key (strain_id, locus, genbank)
);

-- ---------------------------------------------------------------------------
-- Glossary
-- ---------------------------------------------------------------------------

create table glossary_term (
  id          uuid primary key default gen_random_uuid(),
  term_group  term_group not null,
  term        localized_text not null unique,
  meaning     localized_text not null,
  example     localized_text,
  sort_order  smallint not null,
  -- Accent-insensitive search text in both languages, so 'chung' finds 'chủng'.
  search_text text generated always as (
    lower(f_unaccent((term->>'en') || ' ' || (term->>'vi') || ' ' || (meaning->>'en') || ' ' || (meaning->>'vi')))
  ) stored
);
create index glossary_search_trgm on glossary_term using gin (search_text gin_trgm_ops);

-- ---------------------------------------------------------------------------
-- Audit log (written by the API in the same transaction as each curator change)
-- ---------------------------------------------------------------------------

create table audit_log (
  id        bigint generated always as identity primary key,
  actor     text not null,
  action    text not null check (action in ('create', 'update', 'delete', 'publish', 'unpublish')),
  entity    text not null,
  entity_id text not null,
  diff      jsonb,
  at        timestamptz not null default now()
);
create index audit_log_entity_idx on audit_log (entity, entity_id, at desc);

-- ---------------------------------------------------------------------------
-- Public read model: only published content (the API's read-only role uses these)
-- ---------------------------------------------------------------------------

create view published_species_profile as
  select * from species_profile where status = 'published';

commit;
