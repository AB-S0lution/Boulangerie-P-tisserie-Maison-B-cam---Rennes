import { boot } from '../core/shell'
import { $, $$, esc, money, setHTML, url } from '../core/dom'
import { illo, verriere, lysIcon } from '../core/art'
import { dialHTML, mountDials } from '../core/dial'
import { dayparts, type Daypart } from '../data/dayparts'
import { business } from '../data/business'
import { productBySlug, productCard } from '../core/cards'
import { wireProducts } from '../core/interactions'
import { buildHTML, mountBuild } from '../core/build'
import { mountPan } from '../core/pan'
import { gsap, initMarquee } from '../core/motion'
import { customerWords, ratingSnapshot } from '../data/reviews'
import { quoteCard, hoursTable, mapPane, wireMap, ccSteps, postCards, secHead, commanderBtn } from '../core/parts'
import { products } from '../data/products'
import { prefersReducedMotion } from '../core/dom'
import type { DialDetail } from '../core/dial'
import { photo, photos, photoImg } from '../data/photos'

const count = (c: string) => products.filter((p) => p.cat === c && !p.hidden).length

const dayPanes = dayparts
  .map((d, i) => {
    const chips = d.picks.slice(0, 4).map((s) => productBySlug(s)).filter(Boolean).map((p) => `<span class="chip">${esc(p!.name)}</span>`).join('')
    const art = ['flute', 'croissant', 'sandwich', 'chocoroi', 'plateau', 'lys'][i]
    return `<article class="day-pane" aria-label="${d.hour} : ${d.title}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><span class="hr">${d.hour.replace(' h', '')}<span style="font-size:.35em;margin-left:4px">h</span></span>${illo(art)}</div>
      <div><h3>${d.title}</h3><p style="margin-top:10px">${d.chapter}</p></div>
      <div class="items">${chips}</div>
    </article>`
  })
  .join('')

