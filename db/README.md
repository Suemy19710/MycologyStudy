# Database (Phase 1 preparation)

PostgreSQL schema for Meet the Fungi. The design and the reasons behind it are in
[docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md), section 3.

| File | What it does | Run as |
|---|---|---|
| `setup.sql` | Creates the `myco_owner` login role and the `mycologystudy` database (once). | `postgres` (superuser) |
| `migrations/0001_init.sql` | Creates all types, tables, triggers and views. | `myco_owner` |

The site does **not** use the database yet: Phase 0 still serves static JSON. The next step is a seed
script that loads `src/data` into these tables, followed by the read API.

## Create the database on Windows (PostgreSQL 18 is already installed)

Open **PowerShell** in the project folder.

**1. Make `psql` available in this window** (it is installed but not on the PATH):

```powershell
$env:Path += ";C:\Program Files\PostgreSQL\18\bin"
```

To make this permanent: *Settings → System → About → Advanced system settings → Environment Variables →
Path → New*, then add `C:\Program Files\PostgreSQL\18\bin`.

**2. Create the role and the database:**

```powershell
psql -U postgres -h localhost -f db/setup.sql
```

It asks for two passwords:
1. the **postgres** password you chose when you installed PostgreSQL;
2. a **new** password for `myco_owner`, the account the app will use. Pick a new one and keep it in a
   password manager.

**3. Create the tables:**

```powershell
psql -U myco_owner -h localhost -d mycologystudy -v ON_ERROR_STOP=1 -f db/migrations/0001_init.sql
```

**4. Check:**

```powershell
psql -U myco_owner -h localhost -d mycologystudy -c "\dt"
```

You should see 15 tables (`taxon`, `species_profile`, `strain`, `photo`, `reference`, ...).

**5. Connection string for later** (the API will read it from `.env`, which is git-ignored):

```
DATABASE_URL=postgres://myco_owner:<your password>@localhost:5432/mycologystudy
```

Copy `.env.example` to `.env` and fill in the password. Never commit `.env`.

## Rules for changing the schema

- Never edit a migration that has already run anywhere. Add `0002_<what>.sql` instead.
- Each migration runs inside `begin; ... commit;`, so a failure leaves the database unchanged.
- Run new migrations on a throwaway database first.

## What the schema already enforces

| Rule | How |
|---|---|
| Every text has English and Vietnamese | `localized_text` domain with a CHECK constraint |
| A profile cannot be published while a photo licence is unverified | `species_profile_publishable` trigger |
| One strain per collection and accession (`CBS 133.61`) | unique constraint |
| GenBank accessions, DOIs, URLs and slugs have the right format | CHECK constraints |
| Edits cannot silently overwrite each other | `version` column, bumped on every update by `touch_row()` |
| Search ignores Vietnamese accents ("chung" finds "chủng") | `f_unaccent` + trigram index |
