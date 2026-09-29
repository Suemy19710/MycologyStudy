import { Analogy, Card } from '../../components/ui'
import Photo from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

export default function Mycotoxins() {
  const { t } = useLang()
  return (
    <>
      <section className="prose">
        <p>
          {t({
            en: (
              <>
                These chemicals are not part of the fungus's basic survival. They are "extra" compounds, called{' '}
                <strong>secondary metabolites</strong>. They are often made while the fungus grows on food or animal feed,
                and some can be harmful even in tiny amounts.
              </>
            ),
            vi: (
              <>
                Những chất này không cần thiết cho sự sống cơ bản của nấm. Chúng là các hợp chất "thêm", gọi là{' '}
                <strong>chất chuyển hóa thứ cấp</strong>. Chúng thường được tạo ra khi nấm mọc trên thực phẩm hoặc thức ăn
                chăn nuôi, và một số có thể gây hại dù chỉ với lượng rất nhỏ.
              </>
            ),
          })}
        </p>
      </section>

      <div className="split">
        <Photo photo={photos.aspergillusFlavus} ratio="1 / 1" />
        <div className="stack">
          <Card
            title="Aflatoxin"
            example={t({ en: 'Found on: peanuts, maize, tree nuts', vi: 'Thường gặp trên: lạc (đậu phộng), ngô, các loại hạt' })}
          >
            {t({
              en: (
                <>
                  The best-known mycotoxin. Made by some <i>Aspergillus</i> species, such as <i>A. flavus</i>, growing on
                  stored grain and nuts, especially in warm, damp storage. Food safety labs test for it.
                </>
              ),
              vi: (
                <>
                  Độc tố nấm nổi tiếng nhất. Do một số loài <i>Aspergillus</i> như <i>A. flavus</i> tạo ra khi mọc trên
                  ngũ cốc và các loại hạt được bảo quản, đặc biệt ở nơi nóng ẩm. Các phòng kiểm nghiệm an toàn thực phẩm
                  thường xét nghiệm chất này.
                </>
              ),
            })}
          </Card>
          <Card
            title={t({ en: 'Not only bad news', vi: 'Không chỉ có mặt xấu' })}
            example={t({ en: 'Found in: antibiotics, cholesterol drugs', vi: 'Ứng dụng: kháng sinh, thuốc hạ cholesterol' })}
          >
            {t({
              en: (
                <>
                  The same "extra chemistry" also gave us medicines. Penicillin, the first antibiotic, comes from a{' '}
                  <i>Penicillium</i> mould.
                </>
              ),
              vi: (
                <>
                  Chính khả năng "hóa học thêm" này cũng mang lại nhiều loại thuốc. Penicillin, kháng sinh đầu tiên, có
                  nguồn gốc từ nấm mốc <i>Penicillium</i>.
                </>
              ),
            })}
          </Card>
        </div>
      </div>

      <Analogy label={t({ en: 'Remember', vi: 'Ghi nhớ' })}>
        {t({
          en: "Not every strain of a toxin-making species actually produces the toxin. That's another reason databases record strains, not just species.",
          vi: 'Không phải chủng nào của một loài sinh độc tố cũng thực sự tạo ra độc tố. Đó là thêm một lý do cơ sở dữ liệu ghi nhận từng chủng, không chỉ loài.',
        })}
      </Analogy>
    </>
  )
}
