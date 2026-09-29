import { Analogy, Note } from '../../components/ui'
import Photo from '../../components/Photo'
import { photos } from '../../data/photos'
import { useLang } from '../../i18n/LanguageContext'

// Short made-up example sequences with one difference.
const sample = 'CCGAGTGAGGGCCCTCTGGGTCCAACCTCCCACCCGTGTCTATCGTACCTTGTTGCTTCGGCG'
const library = 'CCGAGTGAGGGCCCTCTGGGTCCAACCTCCCACCCGTGTCTATTGTACCTTGTTGCTTCGGCG'

const regions = [
  { name: '18S', size: 2.2, spacer: false },
  { name: 'ITS1', size: 1.4, spacer: true },
  { name: '5.8S', size: 0.8, spacer: false },
  { name: 'ITS2', size: 1.4, spacer: true },
  { name: '28S', size: 2.2, spacer: false },
]

export default function DnaBarcode() {
  const { t } = useLang()
  const letters = sample.split('')
  const matches = letters.filter((ch, i) => ch === library[i]).length
  const percent = ((matches / sample.length) * 100).toFixed(1)

  // Row labels padded to the same width so the letters line up.
  const sampleLabel = t({ en: 'sample  ', vi: 'mẫu     ' })
  const libraryLabel = t({ en: 'library ', vi: 'thư viện ' })
  const width = Math.max(sampleLabel.length, libraryLabel.length)

  return (
    <>
      <section className="prose">
        <p>
          {t({
            en: (
              <>
                Looks can mislead, and some fungi take weeks to show their features. Reading DNA is faster and more exact.
                For fungi, the standard barcode region is called <strong>ITS</strong> (Internal Transcribed Spacer).
              </>
            ),
            vi: (
              <>
                Hình dạng bên ngoài có thể gây nhầm lẫn, và một số loài nấm cần nhiều tuần mới lộ rõ đặc điểm. Đọc DNA
                nhanh và chính xác hơn. Với nấm, vùng mã vạch chuẩn được gọi là <strong>ITS</strong> (Internal Transcribed
                Spacer, vùng đệm phiên mã nội).
              </>
            ),
          })}
        </p>
      </section>

      <section>
        <h2 className="sub">{t({ en: 'From fungus to DNA letters', vi: 'Từ mẫu nấm đến các chữ cái DNA' })}</h2>
        <div className="split dna-photos">
          <Photo photo={photos.gel} ratio="4 / 3" />
          <Photo photo={photos.sangerRead} />
        </div>
      </section>

      <div className="lab">
        <div className="its">
          <div
            className="its-bar"
            role="img"
            aria-label={t({
              en: 'Diagram of the ribosomal DNA region with ITS1 and ITS2 highlighted',
              vi: 'Sơ đồ vùng DNA ribosome, làm nổi bật ITS1 và ITS2',
            })}
          >
            {regions.map((r) => (
              <div key={r.name} className={r.spacer ? 'spacer' : 'gene'} style={{ flex: r.size }}>
                {r.name}
              </div>
            ))}
          </div>
          <div className="its-brace">
            <span style={{ flex: 2.2 }} />
            <span className="brace" style={{ flex: 3.6 }}>
              {t({ en: 'the ITS barcode · roughly 500–700 letters', vi: 'mã vạch ITS · khoảng 500–700 chữ cái' })}
            </span>
            <span style={{ flex: 2.2 }} />
          </div>
        </div>

        <div>
          <div className="mono muted-label">
            {t({ en: 'your sample vs. best match in the library', vi: 'mẫu của bạn so với kết quả khớp nhất trong thư viện' })}
          </div>
          <pre className="seq">
            <span className="seq-name">{sampleLabel.padEnd(width)}</span>
            {letters.map((ch, i) => (
              <span key={i} className={ch === library[i] ? '' : 'x'}>
                {ch}
              </span>
            ))}
            {'\n'}
            <span className="seq-name">{' '.repeat(width)}</span>
            {letters.map((ch, i) => (
              <span key={i} className={ch === library[i] ? '' : 'x'}>
                {ch === library[i] ? '|' : '·'}
              </span>
            ))}
            {'\n'}
            <span className="seq-name">{libraryLabel.padEnd(width)}</span>
            {library.split('').map((ch, i) => (
              <span key={i} className={ch === sample[i] ? 'm' : 'x'}>
                {ch}
              </span>
            ))}
          </pre>
        </div>

        <div className="match">
          <span className="score">{percent}%</span>
          <span className="fb">
            {t({
              en: (
                <>
                  match with the <i>Aspergillus fumigatus</i> reference sequence
                </>
              ),
              vi: (
                <>
                  trùng khớp với trình tự tham chiếu của <i>Aspergillus fumigatus</i>
                </>
              ),
            })}
          </span>
        </div>
      </div>
      <Note>{t({ en: 'Short example sequence for illustration.', vi: 'Trình tự ngắn chỉ dùng để minh họa.' })}</Note>

      <Analogy label={t({ en: 'Think of it as', vi: 'Hãy hình dung' })}>
        {t({
          en: "Scanning a barcode at the supermarket. The scanner doesn't look at the product; it reads the code and looks it up.",
          vi: 'Giống như quét mã vạch ở siêu thị. Máy quét không nhìn vào sản phẩm; nó đọc mã rồi tra cứu.',
        })}
      </Analogy>
    </>
  )
}
