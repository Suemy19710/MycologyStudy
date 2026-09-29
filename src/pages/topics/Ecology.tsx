import { Analogy } from '../../components/ui'
import Photo from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

export default function Ecology() {
  const { t } = useLang()

  const roles = [
    {
      photo: photos.fungusOnLog,
      title: { en: 'Saprotroph', vi: 'Hoại sinh' },
      text: {
        en: 'The recycler. It breaks down dead material like fallen wood and leaves, returning nutrients to the soil.',
        vi: 'Người tái chế. Nấm phân hủy vật chất chết như gỗ mục, lá rụng, trả lại chất dinh dưỡng cho đất.',
      },
      example: { en: 'Most moulds in soil and compost', vi: 'Phần lớn nấm mốc trong đất và phân ủ' },
    },
    {
      photo: photos.cornSmut,
      title: { en: 'Pathogen', vi: 'Tác nhân gây bệnh' },
      text: {
        en: 'The invader. It infects a living host, whether a plant, an animal or a person, and causes disease.',
        vi: 'Kẻ xâm nhập. Nấm lây nhiễm vật chủ còn sống, dù là thực vật, động vật hay con người, và gây bệnh.',
      },
      example: { en: 'Corn smut on maize', vi: 'Nấm than trên cây ngô' },
    },
    {
      photo: photos.mycorrhiza,
      title: { en: 'Symbiont', vi: 'Cộng sinh' },
      text: {
        en: 'The partner. It lives with another organism and both benefit. Mycorrhizal fungi live in plant roots and trade water and minerals for sugar.',
        vi: 'Người bạn đồng hành. Nấm sống cùng sinh vật khác và cả hai cùng có lợi. Nấm rễ sống trong rễ cây, đổi nước và khoáng chất lấy đường.',
      },
      example: { en: 'Fungi in most plant roots', vi: 'Nấm trong rễ của đa số cây' },
    },
  ]

  return (
    <>
      <section className="prose">
        <p>{t({ en: 'Most fungi fit one of three broad lifestyles.', vi: 'Hầu hết các loài nấm thuộc một trong ba lối sống chính.' })}</p>
      </section>
      <div className="grid g3">
        {roles.map((r) => (
          <div className="card photo-card" key={r.title.en}>
            <Photo photo={r.photo} ratio="4 / 3" />
            <h3>{t(r.title)}</h3>
            <p>{t(r.text)}</p>
            <span className="ex">{t(r.example)}</span>
          </div>
        ))}
      </div>

      <Analogy label={t({ en: 'In the database', vi: 'Trong cơ sở dữ liệu' })}>
        {t({
          en: (
            <>
              Ecology also records <strong>where</strong> a strain was found: the country, the material (soil, wood, food, a
              patient) and the host, if there was one.
            </>
          ),
          vi: (
            <>
              Sinh thái học còn ghi lại chủng được tìm thấy <strong>ở đâu</strong>: quốc gia, loại vật liệu (đất, gỗ, thực
              phẩm, bệnh nhân) và vật chủ nếu có.
            </>
          ),
        })}
      </Analogy>
    </>
  )
}
