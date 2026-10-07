import { Link } from 'react-router-dom'
import { useReferences } from '../api/queries'
import { useLang } from '../i18n/LanguageContext'

// Small numbered citation, e.g. [3][17], linking to that entry on /references.
// The reference list is prefetched at startup, so numbers normally appear immediately.
export default function Cite({ ids }: { ids: string[] }) {
  const { t } = useLang()
  const refs = useReferences()
  return (
    <span className="cite">
      {ids.map((id) => {
        const n = refs.number(id)
        const ref = refs.list.find((r) => r.id === id)
        if (!n || !ref) return null
        return (
          <Link
            key={id}
            to={`/references#${id}`}
            title={`${ref.authors} (${ref.year}). ${ref.title}`}
            aria-label={t({ en: `Reference ${n}`, vi: `Tài liệu ${n}` })}
          >
            [{n}]
          </Link>
        )
      })}
    </span>
  )
}

// "Sources for this page" block shown at the end of a page.
export function Sources({ ids }: { ids: string[] }) {
  const { t } = useLang()
  const refs = useReferences()
  const list = refs.list
    .filter((r) => ids.includes(r.id))
    .sort((a, b) => (refs.number(a.id) ?? 0) - (refs.number(b.id) ?? 0))
  if (list.length === 0) return null

  return (
    <aside className="sources">
      <span className="label">{t({ en: 'Sources for this page', vi: 'Nguồn tham khảo của trang này' })}</span>
      <ol>
        {list.map((r) => (
          <li key={r.id} value={refs.number(r.id)}>
            <Link to={`/references#${r.id}`}>
              {r.authors} ({r.year}). <em>{r.title}</em>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  )
}
