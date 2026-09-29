import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findTopic } from '../data/topics'
import { useLang } from '../i18n/LanguageContext'
import NotFound from '../pages/NotFound'

interface Props {
  content: Record<string, ReactNode>
}

// Shared frame for every topic page: tag, heading, intro, the page's own content,
// then Previous / Next links.
export default function TopicPage({ content }: Props) {
  const { slug } = useParams()
  const { t } = useLang()
  const { topic, prev, next } = findTopic(slug)

  const siteName = t({ en: 'Meet the Fungi', vi: 'Làm quen với Nấm' })
  useEffect(() => {
    document.title = topic ? `${t(topic.title)} · ${siteName}` : siteName
  }, [topic, t, siteName])

  if (!topic || !content[topic.slug]) return <NotFound />

  return (
    <article className="topic">
      <header className="sec-head">
        <span className="field">{t(topic.field)}</span>
        <h1>{t(topic.title)}</h1>
        <p>{t(topic.summary)}</p>
      </header>

      <div className="topic-body">{content[topic.slug]}</div>

      <nav className="pager" aria-label={t({ en: 'Previous and next topic', vi: 'Chủ đề trước và sau' })}>
        {prev ? (
          <Link to={`/learn/${prev.slug}`} className="pager-link">
            <span className="mono">← {t({ en: 'Previous', vi: 'Trước' })}</span>
            {t(prev.title)}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/learn/${next.slug}`} className="pager-link next">
            <span className="mono">{t({ en: 'Next', vi: 'Tiếp' })} →</span>
            {t(next.title)}
          </Link>
        )}
      </nav>
    </article>
  )
}
