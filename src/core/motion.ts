// Motion layer: GSAP 3.15 (free licence, includes SplitText and DrawSVG), ScrollTrigger and Lenis.
// Everything here is skipped or reduced to a static state under prefers-reduced-motion.
// Only transform and opacity are animated (plus sparing clip-path in CSS).

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Lenis from 'lenis'
import { $$, prefersReducedMotion } from './dom'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)
// Phones: the URL bar showing/hiding must not trigger a full refresh (jumps, re-pins).
ScrollTrigger.config({ ignoreMobileResize: true })

/** Breakpoints shared by every gsap.matchMedia() in the site. */
export const MQ = {
  desktop: '(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  touch: '(max-width: 899px), (pointer: coarse)',
  motion: '(prefers-reduced-motion: no-preference)',
}
export const isLight = (): boolean => window.matchMedia('(max-width: 899px), (pointer: coarse)').matches

/** Reveal everything that is still hidden (fallback when a trigger never fires). */
export function revealAll(root: ParentNode = document): void {
  $$('[data-reveal]', root).forEach((el) => {
    if (getComputedStyle(el).opacity === '0') gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
  })
  $$('[data-split]', root).forEach((el) => { el.style.visibility = 'visible' })
}

export { gsap, ScrollTrigger }
export let lenis: Lenis | null = null

export function initSmoothScroll(): void {
  if (prefersReducedMotion()) return
  if (!window.matchMedia('(pointer: fine)').matches) return
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

/** Fade-up reveal for [data-reveal] (batched) and SplitText line masks for [data-split]. */
export function initReveals(root: ParentNode = document): void {
  if (prefersReducedMotion()) return
  try {
    const light = isLight()
    const items = $$('[data-reveal]', root)
    if (items.length) {
      ScrollTrigger.batch(items, {
        start: light ? 'top 94%' : 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: light ? 0.6 : 0.9, ease: 'expo.out', stagger: light ? 0.05 : 0.08, overwrite: true }),
      })
    }
    $$('[data-split]', root).forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self) {
          el.style.visibility = 'visible'
          return gsap.from(self.lines, {
            yPercent: 112, duration: light ? 0.7 : 0.95, stagger: light ? 0.06 : 0.09, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: light ? 'top 94%' : 'top 88%', once: true },
          })
        },
      })
    })
    document.documentElement.classList.add('motion-ready')
    // Safety net: anything in or above the viewport that is still hidden after 4 s is shown.
    window.setTimeout(() => {
      $$('[data-reveal]', root).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight && getComputedStyle(el).opacity === '0') gsap.to(el, { opacity: 1, y: 0, duration: 0.4 })
      })
      $$('[data-split]', root).forEach((el) => { el.style.visibility = 'visible' })
    }, 4000)
  } catch {
    document.documentElement.classList.remove('js-motion')
    revealAll(root)
  }
}

/** Directional hover: the gold sweep enters from the side the pointer came from. */
export function initButtons(root: ParentNode = document): void {
  $$('.btn', root).forEach((b) => {
    b.addEventListener('pointerenter', (e) => {
      const r = b.getBoundingClientRect()
      const left = (e as PointerEvent).clientX - r.left < r.width / 2
      b.style.setProperty('--ox', left ? 'left center' : 'right center')
    })
    b.addEventListener('pointerleave', (e) => {
      const r = b.getBoundingClientRect()
      const left = (e as PointerEvent).clientX - r.left < r.width / 2
      b.style.setProperty('--ox', left ? 'left center' : 'right center')
    })
  })
}

/** The one marquee: customer words. Reverses direction with the scroll direction. */
export function initMarquee(el: HTMLElement): void {
  const track = el.querySelector<HTMLElement>('.marquee-track')
  if (!track) return
  if (prefersReducedMotion()) {
    el.classList.add('static')
    return
  }
  const tween = gsap.to(track, { xPercent: -50, duration: isLight() ? 60 : 46, ease: 'none', repeat: -1, paused: true })
  ScrollTrigger.create({
    trigger: el, start: 'top bottom', end: 'bottom top',
    // Offscreen = paused: no work for a loop nobody sees.
    onToggle: (self) => { if (self.isActive) tween.play(); else tween.pause() },
    onUpdate: (self) => {
      const v = Math.min(4, Math.abs(self.getVelocity()) / 400)
      gsap.to(tween, { timeScale: self.direction * (1 + v), duration: 0.4, overwrite: true })
    },
  })
}

/** A tiny puff of flour (6 particles, 400 ms) when something is added to « Ma liste ». */
export function flourPuff(from: Element): void {
  if (prefersReducedMotion()) return
  const r = from.getBoundingClientRect()
  for (let i = 0; i < 6; i++) {
    const d = document.createElement('i')
    d.className = 'puff'
    d.style.left = `${r.left + r.width / 2}px`
    d.style.top = `${r.top + r.height / 2}px`
    document.body.appendChild(d)
    const a = (Math.PI * 2 * i) / 6 + Math.random() * 0.6
    gsap.to(d, {
      x: Math.cos(a) * (22 + Math.random() * 14), y: Math.sin(a) * (22 + Math.random() * 14) - 8,
      opacity: 0, scale: 0.4, duration: 0.4, ease: 'power2.out', onComplete: () => d.remove(),
    })
    gsap.set(d, { opacity: 1 })
  }
}

export function initFooterParallax(): void {
  if (prefersReducedMotion()) return
  const el = document.querySelector<HTMLElement>('.site-footer .tapis-wrap')
  if (!el) return
  // Desktop only: on phones the tapestry stays still (one less scrubbed layer).
  gsap.matchMedia().add(MQ.desktop, () => {
    gsap.fromTo(el, { y: -12 }, { y: 12, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: true } })
  })
}

export function refreshSoon(): void {
  requestAnimationFrame(() => ScrollTrigger.refresh())
}
