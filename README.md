# Maison Bécam Rennes (démonstration non officielle)

Site de démonstration de la boutique **Boulangerie Pâtisserie Maison Bécam, 69 rue Jean Guéhenno, Rennes**. Maison Bécam est un réseau en franchise (Angers, 2005) : ce site n'est ni édité ni validé par le réseau ni par l'exploitant. Aucun logo, tapisserie ni photo du réseau n'est reproduit ; tout l'imagerie est du SVG original.

Concept : « Lys & Hermine, derrière la verrière ». Une verrière dont la teinte suit l'heure choisie sur un cadran (7 h à 20 h), la carte du Click & Collect réelle de Rennes (211 références, 210 affichées), un Choc'O Roi dessiné couche par couche.

## Lancer

```bash
npm install
npm run dev          # développement
npm run typecheck    # tsc strict
npm run build        # dist/ (base /Boulangerie-P-tisserie-Maison-B-cam---Rennes/)
npm run preview -- --port 4174
```

## Pages (18, un HTML par route)

Accueil, La carte (`la-carte/`), Fiche produit (`produit/?p=slug`), Choc'O Roi, Une journée (`la-journee/`), Commandes et événements, Click & Collect (« Ma liste »), La maison, Le quartier, Journal, Article (`journal/article/?a=slug`), Galerie, Avis, Lys d'Or (fidélité), FAQ, Contact, Mentions légales, Confidentialité. `public/404.html` sert de repli GitHub Pages.

## Pile

Vite (multi-pages) + TypeScript strict + Tailwind v4 (tokens) + CSS écrit à la main ; GSAP + ScrollTrigger (récits épinglés, révélations) ; Lenis (défilement doux, pointeurs fins uniquement) ; polices Cormorant Garamond et Montserrat (Fontsource, auto-hébergées). Mouvement limité à transform et opacity ; `prefers-reduced-motion` donne un état statique (pas de Lenis, pas d'épinglage, transitions de document en fondu).

## Données (`src/data/*.ts`, chaque fichier est étiqueté réel ou exemple)

- Réel : `products.ts` (211 articles relevés sur le Click & Collect de Rennes le 13/10/2026, prix, compositions, allergènes), `business.ts`, `hours.ts`, `reviews.ts` (13 citations Google sans noms, note 4,6 / 1 051 avis), `timeline.ts`.
- Exemple : formules (5), plateaux (24), produits réseau (24), saisons (10), heures calmes, stats (10), fidélité (échelle de 5), quartier (8 repères, 5 transports), équipe, galerie (20), FAQ (14), journal (10 articles).

## Règles de contenu

Pains et viennoiseries : faits sur place ; pâtisseries : atelier du réseau ; snacking : assemblé en boutique (pas de « tout fait maison »). Pas d'allégation « sans gluten ». Allergène inconnu : « nous consulter en boutique ». Gâteau Nantais masqué. Distinction Capital × Statista 2025 : datée, créditée au réseau. Aucun propriétaire nommé. Le brunch n'est pas proposé à Rennes ; terrasse et Too Good To Go : à confirmer.

## Points à valider par le client

Accord du franchiseur ; directeur de la publication ; e-mail de la boutique ; moyens de paiement, accès PMR, stationnement ; terrasse ; actualisation de la note Google ; barème réel des Lys d'Or.

## Déploiement

GitHub Pages via `.github/workflows/deploy.yml`. Les liens internes passent par `url()` (`src/core/dom.ts`) pour respecter la base.
