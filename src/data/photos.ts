// Photos d'illustration Unsplash (licence Unsplash), pas des photos du commerce.
// Aucune de ces images ne montre la boutique de Rennes, ses produits ou le réseau Maison Bécam.
// Fichiers dans public/photos/, servis sous la base Vite (import.meta.env.BASE_URL).

export type PhotoTheme = 'Fournil' | 'Vitrine' | 'Viennoiserie' | 'Pâtisserie' | 'Pains' | 'Salon de thé' | 'Marché'

export interface Photo {
  slug: string
  src: string
  alt: string
  credit: string
  url: string
  w: number
  h: number
  theme: PhotoTheme
}

const raw: [slug: string, id: string, alt: string, w: number, h: number, theme: PhotoTheme, page?: string][] = [
  ['croissants-table', '1623334044303-241021148842', 'Croissants dorés posés en rang sur une table', 1200, 800, 'Viennoiserie'],
  ['croissant-blanc', '1691480162735-9b91238080f6', 'Un croissant seul sur un fond clair', 1200, 1200, 'Viennoiserie'],
  ['croissant-plateau-inox', '1530610476181-d83430b64dcd', 'Croissants entassés sur un plateau en métal', 1200, 1600, 'Viennoiserie'],
  ['deux-croissants', '1555507036-ab1f4038808a', 'Deux croissants feuilletés côte à côte', 1200, 960, 'Viennoiserie'],
  ['pile-croissants', '1700915704616-b455b3679024', 'Croissants empilés, vus de près', 1000, 1000, 'Viennoiserie'],
  ['viennoiserie-plateau', '1612366747681-e4ca6992b1e9', 'Viennoiseries sur un plateau en bois à côté d’une tasse', 1000, 1151, 'Viennoiserie'],
  ['pain-sac-kraft', '1599819055803-717bba43890f', 'Pains dans un sac en papier kraft', 1200, 800, 'Pains'],
  ['comptoir-vitrine', '1546237769-6f84ec1a512a', 'Comptoir vitré d’une boulangerie garni de pains', 1200, 1200, 'Vitrine'],
  ['pains-gros-plan', '1590301157172-7ba48dd1c2b2', 'Miche coupée en deux montrant sa mie alvéolée, sur papier cuisson', 1200, 1600, 'Pains'],
  ['pain-vitrine-verre', '1620830958756-46335282c574', 'Pains alignés derrière une vitrine en verre', 1200, 800, 'Vitrine'],
  ['vitrine-patisseries', '1643944471768-2d2eac3afb6d', 'Vitrine remplie de pâtisseries variées', 1200, 797, 'Vitrine'],
  ['boulangerie-rue', '1536782896453-61d09f3aaf3e', 'Intérieur d’une boulangerie, comptoir et étagères de pains', 1000, 1500, 'Vitrine'],
  ['etals-patisseries', '1638202956270-8167b5c88ce6', 'Boulangerie aux étals pleins de pâtisseries', 1000, 1333, 'Vitrine'],
  ['fournil-verriere', '1504128668912-f893e6606db6', 'Boulanger au travail derrière une paroi vitrée', 1200, 800, 'Fournil'],
  ['pain-vitrine-2', '1604908552986-eb22824b2150', 'Pains sur un présentoir vitré', 1000, 1250, 'Vitrine'],
  ['pains-etageres', '1568254183919-78a4f43a2877', 'Pains rangés sur des étagères', 1200, 801, 'Pains'],
  ['plateau-douceurs', '1483695028939-5bb13f8648b0', 'Plaques de pains au chocolat et de viennoiseries en vitrine', 1200, 800, 'Pâtisserie'],
  ['tartes-fruits', '1583338917451-face2751d8d5', 'Tartes aux fruits et gâteaux au chocolat sur des étagères vitrées', 1200, 1800, 'Pâtisserie'],
  ['vitrine-chocolat', '1534432182912-63863115e106', 'Gâteaux, muffins et pâtisseries sur un comptoir', 1000, 1500, 'Pâtisserie'],
  ['cafe-et-pains', '1515823662972-da6a2e4d3002', 'Une tasse de café entourée de quatre petits pains', 1000, 1500, 'Viennoiserie'],
  ['tarte-fruits-rouges', '1620980776848-84ac10194945', 'Tarte aux fraises et aux myrtilles sur une table en bois', 900, 1350, 'Pâtisserie'],
  ['macarons', '1558326567-98ae2405596b', 'Macarons colorés sur une table', 1200, 1518, 'Pâtisserie'],
  ['baguette-planche', '1728670212431-ac192413f4b1', 'Pain posé sur une planche à découper en bois', 900, 1200, 'Pains'],
  ['pain-miche', '1568471173242-461f0a730452', 'Une miche de pain à la croûte farinée', 1200, 822, 'Pains'],
  ['miches-gros-plan', '1677329175333-c08df2a3181d', 'Miches de pain serrées, vues de près', 900, 1200, 'Pains'],
  ['baguettes', '1554475659-9fd915c8f156', 'Baguettes dorées', 1000, 1250, 'Pains'],
  ['cagette-pains', '1647544301296-2c8225f38ea9', 'Cagette remplie de pains', 1000, 1503, 'Pains'],
  ['sandwich-jambon', '1550507992-eb63ffee0847', 'Sandwich jambon-fromage', 1200, 800, 'Vitrine'],
  ['tranches-pain', '1533782654613-826a072dd6f3', 'Morceaux de baguette empilés', 1200, 1500, 'Pains'],
  ['petrissage', '1517686469429-8bdb88b9f907', 'Mains qui façonnent une pâte près d’un rouleau en bois', 1200, 800, 'Fournil'],
  ['farine-plan-travail', '1732565649629-eb4932a1ec09', 'Farine saupoudrée sur un plan de travail', 1000, 1500, 'Fournil'],
  ['pate-mains', '1612884610549-ce221d92514a', 'Pâte blanche tenue à deux mains sur une table en bois', 1200, 1800, 'Fournil'],
  ['rouleau-patissier', '1480215825332-69732b261cc2', 'Rouleau à pâtisserie sur une pâte farinée', 1200, 800, 'Fournil'],
  ['pain-plateau-rond', '1549413468-cd78edb7e75c', 'Pains ronds farinés et grignés posés sur une toile de jute', 1200, 1800, 'Pains'],
  ['pains-sortis-four', '1547197309-082bdc50ce8b', 'Pains tout juste sortis du four', 1200, 652, 'Fournil'],
  ['cafe-tasse', '1572286258217-40142c1c6a70', 'Un expresso dans une tasse bleu nuit, vu du dessus', 1200, 1500, 'Salon de thé', 'maO-qIKLqi8'],
  ['cafe-table-noire', '1738197112505-f79710be93b5', 'Tasse à café blanche sur une table noire brillante', 1200, 1735, 'Salon de thé', 'BYYvJl3tIqY'],
  ['salle-bois', '1544031064-9de80864ade5', 'Salle de café lumineuse, tables et chaises en bois', 1200, 801, 'Salon de thé', 'k6w8miMpfUI'],
  ['marche-legumes', '1591586116988-62fe65164f8d', 'Étal de marché : chou-fleur, brocoli, radis et oignons nouveaux', 1200, 981, 'Marché', 'Zaiuy5dKeCk'],
  ['quiche', '1721460195314-b18fa6e64a10', 'Quiche aux asperges vertes sur un plan de travail', 1200, 900, 'Vitrine', 'PD6nysl7yZI'],
  ['salade-bol', '1547496502-affa22d38842', 'Salade composée dans un bol sombre : avocat, tomates cerises, sésame', 1200, 1029, 'Vitrine', 'AiHJiRCwB3w'],
  ['marche-etals', '1651346846962-713719196b8d', 'Étals de légumes et de tomates sur un marché en plein air', 1200, 800, 'Marché', '11dJNhmL5vk'],
]

