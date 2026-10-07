// Builds the Phase 0 static API from the content in src/data (run by scripts/generate-api.mjs).
// Every response is validated against the shared schemas, so bad data fails the build, not the browser.
import type { z } from 'zod'
import { references } from '../data/references'
import { species, cbsCatalogue } from '../data/species'
import { examples, ranks, termGroups, terms, tierLabels } from '../data/taxonomy'
import * as S from './schemas'

type Files = Record<string, unknown> // API path (without .json) -> response body

function check<T extends z.ZodType>(schema: T, path: string, data: unknown): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n')
    throw new Error(`Invalid data for /api/v1${path}:\n${issues}`)
  }
  return result.data
}

// Cross-checks the schemas cannot express on their own.
function checkLinks() {
  const refIds = new Set(references.map((r) => r.id))
  const problems: string[] = []
  if (refIds.size !== references.length) problems.push('references: duplicate id')
  const slugs = new Set<string>()
  for (const sp of species) {
    if (slugs.has(sp.slug)) problems.push(`species: duplicate slug "${sp.slug}"`)
    slugs.add(sp.slug)
    for (const [key, section] of Object.entries(sp.sections)) {
      for (const id of section.refs) {
        if (!refIds.has(id)) problems.push(`species/${sp.slug}.sections.${key}: unknown reference "${id}"`)
      }
    }
  }
  if (problems.length) throw new Error(`Broken links in content:\n  - ${problems.join('\n  - ')}`)
}

export function buildApi(): Files {
  checkLinks()
  const files: Files = {}
  const add = <T extends z.ZodType>(path: string, schema: T, data: unknown) => {
    files[path] = check(schema, path, data)
  }

  add('/references', S.ReferenceList, { items: references })

  add('/species', S.SpeciesList, {
    items: species.map(({ slug, name, commonName, form, tags, photo }) => ({ slug, name, commonName, form, tags, photo })),
  })
  for (const sp of species) {
    const { strains, ...profile } = sp
    add(`/species/${sp.slug}`, S.SpeciesProfile, profile)
    add(`/species/${sp.slug}/strains`, S.StrainList, { catalogueUrl: cbsCatalogue, items: strains })
  }

  add('/ranks', S.RankList, { tierLabels, items: ranks })
  add('/taxonomy/examples', S.ExampleList, { items: examples })
  add('/glossary', S.Glossary, { groups: termGroups, items: terms })

  return files
}
