// Phase 0 "static API": writes validated JSON to public/api/v1/, which Vite serves in dev and copies
// into dist/ on build. Runs automatically before `npm run dev` and `npm run build`.
// Uses Vite to load the TypeScript content files, so no extra tooling is needed.
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'api', 'v1')

// 1. Load and validate the content (Vite is only used here to import the .ts files).
let files
const vite = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, watch: null, hmr: false },
})
try {
  const { buildApi } = await vite.ssrLoadModule('/src/api/build.ts')
  files = buildApi()
} catch (error) {
  console.error(`\nstatic API: ${error.message}\n`)
  process.exitCode = 1
} finally {
  await vite.close()
}

// 2. Write the files.
if (files) {
  await rm(outDir, { recursive: true, force: true }) // no stale files from deleted content
  for (const [path, body] of Object.entries(files)) {
    const file = join(outDir, `${path}.json`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, JSON.stringify(body))
  }
  console.log(`static API: wrote ${Object.keys(files).length} files to public/api/v1`)
}
