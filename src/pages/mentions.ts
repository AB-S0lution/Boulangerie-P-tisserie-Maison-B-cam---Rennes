import { boot } from '../core/shell'
import { business } from '../data/business'
import { pageHead } from '../core/parts'
import { photoBand } from '../data/photos'

const main = `
${pageHead('Mentions <span class="it">légales</span>', 'Site de démonstration non officiel.', 'Mentions légales', 'mentions')}
<section class="section tight legal"><div class="container">
  ${photoBand(['pains-gros-plan', 'comptoir-vitrine', 'rouleau-patissier'])}
  <h2>Nature du site</h2><p>Ce site est une démonstration de design non officielle de la boutique Maison Bécam de Rennes. Il n’est pas édité par le réseau Maison Bécam ni par la société exploitante. Aucune commande n’y est possible. Aucun logo, tapisserie ni photographie du réseau n’est reproduit : les illustrations sont originales.</p>
  <h2>Exploitant de la boutique</h2>
  <ul><li>${business.legalName} ${business.legalForm}, capital de ${business.capital}</li><li>SIREN ${business.siren} · SIRET ${business.siret} · ${business.rcs}</li><li>Siège et boutique : ${business.address.street}, ${business.address.postalCode} ${business.address.city}</li><li>Téléphone : ${business.phone.display}</li><li>Activité : boulangerie et boulangerie-pâtisserie (NAF ${business.naf})</li></ul>
  <h2>Franchise</h2><p>${business.franchisorLine}. Les marques « Maison Bécam » et « Choc’O Roi » appartiennent à leurs titulaires. Le site de la boutique est à valider avec le franchiseur avant toute mise en ligne officielle.</p>
  <h2>Directeur de la publication</h2><p>À renseigner par le client.</p>
  <h2>Hébergement</h2><p>GitHub Pages (GitHub, Inc.), site statique.</p>
  <h2>Données et prix</h2><p>Prix et compositions : relevé du Click &amp; Collect de Rennes le 13 octobre 2026, à titre indicatif. Les textes d’exemple (journal, formules, FAQ, galerie) sont signalés comme tels. Les citations d’avis sont des avis Google, sans noms.</p>
</div></section>`

boot({ nav: '', main })