export const photos: Photo[] = raw.map(([slug, id, alt, w, h, theme, page]) => ({
  slug,
  src: `${import.meta.env.BASE_URL}photos/${slug}.jpg`,
  alt,
  credit: 'Unsplash',
  url: `https://unsplash.com/photos/${page ?? id}`,
  w,
  h,
  theme,
}))

export const photoThemes: PhotoTheme[] = ['Fournil', 'Vitrine', 'Viennoiserie', 'Pâtisserie', 'Pains', 'Salon de thé', 'Marché']

const bySlug = new Map(photos.map((p) => [p.slug, p]))
export const photo = (slug: string): Photo => bySlug.get(slug) ?? photos[0]

/** Illustration key (products, posts) → illustrative photo. Keys without a match keep their drawing. */
const byIllustration: Record<string, string> = {
  croissant: 'deux-croissants',
  painchoc: 'viennoiserie-plateau',
  brioche: 'pile-croissants',
  chausson: 'croissant-plateau-inox',
  kouign: 'croissants-table',
  boule: 'pain-miche',
  pave: 'miches-gros-plan',
  flute: 'baguettes',
  painmie: 'tranches-pain',
  sandwich: 'sandwich-jambon',
  tarte: 'tarte-fruits-rouges',
  macaron: 'macarons',
  eclair: 'vitrine-chocolat',
  entremet: 'tartes-fruits',
  cookie: 'plateau-douceurs',
  baker: 'fournil-verriere',
  plateau: 'cafe-et-pains',
  noeud: 'vitrine-patisseries',
  thabor: 'boulangerie-rue',
  bagel: 'sandwich-jambon',
  bun: 'sandwich-jambon',
  burger: 'sandwich-jambon',
  club: 'sandwich-jambon',
  croque: 'tranches-pain',
  hotdog: 'baguettes',
  wrap: 'salade-bol',
  salade: 'salade-bol',
  verrine: 'salade-bol',
  quiche: 'quiche',
  prefou: 'tranches-pain',
  beignet: 'plateau-douceurs',
  cannele: 'vitrine-chocolat',
  choux: 'etals-patisseries',
  parisbrest: 'etals-patisseries',
  far: 'pain-plateau-rond',
  cup: 'cafe-tasse',
  numbercake: 'tartes-fruits',
  poplarbox: 'etals-patisseries',
  lices: 'marche-etals',
  market: 'marche-legumes',
  salon: 'salle-bois',
}
export const photoForIllustration = (key: string): Photo | undefined => {
  const s = byIllustration[key]
  return s ? bySlug.get(s) : undefined
}

