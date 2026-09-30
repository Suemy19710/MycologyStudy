import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { species } from '../data/species'
import { useLang } from '../i18n/LanguageContext'

export default function SpeciesList() {
  const { t, lang } = useLang()

  useEffect(() => {
    document.title = lang === 'vi' ? 'Hồ sơ loài · Làm quen với Nấm' : 'Species profiles · Meet the Fungi'
  }, [lang])

  return (
    <article className="topic">
      <header className="sec-head">
        <span className="field">{t({ en: 'put it together', vi: 'tổng hợp' })}</span>
        <h1>{t({ en: 'Species profiles', vi: 'Hồ sơ loài' })}</h1>
        <p>
          {t({
            en: 'Real species described in all eight ways, the same way a MycoBase record would. Compare a mould that can cause disease with the friendly yeast in your bread.',
            vi: 'Các loài thật được mô tả theo đủ tám cách, giống như một bản ghi trong MycoBase. So sánh một loài nấm mốc có thể gây bệnh với loài nấm men thân thiện trong bánh mì.',
          })}
        </p>
      </header>

      <div className="grid g2">
        {species.map((s) => (
          <Link key={s.slug} to={`/species/${s.slug}`} className="card link-card species-card">
            <Photo photo={s.photo} ratio="16 / 10" />
            <span className="mono tag">{t(s.form)}</span>
            <h3>
              <i>{s.name}</i>
            </h3>
            <p>{t(s.commonName)}</p>
            <div className="badges">
              {s.tags.map((tag) => (
                <span key={tag.en} className="badge">
                  {t(tag)}
                </span>
              ))}
            </div>
            <span className="ex">{t({ en: 'Open profile →', vi: 'Xem hồ sơ →' })}</span>
          </Link>
        ))}
      </div>

      <p className="note-inline">
        {t({
          en: 'Want to add a species? Copy one entry in src/data/species.ts and fill in all eight sections.',
          vi: 'Muốn thêm một loài? Sao chép một mục trong src/data/species.ts và điền đủ tám phần.',
        })}
      </p>
    </article>
  )
}
