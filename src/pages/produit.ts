import { boot } from '../core/shell'
import { esc, getParam, url } from '../core/dom'
import { illo } from '../core/art'
import { catLabels, productBySlug, productCard, productSheetParts, visibleProducts } from '../core/cards'
import { wireProducts } from '../core/interactions'
import { business } from '../data/business'
import { dayparts } from '../data/dayparts'

const slug = getParam('p') ?? ''
const p = productBySlug(slug)

if (p) document.title = `${p.name} | Maison Bécam Rennes`

const related = p ? visibleProducts.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 4) : []
const hours = p ? dayparts.filter((d) => d.picks.includes(p.slug) || p.dayparts.includes(d.tag)).filter((d, i, a) => a.findIndex((z) => z.tag === d.tag) === i) : []

const main = p
  ? `<section class="page-head"><div class="container"><p class="crumbs"><a href="${url()}">Accueil</a><span aria-hidden="true">/</span><a href="${url('la-carte/')}">La carte</a><span aria-hidden="true">/</span><span>${catLabels[p.cat]}</span></p></div></section>
<section class="section tight"><div class="container"><div class="fiche">${productSheetParts(p).pane}<div style="display:grid;gap:18px;align-content:start">${productSheetParts(p).rest}</div></div>
  <div class="chips" style="margin-top:32px"><span class="label" style="margin-right:8px">Aussi à</span>${hours.map((d) => `<a class="chip" href="${url('la-journee/')}">${d.hour}</a>`).join('')}</div>
</div></section>
<section class="section tight"><div class="container"><h2 style="margin-bottom:24px">Dans la même catégorie</h2><div class="pgrid">${related.map((x) => productCard(x, { open: false })).join('')}</div>
  <div class="btn-row" style="margin-top:28px"><a class="btn" href="${url('la-carte/?cat=' + p.cat)}">Toute la ${catLabels[p.cat].toLowerCase()}</a><a class="btn ghost" href="${business.urls.clickAndCollect}" target="_blank" rel="noopener">Commander<span class="sr"> (nouvel onglet)</span></a></div></div></section>`
  : `<section class="section"><div class="container"><div class="empty">${illo('croissant')}<h1 style="font-size:2rem">Cette fournée n’existe pas</h1><p class="muted">Ce produit est introuvable : <code>${esc(slug)}</code></p><a class="btn" href="${url('la-carte/')}">Retour à la carte</a></div></div></section>`

boot({ nav: 'la-carte/', main, setup() { wireProducts() } })
