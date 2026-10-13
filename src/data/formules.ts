// SAMPLE DATA. Replace with client-confirmed data. See PLAN.md §11-12.
// REAL: there are « cinq formules » and the floor is 7,90 € (Ouest-France, avril 2025; Bonjour Rennes wrote 7 €).
// MOCK: names, contents and prices above the floor. All flagged mock: true.

export interface Formule {
  id: string
  name: string
  contents: string[]
  priceCents: number
  note: string
  vegetarian?: boolean
  mock: true
}

export const formulesFloor = { cents: 790, source: 'Ouest-France, avril 2025', count: 5 }

export const formules: Formule[] = [
  { id: 'croustillant', name: 'Formule Croustillant', contents: ['Un sandwich croustillant au choix', 'Une boisson fraîche ou un café', 'Un petit dessert'], priceCents: 790, note: 'La formule d’appel de la carte, prix plancher relevé en presse.', mock: true },
  { id: 'salade', name: 'Formule Salade', contents: ['Une salade du moment', 'Une boisson', 'Un dessert au choix'], priceCents: 1090, note: 'Pour une pause plus légère.', mock: true },
  { id: 'burger', name: 'Formule Burger', contents: ['Un burger au choix', 'Une boisson', 'Un cookie'], priceCents: 1190, note: 'La plus généreuse pour les grosses faims.', mock: true },
  { id: 'happy', name: 'Formule Happy', contents: ['Un Happy wrap, burger ou salade', 'Une boisson', 'Un dessert'], priceCents: 1090, note: 'Autour de la gamme végétarienne Happy.', vegetarian: true, mock: true },
  { id: 'bagel', name: 'Formule Bagel ou Wrap', contents: ['Un bagel ou un wrap', 'Une boisson', 'Une viennoiserie'], priceCents: 990, note: 'Pour manger en marchant jusqu’au cours.', mock: true },
]
