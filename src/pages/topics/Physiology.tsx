import { useState } from 'react'
import { Analogy, Note, Toggle } from '../../components/ui'
import Photo from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang, type L } from '../../i18n/LanguageContext'

type FungusKey = 'heat' | 'cool'

const temperatures = [20, 30, 37, 45]

// Growth from 0 (none) to 1 (strong) at each temperature. Simplified example values.
const fungi: Record<FungusKey, { label: L; growth: number[]; message: L }> = {
  heat: {
    label: { en: 'A heat-loving mould', vi: 'Nấm mốc ưa nóng' },
    growth: [0.45, 0.8, 0.9, 0.7],
    message: {
      en: 'Grows well at 37 °C and even 45 °C. Surviving body heat is one reason a fungus can infect people.',
      vi: 'Phát triển tốt ở 37 °C và cả 45 °C. Chịu được thân nhiệt là một lý do khiến nấm có thể gây bệnh cho người.',
    },
  },
  cool: {
    label: { en: 'A cool-soil mould', vi: 'Nấm mốc đất ưa mát' },
    growth: [0.75, 0.55, 0, 0],
    message: {
      en: 'Grows best in the cold and stops completely at 37 °C. This one is very unlikely to infect people.',
      vi: 'Phát triển tốt nhất khi mát và ngừng hẳn ở 37 °C. Loài này rất khó gây bệnh cho người.',
    },
  },
}

function describe(g: number): L {
  if (g > 0.6) return { en: 'strong growth', vi: 'mọc mạnh' }
  if (g > 0) return { en: 'some growth', vi: 'mọc yếu' }
  return { en: 'no growth', vi: 'không mọc' }
}

export default function Physiology() {
  const { t } = useLang()
  const [fungus, setFungus] = useState<FungusKey>('heat')
  const current = fungi[fungus]

  return (
    <>
      <div className="split">
        <section className="prose">
          <p>
            {t({
              en: 'Does it grow at human body temperature (37 °C), or only in cool soil? Does it tolerate acidic conditions? Can it feed on a particular sugar?',
              vi: 'Nấm có mọc được ở thân nhiệt người (37 °C) hay chỉ trong đất mát? Có chịu được môi trường axit không? Có dùng được một loại đường nhất định làm thức ăn không?',
            })}
          </p>
          <p>
            {t({
              en: 'Labs test this by growing the same strain on several identical plates, changing exactly one condition each time, and recording which conditions it tolerates.',
              vi: 'Phòng thí nghiệm kiểm tra bằng cách nuôi cùng một chủng trên nhiều đĩa giống hệt nhau, mỗi lần chỉ thay đổi đúng một điều kiện, rồi ghi lại những điều kiện nấm chịu được.',
            })}
          </p>
        </section>
        <Photo photo={photos.penicilliaPlates} ratio="4 / 3" />
      </div>

      <div className="lab">
        <Toggle
          label={t({ en: 'Choose a fungus', vi: 'Chọn một loài nấm' })}
          value={fungus}
          onChange={setFungus}
          options={(Object.keys(fungi) as FungusKey[]).map((k) => ({ value: k, label: t(fungi[k].label) }))}
        />
        <div className="plates">
          {temperatures.map((temp, i) => {
            const g = current.growth[i]
            const r = g * 40
            return (
              <div className={`plate ${temp >= 37 ? 'hot' : ''}`} key={temp}>
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="46" fill="var(--surface-2)" stroke="var(--line)" strokeWidth="2" />
                  {g > 0 ? (
                    <>
                      <circle cx="50" cy="50" r={r} fill="var(--growth)" style={{ transition: 'r .4s' }} />
                      <circle cx="50" cy="50" r={r * 0.45} fill="var(--accent)" style={{ transition: 'r .4s' }} />
                    </>
                  ) : (
                    <circle cx="50" cy="50" r="3" fill="var(--line)" />
                  )}
                </svg>
                <span className="t">{temp} °C</span>
                <span className="r">{t(describe(g))}</span>
              </div>
            )
          })}
        </div>
        <p className="fb" aria-live="polite">
          {t(current.message)}
        </p>
      </div>
      <Note>
        {t({
          en: 'Simplified drawing. Switch the fungus to see how the results change.',
          vi: 'Hình minh họa đơn giản. Đổi loài nấm để xem kết quả thay đổi thế nào.',
        })}
      </Note>

      <Analogy label={t({ en: 'Think of it as', vi: 'Hãy hình dung' })}>
        {t({
          en: 'Morphology is a photo of the fungus. Physiology is a list of what it can survive.',
          vi: 'Hình thái là bức ảnh chụp nấm. Sinh lý là danh sách những điều kiện nấm có thể sống sót.',
        })}
      </Analogy>
    </>
  )
}
