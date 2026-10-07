import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { referencesQuery } from '../api/queries'
import type { ReferenceT } from '../api/schemas'
import { LoadError, Loading } from '../components/QueryState'
import { photoPage, photos, type Photo } from '../data/photos'
import { useLang, type L } from '../i18n/LanguageContext'

const kindLabel: Record<ReferenceT['kind'], L> = {
  article: { en: 'article', vi: 'bài báo' },
  book: { en: 'book', vi: 'sách' },
  guideline: { en: 'standard', vi: 'tiêu chuẩn' },
  website: { en: 'website', vi: 'trang web' },
}

export default function References() {
  const { t, lang } = useLang()
  const { hash } = useLocation()
  const [copied, setCopied] = useState<string | null>(null)
  const { data, isPending, isError, refetch } = useQuery(referencesQuery())

  useEffect(() => {
    document.title = lang === 'vi' ? 'Tài liệu tham khảo · Làm quen với Nấm' : 'References · Meet the Fungi'
  }, [lang])

  // When opened from a [n] link, scroll to that reference and highlight it.
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    el?.scrollIntoView({ block: 'center' })
  }, [hash, data])

  // Copy one reference as plain text (useful for your report).
  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      setCopied(null)
    }
  }

  const allPhotos: Photo[] = Object.values(photos)

  return (
    <article className="topic">
      <header className="sec-head">
        <span className="field">{t({ en: 'sources', vi: 'nguồn' })}</span>
        <h1>{t({ en: 'References', vi: 'Tài liệu tham khảo' })}</h1>
        <p>
          {t({
            en: 'The scientific literature behind this site. Numbers in square brackets on other pages, like [17], point to this list.',
            vi: 'Các tài liệu khoa học làm nền cho trang web này. Các số trong ngoặc vuông ở những trang khác, như [17], trỏ đến danh sách này.',
          })}
        </p>
      </header>

      <section>
        <h2 className="sub">{t({ en: 'Literature', vi: 'Tài liệu' })}</h2>
        {isPending && <Loading />}
        {isError && <LoadError onRetry={() => void refetch()} />}
        <ol className="ref-list">
          {data?.items.map((r, i) => {
            const plain = `${r.authors} (${r.year}). ${r.title}. ${r.source}. ${r.url}`
            return (
              <li key={r.id} id={r.id} className={hash === `#${r.id}` ? 'target' : ''}>
                <span className="ref-n mono">{i + 1}</span>
                <div className="ref-body">
                  <p>
                    {r.authors} ({r.year}). <strong>{r.title}</strong>. <span className="ref-source">{r.source}</span>.
                  </p>
                  <p className="ref-used">
                    <span className="mono tag">{t(kindLabel[r.kind])}</span> {t({ en: 'Used for:', vi: 'Dùng cho:' })}{' '}
                    {t(r.usedFor)}
                  </p>
                  <div className="ref-actions">
                    <a href={r.url} target="_blank" rel="noreferrer">
                      {r.url.includes('doi.org') ? 'DOI' : t({ en: 'Open source', vi: 'Mở nguồn' })} ↗
                    </a>
                    <button type="button" className="link-btn" onClick={() => copy(r.id, plain)}>
                      {copied === r.id ? t({ en: 'Copied', vi: 'Đã chép' }) : t({ en: 'Copy citation', vi: 'Chép trích dẫn' })}
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section>
        <h2 className="sub">{t({ en: 'Photo credits', vi: 'Nguồn ảnh' })}</h2>
        <p className="prose">
          {t({
            en: 'All photos come from Wikimedia Commons under open licences. Each one is also credited under the image.',
            vi: 'Tất cả ảnh lấy từ Wikimedia Commons theo giấy phép mở. Mỗi ảnh cũng được ghi nguồn ngay bên dưới.',
          })}
        </p>
        <div className="table-wrap">
          <table className="credits">
            <thead>
              <tr>
                <th>{t({ en: 'Photo', vi: 'Ảnh' })}</th>
                <th>{t({ en: 'Author', vi: 'Tác giả' })}</th>
                <th>{t({ en: 'Licence', vi: 'Giấy phép' })}</th>
              </tr>
            </thead>
            <tbody>
              {allPhotos.map((p) => (
                <tr key={p.file ?? p.src}>
                  <td>
                    {photoPage(p) ? (
                      <a href={photoPage(p)} target="_blank" rel="noreferrer">
                        {t(p.caption)}
                      </a>
                    ) : (
                      t(p.caption)
                    )}
                  </td>
                  <td>{p.author}</td>
                  <td className="mono">{p.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
