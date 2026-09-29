import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Analogy, Toggle } from '../components/ui'
import Photo from '../components/Photo'
import { examples, ranks, termGroups, terms, type TermGroup } from '../data/taxonomy'
import { useLang } from '../i18n/LanguageContext'

// Shows a name with its standard rank ending highlighted, e.g. Eurotia|les.
function NameWithEnding({ name, ending, italic }: { name: string; ending?: string; italic: boolean }) {
  const suffix = ending?.replace('-', '')
  const content =
    suffix && name.endsWith(suffix) ? (
      <>
        {name.slice(0, -suffix.length)}
        <mark>{suffix}</mark>
      </>
    ) : (
      name
    )
  return italic ? <i>{content}</i> : <>{content}</>
}

export default function NamesRanks() {
  const { t, lang } = useLang()
  const [exampleKey, setExampleKey] = useState(examples[0].key)
  const [selected, setSelected] = useState(6) // start on "Species"
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<TermGroup | 'all'>('all')

  useEffect(() => {
    document.title = lang === 'vi' ? 'Tên & bậc phân loại · Làm quen với Nấm' : 'Names & ranks · Meet the Fungi'
  }, [lang])

  const example = examples.find((e) => e.key === exampleKey) ?? examples[0]
  const rank = ranks[selected]
  const isStrain = selected === ranks.length - 1
  const isItalic = (i: number) => i === 5 || i === 6 // genus and species are written in italics

  // Search both languages, so "chủng" and "strain" both work.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return terms.filter((term) => {
      if (group !== 'all' && term.group !== group) return false
      if (!q) return true
      const text = [term.term, term.meaning, term.example]
        .filter(Boolean)
        .flatMap((x) => [x!.en, x!.vi])
        .join(' ')
        .toLowerCase()
      return text.includes(q)
    })
  }, [query, group])

  return (
    <article className="topic">
      <header className="sec-head">
        <span className="field">{t({ en: 'taxonomy', vi: 'phân loại học' })}</span>
        <h1>{t({ en: 'Names & ranks', vi: 'Tên & bậc phân loại' })}</h1>
        <p>
          {t({
            en: "Every fungus sits inside a series of nested groups, from the whole kingdom down to one sample in a freezer. Here is how that works, plus a word list for the terms you'll meet.",
            vi: 'Mỗi loài nấm nằm trong một chuỗi các nhóm lồng vào nhau, từ cả giới Nấm cho đến một mẫu trong tủ đông. Trang này giải thích cách hệ thống đó hoạt động, kèm bảng các thuật ngữ bạn sẽ gặp.',
          })}
        </p>
      </header>

      <div className="topic-body">
        <section>
          <h2 className="sub">{t({ en: 'From kingdom to strain', vi: 'Từ giới đến chủng' })}</h2>
          <p className="prose">
            {t({
              en: 'Each step down is a smaller group of closer relatives. Pick an example fungus, then tap a level to learn what it means.',
              vi: 'Mỗi bậc xuống là một nhóm nhỏ hơn gồm các họ hàng gần hơn. Chọn một loài nấm ví dụ, rồi bấm vào từng bậc để xem ý nghĩa.',
            })}
          </p>

          <div className="lab">
            <Toggle
              label={t({ en: 'Choose an example fungus', vi: 'Chọn loài nấm ví dụ' })}
              value={exampleKey}
              onChange={setExampleKey}
              options={examples.map((e) => ({ value: e.key, label: t(e.label) }))}
            />

            <div className="ladder-wrap">
              <ol className="ladder">
                {ranks.map((r, i) => (
                  <li key={r.rank.en}>
                    <button
                      type="button"
                      className={`rung ${i === selected ? 'on' : ''} ${i === ranks.length - 1 ? 'strain-rung' : ''}`}
                      style={{ width: `${100 - i * 9}%` }}
                      aria-pressed={i === selected}
                      onClick={() => setSelected(i)}
                    >
                      <span className="rung-rank mono">{t(r.rank)}</span>
                      <span className="rung-name">
                        <NameWithEnding name={example.names[i]} ending={r.ending} italic={isItalic(i)} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="rank-detail" aria-live="polite">
                <Photo photo={example.photo} ratio="16 / 10" />
                <span className="mono muted-label">{t(rank.rank)}</span>
                <h3>
                  <NameWithEnding name={example.names[selected]} ending={rank.ending} italic={isItalic(selected)} />
                </h3>
                <p>{t(rank.what)}</p>
                {rank.ending && (
                  <p className="ending-tip">
                    {t({ en: 'Fungal names at this level end in', vi: 'Tên nấm ở bậc này kết thúc bằng' })}{' '}
                    <mark>{rank.ending}</mark>
                  </p>
                )}
                {isStrain && <p className="ending-tip">{t(example.strainNote)}</p>}
              </div>
            </div>
          </div>
        </section>

        <Analogy label={t({ en: 'Think of it as', vi: 'Hãy hình dung' })}>
          {t({
            en: 'A postal address read backwards: country, city, street, house, and finally one person living there. The species is the house. The strain is the person.',
            vi: 'Giống một địa chỉ đọc ngược: quốc gia, thành phố, đường, số nhà, và cuối cùng là một người sống ở đó. Loài là ngôi nhà. Chủng là người trong nhà.',
          })}
        </Analogy>

        <section>
          <h2 className="sub">{t({ en: 'How to write a species name', vi: 'Cách viết tên loài' })}</h2>
          <div
            className="name-anatomy"
            role="img"
            aria-label={t({
              en: 'Aspergillus fumigatus: genus Aspergillus, specific epithet fumigatus',
              vi: 'Aspergillus fumigatus: chi Aspergillus, tính ngữ loài fumigatus',
            })}
          >
            <div>
              <span className="big-name">
                <i>Aspergillus</i>
              </span>
              <span className="mono">{t({ en: 'genus · capital letter', vi: 'chi · viết hoa chữ đầu' })}</span>
            </div>
            <div>
              <span className="big-name">
                <i>fumigatus</i>
              </span>
              <span className="mono">{t({ en: 'specific epithet · lowercase', vi: 'tính ngữ loài · viết thường' })}</span>
            </div>
          </div>
          <ul className="rules">
            <li>
              {t({
                en: (
                  <>
                    Always in <i>italics</i> (or underlined when handwritten).
                  </>
                ),
                vi: (
                  <>
                    Luôn viết <i>nghiêng</i> (hoặc gạch chân khi viết tay).
                  </>
                ),
              })}
            </li>
            <li>
              {t({
                en: (
                  <>
                    After the first mention, the genus can be shortened: <i>A. fumigatus</i>.
                  </>
                ),
                vi: (
                  <>
                    Sau lần nhắc đầu tiên, tên chi có thể viết tắt: <i>A. fumigatus</i>.
                  </>
                ),
              })}
            </li>
            <li>
              {t({
                en: 'The second word alone means nothing. Never write just "fumigatus".',
                vi: 'Riêng từ thứ hai không có nghĩa. Không bao giờ chỉ viết "fumigatus".',
              })}
            </li>
          </ul>
        </section>

        <section id="glossary">
          <h2 className="sub">{t({ en: 'Word list', vi: 'Bảng thuật ngữ' })}</h2>
          <div className="glossary-tools">
            <label className="search">
              <span className="sr-only">{t({ en: 'Search terms', vi: 'Tìm thuật ngữ' })}</span>
              <input
                id="term-search"
                type="search"
                placeholder={t({ en: 'Search a term, e.g. taxon', vi: 'Tìm thuật ngữ, VD: chủng' })}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <Toggle
              label={t({ en: 'Filter terms by group', vi: 'Lọc thuật ngữ theo nhóm' })}
              value={group}
              onChange={setGroup}
              options={termGroups.map((g) => ({ value: g.value, label: t(g.label) }))}
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid g2">
              {filtered.map((term) => (
                <div className="card term" key={term.term.en}>
                  <span className="mono tag">{t(termGroups.find((g) => g.value === term.group)!.label)}</span>
                  <h3>{t(term.term)}</h3>
                  <p>{t(term.meaning)}</p>
                  {term.example && (
                    <span className="ex">
                      {t({ en: 'e.g.', vi: 'VD:' })} {t(term.example)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">
              {t({
                en: `No terms match "${query}". Try a shorter word, or choose "All".`,
                vi: `Không có thuật ngữ nào khớp với "${query}". Hãy thử từ ngắn hơn hoặc chọn "Tất cả".`,
              })}
            </p>
          )}
          <p className="note-inline">
            {t({
              en: `${filtered.length} of ${terms.length} terms shown`,
              vi: `Đang hiển thị ${filtered.length} / ${terms.length} thuật ngữ`,
            })}
          </p>
        </section>

        <p className="prose">
          <span>
            {t({ en: 'Want the basics first? Read ', vi: 'Muốn xem phần cơ bản trước? Đọc trang ' })}
            <Link to="/learn/species-and-strain">{t({ en: 'Species and strain', vi: 'Loài và chủng' })}</Link>.
          </span>
        </p>
      </div>
    </article>
  )
}
