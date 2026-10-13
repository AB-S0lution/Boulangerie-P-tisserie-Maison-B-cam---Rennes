// Shared shell: header, footer, glass-door page transition, smooth scroll, theme, « Ma liste » counter.

import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '../style.css'

import { $, $$, esc, parisNow, prefersReducedMotion, setHTML, typo, url } from './dom'
import { business, fullAddress, mapsUrl } from '../data/business'
import { CLOSE_HOUR, OPEN_HOUR, holidayNote, weekHours } from '../data/hours'
import { legalNav, mainNav, moreNav } from '../data/nav'
import { lysIcon, tapisserie } from './art'
import { gsap, initButtons, initFooterParallax, initReveals, initSmoothScroll, refreshSoon } from './motion'
import { listCount } from './list'

export interface PageOptions {
  /** current section path for aria-current, e.g. 'la-carte/' */
  nav?: string
  /** main content HTML (rendered with French typography) */
  main: string
  /** runs after the main HTML is in the DOM */
  setup?: (main: HTMLElement) => void
  /** no footer tapestry etc. for the 404 style pages */
  bare?: boolean
}

const THEME_KEY = 'bec-theme'
type Theme = 'auto' | 'light' | 'dark'

function getTheme(): Theme {
  try { return (localStorage.getItem(THEME_KEY) as Theme) || 'auto' } catch { return 'auto' }
}
function applyTheme(t: Theme): void {
  const root = document.documentElement
  if (t === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', t)
  try { localStorage.setItem(THEME_KEY, t) } catch { /* ignore */ }
  $$('[data-theme-btn]').forEach((b) => {
    b.textContent = `Thème : ${({ auto: 'automatique', light: 'clair', dark: 'sombre' })[t]}`
  })
}

const burgerSvg = '<span></span><span></span><span></span>'
const listSvg = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h13M6 12h13M6 17h13"/><path d="M3 7h.01M3 12h.01M3 17h.01"/></svg>'

function header(nav?: string): string {
  const link = (i: { path: string; label: string }) => `<a href="${url(i.path)}" ${nav === i.path ? 'aria-current="page"' : ''}>${i.label}</a>`
  return `<a class="skip" href="#main">Aller au contenu</a>
  <header class="site-header"><div class="bar">
    <a class="wordmark" href="${url()}" aria-label="Maison Bécam, Rennes Jules Ferry, accueil"><b>Maison Bécam</b><small>Rennes · Jules Ferry</small></a>
    <nav class="main-nav" aria-label="Navigation principale">${mainNav.map(link).join('')}</nav>
    <div class="head-right">
      <span class="status" tabindex="0" role="status" data-status><i></i><span class="txt"></span><span class="tip">${holidayNote}</span></span>
      <a class="list-link" href="${url('click-and-collect/')}" aria-label="Ma liste (Click et Collect)">${listSvg}<span class="count" data-n="0" data-count>0</span></a>
      <a class="btn gold sm cta-head" href="${business.urls.clickAndCollect}" target="_blank" rel="noopener">Commander<span class="sr"> (nouvel onglet)</span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">${burgerSvg}</button>
    </div>
  </div></header>
  <div class="menu" id="menu">
    <nav aria-label="Menu">${mainNav.map((i) => `<a class="big" href="${url(i.path)}">${i.label}</a>`).join('')}</nav>
    <div class="more">${moreNav.map((i) => `<a href="${url(i.path)}">${i.label}</a>`).join('')}</div>
    <a class="btn gold" href="${business.urls.clickAndCollect}" target="_blank" rel="noopener">Commander<span class="sr"> (nouvel onglet)</span></a>
  </div>`
}

function footer(): string {
  return `<footer class="site-footer">
    <div class="tapis-wrap">${tapisserie('tapis-foot')}</div>
    <div class="container foot-grid">
      <div>
        <p class="wordmark"><b style="font-size:2.2rem">Maison Bécam</b><small>Rennes · Jules Ferry</small></p>
        <p style="margin-top:16px;max-width:30ch">${business.address.street}<br>${business.address.postalCode} ${business.address.city}<br>Face au campus, au pied du métro Jules Ferry.</p>
        <p style="margin-top:12px"><a href="tel:${business.phone.tel}" style="font-weight:600">${business.phone.display}</a></p>
        <div class="btn-row" style="margin-top:16px"><a class="btn gold sm" href="${business.urls.clickAndCollect}" target="_blank" rel="noopener">Commander<span class="sr"> (nouvel onglet)</span></a><a class="btn ghost sm" href="${mapsUrl}" target="_blank" rel="noopener">Itinéraire<span class="sr"> (nouvel onglet)</span></a></div>
      </div>
      <div><h3>La boutique</h3><ul>${[...mainNav.slice(0, 5), ...moreNav].map((i) => `<li><a href="${url(i.path)}">${i.label}</a></li>`).join('')}</ul></div>
      <div><h3>Horaires</h3><dl class="foot-hours">${weekHours.map((d) => `<dt>${d.label}</dt><dd>7 h - 20 h</dd>`).join('')}</dl><p class="small" style="margin-top:10px;color:#cbd9e1">${holidayNote}</p></div>
      <div><h3>Lettre de la maison</h3><p class="small" style="color:#cbd9e1">Un mail par saison, jamais plus. Exemple de formulaire : rien n’est envoyé.</p>
        <form class="newsletter" data-newsletter><label class="sr" for="nl">Votre adresse e-mail</label><input id="nl" type="email" placeholder="vous@exemple.fr" autocomplete="email" required><button class="btn gold sm" type="submit">S’abonner</button></form>
        <p class="small" role="status" data-nl-msg style="margin-top:8px;color:#cbd9e1"></p>
        <p class="small" style="margin-top:14px"><a href="${business.social.instagram}" target="_blank" rel="noopener">Instagram du réseau</a> · <a href="${business.social.facebook}" target="_blank" rel="noopener">Facebook</a> · <a href="${business.social.youtube}" target="_blank" rel="noopener">YouTube</a></p>
      </div>
    </div>
    <div class="container foot-bottom">
      <span>${business.franchisorLine}</span>
      <span>${legalNav.map((i) => `<a href="${url(i.path)}">${i.label}</a>`).join(' · ')} · <button type="button" data-theme-btn style="text-decoration:underline;text-underline-offset:3px"></button></span>
      <span class="demo-note" style="flex-basis:100%">Site de démonstration non officiel de la boutique de Rennes (${fullAddress}), sans lien avec le franchiseur. Prix et données de la carte : relevé Click &amp; Collect du 13 octobre 2026. Textes d’exemple signalés dans le code.</span>
    </div>
  </footer>
  <div class="door" aria-hidden="true">${'<span></span>'.repeat(6)}</div>`
}

function updateStatus(): void {
  const el = $('[data-status]')
  if (!el) return
  const { hour } = parisNow()
  const open = hour >= OPEN_HOUR && hour < CLOSE_HOUR
  el.classList.toggle('open', open)
  const txt = $('.txt', el)
  if (txt) txt.innerHTML = typo(open ? `Ouvert · <span class="txt-long">jusqu’à </span>20 h` : `Fermé · <span class="txt-long">ouvre à </span>7 h`)
}

function updateCount(): void {
  const n = listCount()
  $$('[data-count]').forEach((c) => { c.textContent = String(n); c.setAttribute('data-n', String(n)) })
}

function setupMenu(): void {
  const burger = $<HTMLButtonElement>('.burger')
  const menu = $('#menu')
  if (!burger || !menu) return
  const set = (open: boolean) => {
    burger.setAttribute('aria-expanded', String(open))
    menu.classList.toggle('open', open)
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }
  burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'))
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false) })
  window.matchMedia('(min-width: 1180px)').addEventListener('change', (m) => { if (m.matches) set(false) })
}

