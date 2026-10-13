import { boot } from '../core/shell'
import { $, money, setHTML, url } from '../core/dom'
import { illo, verriere } from '../core/art'
import { dialHTML, mountDials } from '../core/dial'
import { dayparts } from '../data/dayparts'
import { formules, formulesFloor } from '../data/formules'
import { networkProducts } from '../data/network-products'
import { calmDays, calmHourLabels, calmHours } from '../data/calm-hours'
import { pageHead, secHead, quoteCard, commanderBtn } from '../core/parts'
import { productBySlug, productCard } from '../core/cards'
import { wireProducts } from '../core/interactions'
import { business } from '../data/business'
import { photoFigure } from '../data/photos'

const drinks = networkProducts.filter((n) => n.group === 'Boissons chaudes')
const chapterPhoto: Record<string, string> = { matin: 'pains-sortis-four', metro: 'cafe-et-pains', midi: 'sandwich-jambon', gouter: 'vitrine-chocolat', soir: 'pain-sac-kraft', fermeture: 'pains-etageres' }

const chapters = dayparts.map((d) => {
  const items = d.picks.slice(0, 4).map((s) => productBySlug(s)).filter((p): p is NonNullable<typeof p> => !!p)
  return `<section class="section tight" id="${d.key}" aria-labelledby="c-${d.key}">
    <div class="container two">
      <div><p class="label">${d.hour}</p><h2 id="c-${d.key}" data-split style="margin-top:8px">${d.title}</h2><p class="lead" data-reveal style="margin-top:14px">${d.chapter}</p>${photoFigure(chapterPhoto[d.key], 'ph-fig wide', '')}</div>
      <div class="pgrid" style="grid-template-columns:repeat(2,minmax(0,1fr))">${items.map((p) => productCard(p, { open: false })).join('')}</div>
    </div></section>`
}).join('')

const heat = `<div class="scroll-x"><div class="heat" role="img" aria-label="Estimation de l’affluence par heure et par jour, de 7 h à 19 h : plus calme l’après-midi, plus chargé de 8 h à 9 h et à midi en semaine"><div></div>${calmHourLabels.map((h) => `<div class="h">${h}</div>`).join('')}${calmHours.map((row, i) => `<div class="h">${calmDays[i]}</div>${row.map((v) => `<div class="v${v}"></div>`).join('')}`).join('')}</div></div><p class="swipe-hint" aria-hidden="true"><span>Faites glisser</span></p>`

const main = `
${pageHead('La journée, <span class="it">de 7 h à 20 h</span>', 'Petit-déjeuner, formules du midi, goûter, commandes du soir : une boulangerie qui ne ferme pas entre deux.', 'La journée', 'journee')}
<section class="hero" style="padding-bottom:0"><div class="container hero-grid" style="grid-template-columns:1fr;"><div class="verriere-wrap" data-part-target data-part="midi" style="max-width:520px;margin-inline:auto;justify-self:center">${verriere()}</div></div>${dialHTML(false)}</section>
${chapters}
<section class="section" aria-labelledby="f-h"><div class="container">
  ${secHead('Cinq formules, dès ' + money(formulesFloor.cents), 'Le prix de départ vient de la presse locale (Ouest-France, avril 2025). Les contenus ci-dessous sont des exemples, à remplacer par ceux de la boutique.').replace('<h2 ', '<h2 id="f-h" ')}
  <div class="formules">${formules.map((f) => `<article class="formule" data-reveal><div><h3>${f.name}</h3><ul>${f.contents.map((c) => `<li>${c}</li>`).join('')}</ul></div><div><p class="price">${money(f.priceCents)}</p><span class="tag-sample">exemple</span></div></article>`).join('')}</div>
</div></section>
<section class="section tight on-nuit" aria-labelledby="s-h"><div class="container two">
  <div><h2 id="s-h" data-split>Le salon de thé</h2><p class="lead" style="margin-top:14px;color:#dbe6ec" data-reveal>Environ 50 places à l’intérieur, un vrai expresso à partir de grains, du chocolat chaud et du jus d’orange pressée annoncés à l’ouverture.</p><p class="small" style="margin-top:12px;color:#cbd9e1">Une terrasse de 32 places a été annoncée en 2025 : à confirmer avant d’y compter.</p>${photoFigure('salle-bois', 'ph-fig wide', 'Photo d’illustration (Unsplash), pas le salon de thé de Rennes.')}</div>
  <div><h3 style="margin-bottom:10px">Boissons chaudes du réseau</h3><table class="tbl"><tbody>${drinks.map((d) => `<tr><td>${d.name}</td><td class="price">${d.priceCents ? money(d.priceCents) : 'à confirmer'}</td></tr>`).join('')}</tbody></table><p class="small" style="margin-top:10px;color:#cbd9e1">Prix du site du réseau, selon disponibilité à Rennes.</p></div>
</div></section>
<section class="section" aria-labelledby="h-h"><div class="container two">
  <div><h2 id="h-h" data-split>Les heures calmes</h2><p class="lead" style="margin-top:14px" data-reveal>Pour éviter la file, visez l’après-midi ou commandez la veille avant 18 h.</p><p class="small muted" style="margin-top:8px"><span class="tag-sample">estimation</span> Estimation, à titre indicatif : ce graphique n’est pas une mesure.</p><div class="btn-row" style="margin-top:20px">${commanderBtn('gold')}</div></div>
  <div>${heat}</div>
</div></section>
<section class="section tight" aria-labelledby="e-h"><div class="container two">
  <div><h2 id="e-h" data-split>Étudiants, bienvenue</h2><p class="lead" style="margin-top:14px" data-reveal>À 150 m de la fac de droit, avec des formules dès 7,90 € et des viennoiseries à 1,30 €.</p></div>
  <div>${quoteCard(8, true)}${photoFigure('cafe-tasse', 'ph-fig wide', 'Un expresso entre deux cours. Photo d’illustration (Unsplash).')}</div>
</div></section>`

boot({ nav: 'la-journee/', main, setup(root) { wireProducts(); mountDials(false); void $; void setHTML; void url; void business; void illo; root.querySelectorAll('.hero .btn')} })
