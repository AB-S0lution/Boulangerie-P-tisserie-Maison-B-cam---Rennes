// REAL network rules (maisonbecam.com programme de fidélité, PLAN.md §3). Participation of the Rennes shop: TODO.
// The reward ladder below is a MOCK example, flagged example: true.

export const loyaltyRules = {
  name: 'Les Lys d’Or',
  earn: '1 € dépensé = 2 Lys d’Or',
  welcome: '30 Lys d’Or offerts au premier achat',
  redeem: 'À partir de 50 Lys d’Or',
  scope: 'Valable dans toutes les boulangeries Maison Bécam participantes',
  todo: 'Participation de la boutique de Rennes à confirmer.',
}

export interface Reward {
  lys: number
  label: string
  example: true
}

export const rewardLadder: Reward[] = [
  { lys: 50, label: 'Un croissant offert', example: true },
  { lys: 100, label: 'Un café offert', example: true },
  { lys: 150, label: 'Un Choc’O Roi individuel', example: true },
  { lys: 250, label: 'Une formule du midi', example: true },
  { lys: 400, label: 'Un entremet à partager', example: true },
]