/** Glass-door page transition: navy panes slide across, then the next page clears them. */
function setupDoor(): void {
  const door = $('.door')
  if (!door) return
  const panes = Array.from(door.children) as HTMLElement[]
  const reduce = prefersReducedMotion()
  const clear = () => {
    document.documentElement.classList.remove('door-in')
    door.classList.remove('is-on')
    panes.forEach((p) => { p.style.transform = '' })
  }
  let arrived = false
  try { arrived = sessionStorage.getItem('bec-door') === '1'; sessionStorage.removeItem('bec-door') } catch { /* ignore */ }
  if (arrived && !reduce) {
    gsap.set(panes, { scaleX: 1, transformOrigin: 'right center' })
    door.classList.add('is-on')
    document.documentElement.classList.remove('door-in')
    gsap.to(panes, { scaleX: 0, duration: 0.55, stagger: 0.05, ease: 'expo.inOut', delay: 0.05, onComplete: clear })
  } else {
    clear()
  }
  window.addEventListener('pageshow', (e) => { if (e.persisted) clear() })
  if (reduce) return
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (a.target === '_blank' || a.hasAttribute('download') || a.origin !== location.origin) return
    if (a.pathname === location.pathname && a.hash) return
    if (a.pathname === location.pathname && a.search === location.search) return
    e.preventDefault()
    document.documentElement.style.overflow = ''
    try { sessionStorage.setItem('bec-door', '1') } catch { /* ignore */ }
    door.classList.add('is-on')
    gsap.set(panes, { scaleX: 0, transformOrigin: 'left center' })
    gsap.to(panes, { scaleX: 1, duration: 0.45, stagger: 0.05, ease: 'expo.inOut', onComplete: () => { location.href = a.href } })
  })
}

/** Newsletter and other demo forms never send anything. */
function setupForms(): void {
  const f = $<HTMLFormElement>('[data-newsletter]')
  f?.addEventListener('submit', (e) => {
    e.preventDefault()
    const m = $('[data-nl-msg]')
    if (m) m.textContent = 'Merci ! Ceci est une démonstration : aucune adresse n’est enregistrée.'
    f.reset()
  })
}

export function boot(opts: PageOptions): void {
  const app = document.getElementById('app')
  if (!app) return
  document.body.insertAdjacentHTML('afterbegin', typo(header(opts.nav)))
  const main = document.createElement('main')
  main.id = 'main'
  main.tabIndex = -1
  setHTML(main, opts.main)
  app.replaceWith(main)
  document.body.insertAdjacentHTML('beforeend', typo(footer()))
  applyTheme(getTheme())
  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest('[data-theme-btn]')) {
      const order: Theme[] = ['auto', 'light', 'dark']
      applyTheme(order[(order.indexOf(getTheme()) + 1) % 3])
    }
  })
  updateStatus()
  setInterval(updateStatus, 60_000)
  updateCount()
  document.addEventListener('bec:list', updateCount)
  setupMenu()
  setupForms()
  setupDoor()
  opts.setup?.(main)
  initButtons()
  initSmoothScroll()
  const go = () => {
    initReveals(main)
    initFooterParallax()
    refreshSoon()
  }
  if (document.fonts?.ready) document.fonts.ready.then(go)
  else go()
}

export { esc, lysIcon }
