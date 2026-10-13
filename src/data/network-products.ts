// REAL network catalogue (maisonbecam.com, PLAN.md §3), prices as seen on the network site.
// Availability in Rennes is NOT confirmed: every item carries availability 'reseau-a-confirmer-rennes'
// and the UI shows « Selon disponibilité ».

export interface NetworkProduct {
  id: string
  name: string
  group: 'Pizzas' | 'Boissons chaudes' | 'Biscuits' | 'Épicerie fine'
  priceCents: number | null
  note?: string
  availability: 'reseau-a-confirmer-rennes'
}

const a = 'reseau-a-confirmer-rennes' as const

export const networkProducts: NetworkProduct[] = [
  { id: 'pizza-reine', name: 'Pizza Reine', group: 'Pizzas', priceCents: 890, availability: a },
  { id: 'pizza-4-fromages', name: 'Pizza 4 Fromages', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-angevine', name: 'Pizza Angevine', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-bressanne', name: 'Pizza Bressanne', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-savoyarde', name: 'Pizza Savoyarde', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-chevre-miel', name: 'Pizza Chèvre Miel', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-espagnole', name: 'Pizza Espagnole', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-indienne', name: 'Pizza Indienne', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-vegetarienne', name: 'Pizza Végétarienne', group: 'Pizzas', priceCents: 1090, availability: a },
  { id: 'pizza-burger', name: 'Pizza Burger', group: 'Pizzas', priceCents: 1190, availability: a },
  { id: 'expresso', name: 'Expresso', group: 'Boissons chaudes', priceCents: 190, availability: a },
  { id: 'allonge', name: 'Allongé', group: 'Boissons chaudes', priceCents: 190, availability: a },
  { id: 'cafe-au-lait', name: 'Café au lait', group: 'Boissons chaudes', priceCents: 320, availability: a },
  { id: 'chocolat-chaud', name: 'Chocolat chaud', group: 'Boissons chaudes', priceCents: 320, availability: a },
  { id: 'the', name: 'Thé', group: 'Boissons chaudes', priceCents: 320, availability: a },
  { id: 'double-expresso', name: 'Double expresso', group: 'Boissons chaudes', priceCents: 320, availability: a },
  { id: 'cappuccino', name: 'Cappuccino', group: 'Boissons chaudes', priceCents: 495, availability: a },
  { id: 'chocolat-viennois', name: 'Chocolat viennois', group: 'Boissons chaudes', priceCents: 495, availability: a },
  { id: 'cafe-viennois', name: 'Café viennois', group: 'Boissons chaudes', priceCents: 495, availability: a },
  { id: 'matcha-latte', name: 'Matcha latte', group: 'Boissons chaudes', priceCents: null, note: 'Prix non communiqué', availability: a },
  { id: 'pumpkin-spice', name: 'Pumpkin spice latte', group: 'Boissons chaudes', priceCents: null, note: 'Saisonnier, prix non communiqué', availability: a },
  { id: 'delys-des-rois', name: 'Délys des Rois (sachet de 10)', group: 'Biscuits', priceCents: 490, availability: a },
  { id: 'cremant-choco-roi', name: 'Crémant de Loire Choc’O Roi', group: 'Épicerie fine', priceCents: null, note: 'Vin du réseau, prix non relevé', availability: a },
  { id: 'coteaux-layon', name: 'Coteaux du Layon Choc’O Roi', group: 'Épicerie fine', priceCents: null, note: 'Vin du réseau, prix non relevé', availability: a },
]
