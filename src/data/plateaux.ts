// SAMPLE DATA. Replace with client-confirmed data. See PLAN.md §11.
// REAL: platter names and prices come from products.ts (aperitif category, Click & Collect Rennes).
// MOCK: the suggested guest counts and occasions below.

export interface PlateauHint {
  slug: string
  guests: string
  occasion: string
}

export const plateauHints: PlateauHint[] = [
  { slug: 'plateau-12-navettes-salees', guests: '4 à 6 personnes', occasion: 'Apéritif entre amis' },
  { slug: 'plateau-32-navettes-salees', guests: '12 à 16 personnes', occasion: 'Pot de département' },
  { slug: 'plateau-de-24-gougeres', guests: '6 à 8 personnes', occasion: 'Apéritif dînatoire' },
  { slug: 'plateau-de-48-gougeres', guests: '12 à 16 personnes', occasion: 'Réception' },
  { slug: 'plateau-de-3-bagels', guests: '3 à 6 personnes', occasion: 'Déjeuner de groupe' },
  { slug: 'plateau-de-3-wraps', guests: '3 à 6 personnes', occasion: 'Réunion d’équipe' },
  { slug: 'plateau-2-palines', guests: '6 à 8 personnes', occasion: 'Apéritif' },
  { slug: 'plateau-4-palines', guests: '12 à 16 personnes', occasion: 'Pot de thèse' },
  { slug: 'plateau-de-2-focaccias-x16', guests: '6 à 8 personnes', occasion: 'Cocktail' },
  { slug: 'plateau-de-4-focaccias-x32', guests: '12 à 16 personnes', occasion: 'Séminaire' },
  { slug: 'plateau-de-12-petits-roules', guests: '4 à 6 personnes', occasion: 'Apéritif' },
  { slug: 'plateau-de-16-petits-roules', guests: '6 à 8 personnes', occasion: 'Anniversaire' },
  { slug: 'plateau-3-quiches-x24', guests: '8 à 10 personnes', occasion: 'Buffet' },
  { slug: 'plateau-6-quiches-x48', guests: '16 à 20 personnes', occasion: 'Séminaire de fac' },
  { slug: 'plateau-2-tartes-fines-salees', guests: '6 à 8 personnes', occasion: 'Cocktail' },
  { slug: 'plateau-de-24-mignardises', guests: '8 à 10 personnes', occasion: 'Fin de repas' },
  { slug: 'plateau-de-24-mini-choux', guests: '8 à 10 personnes', occasion: 'Anniversaire' },
  { slug: 'plateau-de-28-mini-moelleux', guests: '8 à 10 personnes', occasion: 'Goûter de groupe' },
  { slug: 'plateau-24-mini-viennoiseries', guests: '8 à 12 personnes', occasion: 'Petit-déjeuner d’équipe' },
  { slug: 'plateau-15-canneles-bordelais', guests: '10 à 15 personnes', occasion: 'Café d’accueil' },
  { slug: 'plateau-25-mini-beignets', guests: '8 à 12 personnes', occasion: 'Goûter' },
  { slug: 'plateau-65-chouquettes', guests: '20 à 30 personnes', occasion: 'Grande réunion' },
  { slug: 'choc-o-roi-coupe-en-14', guests: '14 parts', occasion: 'Fête de famille' },
  { slug: 'number-cake-1-chiffre-lettre-20-25pers', guests: '20 à 25 personnes', occasion: 'Anniversaire' },
]
