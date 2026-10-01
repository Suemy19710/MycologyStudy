import { Analogy } from '../../components/ui'
import EcosystemScene from '../../components/EcosystemScene'
import { useLang } from '../../i18n/LanguageContext'

export default function Ecology() {
  const { t } = useLang()

  return (
    <>
      <section className="prose">
        <p>
          {t({
            en: 'Most fungi fit one of three broad lifestyles. Pick one below, or click a part of the landscape, to see what the fungus takes and what it gives back.',
            vi: 'Hầu hết các loài nấm thuộc một trong ba lối sống chính. Chọn một lối sống bên dưới, hoặc bấm vào một phần của phong cảnh, để xem nấm nhận gì và cho lại gì.',
          })}
        </p>
      </section>

      <EcosystemScene />

      <Analogy label={t({ en: 'In the database', vi: 'Trong cơ sở dữ liệu' })}>
        {t({
          en: (
            <>
              Ecology also records <strong>where</strong> a strain was found: the country, the material (soil, wood, food, a
              patient) and the host, if there was one. The same species can live more than one way: many fungi are
              recyclers in soil but can also infect a weak host.
            </>
          ),
          vi: (
            <>
              Sinh thái học còn ghi lại chủng được tìm thấy <strong>ở đâu</strong>: quốc gia, loại vật liệu (đất, gỗ, thực
              phẩm, bệnh nhân) và vật chủ nếu có. Cùng một loài có thể sống theo nhiều cách: nhiều loài nấm là "người tái
              chế" trong đất nhưng cũng có thể lây nhiễm vật chủ yếu.
            </>
          ),
        })}
      </Analogy>
    </>
  )
}