const main = `
<section class="hero" aria-labelledby="h1">
  <div class="container hero-grid">
    <div class="copy">
      <h1 id="h1" data-split>L’artisanat à <span class="it">toute heure</span> de la journée</h1>
      <p class="sub" data-reveal>Au pied du métro Jules Ferry, face au campus. Ouvert 7 jours sur 7, de 7 h à 20 h.</p>
      <div class="btn-row" data-reveal>${commanderBtn('gold')}<a class="btn ghost" href="${url('la-carte/')}">Voir la carte</a></div>
    </div>
    <div class="verriere-wrap" data-part-target data-part="midi">${verriere()}</div>
  </div>
  ${dialHTML(false)}
</section>

<section class="section photo-band" aria-labelledby="pb-h">
  <div class="container pb-grid">
    <figure class="pb-main" data-reveal>${photoImg(photo('fournil-verriere'))}<figcaption>Photo d’illustration (Unsplash), pas la boutique</figcaption></figure>
    <div class="pb-copy">
      <h2 id="pb-h" data-split>Le fournil <span class="it">derrière la verrière</span></h2>
      <p class="lead" data-reveal>Pétrissage, façonnage, cuisson : à Rennes, le fournil se regarde depuis la salle. Ces photos d’illustration donnent l’ambiance, en attendant les vraies.</p>
      <div class="pb-mini" data-reveal>${['petrissage', 'baguettes', 'deux-croissants', 'tartes-fruits'].map((s) => `<figure>${photoImg(photo(s), 'photo')}</figure>`).join('')}</div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="vitrine-h">
  <div class="container">
    <div class="sec-head"><h2 id="vitrine-h" data-split>En vitrine maintenant</h2><p class="lead" data-reveal data-shelf-caption></p></div>
    <div class="shelf" data-shelf aria-live="polite"></div><p class="swipe-hint" aria-hidden="true"><span>Faites glisser</span></p>
  </div>
</section>

<section class="day" aria-labelledby="day-h" data-pan>
  <div class="container day-intro"><h2 id="day-h" data-split style="color:#fff;max-width:18ch">Une journée rue Jean Guéhenno</h2><p class="lead" data-reveal style="color:#dbe6ec;margin-top:14px">Six moments, de la première flûte à la fermeture de la verrière.</p></div>
  <div class="day-pin"><div class="day-track">${dayPanes}</div><div class="day-progress" aria-hidden="true"><i></i></div></div>
</section>

<section class="build" aria-labelledby="build-h" data-build>
  <div class="container build-in">
    <div>
      <h2 id="build-h" data-split>Le Choc’O Roi, <span class="it" style="color:var(--or)">couche par couche</span></h2>
      <p class="lead" data-reveal style="margin-top:14px;color:#dbe6ec">La signature du réseau Maison Bécam, née à Angers en 2013 et servie à Rennes en individuel dès 3,90 €.</p>
      <ol class="layer-list" aria-label="Les couches du Choc’O Roi">
        <li><div><b data-sable-label>Sablé breton chocolat</b><span>La base, croquante.</span></div></li>
        <li><div><b data-cream-label>Crème pâtissière Choc’O Roi (chocolat 65 % selon la presse)</b><span>Épaisse, étalée sur le sablé.</span></div></li>
        <li><div><b>Une pointe de fleur de sel de Guérande</b><span>Pour relever le chocolat.</span></div></li>
        <li><div><b>Pâte sucrée Fleur de Lys</b><span>Le disque du dessus, estampé de la fleur de lys d’Anjou.</span></div></li>
        <li><div><b>Boîte ronde en peuplier</b><span>Naturelle et recyclable, pour le gâteau à partager.</span></div></li>
      </ol>
      <div class="flavours" role="group" aria-label="Parfum de l’individuel"><button type="button" data-f="chocolat" aria-pressed="true">Chocolat</button><button type="button" data-f="caramel" aria-pressed="false">Caramel</button><button type="button" data-f="vanille" aria-pressed="false">Vanille</button></div>
      <div class="btn-row" style="margin-top:22px"><a class="btn gold" href="${url('choc-o-roi/')}">Découvrir le Choc’O Roi</a></div>
    </div>
    ${buildHTML()}
  </div>
</section>

<section class="section" aria-labelledby="metiers-h">
  <div class="container">
    ${secHead('Un lieu de vie, six métiers', 'Boulangerie, viennoiserie, pâtisserie, snacking, apéritif et salon de thé : tout se choisit au même endroit.').replace('<h2 ', '<h2 id="metiers-h" ')}
    <div class="bento">
      <a class="cell navy" href="${url('la-carte/?cat=boulangerie')}" data-reveal><div><h3>Boulangerie</h3><p>Flûte Bécam, gamme Plantagenêt, pain petit épeautre doré. ${count('boulangerie')} références, pétries et cuites sur place.</p></div>${illo('flute')}</a>
      <a class="cell gold" href="${url('la-carte/?cat=viennoiserie')}" data-reveal><div><h3>Viennoiserie</h3><p>${count('viennoiserie')} références, du croissant au kouign-amann.</p></div>${illo('croissant')}</a>
      <a class="cell glass" href="${url('la-carte/?cat=patisserie')}" data-reveal><div><h3>Pâtisserie</h3><p>${count('patisserie')} références de l’atelier du réseau, dont le Choc’O Roi.</p></div>${illo('eclair')}</a>
      <a class="cell" href="${url('la-carte/?cat=snacking')}" data-reveal><div><h3>Snacking</h3><p>${count('snacking')} références assemblées en boutique, formules dès 7,90 €.</p></div>${illo('sandwich')}</a>
      <a class="cell" href="${url('commandes-evenements/')}" data-reveal><div><h3>Apéritif</h3><p>${count('aperitif')} plateaux et préfou, à commander.</p></div>${illo('plateau')}</a>
      <a class="cell navy" href="${url('la-journee/')}" data-reveal><div><h3>Salon de thé</h3><p>Environ 50 places, café en grains, chocolat chaud.</p></div>${illo('cup')}</a>
    </div>
  </div>
</section>

<section class="section tight" aria-labelledby="bz-h">
  <div class="container">
    <div class="breton" data-reveal>
      <div class="intro"><h2 id="bz-h" style="font-size:clamp(1.8rem,3vw,2.6rem)">Seulement en Bretagne</h2><p>Le kouign-amann et le far breton individuels sont proposés seulement à Rennes, Nantes et Guérande.</p><a class="btn gold" style="justify-self:start" href="${url('la-carte/?tag=breton')}">Voir les recettes bretonnes</a></div>
      <div class="item">${illo('kouign')}<h3>Kouign-amann</h3><p class="muted small">Pâte à croissant, beurre, sucre.</p><span class="price">${money(295)}</span></div>
      <div class="item">${illo('far')}<h3>Far breton</h3><p class="muted small">Pruneaux, lait, farine, œufs, vanille.</p><span class="price">${money(350)}</span></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="fv-h">
  <div class="container glass-quote">
    <div>
      <h2 id="fv-h" data-split>Le fournil à vue</h2>
      <blockquote style="margin-top:22px" data-reveal><p class="q-big">« On pétrit, on façonne, on cuit tout sur place derrière une grande verrière où les clients peuvent voir les boulangers à l’œuvre. »</p><p class="q-src">L’équipe de la boutique, Rennes Infos Autrement, avril 2025.</p></blockquote>
      <p class="muted" style="margin-top:18px;max-width:52ch" data-reveal>Précision : ce sont les pains et les viennoiseries qui sont travaillés dans la boutique. Les pâtisseries viennent de l’atelier du réseau, sandwichs et salades sont assemblés sur place.</p>
    </div>
    <div class="panes-art" role="img" aria-label="Six vitres de la verrière avec des illustrations de pain et de viennoiseries" data-reveal>${['flute', 'boule', 'croissant', 'painchoc', 'kouign', 'pave'].map((k, i) => `<div style="background:var(--tint-${['matin', 'metro', 'midi', 'gouter', 'soir', 'matin'][i]})">${illo(k)}</div>`).join('')}</div>
  </div>
</section>

<section class="section on-nuit" aria-labelledby="avis-h">
  <div class="container">
    <div class="rating" data-reveal><span class="big">4,6</span><div><span class="stars" aria-hidden="true">★★★★★</span><h2 id="avis-h" style="font-size:clamp(1.5rem,2.4vw,2rem);margin-top:4px">sur Google · plus de 1 000 avis</h2><p class="small muted">Relevé ${ratingSnapshot.seen}, ${ratingSnapshot.source}.</p></div></div>
    <div class="quotes" style="margin-top:32px">${quoteCard(4)}${quoteCard(9)}${quoteCard(10)}</div>
    <div class="marquee" aria-label="Les mots des clients" data-marquee><div class="marquee-track">${[...customerWords, ...customerWords].map((w, i) => `<span class="${i >= customerWords.length ? 'dup' : ''}" ${i >= customerWords.length ? 'aria-hidden="true"' : ''}>${w}</span>`).join('')}</div></div>
    <div class="btn-row" style="margin-top:28px"><a class="btn ghost" href="${url('avis/')}">Lire tous les avis</a></div>
  </div>
</section>

<section class="section" aria-labelledby="cc-h">
  <div class="container cc-band">
    <div><h2 id="cc-h" data-split>Moins d’attente avec le Click &amp; Collect</h2>${ccSteps()}<div class="btn-row" style="margin-top:22px">${commanderBtn('gold')}<a class="btn" href="${url('click-and-collect/')}">Préparer ma liste</a></div></div>
    <div class="code-card" data-reveal><span class="label">Code promo plateforme</span><b>${business.promoCode}</b><p class="muted">10 % de réduction dès 5 € d’achat. À vérifier au moment de commander.</p></div>
  </div>
</section>

<section class="section tight" aria-labelledby="pl-h">
  <div class="container place">
    <div><h2 id="pl-h" data-split style="margin-bottom:22px">Au pied du métro Jules Ferry</h2>${mapPane(['metro', 'droit', 'thabor', 'lices'])}</div>
    <div><h3 style="margin-bottom:10px">Horaires</h3>${hoursTable()}<div class="btn-row" style="margin-top:20px"><a class="btn" href="${url('le-quartier/')}">Plan et accès</a><a class="btn ghost" href="tel:${business.phone.tel}">${business.phone.display}</a></div></div>
  </div>
</section>

<section class="section tight photo-strip-sec" aria-labelledby="ps-h">
  <div class="container"><div class="sec-head"><h2 id="ps-h" data-split>Du four <span class="it">à la vitrine</span></h2><p class="lead" data-reveal>Pains, viennoiseries, pâtisseries : un aperçu en images. <span class="tag-sample">Photos d’illustration</span></p></div></div>
  <div class="photo-strip" role="list">${photos.filter((p) => ['Pains', 'Viennoiserie', 'Pâtisserie', 'Vitrine'].includes(p.theme)).slice(0, 14).map((p) => `<figure role="listitem">${photoImg(p)}<figcaption>${p.alt}</figcaption></figure>`).join('')}</div>
  <div class="container"><p class="swipe-hint" aria-hidden="true"><span>Faites glisser</span></p></div>
  <div class="container"><div class="btn-row" style="margin-top:20px"><a class="btn" href="${url('galerie/')}">Toute la galerie</a></div></div>
</section>

<section class="section tight" aria-labelledby="j-h">
  <div class="container">${secHead('Le journal de la maison').replace('<h2 ', '<h2 id="j-h" ')}${postCards(3)}<div class="btn-row" style="margin-top:24px"><a class="btn" href="${url('journal/')}">Tous les articles</a></div></div>
</section>`

