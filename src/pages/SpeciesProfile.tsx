import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cite, { Sources } from '../components/Cite'
import Photo, { PhotoRow } from '../components/Photo'
import { findSpecies, sectionInfo, species } from '../data/species'
import { useLang } from '../i18n/LanguageContext'
import NotFound from './NotFound'

export default function SpeciesProfile() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const sp = findSpecies(slug)

  useEffect(() => {
    if (sp) document.title = `${sp.name} · ${lang === 'vi' ? 'Làm quen với Nấm' : 'Meet the Fungi'}`
  }, [sp, lang])

  if (!sp) return <NotFound />

  // Every reference used anywhere in this profile, without duplicates.
  const allRefs = [...new Set(sectionInfo.flatMap((s) => sp.sections[s.key].refs))]
  const others = species.filter((s) => s.slug !== sp.slug)

  const jumpTo = (key: string) => document.getElementById(`sec-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <article className="topic profile">
      <Link to="/species" className="back mono">
        ← {t({ en: 'All species profiles', vi: 'Tất cả hồ sơ loài' })}
      </Link>

      <header className="profile-head">
        <Photo photo={sp.photo} ratio="4 / 3" />
        <div className="profile-title">
          <span className="field">{t(sp.form)}</span>
          <h1>
            <i>{sp.name}</i>
          </h1>
          <p className="lede-sm">{t(sp.commonName)}</p>
          <div className="badges">
            {sp.tags.map((tag) => (
              <span key={tag.en} className="badge">
                {t(tag)}
              </span>
            ))}
          </div>
          <ol className="lineage" aria-label={t({ en: 'Classification', vi: 'Phân loại' })}>
            {sp.lineage.map((name, i) => (
              <li key={name}>{i === sp.lineage.length - 1 ? <i>{name}</i> : name}</li>
            ))}
            <li>
              <i>{sp.name}</i>
            </li>
          </ol>
        </div>
      </header>

      <nav className="jump" aria-label={t({ en: 'Jump to a section', vi: 'Chuyển đến mục' })}>
        {sectionInfo.map((s) => (
          <button key={s.key} type="button" onClick={() => jumpTo(s.key)}>
            {t(s.label)}
          </button>
        ))}
      </nav>

      <div className="profile-sections">
        {sectionInfo.map((info, i) => {
          const section = sp.sections[info.key]
          return (
            <section key={info.key} id={`sec-${info.key}`} className="profile-section">
              <div className="ps-head">
                <span className="ps-n mono">{i + 1}/8</span>
                <span className="field">{t(info.label)}</span>
              </div>
              <h2>
                {t(section.summary)} <Cite ids={section.refs} />
              </h2>
              <dl className="facts">
                {section.facts.map((f) => (
                  <div key={f.label.en}>
                    <dt>{t(f.label)}</dt>
                    <dd>{t(f.value)}</dd>
                  </div>
                ))}
              </dl>
              {section.photos && <PhotoRow photos={section.photos} ratio="4 / 3" />}
              <Link to={info.topic} className="ps-link">
                {t({ en: 'What does this category mean?', vi: 'Mục này nghĩa là gì?' })} →
              </Link>
            </section>
          )
        })}
      </div>

      <Sources ids={allRefs} />

      {others.length > 0 && (
        <section>
          <h2 className="sub">{t({ en: 'Compare with', vi: 'So sánh với' })}</h2>
          <div className="grid g2">
            {others.map((o) => (
              <Link key={o.slug} to={`/species/${o.slug}`} className="card link-card">
                <span className="mono tag">{t(o.form)}</span>
                <h3>
                  <i>{o.name}</i>
                </h3>
                <p>{t(o.commonName)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