/** <img> markup with intrinsic size, lazy loading and the site's cover style. */
export function photoImg(p: Photo, cls = 'photo', eager = false): string {
  return `<img class="${cls}" src="${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`
}

/** Slim decorative photo band (FAQ, legal pages, contact): 2-4 photos, captioned once. */
export function photoBand(slugs: string[], caption = 'Photos d’illustration (Unsplash), pas la boutique'): string {
  return `<div class="photo-band-slim" data-count="${slugs.length}">${slugs.map((s) => `<figure>${photoImg(photo(s))}</figure>`).join('')}</div><p class="photo-band-cap">${caption}</p>`
}

/** Single captioned figure with the « Photo d’illustration » tag. */
export function photoFigure(slug: string, cls = 'ph-fig', caption?: string): string {
  const p = photo(slug)
  return `<figure class="${cls}">${photoImg(p)}<span class="photo-tag">Photo d’illustration</span>${caption === '' ? '' : `<figcaption>${caption ?? p.alt}</figcaption>`}</figure>`
}

/** Journal cover photo: per-article choice first, then the illustration mapping. */
const byPost: Record<string, string> = {
  'choc-o-roi-du-chateau-au-campus': 'vitrine-chocolat',
  'un-samedi-aux-lices-un-gouter-au-thabor': 'marche-etals',
  'anti-gaspi-les-paniers-du-soir': 'cagette-pains',
  'commander-la-veille-avant-18-h': 'pain-sac-kraft',
  'kouign-amann-notre-facon': 'croissants-table',
  'galette-des-rois-preparez-lepiphanie': 'rouleau-patissier',
}
export const photoForPost = (slug: string, illustration: string): Photo | undefined => {
  const s = byPost[slug]
  return s ? bySlug.get(s) : photoForIllustration(illustration)
}
