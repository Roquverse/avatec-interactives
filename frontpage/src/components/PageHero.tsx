import type { ReactNode } from 'react'

/**
 * Shared hero for every page except the homepage.
 * Big heading on the left (last word picks up the accent color), description on the right,
 * sitting directly under the fixed navbar.
 */
export default function PageHero({
  label,
  meta,
  title,
  lede,
  children,
}: {
  label: string
  meta?: string
  title: string
  lede?: ReactNode
  children?: ReactNode
}) {
  const i = title.lastIndexOf(' ')
  const head = i === -1 ? '' : title.slice(0, i + 1)
  const tail = i === -1 ? title : title.slice(i + 1)

  return (
    <section style={{ paddingTop: 52 }}>
      <div className="cf-shell" style={{ borderTop: 'none' }}>
        <div className="cf-bar">
          <span><span className="cf-dot" />{label}</span>
          {meta && <span className="hide-mobile">{meta}</span>}
        </div>
        <div className="cf-hero-split">
          <h1 className="cf-h2" style={{ margin: 0 }}>
            {head}<em>{tail}</em>
          </h1>
          {(lede || children) && (
            <div className="cf-hero-split-right">
              {lede && (
                <p className="cf-lede" style={{ margin: 0, maxWidth: '100%', fontSize: 16 }}>
                  {lede}
                </p>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
