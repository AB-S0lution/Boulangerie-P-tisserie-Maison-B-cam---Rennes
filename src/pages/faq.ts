import { boot } from '../core/shell'
import { $, setHTML, url } from '../core/dom'
import { faq } from '../data/faq'
import { business, mapsUrl } from '../data/business'
import { pageHead } from '../core/parts'
import { illo } from '../core/art'

const main = `
${pageHead('Questions <span class="it">fréquentes</span>', '14 réponses sur les horaires, les commandes, la carte et le lieu.', 'FAQ', 'faq')}
<section class="section tight"><div class="container" style="max-width:860px">
  <div class="field" style="max-width:none;margin-bottom:24px"><label class="sr" for="fq">Rechercher dans la FAQ</label><input id="fq" type="search" placeholder="Rechercher : dimanche, allergènes, brunch" autocomplete="off"></div>
  <p class="result-count" role="status" aria-live="polite" data-n></p>
  <div class="faq-list" data-faq></div>
</div></section>`

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const link = (f: (typeof faq)[number]) => {
  if (!f.linkHref) return ''
  const h = f.linkHref === 'maps' ? mapsUrl : f.linkHref === 'recrutement' ? business.urls.recruitment : url(f.linkHref + '/')
  const ext = h.startsWith('http')
  return `<p><a class="link" href="${h}" ${ext ? 'target="_blank" rel="noopener"' : ''}>${f.linkLabel}${ext ? '<span class="sr"> (nouvel onglet)</span>' : ''}</a></p>`
}

function render(q: string): void {
  const el = $('[data-faq]'); const n = $('[data-n]')
  if (!el || !n) return
  const list = faq.filter((f) => !q || norm(f.q + f.a).includes(norm(q)))
  n.textContent = `${list.length} réponse${list.length > 1 ? 's' : ''}`
  setHTML(el, list.length ? list.map((f) => `<details><summary>${f.q}</summary><div class="ans"><p>${f.a}</p>${link(f)}</div></details>`).join('') : `<div class="empty">${illo('croissant')}<h3>Aucune réponse</h3><p class="muted">Essayez un autre mot, ou appelez le ${business.phone.display}.</p></div>`)
}

boot({ nav: 'faq/', main, setup(root) { render(''); $('#fq', root)?.addEventListener('input', (e) => render((e.target as HTMLInputElement).value)) } })
