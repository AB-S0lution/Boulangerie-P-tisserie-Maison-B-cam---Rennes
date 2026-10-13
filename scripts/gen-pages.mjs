// Generates the multi-page HTML shells (one HTML per route, one TS module per page).
// Run: node scripts/gen-pages.mjs   (the output is committed; this script is only a convenience)
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const NAME = 'Maison Bécam Rennes'
const pages = [
  ['', 'home', 'Boulangerie pâtisserie Maison Bécam, Rennes Jules Ferry : ouvert 7 j/7, 7 h - 20 h', 'Pains, viennoiseries, pâtisseries et snacking au pied du métro Jules Ferry, face au campus. Fournil à vue, Choc’O Roi, Click & Collect. Démo non officielle.'],
  ['la-carte/', 'carte', 'La carte : 210 produits, prix et allergènes', 'Boulangerie, viennoiserie, pâtisserie, snacking et plateaux : prix et compositions du Click & Collect de Rennes (relevé du 13 octobre 2026).'],
  ['produit/', 'produit', 'Fiche produit', 'Composition officielle, poids, allergènes et prix indicatif d’un produit de la carte de Maison Bécam Rennes.'],
  ['choc-o-roi/', 'choc', 'Le Choc’O Roi, couche par couche', 'La signature de Maison Bécam : sablé breton, crème pâtissière, fleur de sel et fleur de lys, né à Angers en 2013.'],
  ['la-journee/', 'journee', 'La journée et le salon de thé', 'De 7 h à 20 h : petit-déjeuner, formules du midi dès 7,90 €, goûter, commandes du soir. Salon de thé d’environ 50 places.'],
  ['commandes-evenements/', 'commandes', 'Commandes et événements', 'Plateaux apéritifs, entremets, tartes et number cakes à commander pour vos événements à Rennes.'],
  ['click-and-collect/', 'cc', 'Click & Collect et ma liste', 'Commandez avant 18 h pour le lendemain, retrait de 7 h à 20 h. Préparez votre liste ici, commandez sur la plateforme.'],
  ['la-maison/', 'maison', 'La maison : de l’Anjou à Rennes', 'L’histoire du réseau Maison Bécam, fondé à Angers en 2005, et de sa 28e boutique, ouverte à Rennes le 22 mars 2025.'],
  ['le-quartier/', 'quartier', 'Le quartier : métro Jules Ferry, campus et Thabor', 'Accès en métro ligne B, bus, vélo ; carte illustrée du quartier de la rue Jean Guéhenno.'],
  ['journal/', 'journal', 'Journal de la maison', 'Coulisses du fournil, saisons, quartier, recettes et conseils. Articles d’exemple.'],
  ['journal/article/', 'article', 'Article du journal', 'Un article du journal de Maison Bécam Rennes (contenu d’exemple).'],
  ['galerie/', 'galerie', 'Galerie d’illustrations', '20 illustrations originales : fournil, vitrine, Choc’O Roi, quartier et saisons.'],
  ['avis/', 'avis', 'Avis : 4,6/5 sur Google', 'Ce que disent les clients : accueil, baguette, horaires 7 jours sur 7. Avis Google réels, sans noms.'],
  ['fidelite/', 'fidelite', 'Les Lys d’Or : programme de fidélité', 'Le programme de fidélité du réseau Maison Bécam : 1 € = 2 Lys d’Or. Participation de Rennes à confirmer.'],
  ['faq/', 'faq', 'FAQ : horaires, commandes, allergènes', 'Réponses aux questions fréquentes sur la boutique de Rennes.'],
  ['contact/', 'contact', 'Contact et accès', '69 rue Jean Guéhenno, 35700 Rennes. Téléphone 02 21 65 61 00. Ouvert tous les jours de 7 h à 20 h.'],
  ['mentions-legales/', 'mentions', 'Mentions légales', 'Mentions légales du site de démonstration : BB FERRY SAS, SIREN 938 606 597.'],
  ['confidentialite/', 'confidentialite', 'Confidentialité', 'Aucun cookie de suivi : le stockage local ne sert qu’à ma liste et au thème.'],
]

const ld = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Boulangerie Pâtisserie Maison Bécam - Rennes',
  legalName: 'BB FERRY',
  address: { '@type': 'PostalAddress', streetAddress: '69 rue Jean Guéhenno', postalCode: '35700', addressLocality: 'Rennes', addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: 48.118358, longitude: -1.671279 },
  telephone: '+33221656100',
  priceRange: '€',
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '07:00', closes: '20:00' }],
  hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJPf3YDyjfDkgROOvn1ag6A68',
  sameAs: ['https://www.instagram.com/maison_becam/', 'https://www.facebook.com/maison.becam/'],
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

for (const [path, mod, title, desc] of pages) {
  const depth = path.split('/').filter(Boolean).length
  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(title)}${mod === 'home' ? '' : ` | ${NAME}`}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#023b58" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#011d2c" />
    <meta name="color-scheme" content="light dark" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="${NAME} (démonstration non officielle)" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta name="twitter:card" content="summary" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script>
      (function () {
        var d = document.documentElement;
        try { var t = localStorage.getItem('bec-theme'); if (t && t !== 'auto') d.setAttribute('data-theme', t); } catch (e) {}
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          d.classList.add('js-motion');
          try { if (sessionStorage.getItem('bec-door') === '1') d.classList.add('door-in'); } catch (e) {}
        }
      })();
    </script>
${mod === 'home' || mod === 'contact' ? `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n` : ''}  </head>
  <body>
    <div id="app"></div>
    <noscript><p style="padding:24px;font-family:sans-serif">Maison Bécam Rennes, 69 rue Jean Guéhenno, 35700 Rennes. Tél. 02 21 65 61 00. Ouvert tous les jours de 7 h à 20 h. Ce site de démonstration a besoin de JavaScript.</p></noscript>
    <script type="module" src="/src/pages/${mod}.ts"></script>
  </body>
</html>
`
  const file = (path === '' ? 'index.html' : `${path}index.html`)
  mkdirSync(dirname(file) || '.', { recursive: true })
  writeFileSync(file, html)
  void depth
}
console.log('pages:', pages.length)
