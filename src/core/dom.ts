// DOM helpers shared by every page.

export const BASE = import.meta.env.BASE_URL

/** Absolute URL under the Vite base (GitHub Pages sub-path safe). */
export function url(path = ''): string {
  return BASE + path.replace(/^\//, '')
}

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel)
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel))

const NB = ' '
const NNB = ' '

/** French typography: non-breaking spaces before ; : ! ? » and after «, % and € handling. Tags are left alone. */
export function typo(html: string): string {
  return html
    .split(/(<[^>]+>)/g)
    .map((chunk) => {
      if (chunk.startsWith('<')) return chunk
      return chunk
        .replace(/ +([;!?])/g, NNB + '$1')
        .replace(/ +:/g, NB + ':')
        .replace(/« +/g, '«' + NB)
        .replace(/ +»/g, NB + '»')
        .replace(/(\d) +(€|%|h\b|g\b|kg\b|m²|km|m\b)/g, '$1' + NB + '$2')
        .replace(/(\d) (\d{3})/g, '$1' + NB + '$2')
    })
    .join('')
}

export function setHTML(el: Element, html: string): void {
  el.innerHTML = typo(html)
}

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
export function money(cents: number): string {
  return eur.format(cents / 100).replace(/ | /g, ' ')
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function formatDateFR(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}

export function getParam(name: string): string | null {
  return new URLSearchParams(location.search).get(name)
}

/** Current hour (decimal) in Europe/Paris plus weekday. */
export function parisNow(): { hour: number; day: number; date: string } {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris', hour: 'numeric', minute: 'numeric', weekday: 'short', month: '2-digit', day: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const wd = get('weekday').replace('.', '').toLowerCase()
  const map: Record<string, number> = { dim: 0, lun: 1, mar: 2, mer: 3, jeu: 4, ven: 5, sam: 6 }
  return { hour: Number(get('hour')) + Number(get('minute')) / 60, day: map[wd] ?? 1, date: `${get('month')}-${get('day')}` }
}
