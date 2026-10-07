// Query keys and query options in one place (docs/ARCHITECTURE.md, section 7).
// Keys are hierarchical, so invalidating keys.species() refreshes every species view at once.
import { QueryClient, queryOptions, useQuery } from '@tanstack/react-query'
import { ApiError, apiGet } from './client'
import * as S from './schemas'

export const keys = {
  all: ['v1'] as const,
  references: () => [...keys.all, 'references'] as const,
  species: () => [...keys.all, 'species'] as const,
  speciesList: () => [...keys.species(), 'list'] as const,
  speciesDetail: (slug: string) => [...keys.species(), 'detail', slug] as const,
  speciesStrains: (slug: string) => [...keys.species(), 'detail', slug, 'strains'] as const,
  ranks: () => [...keys.all, 'ranks'] as const,
  examples: () => [...keys.all, 'taxonomy', 'examples'] as const,
  glossary: () => [...keys.all, 'glossary'] as const,
}

// Content only changes when the site is rebuilt, so cached data never goes stale within a visit.
// (With a live API in Phase 1, lower these to minutes.)
const CONTENT = { staleTime: Infinity } as const

export const referencesQuery = () =>
  queryOptions({ queryKey: keys.references(), queryFn: ({ signal }) => apiGet('/references', S.ReferenceList, signal), ...CONTENT })

export const speciesListQuery = () =>
  queryOptions({ queryKey: keys.speciesList(), queryFn: ({ signal }) => apiGet('/species', S.SpeciesList, signal), ...CONTENT })

export const speciesDetailQuery = (slug: string) =>
  queryOptions({
    queryKey: keys.speciesDetail(slug),
    queryFn: ({ signal }) => apiGet(`/species/${encodeURIComponent(slug)}`, S.SpeciesProfile, signal),
    ...CONTENT,
  })

export const speciesStrainsQuery = (slug: string) =>
  queryOptions({
    queryKey: keys.speciesStrains(slug),
    queryFn: ({ signal }) => apiGet(`/species/${encodeURIComponent(slug)}/strains`, S.StrainList, signal),
    ...CONTENT,
  })

export const ranksQuery = () =>
  queryOptions({ queryKey: keys.ranks(), queryFn: ({ signal }) => apiGet('/ranks', S.RankList, signal), ...CONTENT })

export const examplesQuery = () =>
  queryOptions({ queryKey: keys.examples(), queryFn: ({ signal }) => apiGet('/taxonomy/examples', S.ExampleList, signal), ...CONTENT })

export const glossaryQuery = () =>
  queryOptions({ queryKey: keys.glossary(), queryFn: ({ signal }) => apiGet('/glossary', S.Glossary, signal), ...CONTENT })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 30 * 60_000,
      refetchOnWindowFocus: false,
      // Retry network and server errors, never "not found" or other client errors.
      retry: (count, error) => !(error instanceof ApiError && error.status < 500) && count < 2,
    },
  },
})

// References are cited on almost every page: number lookups by id, from the cached list.
export function useReferences() {
  const { data } = useQuery(referencesQuery())
  const list = data?.items ?? []
  return {
    list,
    number: (id: string) => {
      const i = list.findIndex((r) => r.id === id)
      return i >= 0 ? i + 1 : undefined
    },
  }
}

export const isNotFound = (error: unknown) => error instanceof ApiError && error.status === 404
