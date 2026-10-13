// « Une journée rue Jean Guéhenno »: pinned horizontal pan (6 panes). Desktop pointer only, never under reduced motion.
// Touch gets the stacked panes, each fading up with the shared reveal.

import { gsap, MQ, ScrollTrigger } from './motion'
import { prefersReducedMotion } from './dom'

export function mountPan(section: HTMLElement): void {
  const pin = section.querySelector<HTMLElement>('.day-pin')
  const track = section.querySelector<HTMLElement>('.day-track')
  const bar = section.querySelector<HTMLElement>('.day-progress i')
  if (!pin || !track) return
  const mm = gsap.matchMedia()
  // Mouse/trackpad desktops only: on touch (phones, tablets incl. iPad landscape) the six panes stay stacked,
  // a long horizontal pin under a finger is fragile and fights the native scroll.
  mm.add(MQ.desktop, () => {
    document.body.classList.add('js-pan')
    ScrollTrigger.refresh()
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
    const panes = Array.from(track.children) as HTMLElement[]
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: pin, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress })
          const idx = Math.min(panes.length - 1, Math.round(self.progress * (panes.length - 1)))
          panes.forEach((p, i) => p.classList.toggle('is-now', i === idx))
        },
      },
    })
    return () => document.body.classList.remove('js-pan')
  })
  if (prefersReducedMotion()) document.body.classList.remove('js-pan')
}
