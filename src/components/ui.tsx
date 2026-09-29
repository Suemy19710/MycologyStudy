import type { ReactNode } from 'react'

// Small building blocks reused across topic pages.
// Text passed in should already be in the current language (use t() from useLang).

export function Card({
  icon,
  title,
  children,
  example,
}: {
  icon?: ReactNode
  title: ReactNode
  children: ReactNode
  example?: ReactNode
}) {
  return (
    <div className="card">
      {icon}
      <h3>{title}</h3>
      <p>{children}</p>
      {example && <span className="ex">{example}</span>}
    </div>
  )
}

export function Analogy({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="analogy">
      <b>{label}</b>
      <p>{children}</p>
    </div>
  )
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>
}

export function Grid({ cols, children }: { cols: 2 | 3; children: ReactNode }) {
  return <div className={`grid g${cols}`}>{children}</div>
}

// Pill-shaped switch between a few options.
export function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
