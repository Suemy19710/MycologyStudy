import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { topics } from '../data/topics'
import { LangSwitch, useLang } from '../i18n/LanguageContext'
// import Logo from '../../public/favicon.svg'

export default function Layout() {
  const { pathname } = useLocation()
  const { t } = useLang()

  // Start each new page at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
    // On phones the menu is a horizontal strip: slide the current page's button into view.
    const nav = document.querySelector<HTMLElement>('.nav')
    const active = nav?.querySelector<HTMLElement>('a.active')
    if (nav && active && nav.scrollWidth > nav.clientWidth) {
      nav.scrollLeft = active.offsetLeft - nav.clientWidth / 2 + active.offsetWidth / 2
    }
  }, [pathname])

  const startTopics = topics.filter((tp) => tp.group === 'start')
  const traitTopics = topics.filter((tp) => tp.group === 'traits')

  return (
    <div className="wrap">
      <aside className="side">
        <div className="side-top">
          <Link to="/" className="brand">
                {/* <Logo /> */}
            {t({ en: 'Meet the Fungi', vi: 'Làm quen với Nấm' })}
          </Link>
          <LangSwitch />
        </div>
        <nav aria-label={t({ en: 'Topics', vi: 'Chủ đề' })}>
          <ul className="nav">
            <li>
              <NavLink to="/" end>
                {t({ en: 'Home', vi: 'Trang chủ' })}
              </NavLink>
            </li>
            <li className="grp">{t({ en: 'Start here', vi: 'Bắt đầu' })}</li>
            {startTopics.map((tp) => (
              <li key={tp.slug}>
                <NavLink to={`/learn/${tp.slug}`}>{t(tp.navLabel)}</NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/names">{t({ en: 'Names & ranks', vi: 'Tên & bậc phân loại' })}</NavLink>
            </li>
            <li className="grp">
              {t({ en: 'Eight ways to describe a fungus', vi: 'Tám cách mô tả một loài nấm' })}
            </li>
            {traitTopics.map((tp) => (
              <li key={tp.slug}>
                <NavLink to={`/learn/${tp.slug}`}>{t(tp.navLabel)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main>
        <Outlet />
        <footer>
        
          <span>
            {t({
              en: 'Written for beginners. Simplified on purpose. Photos from Wikimedia Commons, credited under each image.',
              vi: 'Viết cho người mới bắt đầu, được đơn giản hóa có chủ ý. Ảnh từ Wikimedia Commons, ghi nguồn dưới mỗi ảnh.',
            })}
          </span>
        </footer>
      </main>
    </div>
  )
}
