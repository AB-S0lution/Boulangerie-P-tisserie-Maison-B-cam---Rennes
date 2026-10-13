// REAL places with APPROXIMATE straight-line distances (PLAN.md §6, OSM). Transport: OSM data of July 2026,
// to be checked against the STAR map before launch.

export interface Landmark {
  id: string
  name: string
  distance: string
  walk: string
  note: string
  /** position on the illustrated map, 0-100 */
  x: number
  y: number
}

export const landmarks: Landmark[] = [
  { id: 'metro', name: 'Métro Jules Ferry (ligne B)', distance: '80 m', walk: '1 min', note: 'Station ouverte le 20 septembre 2022, ascenseurs, accessible.', x: 56, y: 50 },
  { id: 'droit', name: 'Faculté de droit et de science politique', distance: '150 m', walk: '2 min', note: 'Campus Centre de l’Université de Rennes, face à la boutique.', x: 40, y: 38 },
  { id: 'jeanmace', name: 'Lycée Jean-Macé', distance: '250 m', walk: '3 min', note: 'À l’ouest de la rue Jean Macé.', x: 26, y: 46 },
  { id: 'archives', name: 'Archives municipales', distance: '300 m', walk: '4 min', note: 'Dans le quartier, à pied depuis la station.', x: 70, y: 36 },
  { id: 'thabor', name: 'Parc du Thabor', distance: '0,5 km', walk: '7 min', note: 'Le grand parc de Rennes, pour le goûter sur l’herbe.', x: 72, y: 12 },
  { id: 'hoche', name: 'Place Hoche', distance: '0,65 km', walk: '9 min', note: 'Rue Hoche et ses commerces.', x: 82, y: 28 },
  { id: 'lices', name: 'Place des Lices et son marché', distance: '1,1 km', walk: '15 min', note: 'Marché du samedi, 7 h 30 - 13 h 30, depuis 1622.', x: 90, y: 74 },
  { id: 'halles', name: 'Halles Centrales', distance: '1,4 km', walk: '18 min', note: 'Au sud-est, vers le centre-ville.', x: 78, y: 90 },
]

export interface TransportLine {
  mode: 'metro' | 'bus' | 'car' | 'velo'
  lines: string
  stop: string
  distance: string
  note?: string
}

export const transport: TransportLine[] = [
  { mode: 'metro', lines: 'Ligne B', stop: 'Jules Ferry', distance: '80 m', note: 'Accessible, ascenseurs.' },
  { mode: 'bus', lines: 'C2, 10, N5 (nuit)', stop: 'Jules Ferry', distance: 'à la porte', note: 'Données OSM de juillet 2026, à vérifier sur le plan STAR.' },
  { mode: 'car', lines: 'BreizhGo 504 (Antrain - Rennes)', stop: 'Jules Ferry', distance: 'à la porte' },
  { mode: 'bus', lines: 'C3, 12', stop: 'Sévigné ou Vincennes', distance: '250 à 300 m' },
  { mode: 'velo', lines: 'STAR, le vélo et Citiz', stop: 'Stations à proximité', distance: 'quelques minutes' },
]
