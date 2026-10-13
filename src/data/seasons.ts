// SAMPLE DATA. Replace with client-confirmed data. See PLAN.md §11.
// The collection names come from the network catalogue (real); dates and descriptions are mock.
// « Octobre Rose » with the Nœud Rose sucré is real (Rennes Click & Collect, octobre 2026).

export interface Season {
  month: number
  name: string
  blurb: string
  real: boolean
  slugs: string[]
}

export const seasons: Season[] = [
  { month: 1, name: 'Galette des Rois', blurb: 'La galette de l’Épiphanie, à commander quelques jours avant.', real: false, slugs: [] },
  { month: 2, name: 'Chandeleur', blurb: 'Des douceurs de saison au comptoir pendant une semaine.', real: false, slugs: [] },
  { month: 2, name: 'Saint-Valentin', blurb: 'Choc’O Roi et macarons, en version cadeau.', real: false, slugs: ['choc-o-roi-gateau-en-boite-peuplier', 'macaron-framboise-a-partager'] },
  { month: 4, name: 'Pâques', blurb: 'Chocolats et brioches de printemps.', real: false, slugs: ['grande-brioche-nature'] },
  { month: 6, name: 'Produits d’été', blurb: 'Éclair mojito, tartes aux fruits et verrines fraîches.', real: false, slugs: ['eclair-mojito', 'tarte-aux-fruits-a-partager', 'verrine-cheesecake-citron'] },
  { month: 9, name: 'Rentrée du campus', blurb: 'Formules du midi et cookies pour les premières semaines de cours.', real: false, slugs: ['cookie-3-chocolats', 'croustillant-jambon-beurre'] },
  { month: 9, name: 'Virades de l’Espoir', blurb: 'Opération du réseau en faveur de Vaincre la Mucoviscidose, dans les boulangeries participantes.', real: false, slugs: [] },
  { month: 10, name: 'Octobre Rose', blurb: 'Le Nœud Rose sucré : pâte à croissant et compotée de framboise.', real: true, slugs: ['noeud-rose'] },
  { month: 11, name: 'Collection Beignets', blurb: 'Mini beignets au chocolat ou à la pomme, en lots.', real: false, slugs: ['mini-beignet', 'lot-5-mini-beignets', 'lot-10-mini-beignets'] },
  { month: 12, name: 'Fêtes de fin d’année', blurb: 'Entremets, number cakes et plateaux pour les repas de fête.', real: false, slugs: ['entremet-choc-o-roi-a-partager', 'plateau-de-24-mignardises'] },
]
