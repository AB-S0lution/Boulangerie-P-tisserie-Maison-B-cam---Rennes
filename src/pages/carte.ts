import { boot } from '../core/shell'
import { $, $$, esc, getParam, money, setHTML, url } from '../core/dom'
import { illo } from '../core/art'
import { dialHTML, mountDials, currentHour } from '../core/dial'
import { partForHour } from '../data/dayparts'
import { productCard, visibleProducts } from '../core/cards'
import { openSheet, wireProducts } from '../core/interactions'
import { networkProducts } from '../data/network-products'
import { seasons } from '../data/seasons'
import { pageHead } from '../core/parts'
import { gsap } from '../core/motion'
import { prefersReducedMotion } from '../core/dom'
import type { Product } from '../data/products'
import { photo, photoImg } from '../data/photos'

type Tab = 'tout' | Product['cat'] | 'boissons' | 'saison'
const tabs: [Tab, string][] = [
  ['tout', 'Tout'], ['boulangerie', 'Boulangerie'], ['viennoiserie', 'Viennoiserie'], ['patisserie', 'Pâtisserie'],
  ['snacking', 'Snacking'], ['aperitif', 'Apéritif et plateaux'], ['boissons', 'Boissons chaudes (réseau)'], ['saison', 'Saison'],
]
const tagFilters: [string, string][] = [
  ['a-partager', 'À partager'], ['breton', 'Bretagne'], ['bio', 'Bio*'], ['vegetarien', 'Végétarien (gamme Happy)'],
  ['sans-coques', 'Sans fruits à coques'], ['sans-sesame', 'Sans sésame'],
]

const state = { tab: 'tout' as Tab, q: '', tags: new Set<string>(), hour: false, sort: 'defaut', max: 0 }
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const main = `
${pageHead('La <span class="it">carte</span>', '210 produits du Click & Collect de Rennes, avec prix, composition officielle et allergènes.', 'La carte', 'carte')}
${dialHTML(true)}
<section class="section tight">
  <div class="container">
    <div class="tabs" role="tablist" aria-label="Catégories">${tabs.map(([k, l]) => `<button type="button" role="tab" id="tab-${k}" aria-selected="${k === 'tout'}" data-tab="${k}">${l}</button>`).join('')}</div>
    <div class="toolbar">
      <div class="filter-row">
        <div class="field"><label class="sr" for="q">Rechercher un produit</label><input id="q" type="search" placeholder="Rechercher : croissant, quiche, éclair" autocomplete="off"></div>
        <div class="field" style="flex:0 1 190px"><label class="sr" for="sort">Trier</label><select id="sort"><option value="defaut">Tri : la carte</option><option value="prix-asc">Prix croissant</option><option value="prix-desc">Prix décroissant</option><option value="nom">Nom A - Z</option></select></div>
        <div class="field" style="flex:0 1 170px"><label class="sr" for="max">Prix maximum</label><select id="max"><option value="0">Tous les prix</option><option value="300">Jusqu’à 3 €</option><option value="600">Jusqu’à 6 €</option><option value="1000">Jusqu’à 10 €</option><option value="2500">Jusqu’à 25 €</option></select></div>
      </div>
      <div class="filter-row" role="group" aria-label="Filtres">
        <button type="button" class="toggle" data-hour aria-pressed="false">À l’heure du cadran</button>
        ${tagFilters.map(([k, l]) => `<button type="button" class="toggle" data-tag="${k}" aria-pressed="false">${l}</button>`).join('')}
      </div>
      <p class="result-count" role="status" aria-live="polite" data-count></p>
    </div>
    <div data-results></div>
    <div class="box" style="margin-top:36px" data-reveal>
      <h3>À savoir sur ces informations</h3>
      <p class="muted">Prix indicatifs relevés en octobre 2026 sur le Click &amp; Collect de Rennes ; en boutique, ils peuvent différer. Compositions et allergènes : textes officiels de la fiche de chaque produit. Quand aucune liste n’est publiée, nous écrivons « nous consulter en boutique », jamais « sans allergène ». Les pâtisseries et une grande partie du snacking sont indiqués « contient des ingrédients décongelés ». Bio* : certaines boulangeries du réseau sont en cours de certification bio.</p>
    </div>
  </div>
</section>`

function filtered(): Product[] {
  let list = visibleProducts.slice()
  if (state.tab !== 'tout' && state.tab !== 'boissons' && state.tab !== 'saison') list = list.filter((p) => p.cat === state.tab)
  if (state.tab === 'saison') {
    const slugs = new Set(seasons.flatMap((s) => s.slugs))
    list = list.filter((p) => slugs.has(p.slug))
  }
  const q = norm(state.q.trim())
  if (q) list = list.filter((p) => norm(p.name + ' ' + p.tagline + ' ' + (p.composition ?? []).join(' ')).includes(q))
  for (const t of state.tags) {
    if (t === 'sans-coques') list = list.filter((p) => p.allergens !== null && !p.allergens.includes('Fruits à coques') && !p.allergens.includes('Arachides'))
    else if (t === 'sans-sesame') list = list.filter((p) => p.allergens !== null && !p.allergens.includes('Sésame'))
    else list = list.filter((p) => (p.tags ?? []).includes(t as never))
  }
  if (state.hour) {
    const tag = partForHour(currentHour()).tag
    list = list.filter((p) => p.dayparts.includes(tag))
  }
  if (state.max) list = list.filter((p) => p.priceCents <= state.max)
  if (state.sort === 'prix-asc') list.sort((a, b) => a.priceCents - b.priceCents)
  if (state.sort === 'prix-desc') list.sort((a, b) => b.priceCents - a.priceCents)
  if (state.sort === 'nom') list.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  return list
}