function renderShelf(part: Daypart): void {
  const shelf = $('[data-shelf]')
  const cap = $('[data-shelf-caption]')
  if (!shelf) return
  const items = part.picks.map((s) => productBySlug(s)).filter((p): p is NonNullable<typeof p> => !!p)
  setHTML(shelf, items.map((p) => productCard(p)).join(''))
  if (cap) setHTML(cap, `${part.hour} · ${part.title}. ${part.caption}`)
  if (!prefersReducedMotion()) {
    gsap.from(shelf.children, { y: 36, opacity: 0, rotate: 1.2, duration: 0.7, ease: 'expo.out', stagger: 0.05, overwrite: true })
  }
}

let shelfKey = ''

boot({
  nav: '',
  main,
  setup(root) {
    wireProducts()
    document.addEventListener('bec:dial', (e) => {
      const d = (e as CustomEvent<DialDetail>).detail
      const key = d.part.key
      if (shelfKey !== key) { shelfKey = key; renderShelf(d.part) }
    })
    mountDials(true)
    mountPan($('[data-pan]', root) as HTMLElement)
    mountBuild($('[data-build]', root) as HTMLElement)
    const mq = $('[data-marquee]', root)
    if (mq) initMarquee(mq)
    wireMap(root)
    // Hero intro: the fogged panes clear in a staggered diagonal wipe.
    if (!prefersReducedMotion()) {
      gsap.to($$('.verriere .fog', root), { opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.15 })
    }
    void lysIcon
  },
})
