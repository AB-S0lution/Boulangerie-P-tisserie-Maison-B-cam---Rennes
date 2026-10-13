// Product cards and product sheets (shared by home, carte, produit, commandes, click & collect).

import { products, type Product } from '../data/products'
import { business } from '../data/business'
import { illo } from './art'
import { esc, money, url } from './dom'
import { inList } from './list'
import { photoForIllustration, photoImg } from '../data/photos'

const bySlug = new Map(products.map((p) => [p.slug, p]))
export const visibleProducts = products.filter((p) => !p.hidden)
export const productBySlug = (s: string): Product | undefined => bySlug.get(s)

export const catLabels: Record<Product['cat'], string> = {
  boulangerie: 'Boulangerie',
  viennoiserie: 'Viennoiserie',
  patisserie: 'Pâtisserie',
  snacking: 'Snacking',
  aperitif: 'Apéritif et plateaux',
}

const plus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'

export const tagLabels: Record<string, string> = {
  signature: 'Signature',
  breton: 'Bretagne',
  'a-partager': 'À partager',
  bio: 'Bio*',
  vegetarien: 'Végétarien',
  'octobre-rose': 'Octobre Rose',
}

export function productCard(p: Product, opts: { open?: boolean } = {}): string {
  const done = inList(p.slug)
  const chips = (p.tags ?? []).slice(0, 2).map((t) => `<span class="chip ${t === 'signature' ? 'gold' : ''}">${tagLabels[t]}</span>`).join('')
  const href = url(`produit/?p=${p.slug}`)
  const ph = photoForIllustration(p.illustration)
  return `<article class="pcard" data-cat="${p.cat}" data-slug="${p.slug}">
    <div class="pane${ph ? ' has-photo' : ''}">${ph ? `${photoImg({ ...ph, alt: '' })}<span class="photo-tag">Photo d’illustration</span>` : illo(p.illustration, '')}</div>
    <div class="body">
      <div class="chips">${chips}</div>
      <h3>${esc(p.name)}</h3>
      <p class="tg">${esc(p.tagline)}</p>
      <div class="row"><span class="price">${money(p.priceCents)}</span>
        <button type="button" class="add ${done ? 'done' : ''}" data-add="${p.slug}" aria-label="${done ? 'Ajouté à ma liste' : 'Ajouter à ma liste'} : ${esc(p.name)}">${done ? check : plus}</button>
      </div>
    </div>
    ${opts.open === false ? `<a class="open-btn" href="${href}"><span class="sr">Voir la fiche : ${esc(p.name)}</span></a>` : `<button type="button" class="open-btn" data-open="${p.slug}"><span class="sr">Voir la fiche : ${esc(p.name)}</span></button>`}
  </article>`
}

function allergenBlock(p: Product): string {
  if (p.allergens && p.allergens.length) {
    return `<p>${p.allergens.map((a) => `<span class="chip">${esc(a)}</span>`).join(' ')}</p><p class="note">Liste officielle de la fiche de la boutique. Une contamination croisée est toujours possible.</p>`
  }
  return `<p class="warn">Allergènes : nous consulter en boutique. La liste n’est pas publiée pour ce produit.</p>`
}

/** Full product sheet (drawer and /produit/). Composition, weight and allergens are the official texts. */
export function productSheetParts(p: Product): { pane: string; rest: string } {
  const comp = p.composition && p.composition.length
    ? `<ul>${p.composition.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`
    : '<p class="muted">Composition non publiée : nous consulter en boutique.</p>'
  const flags = [
    p.thawed ? '<p class="note">Contient des ingrédients décongelés. Ne pas recongeler.</p>' : '',
    p.halal === false ? '<p class="note">Produit non halal (mention de la fiche officielle).</p>' : '',
    p.regionOnly ? '<p class="note">Recette proposée seulement à Rennes, Nantes et Guérande.</p>' : '',
    p.tags?.includes('vegetarien') ? '<p class="note">De la gamme Happy, la gamme végétarienne de la carte.</p>' : '',
    p.tags?.includes('bio') ? '<p class="note">Bio* : certaines boulangeries du réseau sont en cours de certification bio. À confirmer en boutique.</p>' : '',
  ].join('')
  const pane = `<div class="sheet-pane">${illo(p.illustration, `Illustration : ${p.name}`)}</div>`
  const rest = `<div>
      <div class="chips">${(p.tags ?? []).map((t) => `<span class="chip ${t === 'signature' ? 'gold' : ''}">${tagLabels[t]}</span>`).join('')}<span class="chip">${catLabels[p.cat]}</span></div>
      <h2 style="margin-top:12px">${esc(p.name)}</h2>
      <p class="price" style="font-size:1.5rem;margin-top:8px">${money(p.priceCents)}</p>
      <p class="note" style="margin-top:6px">Prix Click &amp; Collect Rennes relevé le 13 octobre 2026 ; en boutique, les prix peuvent différer.</p>
    </div>
    <p>${esc(p.description)}</p>
    <dl class="facts">
      <div><dt>Composition</dt><dd>${comp}</dd></div>
      ${p.weightG ? `<div><dt>Poids</dt><dd>${p.weightG >= 1000 ? `${(p.weightG / 1000).toString().replace('.', ',')} kg` : `${p.weightG} g`}</dd></div>` : ''}
      <div><dt>Allergènes</dt><dd>${allergenBlock(p)}</dd></div>
      <div><dt>Moment idéal</dt><dd>${p.dayparts.map((d) => ({ matin: 'Matin', midi: 'Midi', gouter: 'Goûter', soir: 'Soir' })[d]).join(', ')}</dd></div>
      <div><dt>À associer</dt><dd>${esc(p.pairing)} <span class="tag-sample">exemple</span></dd></div>
    </dl>
    ${flags}
    <div class="btn-row">
      <button type="button" class="btn" data-add="${p.slug}">Ajouter à ma liste</button>
      <a class="btn gold" href="${business.urls.clickAndCollect}" target="_blank" rel="noopener">Commander<span class="sr"> (nouvel onglet)</span></a>
    </div>`
  return { pane, rest }
}

export function productSheet(p: Product): string {
  const { pane, rest } = productSheetParts(p)
  return pane + rest
}
