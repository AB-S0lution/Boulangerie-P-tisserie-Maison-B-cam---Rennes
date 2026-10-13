# Maison Bécam Rennes (démo non officielle)

- **Concept**: « Lys & Hermine, derrière la verrière ». Palette: navy #023B58, nuit #011D2C, ardoise #283843, lin #F1F4F5, verre #DFE7EC, brume #4F6170, or #C2A862 (seul accent; texte sur clair: #7E6120), schiste #5B3A45. Polices Cormorant Garamond + Montserrat. Rayon 2px partout.
- **Source de vérité**: `PLAN.md`. Ne pas utiliser le logo, les tapisseries ni les photos du franchiseur. Pas de « tout fait maison » (pâtisseries et snacking: décongelé), pas de Gâteau Nantais (`hidden`), prix Capital daté et crédité au réseau, aucun propriétaire nommé, pas de brunch.
- **Lancer**: `npm run dev`; **vérifier**: `npm run typecheck && npm run build`, puis `npm run preview -- --port 4174` (base `/Boulangerie-P-tisserie-Maison-B-cam---Rennes/`).
- **Une page = un HTML + un module** `src/pages/<nom>.ts` (appelle `boot()` de `src/core/shell.ts`). Les HTML sont générés par `scripts/gen-pages.mjs`; la liste des routes est aussi dans `vite.config.ts`. Pages dynamiques par query string (`produit/?p=`, `journal/article/?a=`).
- **Particularités**: le cadran (`src/core/dial.ts`) émet `bec:dial` et teinte verrière, étagère et légendes; « Ma liste » = localStorage `bec-liste`, ne passe jamais commande; thème `bec-theme`; transition de page « porte vitrée » GSAP (flag `sessionStorage bec-door`), View Transitions seulement en reduced-motion.
- **Typographie**: `typo()` (NBSP/NNBSP). Pas de tirets cadratins visibles. Pas de `transition: all`.
- **Données**: `src/data/*.ts`, étiquetées réel/exemple; `products.ts` est généré (ne pas éditer à la main).
- **Git**: ne jamais committer ni pousser sans demande.
