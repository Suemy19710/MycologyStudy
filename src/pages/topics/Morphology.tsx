import { Analogy } from '../../components/ui'
import Photo from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

const glossary = [
  {
    term: { en: 'Hyphae', vi: 'Sợi nấm (hyphae)' },
    meaning: { en: 'The long, thin threads a mould is built from.', vi: 'Những sợi dài, mảnh tạo nên cơ thể nấm mốc.' },
  },
  {
    term: { en: 'Septa', vi: 'Vách ngăn (septa)' },
    meaning: { en: 'Little cross-walls that divide a hypha into separate cells.', vi: 'Các vách ngang nhỏ chia sợi nấm thành từng tế bào.' },
  },
  {
    term: { en: 'Conidia', vi: 'Bào tử đính (conidia)' },
    meaning: { en: 'Spores the fungus releases into the air to spread and reproduce.', vi: 'Bào tử nấm phát tán vào không khí để lan rộng và sinh sản.' },
  },
  {
    term: { en: 'Colony', vi: 'Khuẩn lạc' },
    meaning: { en: 'The visible patch on the dish that grew from one spore or cell.', vi: 'Mảng nấm nhìn thấy được trên đĩa, mọc lên từ một bào tử hoặc một tế bào.' },
  },
]

export default function Morphology() {
  const { t } = useLang()
  return (
    <>
      <div className="grid g2">
        <div className="card photo-card">
          <Photo photo={photos.fumigatusColony} ratio="4 / 3" />
          <h3>{t({ en: 'By eye (macroscopic)', vi: 'Bằng mắt thường (đại thể)' })}</h3>
          <p>
            {t({
              en: 'Colony colour, texture (velvety, cottony, powdery), the shape of the edge, and how fast it spreads across the dish.',
              vi: 'Màu khuẩn lạc, bề mặt (mịn như nhung, xốp như bông, dạng bột), hình dạng mép và tốc độ lan trên đĩa.',
            })}
          </p>
          <span className="ex">
            {t({ en: '"blue-green, velvety, white edge"', vi: '"xanh lam-lục, mịn như nhung, mép trắng"' })}
          </span>
        </div>
        <div className="card photo-card">
          <Photo photo={photos.aspergillusMicro} ratio="4 / 3" />
          <h3>{t({ en: 'Under the microscope (microscopic)', vi: 'Dưới kính hiển vi (vi thể)' })}</h3>
          <p>
            {t({
              en: 'The threads, the walls inside them and the spores. The blue stain makes the structures easier to see.',
              vi: 'Sợi nấm, vách ngăn bên trong và bào tử. Thuốc nhuộm màu xanh giúp dễ quan sát các cấu trúc hơn.',
            })}
          </p>
          <span className="ex">
            {t({ en: '"septate hyphae, round conidia in chains"', vi: '"sợi nấm có vách ngăn, bào tử tròn xếp thành chuỗi"' })}
          </span>
        </div>
      </div>

      <section>
        <h2 className="sub">{t({ en: "Words you'll see under the microscope", vi: 'Những thuật ngữ khi soi kính hiển vi' })}</h2>
        <div className="split">
          <Photo photo={photos.penicilliumLabelled} ratio="648 / 380" />
          <dl className="glossary one-col">
            {glossary.map((g) => (
              <div key={g.term.en}>
                <dt>{t(g.term)}</dt>
                <dd>{t(g.meaning)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Analogy label={t({ en: 'Why both scales', vi: 'Vì sao cần cả hai mức' })}>
        {t({
          en: 'Many fungi look alike on the dish. The microscope often shows the difference, for example in the shape of the spores.',
          vi: 'Nhiều loài nấm trông giống nhau trên đĩa. Kính hiển vi thường cho thấy sự khác biệt, ví dụ ở hình dạng bào tử.',
        })}
      </Analogy>
    </>
  )
}
