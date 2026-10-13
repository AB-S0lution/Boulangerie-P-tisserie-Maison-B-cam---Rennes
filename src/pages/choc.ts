import { boot } from '../core/shell'
import { money, url } from '../core/dom'
import { illo, lysIcon } from '../core/art'
import { buildHTML, mountBuild } from '../core/build'
import { pageHead, commanderBtn, secHead } from '../core/parts'
import { productBySlug, productCard } from '../core/cards'
import { wireProducts } from '../core/interactions'
import { networkProducts } from '../data/network-products'

const range = ['choc-o-roi-caramel-individuel', 'choc-o-roi-chocolat-individuel', 'choc-o-roi-vanille-individuel', 'entremet-choc-o-roi-a-partager', 'choc-o-roi-gateau-en-boite-patissiere', 'choc-o-roi-gateau-en-boite-peuplier', 'choc-o-roi-coupe-en-14']
  .map((s) => productBySlug(s)).filter((p): p is NonNullable<typeof p> => !!p)
const delys = networkProducts.find((n) => n.id === 'delys-des-rois')

const main = `
${pageHead('Le Choc’O Roi, <span class="it">couche par couche</span>', 'Deux sablés bretons au chocolat, une crème pâtissière, une fleur de lys : la signature du réseau Maison Bécam.', 'Choc’O Roi', 'choc')}
<section class="build" data-build aria-labelledby="b-h">
  <div class="container build-in">
    <div>
      <h2 id="b-h" data-split>Cinq couches, dans l’ordre</h2>
      <p class="lead" style="margin-top:14px;color:#dbe6ec">Faites défiler : la boîte se remplit comme à la boutique, avec les mots de la fiche officielle.</p>
      <ol class="layer-list" aria-label="Les couches du Choc’O Roi">
        <li><div><b data-sable-label>Sablé breton chocolat</b><span>Le biscuit sablé de la base.</span></div></li>
        <li><div><b data-cream-label>Crème pâtissière Choc’O Roi (chocolat 65 % selon la presse)</b><span>Elle fait toute la gourmandise.</span></div></li>
        <li><div><b>Une pointe de fleur de sel de Guérande</b><span>Selon la presse locale, le Choc’O Roi est légèrement salé.</span></div></li>
        <li><div><b>Pâte sucrée Fleur de Lys</b><span>Le disque estampé de la fleur de lys d’Anjou.</span></div></li>
        <li><div><b>Boîte ronde en peuplier</b><span>« Naturelle et recyclable », pour le gâteau.</span></div></li>
      </ol>
      <div class="flavours" role="group" aria-label="Parfum de l’individuel"><button type="button" data-f="chocolat" aria-pressed="true">Chocolat</button><button type="button" data-f="caramel" aria-pressed="false">Caramel</button><button type="button" data-f="vanille" aria-pressed="false">Vanille</button></div>
    </div>
    ${buildHTML()}
  </div>
</section>

<section class="section" aria-labelledby="hist-h">
  <div class="container two">
    <div><h2 id="hist-h" data-split>Né à Angers, servi à Rennes</h2></div>
    <div class="prose" data-reveal>
      <p>Le Choc’O Roi a été lancé le 3 février 2013 au château du Roi René, à Angers. Il a reçu depuis le label « Produit en Anjou ». C’est une marque déposée du réseau Maison Bécam, vendue seulement dans ses boutiques.</p>
      <p>La fleur de lys qui le coiffe est celle des armes de l’Anjou. À Rennes, elle croise l’hermine : une fleur de sel de Guérande plus tard, il est tout à fait breton.</p>
      <p class="muted small">Source : maisonbecam.com (notre histoire), presse locale 2025. Le Choc’O Roi est une création du réseau, pas de la boutique de Rennes.</p>
    </div>
  </div>
</section>

<section class="section tight" aria-labelledby="gam-h">
  <div class="container">
    ${secHead('La gamme à Rennes', 'Individuels, entremet, gâteau en boîte et gâteau coupé en 14 parts. Prix Click & Collect relevés le 13 octobre 2026.').replace('<h2 ', '<h2 id="gam-h" ')}
    <div class="pgrid">${range.map((p) => productCard(p, { open: false })).join('')}</div>
    <div class="box" style="margin-top:36px" data-reveal><h3>Délys des Rois</h3><p class="muted">Les biscuits du réseau, en sachet de 10 à ${delys?.priceCents ? money(delys.priceCents) : 'prix à confirmer'} sur le site du réseau. Disponibilité à Rennes à confirmer : selon disponibilité.</p></div>
    <div class="btn-row" style="margin-top:28px">${commanderBtn('gold')}<a class="btn" href="${url('la-carte/?cat=patisserie')}">Toute la pâtisserie</a></div>
    <p class="small muted" style="margin-top:20px">${lysIcon(16)} Les pâtisseries viennent de l’atelier du réseau et sont indiquées « contient des ingrédients décongelés. Ne pas recongeler. »</p>
  </div>
</section>
<section class="section tight on-nuit"><div class="container" style="display:grid;place-items:center;gap:12px;text-align:center">${illo('poplarbox')}<p class="lead" style="color:#dbe6ec">La boîte ronde en peuplier : une table mise en une seconde.</p></div></section>`

boot({ nav: 'choc-o-roi/', main, setup(root) { wireProducts(); const b = root.querySelector<HTMLElement>('[data-build]'); if (b) mountBuild(b) } })
