// The API contract (see docs/ARCHITECTURE.md, section 5).
// The same schemas validate the data when the static JSON is generated, validate every response in the
// browser, and give the UI its types. When a real API replaces the static files (Phase 1), it must
// return exactly these shapes.
import { z } from 'zod'

// ---------- shared pieces ----------

// Text in both languages. Both are required, so a missing translation fails the build.
export const Localized = z.object({
  en: z.string().trim().min(1),
  vi: z.string().trim().min(1),
})

const https = z.string().regex(/^https:\/\//, 'must be an https:// URL')

export const Photo = z
  .object({
    file: z.string().min(1).optional(), // Wikimedia Commons file name
    src: z.string().startsWith('/').optional(), // local file in /public
    alt: Localized,
    caption: Localized,
    author: z.string().min(1),
    license: z.string().min(1),
    ratio: z.string().regex(/^\d+ \/ \d+$/).optional(),
    fit: z.enum(['cover', 'contain']).optional(),
  })
  .refine((p) => Boolean(p.file) !== Boolean(p.src), 'a photo needs exactly one of `file` or `src`')

// ---------- references ----------

export const Reference = z.object({
  id: z.string().regex(/^[a-z0-9]+$/),
  kind: z.enum(['article', 'book', 'website', 'guideline']),
  authors: z.string().min(1),
  year: z.union([z.number().int().min(1700).max(2100), z.string().min(1)]),
  title: z.string().min(1),
  source: z.string().min(1),
  url: https,
  usedFor: Localized,
})
// Order matters: a reference's number on the site is its position in this list.
export const ReferenceList = z.object({ items: z.array(Reference) })

// ---------- species profiles ----------

export const SECTION_KEYS = [
  'identity',
  'morphology',
  'physiology',
  'ecology',
  'chemistry',
  'pathogenicity',
  'susceptibility',
  'dna',
] as const
export const SectionKey = z.enum(SECTION_KEYS)

export const Section = z.object({
  summary: Localized,
  facts: z.array(z.object({ label: Localized, value: Localized })).min(1),
  photos: z.array(Photo).optional(),
  refs: z.array(z.string().regex(/^[a-z0-9]+$/)),
})

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)

export const SpeciesSummary = z.object({
  slug,
  name: z.string().regex(/^[A-Z][a-z]+ [a-z-]+$/, 'must be a binomial, e.g. "Aspergillus fumigatus"'),
  commonName: Localized,
  form: Localized,
  tags: z.array(Localized),
  photo: Photo,
})
export const SpeciesList = z.object({ items: z.array(SpeciesSummary) })

export const SpeciesProfile = SpeciesSummary.extend({
  lineage: z.array(z.string().min(1)).min(1),
  sections: z.object(Object.fromEntries(SECTION_KEYS.map((k) => [k, Section])) as Record<(typeof SECTION_KEYS)[number], typeof Section>),
})

export const Strain = z.object({
  id: z.string().min(1), // 'CBS 133.61'
  status: Localized,
  note: Localized,
  otherIds: z.string().optional(),
  inCbs: z.boolean(),
})
export const StrainList = z.object({
  catalogueUrl: https, // where strains can be ordered
  items: z.array(Strain),
})

// ---------- taxonomy (Names & ranks) ----------

export const RANK_KEYS = [
  'kingdom',
  'subkingdom',
  'phylum',
  'subphylum',
  'class',
  'subclass',
  'order',
  'family',
  'genus',
  'section',
  'species',
  'infraspecific',
  'strain',
] as const
export const RankKey = z.enum(RANK_KEYS)
export const RankTier = z.enum(['principal', 'secondary', 'infraspecific', 'informal'])

export const Rank = z.object({
  key: RankKey,
  tier: RankTier,
  rank: Localized,
  what: Localized,
  ending: z.string().regex(/^-[a-z]+$/).optional(),
})
export const RankList = z.object({
  tierLabels: z.record(RankTier, Localized),
  items: z.array(Rank),
})

export const ExampleFungus = z.object({
  key: z.string().min(1),
  label: Localized,
  photo: Photo,
  names: z.partialRecord(RankKey, z.string().min(1)),
  authority: z.string().min(1),
  strainNote: Localized,
})
export const ExampleList = z.object({ items: z.array(ExampleFungus) })

export const TermGroup = z.enum(['naming', 'tree', 'collections'])
export const Glossary = z.object({
  groups: z.array(z.object({ value: z.union([TermGroup, z.literal('all')]), label: Localized })),
  items: z.array(
    z.object({
      term: Localized,
      group: TermGroup,
      meaning: Localized,
      example: Localized.optional(),
    }),
  ),
})

// ---------- types for the UI ----------

export type LocalizedT = z.infer<typeof Localized>
export type PhotoT = z.infer<typeof Photo>
export type ReferenceT = z.infer<typeof Reference>
export type SectionKeyT = z.infer<typeof SectionKey>
export type SpeciesSummaryT = z.infer<typeof SpeciesSummary>
export type SpeciesProfileT = z.infer<typeof SpeciesProfile>
export type StrainListT = z.infer<typeof StrainList>
export type RankKeyT = z.infer<typeof RankKey>
export type RankT = z.infer<typeof Rank>
export type ExampleFungusT = z.infer<typeof ExampleFungus>
export type GlossaryT = z.infer<typeof Glossary>
export type TermGroupT = z.infer<typeof TermGroup>
