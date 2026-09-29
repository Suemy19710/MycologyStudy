import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="sec-head">
      <span className="field">404</span>
      <h1>{t({ en: 'Nothing growing here', vi: 'Không có gì mọc ở đây' })}</h1>
      <p>
        {t({
          en: "This page doesn't exist. It may have been moved, or the link has a typo.",
          vi: 'Trang này không tồn tại. Có thể trang đã được chuyển đi hoặc đường dẫn bị gõ sai.',
        })}
      </p>
      <p>
        <Link to="/">{t({ en: 'Go back to the home page', vi: 'Quay lại trang chủ' })}</Link>
      </p>
    </section>
  )
}
