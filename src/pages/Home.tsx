import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HyphaeDish from '../components/HyphaeDish.tsx'
import Photo from '../components/Photo.tsx'
import { photos } from '../data/photos'
import { topics } from '../data/topics'
import { useLang } from '../i18n/LanguageContext'

export default function Home() {
  const { t, lang } = useLang()

  useEffect(() => {
    document.title = lang === 'vi' ? 'Làm quen với Nấm' : 'Meet the Fungi'
  }, [lang])

  const traits = topics.filter((tp) => tp.group === 'traits')

  return (
    <>
      <header className="hero">
        <div>
          <div className="eyebrow">{t({ en: "A beginner's guide to mycology", vi: 'Nhập môn nấm học cho người mới' })}</div>
          <h1>
            {t({
              en: (
                <>
                  The hidden world of <em>fungi</em>, one plate at a time.
                </>
              ),
              vi: (
                <>
                  Thế giới ẩn giấu của <em>nấm</em>, từng đĩa một.
                </>
              ),
            })}
          </h1>
          <p className="lede">
            {t({
              en: 'Moulds, yeasts and mushrooms are everywhere: in bread, in soil, in medicine and sometimes in hospitals. Here is how scientists describe them, in plain words.',
              vi: 'Nấm mốc, nấm men và nấm lớn có ở khắp nơi: trong bánh mì, trong đất, trong thuốc và đôi khi trong bệnh viện. Đây là cách các nhà khoa học mô tả chúng, bằng lời lẽ dễ hiểu.',
            })}
          </p>
          <div className="hero-actions">
            <Link to="/learn/what-is-mycology" className="btn">
              {t({ en: 'Start learning', vi: 'Bắt đầu tìm hiểu' })}
            </Link>
            <Link to="/names" className="btn ghost">
              {t({ en: 'Names & ranks', vi: 'Tên & bậc phân loại' })}
            </Link>
          </div>
        </div>
        <HyphaeDish />
      </header>

      <section>
        <div className="sec-head">
          <span className="field">{t({ en: 'real photos', vi: 'ảnh thật' })}</span>
          <h2>{t({ en: 'Fungi up close', vi: 'Cận cảnh thế giới nấm' })}</h2>
          <p>
            {t({
              en: 'From the mould on old bread to cells a hundred times smaller than a hair.',
              vi: 'Từ vết mốc trên bánh mì cũ đến những tế bào nhỏ hơn sợi tóc hàng trăm lần.',
            })}
          </p>
        </div>
        <div className="photo-row n4">
          <Photo photo={photos.mouldyBread} ratio="1 / 1" />
          <Photo photo={photos.fumigatusColony} ratio="1 / 1" />
          <Photo photo={photos.yeastCells} ratio="1 / 1" />
          <Photo photo={photos.buttonMushroom} ratio="1 / 1" />
        </div>
      </section>

      <section>
        <div className="sec-head">
          <span className="field">{t({ en: 'start here', vi: 'bắt đầu' })}</span>
          <h2>{t({ en: 'First, the basics', vi: 'Kiến thức cơ bản' })}</h2>
        </div>
        <div className="grid g3">
          {topics
            .filter((tp) => tp.group === 'start')
            .map((tp) => (
              <Link key={tp.slug} to={`/learn/${tp.slug}`} className="card link-card">
                <h3>{t(tp.title)}</h3>
                <p>{t(tp.summary)}</p>
                <span className="ex">{t({ en: 'Read →', vi: 'Đọc →' })}</span>
              </Link>
            ))}
          <Link to="/names" className="card link-card">
            <h3>{t({ en: 'Names & ranks', vi: 'Tên & bậc phân loại' })}</h3>
            <p>
              {t({
                en: 'Taxon, genus, species, strain: how fungi are named and grouped, with a searchable word list.',
                vi: 'Đơn vị phân loại, chi, loài, chủng: cách đặt tên và xếp nhóm nấm, kèm bảng thuật ngữ có thể tìm kiếm.',
              })}
            </p>
            <span className="ex">{t({ en: 'Read →', vi: 'Đọc →' })}</span>
          </Link>
        </div>
      </section>

      <section>
        <div className="sec-head">
          <span className="field">{t({ en: 'the MycoBase data model', vi: 'mô hình dữ liệu MycoBase' })}</span>
          <h2>{t({ en: 'Eight ways to describe a fungus', vi: 'Tám cách mô tả một loài nấm' })}</h2>
          <p>
            {t({
              en: 'A fungal database records the same eight kinds of information for every strain. Pick one to explore.',
              vi: 'Một cơ sở dữ liệu về nấm ghi lại cùng tám loại thông tin cho mỗi chủng. Chọn một mục để khám phá.',
            })}
          </p>
        </div>
        <div className="grid g3">
          <Link to="/learn/species-and-strain" className="card link-card">
            <span className="mono tag">{t({ en: 'identity', vi: 'định danh' })}</span>
            <h3>{t({ en: 'Species and strain', vi: 'Loài và chủng' })}</h3>
            <p>{t({ en: 'Which fungus is this, and which exact sample?', vi: 'Đây là loài nấm nào, và chính xác là mẫu nào?' })}</p>
          </Link>
          {traits.map((tp) => (
            <Link key={tp.slug} to={`/learn/${tp.slug}`} className="card link-card">
              <span className="mono tag">{t(tp.field)}</span>
              <h3>{t(tp.title)}</h3>
              <p>{t(tp.summary)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
