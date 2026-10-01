import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Cite from '../components/Cite'
import { Analogy, Toggle } from '../components/ui'
import Photo from '../components/Photo'
import { examples, ranks, termGroups, terms, tierLabels, type RankKey, type TermGroup } from '../data/taxonomy'
import { useLang } from '../i18n/LanguageContext'

// Rank words inside a name stay upright, e.g. Fusarium oxysporum f. sp. lycopersici.
const CONNECTOR = / (subsp\.|var\.|f\. sp\.|f\.|sect\.) /

// Shows a scientific name the ICNafp way: italic at every rank, connectors upright,
// and the standard rank ending highlighted, e.g. Eurotia|les.
function SciName({ name, ending, italic }: { name: string; ending?: string; italic: boolean }) {
  if (!italic) return <>{name}</>
  const parts = name.split(CONNECTOR) // odd indexes are connectors
  const suffix = ending?.replace('-', '')
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) return <span key={i}> {part} </span>
        const last = i === parts.length - 1
        const content =
          last && suffix && part.endsWith(suffix) ? (
            <>
              {part.slice(0, -suffix.length)}
              <mark>{suffix}</mark>
            </>
          ) : (
            part
          )
        return <i key={i}>{content}</i>
      })}
    </>
  )
}

type RankView = 'main' | 'all'

export default function NamesRanks() {
  const { t, lang } = useLang()
  const [exampleKey, setExampleKey] = useState(examples[0].key)
  const [selected, setSelected] = useState<RankKey>('species')
  const [view, setView] = useState<RankView>('main')
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<TermGroup | 'all'>('all')

  useEffect(() => {
    document.title = lang === 'vi' ? 'Tên & bậc phân loại · Làm quen với Nấm' : 'Names & ranks · Meet the Fungi'
  }, [lang])

  const example = examples.find((e) => e.key === exampleKey) ?? examples[0]
  // Ranks this fungus uses; the main view keeps only the principal ranks plus strain.
  const visible = ranks.filter(
    (r) => example.names[r.key] && (view === 'all' || r.tier === 'principal' || r.tier === 'informal'),
  )
  const current = visible.some((r) => r.key === selected) ? selected : 'species'
  const rank = ranks.find((r) => r.key === current)!
  const isStrain = rank.tier === 'informal'
  const italic = (key: RankKey) => key !== 'strain' // ICNafp: scientific names are italic at every rank

  // Main ranks narrow step by step; the optional ranks sit just inside the rank above them.
  const widths = visible.map((r, i) => {
    const principalAbove = visible.slice(0, i + 1).filter((v) => v.tier === 'principal').length
    const width = 100 - Math.max(0, principalAbove - 1) * 6
    if (r.tier === 'principal' || r.tier === 'infraspecific') return width // long names below species need the room
    return width - 5
  })

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
            <div className="lab-controls">
              <Toggle
                label={t({ en: 'Choose an example fungus', vi: 'Chọn loài nấm ví dụ' })}
                value={exampleKey}
                onChange={setExampleKey}
                options={examples.map((e) => ({ value: e.key, label: t(e.label) }))}
              />
              <Toggle
                label={t({ en: 'Which ranks to show', vi: 'Hiển thị bậc nào' })}
                value={view}
                onChange={setView}
                options={[
                  { value: 'main', label: t({ en: 'Main ranks', vi: 'Bậc chính' }) },
                  { value: 'all', label: t({ en: 'All ranks', vi: 'Tất cả các bậc' }) },
                ]}
              />
            </div>

            <div className="ladder-wrap">
              <ol className="ladder">
                {visible.map((r, i) => (
                  <li key={r.key}>
                    <button
                      type="button"
                      className={`rung tier-${r.tier} ${r.key === current ? 'on' : ''} ${r.tier === 'informal' ? 'strain-rung' : ''}`}
                      style={{ width: `${widths[i]}%` }}
                      aria-pressed={r.key === current}
                      aria-label={`${t(r.rank)} (${t(tierLabels[r.tier])}): ${example.names[r.key]}`}
                      onClick={() => setSelected(r.key)}
                    >
                      <span className="rung-rank mono">{t(r.rank)}</span>
                      <span className="rung-name">
                        <SciName name={example.names[r.key]!} ending={r.ending} italic={italic(r.key)} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="rank-detail" aria-live="polite">
                <Photo photo={example.photo} ratio="16 / 10" />
                <span className="mono muted-label">
                  {t(rank.rank)} · {t(tierLabels[rank.tier])}
                </span>
                <h3>
                  <SciName name={example.names[current]!} ending={rank.ending} italic={italic(current)} />
                  {current === 'species' && <span className="authority"> {example.authority}</span>}
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

        <p className="prose above-kingdom">
          <span>
            {t({
              en: (
                <>
                  <strong>Above the kingdom.</strong> Fungi belong to the Eukarya, the living things whose cells have a
                  nucleus. Within it they share a branch (Opisthokonta) with animals, so fungi are closer relatives of
                  animals than of plants. These are groups on the family tree, not ranks in the ladder.
                </>
              ),
              vi: (
                <>
                  <strong>Phía trên giới.</strong> Nấm thuộc nhóm Sinh vật nhân thực (Eukarya), gồm các sinh vật có tế bào
                  mang nhân. Trong đó, nấm cùng nhánh Opisthokonta với động vật, nên nấm có họ hàng gần với động vật hơn
                  là thực vật. Đây là các nhánh trên cây phát sinh, không phải các bậc trong thang phân loại.
                </>
              ),
            })}{' '}
            <Cite ids={['baldauf1993']} />
          </span>
        </p>

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
                en: (
                  <>
                    Under the naming Code that covers fungi (ICNafp), names at <strong>every</strong> rank are italic:{' '}
                    <i>Eurotiales</i>, <i>Ascomycota</i>. Rank words such as sect., var. and f. sp. stay upright:{' '}
                    <i>Fusarium oxysporum</i> f. sp. <i>lycopersici</i>.
                  </>
                ),
                vi: (
                  <>
                    Theo Bộ luật danh pháp quốc tế cho tảo, nấm và thực vật (ICNafp), tên ở <strong>mọi</strong> bậc đều
                    viết nghiêng: <i>Eurotiales</i>, <i>Ascomycota</i>. Các từ chỉ bậc như sect., var. và f. sp. viết
                    đứng: <i>Fusarium oxysporum</i> f. sp. <i>lycopersici</i>.
                  </>
                ),
              })}
            </li>
            <li>
              {t({
                en: (
                  <>
                    A formal name can be followed by its <strong>authority</strong>, the person who described it, in
                    upright letters: <i>Aspergillus fumigatus</i> Fresen.
                  </>
                ),
                vi: (
                  <>
                    Tên chính thức có thể kèm theo <strong>tác giả</strong>, người đã mô tả nó, viết đứng:{' '}
                    <i>Aspergillus fumigatus</i> Fresen.
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
