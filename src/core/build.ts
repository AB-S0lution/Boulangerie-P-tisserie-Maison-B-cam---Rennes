// « Le Choc'O Roi, couche par couche »: pinned, scrubbed exploded view.
// Layers follow the OFFICIAL composition (Bakeronline): Pâte sucrée Fleur de Lys / Sablé breton chocolat / Crème pâtissière Choc'O Roi.
// The pinch of Guérande fleur de sel comes from the press and the entremet sheet.

import { gsap, ScrollTrigger } from './motion'
import { lysPath } from './art'
import { prefersReducedMotion } from './dom'

type Flavour = 'caramel' | 'chocolat' | 'vanille'
const creamFill: Record<Flavour, string> = { caramel: '#d9a85a', chocolat: '#6a4250', vanille: '#f5e6b0' }

export function buildHTML(): string {
  const salt = Array.from({ length: 16 }, (_, i) => `<circle class="salt" cx="${120 + ((i * 53) % 160)}" cy="${150 + ((i * 29) % 40)}" r="${1.6 + (i % 3) * 0.6}" fill="#fff" stroke="var(--or)" stroke-width=".6"/>`).join('')
  return `<div class="build-stage" data-flavour="chocolat">
    <svg viewBox="0 0 400 400" role="img" aria-label="Vue éclatée du Choc’O Roi : sablé breton, crème pâtissière, fleur de sel, pâte sucrée Fleur de Lys, boîte en peuplier" focusable="false">
      <ellipse cx="200" cy="360" rx="120" ry="14" fill="#000" opacity=".25"/>
      <g class="l-box">
        <ellipse cx="200" cy="318" rx="136" ry="34" fill="#d9c08a" stroke="#b89b5d"/>
        <path d="M64 318v18c0 19 61 34 136 34s136-15 136-34v-18" fill="#d9c08a" stroke="#b89b5d"/>
        <path d="M90 340c40 12 180 12 220 0M84 330c46 14 186 14 232 0" fill="none" stroke="#b89b5d" stroke-width="1"/>
      </g>
      <g class="l-sable">
        <ellipse cx="200" cy="296" rx="124" ry="32" fill="var(--ill-choc)" stroke="#2b1a20"/>
        <path d="M76 296v14c0 17 55 30 124 30s124-13 124-30v-14" fill="#4a2c37" stroke="#2b1a20"/>
        <g fill="#2b1a20" opacity=".5"><circle cx="130" cy="300" r="2.4"/><circle cx="170" cy="312" r="2"/><circle cx="230" cy="310" r="2.4"/><circle cx="270" cy="298" r="2"/></g>
      </g>
      <g class="l-cream">
        <ellipse class="cream-top" cx="200" cy="262" rx="116" ry="29" fill="${creamFill.chocolat}" stroke="#2b1a20"/>
        <path class="cream-side" d="M84 262v16c0 16 52 28 116 28s116-12 116-28v-16" fill="${creamFill.chocolat}" stroke="#2b1a20" opacity=".92"/>
      </g>
      <g class="l-salt">${salt}</g>
      <g class="l-top">
        <ellipse cx="200" cy="228" rx="112" ry="28" fill="var(--or)" stroke="#8a7233"/>
        <path d="M88 228v14c0 15 50 26 112 26s112-11 112-26v-14" fill="#b39651" stroke="#8a7233"/>
        <g class="stamp" transform="translate(170 202) scale(2.5)" style="transform-origin:12px 12px">${lysPath('#5b3a45', 'none')}</g>
      </g>
      <g class="l-lid">
        <ellipse cx="200" cy="212" rx="140" ry="36" fill="#ecd9a8" stroke="#b89b5d" opacity=".96"/>
        <path d="M92 208c30-10 70-14 108-14s78 4 108 14M80 214c34-12 76-16 120-16s86 4 120 16" fill="none" stroke="#b89b5d" stroke-width="1"/>
        <g transform="translate(180 192) scale(1.7)">${lysPath('#7e6120', 'none')}</g>
      </g>
    </svg>
  </div>`
}

export function mountBuild(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('.build-stage')
  if (!stage) return
  const items = Array.from(root.querySelectorAll<HTMLElement>('.layer-list li'))
  const setOn = (n: number) => items.forEach((li, i) => li.classList.toggle('on', i < n))

  const setFlavour = (f: Flavour) => {
    stage.dataset.flavour = f
    stage.querySelectorAll<SVGElement>('.cream-top, .cream-side').forEach((e) => e.setAttribute('fill', creamFill[f]))
    root.querySelectorAll<HTMLButtonElement>('.flavours button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === f)))
    const label = root.querySelector<HTMLElement>('[data-cream-label]')
    if (label) label.textContent = f === 'chocolat' ? 'Crème pâtissière Choc’O Roi (chocolat 65 % selon la presse)' : `Crème pâtissière ${f}`
    const sab = root.querySelector<HTMLElement>('[data-sable-label]')
    if (sab) sab.textContent = f === 'chocolat' ? 'Sablé breton chocolat' : 'Sablé breton'
  }
  root.querySelectorAll<HTMLButtonElement>('.flavours button').forEach((b) => b.addEventListener('click', () => setFlavour(b.dataset.f as Flavour)))

  if (prefersReducedMotion()) {
    setOn(items.length)
    root.classList.add('no-pin')
    return
  }

  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: root, start: 'top top', end: '+=2600', pin: true, scrub: 0.8, anticipatePin: 1,
        onUpdate: (self) => setOn(Math.ceil(self.progress * items.length * 1.02)),
      },
    })
    gsap.set('.l-sable, .l-cream, .l-top, .l-lid', { opacity: 0 })
    gsap.set('.l-sable', { y: 90 })
    gsap.set('.cream-top, .cream-side', { transformOrigin: '50% 50%', scaleX: 0.15 })
    gsap.set('.l-cream', { y: 0 })
    gsap.set('.salt', { y: -140, opacity: 0 })
    gsap.set('.l-top', { y: -170 })
    gsap.set('.l-lid', { y: -220 })
    tl.to('.l-sable', { y: 0, opacity: 1, duration: 1 })
      .to('.l-cream', { opacity: 1, duration: 0.2 }, '>-0.3')
      .to('.cream-top, .cream-side', { scaleX: 1, duration: 1 }, '<')
      .to('.salt', { y: 0, opacity: 1, duration: 0.9, stagger: { each: 0.04, from: 'random' } })
      .to('.l-top', { y: 0, opacity: 1, duration: 1, ease: 'power3.in' })
      .fromTo('.stamp', { scale: 3.4 }, { scale: 2.5, duration: 0.35, ease: 'back.out(3)' })
      .to('.l-lid', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to({}, { duration: 0.5 })
    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  })
  ScrollTrigger.refresh()
}
