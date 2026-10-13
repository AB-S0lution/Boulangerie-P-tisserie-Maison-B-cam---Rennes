import { boot } from '../core/shell'
import { money, url } from '../core/dom'
import { pageHead, secHead, commanderBtn } from '../core/parts'
import { plateauHints } from '../data/plateaux'
import { productBySlug, productCard, visibleProducts } from '../core/cards'
import { wireProducts } from '../core/interactions'
import { business } from '../data/business'
import { illo } from '../core/art'

const rows = plateauHints.map((h) => ({ h, p: productBySlug(h.slug) })).filter((x) => x.p)
const share = visibleProducts.filter((p) => p.cat === 'patisserie' && (p.tags ?? []).includes('a-partager') && !p.slug.includes('number')).slice(0, 8)
const numbers = ['number-cake-1-chiffre-lettre-20-25pers', 'petit-number-cake-1-chiffre-lettre-10-15pers'].map((s) => productBySlug(s)!).filter(Boolean)
const occ = [
  ['Anniversaire', 'Number Cake, Choc’O Roi à partager, mini choux.'],
  ['Pot de thèse', 'Plateaux de navettes, gougères et mignardises.'],
  ['Séminaire de fac', 'Quiches, focaccias, mini viennoiseries pour le café d’accueil.'],
  ['Apéritif entre amis', 'Préfou, palines, petits roulés.'],
]

const main = `
${pageHead('Commandes et <span class="it">événements</span>', 'Plateaux apéritifs, entremets, tartes et number cakes : commandez la veille avant 18 h.', 'Commandes et événements', 'commandes')}
<section class="section" aria-labelledby="p-h"><div class="container">
  ${secHead('Les plateaux apéritifs', '24 formats, du plateau de 12 navettes au plateau de 65 chouquettes. Prix du Click & Collect de Rennes, octobre 2026 ; nombre de convives donné à titre d’exemple.').replace('<h2 ', '<h2 id="p-h" ')}
  <div class="scroll-x"><table class="tbl"><thead><tr><th>Plateau</th><th>Convives <span class="tag-sample">exemple</span></th><th>Occasion <span class="tag-sample">exemple</span></th><th>Prix</th></tr></thead><tbody>${rows.map(({ h, p }) => `<tr><td><a class="link" href="${url('produit/?p=' + h.slug)}">${p!.name}</a></td><td>${h.guests}</td><td>${h.occasion}</td><td class="price">${money(p!.priceCents)}</td></tr>`).join('')}</tbody></table></div>
</div></section>
<section class="section tight" aria-labelledby="e-h"><div class="container">
  ${secHead('Entremets et tartes à partager', 'Pâtisseries de l’atelier du réseau, à commander la veille.').replace('<h2 ', '<h2 id="e-h" ')}
  <div class="pgrid">${share.map((p) => productCard(p, { open: false })).join('')}</div>
</div></section>
<section class="section tight on-nuit" aria-labelledby="n-h"><div class="container two">
  <div><h2 id="n-h" data-split>Number Cake</h2><p class="lead" style="margin-top:14px;color:#dbe6ec" data-reveal>Un chiffre ou une lettre, au chocolat ou à la framboise. Pour 10 à 15 personnes, ou pour 20 à 25.</p><div class="btn-row" style="margin-top:20px">${commanderBtn('gold')}</div></div>
  <div class="three" style="grid-template-columns:repeat(2,1fr)">${numbers.map((p) => `<div class="box">${illo('numbercake')}<h3 style="font-size:1.2rem">${p.name}</h3><p class="price">${money(p.priceCents)}</p></div>`).join('')}</div>
</div></section>
<section class="section" aria-labelledby="c-h"><div class="container">
  ${secHead('Comment commander').replace('<h2 ', '<h2 id="c-h" ')}
  <ol class="steps" style="max-width:720px"><li><div><b>Choisissez dans la carte</b><span>Préparez « Ma liste » ou notez les références. <span class="tag-sample">exemple</span></span></div></li><li><div><b>Commandez en ligne avant 18 h</b><span>Retrait le lendemain, de 7 h à 20 h.</span></div></li><li><div><b>Une demande particulière ?</b><span>Appelez le ${business.phone.display} (adresse e-mail de la boutique à confirmer).</span></div></li></ol>
  <div class="three" style="margin-top:36px">${occ.map(([t, d]) => `<div class="box" data-reveal><h3>${t}</h3><p class="muted">${d}</p><span class="tag-sample" style="justify-self:start">idée d’exemple</span></div>`).join('')}</div>
  <div class="btn-row" style="margin-top:32px">${commanderBtn('gold')}<a class="btn" href="tel:${business.phone.tel}">Appeler le ${business.phone.display}</a><a class="btn ghost" href="${url('click-and-collect/')}">Ma liste</a></div>
</div></section>`

boot({ nav: 'commandes-evenements/', main, setup() { wireProducts() } })
