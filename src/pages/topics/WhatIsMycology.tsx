import { Analogy } from '../../components/ui'
import Photo from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

export default function WhatIsMycology() {
  const { t } = useLang()

  const forms = [
    {
      photo: photos.mouldyBread,
      title: { en: 'Moulds', vi: 'Nấm mốc' },
      text: {
        en: 'Made of long, branching threads. Many cells joined together. The fuzzy patch on old bread is a mould.',
        vi: 'Gồm những sợi dài, phân nhánh, nhiều tế bào nối liền nhau. Lớp lông tơ trên bánh mì cũ chính là nấm mốc.',
      },
      example: (
        <>
          {t({ en: 'e.g.', vi: 'VD:' })} <i>Aspergillus</i>, <i>Penicillium</i>
        </>
      ),
    },
    {
      photo: photos.yeastCells,
      title: { en: 'Yeasts', vi: 'Nấm men' },
      text: {
        en: 'A single round cell that multiplies by budding off small copies of itself. Yeast is what makes bread rise.',
        vi: 'Chỉ một tế bào tròn, sinh sản bằng cách nảy chồi ra các bản sao nhỏ. Nấm men là thứ làm bánh mì nở.',
      },
      example: (
        <>
          {t({ en: 'e.g.', vi: 'VD:' })} <i>Saccharomyces</i>, <i>Candida</i>
        </>
      ),
    },
    {
      photo: photos.buttonMushroom,
      title: { en: 'Mushrooms', vi: 'Nấm lớn (nấm quả thể)' },
      text: {
        en: 'The part you see above ground is only the "fruit". The real fungus is a network of threads hidden in soil or wood.',
        vi: 'Phần bạn thấy trên mặt đất chỉ là "quả". Cơ thể thật của nấm là mạng lưới sợi ẩn trong đất hoặc gỗ.',
      },
      example: t({ en: 'e.g. button mushroom, chanterelle', vi: 'VD: nấm mỡ, nấm rơm' }),
    },
  ]

  return (
    <>
      <section>
        <h2 className="sub">{t({ en: 'Three forms of fungi', vi: 'Ba dạng nấm' })}</h2>
        <div className="grid g3">
          {forms.map((f) => (
            <div className="card photo-card" key={f.title.en}>
              <Photo photo={f.photo} ratio="4 / 3" />
              <h3>{t(f.title)}</h3>
              <p>{t(f.text)}</p>
              <span className="ex">{f.example}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="prose">
        <h2 className="sub">{t({ en: 'Fungi are not plants', vi: 'Nấm không phải là thực vật' })}</h2>
        <p>
          {t({
            en: "Fungi can't make their own food from sunlight. They feed by releasing enzymes into their surroundings and absorbing what gets broken down. In fact, fungi are more closely related to animals than to plants.",
            vi: 'Nấm không thể tự tạo thức ăn từ ánh sáng mặt trời. Chúng tiết enzyme ra môi trường xung quanh rồi hấp thụ những chất đã bị phân giải. Thực tế, nấm có quan hệ họ hàng gần với động vật hơn là với thực vật.',
          })}
        </p>
        <p>
          {t({
            en: 'Most fungi need oxygen, and their spores are so small that they float everywhere in the air. That is why mould turns up on food left out for a few days.',
            vi: 'Hầu hết nấm cần oxy, và bào tử của chúng nhỏ đến mức bay lơ lửng khắp nơi trong không khí. Vì vậy thức ăn để ngoài vài ngày sẽ bị mốc.',
          })}
        </p>
      </section>

      <Analogy label={t({ en: 'Why it matters', vi: 'Vì sao quan trọng' })}>
        {t({
          en: (
            <>
              To keep track of thousands of fungi, a database like MycoBase describes each one in the same eight ways:{' '}
              <strong>identity, looks, behaviour, lifestyle, chemistry, disease, drug response</strong> and{' '}
              <strong>DNA</strong>. The next pages walk through them one by one.
            </>
          ),
          vi: (
            <>
              Để quản lý hàng nghìn loài nấm, một cơ sở dữ liệu như MycoBase mô tả mỗi loài theo cùng tám cách:{' '}
              <strong>định danh, hình thái, sinh lý, sinh thái, hóa học, khả năng gây bệnh, phản ứng với thuốc</strong> và{' '}
              <strong>DNA</strong>. Các trang tiếp theo sẽ lần lượt giới thiệu từng mục.
            </>
          ),
        })}
      </Analogy>
    </>
  )
}