function netPane(g: string, i: number): string {
  const slug = g === 'Boissons chaudes' ? (i % 2 ? 'cafe-table-noire' : 'cafe-tasse') : g === 'Biscuits' ? 'plateau-douceurs' : ''
  if (slug) return `<div class="pane has-photo">${photoImg({ ...photo(slug), alt: '' })}<span class="photo-tag">Photo d’illustration</span></div>`
  return `<div class="pane">${illo(g === 'Pizzas' ? 'tartefine' : 'verrine')}</div>`
}

function renderNetwork(): string {
  const groups = Array.from(new Set(networkProducts.map((n) => n.group)))
  return `<div class="warn" style="margin-bottom:20px">Catalogue du réseau Maison Bécam (maisonbecam.com). Disponibilité et prix à Rennes à confirmer : « Selon disponibilité ». Les pizzas ont été évoquées par la presse à l’ouverture mais ne figurent pas au Click &amp; Collect de Rennes.</div>
  ${groups.map((g) => `<h3 style="margin:28px 0 12px">${g}</h3><div class="pgrid">${networkProducts.filter((n) => n.group === g).map((n, i) => `<article class="pcard">${netPane(g, i)}<div class="body"><h3>${esc(n.name)}</h3><p class="tg">Selon disponibilité</p><div class="row"><span class="price">${n.priceCents ? money(n.priceCents) : 'Prix à confirmer'}</span></div></div></article>`).join('')}</div>`).join('')}`
}

function render(): void {
  const res = $('[data-results]')
  const cnt = $('[data-count]')
  if (!res || !cnt) return
  if (state.tab === 'boissons') {
    setHTML(res, renderNetwork())
    cnt.textContent = `${networkProducts.length} produits du réseau`
    return
  }
  const list = filtered()
  cnt.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`
  if (!list.length) {
    setHTML(res, `<div class="empty">${illo('croissant')}<h3>Rien à cette adresse</h3><p class="muted">Aucun produit ne correspond à ces filtres. Retirez un filtre ou une lettre.</p><button type="button" class="btn" data-reset>Réinitialiser les filtres</button></div>`)
    return
  }
  setHTML(res, `<div class="pgrid">${list.map((p) => productCard(p)).join('')}</div>`)
  if (!prefersReducedMotion()) gsap.from(res.querySelectorAll('.pcard:nth-child(-n+12)'), { y: 18, opacity: 0, duration: 0.5, stagger: 0.025, ease: 'expo.out', clearProps: 'all' })
}

function reset(): void {
  state.q = ''; state.tags.clear(); state.hour = false; state.sort = 'defaut'; state.max = 0
  const q = $<HTMLInputElement>('#q'); if (q) q.value = ''
  const s = $<HTMLSelectElement>('#sort'); if (s) s.value = 'defaut'
  const m = $<HTMLSelectElement>('#max'); if (m) m.value = '0'
  $$('[data-tag], [data-hour]').forEach((b) => b.setAttribute('aria-pressed', 'false'))
  render()
}

boot({
  nav: 'la-carte/',
  main,
  setup(root) {
    wireProducts()
    mountDials(false)
    const cat = getParam('cat') as Tab | null
    if (cat && tabs.some(([k]) => k === cat)) state.tab = cat
    const tg = getParam('tag')
    if (tg) { state.tags.add(tg) }
    $$('[data-tab]', root).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === state.tab)))
    $$('[data-tag]', root).forEach((b) => b.setAttribute('aria-pressed', String(state.tags.has(b.dataset.tag as string))))
    root.addEventListener('click', (e) => {
      const t = e.target as Element
      const tab = t.closest<HTMLElement>('[data-tab]')
      if (tab) { state.tab = tab.dataset.tab as Tab; $$('[data-tab]', root).forEach((b) => b.setAttribute('aria-selected', String(b === tab))); render() }
      const tag = t.closest<HTMLElement>('[data-tag]')
      if (tag) { const k = tag.dataset.tag as string; if (state.tags.has(k)) state.tags.delete(k); else state.tags.add(k); tag.setAttribute('aria-pressed', String(state.tags.has(k))); render() }
      const hr = t.closest<HTMLElement>('[data-hour]')
      if (hr) { state.hour = !state.hour; hr.setAttribute('aria-pressed', String(state.hour)); render() }
      if (t.closest('[data-reset]')) reset()
    })
    $('#q', root)?.addEventListener('input', (e) => { state.q = (e.target as HTMLInputElement).value; render() })
    $('#sort', root)?.addEventListener('change', (e) => { state.sort = (e.target as HTMLSelectElement).value; render() })
    $('#max', root)?.addEventListener('change', (e) => { state.max = Number((e.target as HTMLSelectElement).value); render() })
    document.addEventListener('bec:dial', () => { if (state.hour) render() })
    render()
    const m = location.hash.match(/^#p=(.+)$/)
    if (m) openSheet(m[1])
    void url
  },
})
