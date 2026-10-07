import { useLang } from '../i18n/LanguageContext'

// Shared loading and error states for data fetched with TanStack Query.

export function Loading({ label }: { label?: string }) {
  const { t } = useLang()
  return (
    <p className="query-state" role="status" aria-live="polite">
      <span className="query-spinner" aria-hidden="true" />
      {label ?? t({ en: 'Loading…', vi: 'Đang tải…' })}
    </p>
  )
}

export function LoadError({ onRetry }: { onRetry?: () => void }) {
  const { t } = useLang()
  return (
    <div className="query-state query-error" role="alert">
      <p>
        {t({
          en: 'This content could not be loaded. Check your internet connection and try again.',
          vi: 'Không tải được nội dung này. Hãy kiểm tra kết nối mạng và thử lại.',
        })}
      </p>
      {onRetry && (
        <button type="button" className="btn ghost" onClick={onRetry}>
          {t({ en: 'Try again', vi: 'Thử lại' })}
        </button>
      )}
    </div>
  )
}
