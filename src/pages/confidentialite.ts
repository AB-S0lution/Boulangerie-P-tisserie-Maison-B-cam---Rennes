import { boot } from '../core/shell'
import { pageHead } from '../core/parts'
import { photoBand } from '../data/photos'

const main = `
${pageHead('<span class="it">Confidentialité</span>', 'Pas de traceur, pas de cookie publicitaire.', 'Confidentialité', 'confidentialite')}
<section class="section tight legal"><div class="container">
  ${photoBand(['farine-plan-travail', 'pains-etageres', 'cafe-table-noire'])}
  <h2>Ce que le site enregistre</h2><p>Dans votre navigateur seulement (stockage local) : « Ma liste » de produits et votre choix de thème (clair, sombre, automatique). Ces informations ne quittent jamais votre appareil. Vous pouvez les supprimer en vidant les données du site.</p>
  <h2>Ce que le site n’enregistre pas</h2><p>Aucun cookie de suivi, aucun outil d’analyse, aucun formulaire envoyé à un serveur. Le champ « lettre de la maison » et le formulaire de contact sont des exemples : le second ouvre simplement votre messagerie.</p>
  <h2>Liens sortants</h2><p>La plateforme de commande, Google Maps et les réseaux sociaux ont leur propre politique de confidentialité.</p>
</div></section>`

boot({ nav: '', main })
