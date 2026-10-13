// REAL quotes (PLAN.md §4), attributed to the platform only, never to a person.
// Accents restored on the Pâtisserie.net quotes; no word changed. Complaints are not displayed.

export interface Review {
  id: number
  text: string
  stars: 4 | 5
  platform: 'Google'
  via: 'Restaurant Guru' | 'Pâtisserie.net'
  lang: 'fr' | 'en'
  themes: string[]
}

export const reviews: Review[] = [
  { id: 1, text: 'Overwhelming range of excellent breads and pastries! Wonderful coffee too... Kouign Amann was superb', stars: 5, platform: 'Google', via: 'Restaurant Guru', lang: 'en', themes: ['choix', 'viennoiserie', 'café'] },
  { id: 2, text: 'Very friendly staff and delicious range of artisan products.', stars: 5, platform: 'Google', via: 'Restaurant Guru', lang: 'en', themes: ['accueil'] },
  { id: 3, text: 'Très bons produits et très bon accueil. Ouverte même le dimanche c’est super pratique', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['accueil', 'horaires'] },
  { id: 4, text: 'Très bonne boulangerie, service parfait. La baguette est vraiment excellente.', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['pain', 'accueil'] },
  { id: 5, text: 'La seule boulangerie ouverte un jour férié, merci de nous régaler', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['horaires'] },
  { id: 6, text: 'Un gros point sur l’accueil qui est vraiment très qualitatif tout comme le pain au chocolat praliné.', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['accueil', 'viennoiserie'] },
  { id: 7, text: 'Pain excellent et service parfait !', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['pain', 'accueil'] },
  { id: 8, text: 'Excellent est abordable pour les étudiants', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['prix'] },
  { id: 9, text: 'Une vraie pépite artisanale ! ... un cadre chaleureux, une équipe accueillante et surtout des produits absolument délicieux !', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['accueil', 'lieu'] },
  { id: 10, text: 'Très joli lieu, accueillant, propre, très bien situé proche métro, lieu à retenir', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['lieu'] },
  { id: 11, text: 'L’ambiance est chaleureuse et le personnel est toujours très accueillant.', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['accueil', 'lieu'] },
  { id: 12, text: 'J’aime bien leurs flûtes et leurs horaires d’ouverture très convenable.', stars: 4, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['pain', 'horaires'] },
  { id: 13, text: 'Toujours accueillante et souriante, elle sait conseiller avec professionnalisme', stars: 5, platform: 'Google', via: 'Pâtisserie.net', lang: 'fr', themes: ['accueil'] },
]

export const ratingSnapshot = { rating: 4.6, count: 1051, seen: 'octobre 2026', source: 'Google, via Restaurant Guru', note: 'À revérifier sur Google Maps avant publication.' }

export const praiseThemes = [
  { id: 'accueil', label: 'L’accueil', blurb: 'Souriant et chaleureux, cité en premier dans les avis.' },
  { id: 'pain', label: 'Le pain', blurb: 'La baguette et la flûte reviennent sans cesse.' },
  { id: 'viennoiserie', label: 'Viennoiseries et pâtisseries', blurb: 'Kouign-amann, pain au chocolat praliné, éclairs.' },
  { id: 'horaires', label: 'Les horaires', blurb: 'Ouvert 7 jours sur 7, jours fériés compris selon les avis.' },
  { id: 'lieu', label: 'Le lieu', blurb: 'Propre, joli, tout près du métro.' },
  { id: 'prix', label: 'Les prix', blurb: 'Abordable pour les étudiants.' },
]

export const customerWords = [
  'pépite artisanale', 'chaleureux', 'accueillant', 'souriant', 'délicieux', 'irréprochable', 'super pratique',
  'merci de nous régaler', 'jamais déçu', 'je recommande sans hésiter', 'lieu à retenir', 'large choix',
]
