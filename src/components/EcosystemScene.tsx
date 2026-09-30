import { useState, type KeyboardEvent } from 'react'
import Photo from './Photo'
import { photos, type Photo as PhotoData } from '../data/photos'
import { useLang, type L } from '../i18n/LanguageContext'

// An interactive drawing of the three fungal lifestyles in one landscape:
// a rotting log (saprotroph), a tree with root partners (symbiont) and a maize plant with corn smut (pathogen).
// Pick a role with the buttons or by clicking the drawing; the matching flows animate.

export type Role = 'saprotroph' | 'symbiont' | 'pathogen'

interface RoleInfo {
  name: L
  nickname: L
  text: L
  takes: L
  gives: L
  example: L
  photo: PhotoData
}

const roles: Record<Role, RoleInfo> = {
  saprotroph: {
    name: { en: 'Saprotroph', vi: 'Hoại sinh' },
    nickname: { en: 'The recycler', vi: 'Người tái chế' },
    text: {
      en: 'Its threads grow into dead wood and fallen leaves, release enzymes and digest them. What is left becomes nutrients in the soil that living plants take up again.',
      vi: 'Sợi nấm mọc vào gỗ chết và lá rụng, tiết enzyme để phân giải chúng. Phần còn lại trở thành chất dinh dưỡng trong đất để cây sống hấp thụ lại.',
    },
    takes: { en: 'Food from dead material', vi: 'Thức ăn từ vật chất chết' },
    gives: { en: 'Nutrients back to the soil', vi: 'Trả chất dinh dưỡng cho đất' },
    example: { en: 'Bracket fungi on a dead stump; most moulds in compost', vi: 'Nấm dạng giá trên gốc cây chết; phần lớn nấm mốc trong phân ủ' },
    photo: photos.fungusOnLog,
  },
  symbiont: {
    name: { en: 'Symbiont', vi: 'Cộng sinh' },
    nickname: { en: 'The partner', vi: 'Người bạn đồng hành' },
    text: {
      en: "Mycorrhizal threads connect to the tree's roots and spread far into the soil. They bring the tree water and minerals such as phosphorus; the tree pays with sugar it makes from sunlight.",
      vi: 'Sợi nấm rễ kết nối với rễ cây và lan rộng trong đất. Chúng mang nước và khoáng chất như phốt pho cho cây; đổi lại, cây trả bằng đường tạo ra từ ánh sáng mặt trời.',
    },
    takes: { en: 'Sugar from the plant', vi: 'Đường từ cây' },
    gives: { en: 'Water and minerals to the plant', vi: 'Nước và khoáng chất cho cây' },
    example: { en: 'Fungi in the roots of most land plants', vi: 'Nấm trong rễ của phần lớn thực vật trên cạn' },
    photo: photos.mycorrhiza,
  },
  pathogen: {
    name: { en: 'Pathogen', vi: 'Tác nhân gây bệnh' },
    nickname: { en: 'The invader', vi: 'Kẻ xâm nhập' },
    text: {
      en: 'Spores land on a living host and infect it. Corn smut makes maize grow swollen grey galls, which fill with millions of dark spores that blow away to the next plant.',
      vi: 'Bào tử rơi lên vật chủ còn sống và gây nhiễm. Nấm than làm cây ngô mọc ra các u sưng màu xám, bên trong chứa hàng triệu bào tử sẫm màu bay sang cây khác.',
    },
    takes: { en: 'Food from a living host', vi: 'Thức ăn từ vật chủ còn sống' },
    gives: { en: 'Nothing: the host is harmed', vi: 'Không gì cả: vật chủ bị hại' },
    example: { en: 'Corn smut (Ustilago maydis) on maize', vi: 'Nấm than ngô (Ustilago maydis)' },
    photo: photos.cornSmut,
  },
}

const order: Role[] = ['saprotroph', 'symbiont', 'pathogen']

