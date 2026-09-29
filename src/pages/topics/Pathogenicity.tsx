import { Analogy, Card, Grid } from '../../components/ui'
import { PhotoRow } from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

export default function Pathogenicity() {
  const { t } = useLang()
  return (
    <>
      <section className="prose">
        <p>
          {t({
            en: (
              <>
                It is rarely a simple yes or no. It depends on the fungus's toolkit, called <strong>virulence factors</strong>,
                and on the host: a human, an animal or a plant.
              </>
            ),
            vi: (
              <>
                Câu trả lời hiếm khi chỉ là có hoặc không. Điều đó phụ thuộc vào "bộ công cụ" của nấm, gọi là{' '}
                <strong>yếu tố độc lực</strong>, và vào vật chủ: người, động vật hay thực vật.
              </>
            ),
          })}
        </p>
      </section>

      <section>
        <h2 className="sub">{t({ en: 'Meet a real pathogen: Candida albicans', vi: 'Một tác nhân gây bệnh thật: Candida albicans' })}</h2>
        <PhotoRow photos={[photos.candidaColony, photos.candidaMicro]} ratio="4 / 3" />
      </section>

      <h2 className="sub">{t({ en: 'Three common virulence factors', vi: 'Ba yếu tố độc lực phổ biến' })}</h2>
      <Grid cols={3}>
        <Card title={t({ en: 'Surviving body heat', vi: 'Chịu được thân nhiệt' })}>
          {t({
            en: "Being able to grow at 37 °C is the first hurdle to infecting people. Most fungi can't.",
            vi: 'Mọc được ở 37 °C là rào cản đầu tiên để gây bệnh cho người. Phần lớn các loài nấm không làm được điều này.',
          })}
        </Card>
        <Card title={t({ en: 'Breaking tissue', vi: 'Phá hủy mô' })}>
          {t({
            en: "Enzymes that dissolve the host's cells let the fungus push deeper into the body.",
            vi: 'Các enzyme phân hủy tế bào vật chủ giúp nấm xâm nhập sâu hơn vào cơ thể.',
          })}
        </Card>
        <Card title={t({ en: 'Hiding and changing shape', vi: 'Ẩn mình và đổi hình dạng' })}>
          {t({
            en: "Some fungi disguise their surface so the immune system doesn't notice them. Candida can switch from round cells to invasive threads.",
            vi: 'Một số loài nấm ngụy trang bề mặt để hệ miễn dịch không nhận ra. Candida có thể chuyển từ tế bào tròn sang dạng sợi để xâm lấn.',
          })}
        </Card>
      </Grid>

      <Analogy label={t({ en: 'Good to know', vi: 'Nên biết' })}>
        {t({
          en: 'Healthy people breathe in fungal spores every day without trouble. Fungal infections are mostly a risk for people with a weakened immune system.',
          vi: 'Người khỏe mạnh hít phải bào tử nấm hằng ngày mà không sao. Nhiễm nấm chủ yếu là mối nguy với người có hệ miễn dịch suy yếu.',
        })}
      </Analogy>
    </>
  )
}
