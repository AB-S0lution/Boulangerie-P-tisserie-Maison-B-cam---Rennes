// REAL figures with source and date (PLAN.md §11). Nothing here is invented.

export interface Stat {
  id: string
  value: string
  label: string
  source: string
  date: string
}

export const stats: Stat[] = [
  { id: 'surface', value: '300 m²', label: 'de boutique et de salon de thé', source: 'Presse locale 2025', date: '2025' },
  { id: 'places', value: '50', label: 'places assises à l’intérieur', source: 'Rennes Infos Autrement et Ouest-France', date: '2025' },
  { id: 'jours', value: '7/7', label: 'ouvert tous les jours', source: 'Fiche boutique', date: '2026-10' },
  { id: 'horaires', value: '7 h - 20 h', label: 'sans interruption', source: 'Fiche boutique', date: '2026-10' },
  { id: 'avis', value: '4,6/5', label: 'sur Google, plus de 1 000 avis', source: 'Avis Google, via Restaurant Guru', date: '2026-10' },
  { id: 'produits', value: '211', label: 'produits en Click & Collect', source: 'Click & Collect Rennes', date: '2026-10-13' },
  { id: 'bretagne', value: '2', label: 'recettes réservées à Rennes, Nantes et Guérande', source: 'Fiches produit officielles', date: '2026-10-13' },
  { id: 'maison', value: '28e', label: 'maison du réseau, première en Bretagne', source: 'Blog Maison Bécam', date: '2025-04' },
  { id: 'reseau', value: '41', label: 'boulangeries dans le réseau', source: 'maisonbecam.com', date: '2026-10' },
  { id: 'fondation', value: '2005', label: 'fondation du réseau à Angers', source: 'maisonbecam.com', date: '2026' },
]