export default function EcosystemScene() {
  const { t } = useLang()
  const [role, setRole] = useState<Role>('saprotroph')
  const info = roles[role]

  // Make each part of the drawing act like a button (mouse and keyboard).
  const hotspot = (r: Role) => ({
    className: `zone ${role === r ? 'on' : 'dim'}`,
    role: 'button',
    tabIndex: 0,
    'aria-pressed': role === r,
    'aria-label': t(roles[r].name),
    onClick: () => setRole(r),
    onKeyDown: (e: KeyboardEvent<SVGGElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setRole(r)
      }
    },
  })

  return (
    <div className="eco">
      <div className="eco-tabs" role="group" aria-label={t({ en: 'Choose a lifestyle', vi: 'Chọn một lối sống' })}>
        {order.map((r) => (
          <button key={r} type="button" className={`eco-tab ${r}`} aria-pressed={role === r} onClick={() => setRole(r)}>
            <span className="eco-tab-name">{t(roles[r].name)}</span>
            <span className="eco-tab-nick">{t(roles[r].nickname)}</span>
          </button>
        ))}
      </div>

      <div className="scene-wrap">
        <svg
          className={`scene show-${role}`}
          viewBox="0 0 800 440"
          role="img"
          aria-label={t({
            en: 'A landscape with a rotting log, a tree with fungal partners at its roots, and a maize plant with corn smut',
            vi: 'Phong cảnh có khúc gỗ mục, một cái cây có nấm cộng sinh ở rễ và một cây ngô bị nấm than',
          })}
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--sky-top)" />
              <stop offset="1" stopColor="var(--sky-bottom)" />
            </linearGradient>
            <marker id="arrow-nutrient" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--nutrient)" />
            </marker>
            <marker id="arrow-water" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--water)" />
            </marker>
            <marker id="arrow-danger" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker id="arrow-sugar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--sugar)" />
            </marker>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width="800" height="250" fill="url(#sky)" />
          <rect x="0" y="250" width="800" height="190" fill="var(--soil)" />
          <rect x="0" y="400" width="800" height="40" fill="var(--soil-deep)" />
          <rect x="0" y="244" width="800" height="9" rx="3" fill="var(--grass)" />
          <g fill="var(--cloud)">
            <ellipse cx="150" cy="60" rx="46" ry="16" />
            <ellipse cx="185" cy="50" rx="30" ry="16" />
            <ellipse cx="610" cy="40" rx="40" ry="13" />
          </g>

          {/* ---------- Saprotroph: rotting log ---------- */}
          <g {...hotspot('saprotroph')}>
            <rect x="0" y="150" width="280" height="260" fill="transparent" />
            {/* mycelium spreading through soil */}
            <g className="hyphae" stroke="var(--hypha)" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <path d="M110 252 C104 270 120 284 108 300 C98 314 112 326 104 340" />
              <path d="M150 252 C160 272 146 290 162 306 C174 320 160 334 172 350" />
              <path d="M200 252 C194 276 214 288 206 312" />
              <path d="M108 300 C90 304 80 318 66 322" />
              <path d="M162 306 C182 310 190 324 212 328" />
              <path d="M130 252 C126 268 136 276 132 292" />
            </g>
            {/* log */}
            <rect x="60" y="214" width="200" height="36" rx="18" fill="var(--wood-dead)" />
            <ellipse cx="252" cy="232" rx="12" ry="18" fill="var(--wood-end)" />
            <ellipse cx="252" cy="232" rx="6" ry="10" fill="none" stroke="var(--wood-dead)" strokeWidth="2" />
            <path d="M80 226 H150 M100 240 H200" stroke="var(--wood-end)" strokeWidth="2" strokeLinecap="round" />
            {/* bracket fungi */}
            <g fill="var(--bracket)" stroke="var(--bracket-edge)" strokeWidth="1.5">
              <path d="M96 214 q14 -16 30 0 z" />
              <path d="M128 214 q10 -12 22 0 z" />
              <path d="M190 214 q16 -18 34 0 z" />
            </g>
            {/* fallen leaves */}
            <g>
              <ellipse cx="40" cy="248" rx="10" ry="4" fill="var(--leaf-autumn)" transform="rotate(-20 40 248)" />
              <ellipse cx="270" cy="249" rx="9" ry="4" fill="var(--bracket)" transform="rotate(15 270 249)" />
              <ellipse cx="22" cy="250" rx="8" ry="3" fill="var(--bracket)" />
            </g>
            <text x="150" y="190" className="scene-label" textAnchor="middle">
              {t({ en: 'Dead wood', vi: 'Gỗ chết' })}
            </text>
          </g>

          {/* ---------- Symbiont: tree and root partners ---------- */}
          <g {...hotspot('symbiont')}>
            <rect x="290" y="20" width="230" height="400" fill="transparent" />
            {/* canopy */}
            <g fill="var(--leaf)">
              <circle cx="400" cy="92" r="58" />
              <circle cx="348" cy="122" r="40" />
              <circle cx="452" cy="122" r="40" />
              <circle cx="372" cy="70" r="34" />
              <circle cx="430" cy="68" r="34" />
            </g>
            <g fill="var(--leaf-2)">
              <circle cx="390" cy="80" r="22" />
              <circle cx="440" cy="110" r="18" />
              <circle cx="350" cy="116" r="16" />
            </g>
            {/* trunk */}
            <path d="M388 250 C390 200 386 170 392 128 L410 128 C414 170 410 200 414 250 Z" fill="var(--wood)" />
            {/* roots */}
            <g stroke="var(--wood)" fill="none" strokeLinecap="round">
              <path d="M398 250 C380 280 350 300 318 318" strokeWidth="6" />
              <path d="M402 250 C396 290 372 330 356 366" strokeWidth="5" />
              <path d="M404 250 C408 300 404 340 410 380" strokeWidth="5" />
              <path d="M406 250 C424 290 452 330 470 360" strokeWidth="5" />
              <path d="M410 250 C440 272 470 290 500 306" strokeWidth="6" />
            </g>
            {/* mycorrhizal network around root tips */}
            <g className="hyphae net" stroke="var(--hypha)" strokeWidth="1.3" fill="none" strokeLinecap="round">
              <path d="M318 318 C300 330 292 346 300 364 C310 382 332 386 350 372" />
              <path d="M356 366 C340 380 340 396 356 404 C374 412 396 400 410 380" />
              <path d="M410 380 C424 398 450 404 466 390 C482 376 482 360 470 360" />
              <path d="M470 360 C492 364 512 350 516 330 C520 314 510 306 500 306" />
              <path d="M300 364 C284 372 276 388 282 400" />
              <path d="M516 330 C534 336 544 350 540 366" />
              <path d="M332 330 C346 340 360 344 376 340" />
              <path d="M440 336 C456 340 470 336 484 326" />
            </g>
            <text x="400" y="18" className="scene-label" textAnchor="middle" dy="10">
              {t({ en: 'Living tree', vi: 'Cây sống' })}
            </text>
          </g>

          {/* ---------- Pathogen: maize with corn smut ---------- */}
          <g {...hotspot('pathogen')}>
            <rect x="560" y="40" width="240" height="220" fill="transparent" />
            {/* infected maize */}
            <path d="M640 250 V96" stroke="var(--maize)" strokeWidth="7" strokeLinecap="round" />
            <g stroke="var(--maize)" strokeWidth="5" fill="none" strokeLinecap="round">
              <path d="M640 210 C610 196 594 176 586 150" />
              <path d="M640 180 C668 164 684 140 690 112" />
              <path d="M640 140 C616 124 606 104 604 82" />
              <path d="M640 110 C656 96 664 80 666 62" />
            </g>
            <ellipse cx="656" cy="168" rx="11" ry="28" fill="var(--ear)" transform="rotate(18 656 168)" />
            <g fill="var(--gall)" stroke="var(--gall-edge)" strokeWidth="1.5">
              <circle cx="662" cy="150" r="9" />
              <circle cx="672" cy="164" r="11" />
              <circle cx="660" cy="176" r="8" />
              <circle cx="676" cy="182" r="7" />
            </g>
            {/* healthy maize about to be infected */}
            <path d="M760 250 V150" stroke="var(--maize)" strokeWidth="6" strokeLinecap="round" />
            <g stroke="var(--maize)" strokeWidth="4" fill="none" strokeLinecap="round">
              <path d="M760 220 C740 210 730 196 726 178" />
              <path d="M760 190 C778 180 788 166 790 150" />
            </g>
            <circle className="infect" cx="758" cy="178" r="10" fill="none" stroke="var(--danger)" strokeWidth="2.5" />
            {/* spores blowing to the next plant */}
            <g className="spores" fill="var(--spore)">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <circle
                  key={i}
                  cx="676"
                  cy="164"
                  r={i % 2 ? 2.2 : 3}
                  style={{ animationDelay: `${i * 0.35}s`, ['--dx' as string]: `${70 + (i % 3) * 8}px`, ['--dy' as string]: `${(i % 4) * 5}px` }}
                />
              ))}
            </g>
            <text x="672" y="276" className="scene-label" textAnchor="middle" dy="0">
              {t({ en: 'Living maize', vi: 'Cây ngô sống' })}
            </text>
          </g>

          {/* ---------- Flows (only the chosen role's flows are visible) ---------- */}
          <g className="flow flow-saprotroph">
            <path d="M170 262 C210 300 270 330 330 332" stroke="var(--nutrient)" markerEnd="url(#arrow-nutrient)" />
            <text x="236" y="352" className="flow-label" fill="var(--nutrient)">
              {t({ en: 'nutrients', vi: 'dinh dưỡng' })}
            </text>
          </g>
          <g className="flow flow-symbiont">
            <path d="M520 392 C490 404 450 404 424 390" stroke="var(--water)" markerEnd="url(#arrow-water)" />
            <path d="M392 318 C360 300 326 306 300 322" stroke="var(--sugar)" markerEnd="url(#arrow-sugar)" />
            <path d="M402 150 V236" stroke="var(--sugar)" markerEnd="url(#arrow-sugar)" />
            <text x="532" y="416" className="flow-label" fill="var(--water)">
              {t({ en: 'water + minerals → tree', vi: 'nước + khoáng → cây' })}
            </text>
            <text x="244" y="298" className="flow-label" fill="var(--sugar)">
              {t({ en: 'sugar → fungus', vi: 'đường → nấm' })}
            </text>
          </g>
          <g className="flow flow-pathogen">
            <path d="M688 160 C712 140 736 150 750 170" stroke="var(--danger)" markerEnd="url(#arrow-danger)" />
            <text x="786" y="118" className="flow-label" fill="var(--danger)" textAnchor="end">
              {t({ en: 'spores infect', vi: 'bào tử lây nhiễm' })}
            </text>
          </g>
        </svg>
      </div>

      <div className="eco-panel" aria-live="polite">
        <Photo photo={info.photo} ratio="4 / 3" />
        <div className="eco-text">
          <span className={`eco-role ${role}`}>{t(info.nickname)}</span>
          <h3>{t(info.name)}</h3>
          <p>{t(info.text)}</p>
          <dl className="trade">
            <div>
              <dt>{t({ en: 'The fungus takes', vi: 'Nấm nhận' })}</dt>
              <dd>{t(info.takes)}</dd>
            </div>
            <div>
              <dt>{t({ en: 'The fungus gives', vi: 'Nấm cho' })}</dt>
              <dd>{t(info.gives)}</dd>
            </div>
          </dl>
          <p className="eco-example">
            <span className="mono">{t({ en: 'Example', vi: 'Ví dụ' })}</span> {t(info.example)}
          </p>
        </div>
      </div>
    </div>
  )
}
