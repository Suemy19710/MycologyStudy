import { Link } from 'react-router-dom'
import { Analogy, Note } from '../../components/ui'
import { PhotoRow } from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

const strains = [
  { id: 'A-01', origin: { en: 'From compost, Netherlands', vi: 'Từ phân ủ, Hà Lan' }, toxin: false },
  { id: 'A-02', origin: { en: 'From a hospital patient', vi: 'Từ một bệnh nhân' }, toxin: true },
  { id: 'A-03', origin: { en: 'From indoor air', vi: 'Từ không khí trong nhà' }, toxin: false },
]

export default function SpeciesStrain() {
  const { t } = useLang()
  return (
    <>
      <section className="prose">
        <p>
          {t({
            en: (
              <>
                <em>Aspergillus fumigatus</em> is a species name. A strain is one specimen of that species, physically
                isolated from one place, kept alive in a collection and given its own permanent ID number.
              </>
            ),
            vi: (
              <>
                <em>Aspergillus fumigatus</em> là tên một loài. Chủng là một mẫu cụ thể của loài đó, được phân lập từ một
                nơi nhất định, lưu giữ sống trong bộ sưu tập và được cấp mã số cố định riêng.
              </>
            ),
          })}
        </p>
        <p>
          {t({
            en: "Two strains of the same species can still behave differently. One might produce a toxin and the other might not. That's why a database has to track both levels, not just the species name.",
            vi: 'Hai chủng của cùng một loài vẫn có thể khác nhau. Chủng này có thể sinh độc tố, chủng kia thì không. Vì vậy cơ sở dữ liệu phải theo dõi cả hai cấp, không chỉ tên loài.',
          })}
        </p>
      </section>

      <div className="tree">
        <div className="sp">
          {t({ en: 'Species', vi: 'Loài' })} · <i>Aspergillus fumigatus</i>
        </div>
        <svg className="branches" viewBox="0 0 300 36" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M150 0 V14 M50 14 H250 M50 14 V36 M150 14 V36 M250 14 V36"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="strains">
          {strains.map((s) => (
            <div className="strain" key={s.id}>
              <span className="id">
                {t({ en: 'Strain', vi: 'Chủng' })} {s.id}
              </span>
              <small>{t(s.origin)}</small>
              <span className={`pill ${s.toxin ? 'yes' : 'no'}`}>
                {s.toxin ? t({ en: 'makes toxin', vi: 'sinh độc tố' }) : t({ en: 'no toxin', vi: 'không độc tố' })}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Note>
        {t({
          en: 'Strain names above are made-up examples. Real collections use IDs such as CBS numbers at the Westerdijk Institute.',
          vi: 'Tên chủng ở trên chỉ là ví dụ. Các bộ sưu tập thật dùng mã như số CBS tại Viện Westerdijk.',
        })}
      </Note>

      <section>
        <h2 className="sub">{t({ en: 'Same species, two real cultures', vi: 'Cùng một loài, hai mẫu nuôi cấy thật' })}</h2>
        <p className="prose">
          {t({
            en: 'Both plates below are Aspergillus fumigatus, photographed in different labs. The colours and texture already look different. Part of that comes from the strain, and part from how and where it was grown.',
            vi: 'Cả hai đĩa dưới đây đều là Aspergillus fumigatus, được chụp ở hai phòng thí nghiệm khác nhau. Màu sắc và bề mặt đã trông khác nhau: một phần do chủng, một phần do cách và nơi nuôi cấy.',
          })}
        </p>
        <PhotoRow photos={[photos.fumigatusPlateA, photos.fumigatusPlateB]} ratio="4 / 3" />
      </section>

      <Analogy label={t({ en: 'Think of it as', vi: 'Hãy hình dung' })}>
        {t({
          en: 'Species is like "Labrador". A strain is one specific dog with its own name and chip number. Two Labradors can behave very differently, and so can two strains.',
          vi: 'Loài giống như giống chó "Labrador". Chủng là một chú chó cụ thể có tên và số chip riêng. Hai chú Labrador có thể có tính cách rất khác nhau, hai chủng nấm cũng vậy.',
        })}
      </Analogy>

      <p className="prose">
        <span>
          {t({
            en: 'Species and strain are only two levels of a bigger naming system. See all of them, plus terms like taxon and isolate, on ',
            vi: 'Loài và chủng chỉ là hai cấp trong một hệ thống đặt tên lớn hơn. Xem tất cả các cấp, cùng những thuật ngữ như đơn vị phân loại và mẫu phân lập, tại trang ',
          })}
          <Link to="/names">{t({ en: 'Names & ranks', vi: 'Tên & bậc phân loại' })}</Link>.
        </span>
      </p>
    </>
  )
}
