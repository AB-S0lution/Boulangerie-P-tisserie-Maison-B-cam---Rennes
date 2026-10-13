// SAMPLE DATA. Roles only, no names (PLAN.md §12). The figures below are real and dated.

export interface Role {
  id: string
  title: string
  text: string
  mock: true
}

export const roles: Role[] = [
  { id: 'boulanger', title: 'Boulanger·ère au fournil', text: 'Pétrit, façonne et cuit pains et viennoiseries devant la verrière.', mock: true },
  { id: 'snacking', title: 'Préparateur·rice snacking', text: 'Assemble sandwichs, salades et wraps pour le service du midi.', mock: true },
  { id: 'vente', title: 'Vente et conseil', text: 'Accueille avec le sourire, conseille et soigne la vitrine.', mock: true },
  { id: 'barista', title: 'Barista et salon de thé', text: 'Prépare les cafés à partir de grains et sert à table.', mock: true },
  { id: 'apprenti', title: 'Apprenti·e', text: 'Se forme au métier en boulangerie, pâtisserie, snacking ou vente.', mock: true },
  { id: 'resp', title: 'Responsable de boutique', text: 'Coordonne l’équipe et les commandes du lendemain.', mock: true },
]

export const teamFacts = [
  { value: '15', label: 'recrutements pour l’ouverture', note: 'sur environ 200 CV reçus (actu.fr, février 2025)' },
  { value: '16', label: 'personnes dans l’équipe en avril 2025', note: 'dont 4 boulangers et 2 en snacking (Rennes Infos Autrement)' },
  { value: '4', label: 'semaines de formation à Angers', note: 'dans une boutique Maison Bécam, avant l’ouverture' },
]

export const values = [
  { letter: 'B', word: 'Bien-être', text: 'Prendre soin de l’équipe et des clients.' },
  { letter: 'É', word: 'Écoute', text: 'Comprendre ce qu’on attend d’une boulangerie de quartier.' },
  { letter: 'C', word: 'Créativité', text: 'Faire évoluer la carte deux fois par an.' },
  { letter: 'A', word: 'Accompagnement', text: 'Former, transmettre, faire grandir les apprentis.' },
  { letter: 'M', word: 'Motivation', text: 'Se lever tôt pour que le pain soit chaud à 7 h.' },
]
