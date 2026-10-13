// Site map (PLAN.md §10). Paths are relative to the base URL, with a trailing slash.

export interface NavItem {
  path: string
  label: string
  short?: string
}

export const mainNav: NavItem[] = [
  { path: 'la-carte/', label: 'La carte' },
  { path: 'choc-o-roi/', label: 'Choc’O Roi' },
  { path: 'la-journee/', label: 'La journée' },
  { path: 'la-maison/', label: 'La maison' },
  { path: 'le-quartier/', label: 'Le quartier' },
  { path: 'journal/', label: 'Journal' },
  { path: 'contact/', label: 'Contact' },
]

export const moreNav: NavItem[] = [
  { path: 'commandes-evenements/', label: 'Commandes & événements' },
  { path: 'click-and-collect/', label: 'Click & Collect' },
  { path: 'galerie/', label: 'Galerie' },
  { path: 'avis/', label: 'Avis' },
  { path: 'fidelite/', label: 'Les Lys d’Or' },
  { path: 'faq/', label: 'FAQ' },
]

export const legalNav: NavItem[] = [
  { path: 'mentions-legales/', label: 'Mentions légales' },
  { path: 'confidentialite/', label: 'Confidentialité' },
]
