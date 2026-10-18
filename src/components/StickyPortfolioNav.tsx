import { useEffect, useRef, useState } from 'react'
import './StickyPortfolioNav.css'

const LINKS = [
  { href: '#selected-projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#about-ahmed', label: 'About' },
  { href: '#contact-ahmed', label: 'Contact' },
]

export function PortfolioLinks() {
  return (
    <>
      {LINKS.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </>
  )
}

export default function StickyPortfolioNav() {
  const slotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const header = slotRef.current?.closest('header')
    if (!header) return

    const root = document.documentElement
    const previousHeight = root.style.getPropertyValue(
      '--site-header-height',
    )

    let frame: number | null = null
    let lastHeight = -1

    const update = () => {
      frame = null

      const originalNav = document.getElementById(
        'portfolio-inline-nav',
      )

      if (!originalNav) {
        setVisible(false)
        return
      }

      const headerBounds = header.getBoundingClientRect()
      const headerHeight = Math.ceil(headerBounds.height)

      if (headerHeight !== lastHeight) {
        lastHeight = headerHeight

        root.style.setProperty(
          '--site-header-height',
          `${headerHeight}px`,
        )
      }

      const navBounds = originalNav.getBoundingClientRect()
      const passedHeader =
        navBounds.bottom <= headerBounds.bottom + 1

      setVisible((previous) =>
        previous === passedHeader ? previous : passedHeader,
      )
    }

    const scheduleUpdate = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(update)
    }

    // Capture also receives scroll events from nested page containers.
    document.addEventListener('scroll', scheduleUpdate, {
      capture: true,
      passive: true,
    })

    window.addEventListener('resize', scheduleUpdate)

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(header)

    const originalNav = document.getElementById(
      'portfolio-inline-nav',
    )

    if (originalNav) resizeObserver.observe(originalNav)

    scheduleUpdate()

    return () => {
      document.removeEventListener(
        'scroll',
        scheduleUpdate,
        true,
      )

      window.removeEventListener('resize', scheduleUpdate)
      resizeObserver.disconnect()

      if (frame !== null) {
        window.cancelAnimationFrame(frame)
      }

      if (previousHeight) {
        root.style.setProperty(
          '--site-header-height',
          previousHeight,
        )
      } else {
        root.style.removeProperty('--site-header-height')
      }
    }
  }, [])

  return (
    <div
      ref={slotRef}
      className="hud-portfolio-slot"
      data-visible={visible ? 'true' : 'false'}
    >
      <nav
        className="hud-portfolio-nav"
        aria-label="Portfolio sections"
        hidden={!visible}
      >
        <PortfolioLinks />
      </nav>
    </div>
  )
}