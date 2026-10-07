import type { z } from 'zod'

// Phase 0 reads the static JSON files generated into /api/v1 (see scripts/generate-api.mjs).
// Phase 1: set VITE_API_URL (e.g. https://api.example.org/api/v1) at build time and the same
// requests go to the real API instead. Nothing else in the app changes.
const apiUrl = import.meta.env.VITE_API_URL as string | undefined
const isStatic = !apiUrl
const base = (apiUrl ?? `${import.meta.env.BASE_URL}api/v1`).replace(/\/$/, '')

export class ApiError extends Error {
  readonly status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function urlFor(path: string) {
  return isStatic ? `${base}${path}.json` : `${base}${path}`
}

// GET a resource and check it against its schema, so a contract change fails loudly.
export async function apiGet<T extends z.ZodType>(path: string, schema: T, signal?: AbortSignal): Promise<z.infer<T>> {
  const res = await fetch(urlFor(path), { signal, headers: { Accept: 'application/json' } })
  // Static hosts answer unknown files with the HTML app shell, sometimes with status 200.
  const isJson = res.headers.get('content-type')?.includes('json')
  if (!res.ok || !isJson) {
    throw new ApiError(res.ok ? 404 : res.status, `GET ${path} failed (${res.ok ? 'not found' : res.status})`)
  }
  const result = schema.safeParse(await res.json())
  if (!result.success) {
    throw new ApiError(500, `GET ${path} returned data that does not match the contract: ${result.error.message}`)
  }
  return result.data
}
