import { useState } from 'react'
import { Analogy, Note, Toggle } from '../../components/ui'
import { PhotoRow } from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang, type L } from '../../i18n/LanguageContext'

type StrainKey = 'sensitive' | 'resistant'

// Drug concentration in each well, in µg/mL, from most to least drug.
const concentrations = [16, 8, 4, 2, 1, 0.5, 0.25, 0.125]

// Index of the MIC well for each example strain. Wells after it contain too little drug, so the fungus grows.
const strains: Record<StrainKey, { label: L; micIndex: number; message: L }> = {
  sensitive: {
    label: { en: 'Sensitive strain', vi: 'Chủng nhạy cảm' },
    micIndex: 5,
    message: {
      en: 'Low MIC: a small dose is enough. The drug works well.',
      vi: 'MIC thấp: chỉ cần liều nhỏ. Thuốc có hiệu quả tốt.',
    },
  },
  resistant: {
    label: { en: 'Resistant strain', vi: 'Chủng đề kháng' },
    micIndex: 1,
    message: {
      en: 'High MIC: it takes a lot of drug. This strain is resistant.',
      vi: 'MIC cao: cần rất nhiều thuốc. Chủng này đề kháng.',
    },
  },
}

export default function Susceptibility() {
  const { t } = useLang()
  const [strain, setStrain] = useState<StrainKey>('sensitive')
  const { micIndex, message } = strains[strain]

  return (
    <>
      <section className="prose">
        <p>
          {t({
            en: (
              <>
                The standard test grows the fungus in a row of small wells, each with less drug than the one before. The
                lowest concentration that still visibly stops growth is the <strong>MIC</strong>, the Minimum Inhibitory
                Concentration.
              </>
            ),
            vi: (
              <>
                Xét nghiệm chuẩn nuôi nấm trong một dãy giếng nhỏ, giếng sau có ít thuốc hơn giếng trước. Nồng độ thấp nhất
                vẫn ngăn được nấm mọc (nhìn bằng mắt) là <strong>MIC</strong>, Nồng độ Ức chế Tối thiểu.
              </>
            ),
          })}
        </p>
      </section>

      <div className="lab">
        <Toggle
          label={t({ en: 'Choose a strain', vi: 'Chọn một chủng' })}
          value={strain}
          onChange={setStrain}
          options={(Object.keys(strains) as StrainKey[]).map((k) => ({ value: k, label: t(strains[k].label) }))}
        />
        <div>
          <div className="wells">
            {concentrations.map((c, i) => (
              <div key={c} className={`well ${i > micIndex ? 'grow' : ''} ${i === micIndex ? 'mic' : ''}`}>
                <div className="w" />
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div className="axis">
            <span>← {t({ en: 'more drug', vi: 'nhiều thuốc' })}</span>
            <span>{t({ en: 'less drug', vi: 'ít thuốc' })} →</span>
          </div>
        </div>
        <div className="micbar" aria-live="polite">
          <span className="mono">MIC</span>
          <span className="micval">{concentrations[micIndex]} µg/mL</span>
          <span className="fb">{t(message)}</span>
        </div>
      </div>
      <Note>
        {t({
          en: 'Cloudy well = the fungus grew. Clear well = the drug stopped it. Numbers are illustrative.',
          vi: 'Giếng đục = nấm đã mọc. Giếng trong = thuốc đã ngăn nấm. Các con số chỉ mang tính minh họa.',
        })}
      </Note>

      <section>
        <h2 className="sub">{t({ en: 'What it looks like in the lab', vi: 'Trong phòng thí nghiệm trông thế nào' })}</h2>
        <PhotoRow photos={[photos.microtiterPlate, photos.terreusDisc]} ratio="4 / 3" />
      </section>

      <Analogy label={t({ en: 'Think of it as', vi: 'Hãy hình dung' })}>
        {t({
          en: 'Finding the smallest amount of weed killer that still stops a weed. A tough weed needs a bigger dose.',
          vi: 'Giống như tìm lượng thuốc diệt cỏ ít nhất vẫn diệt được cỏ dại. Cỏ càng "lì" thì càng cần liều cao hơn.',
        })}
      </Analogy>
    </>
  )
}
