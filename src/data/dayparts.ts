// SAMPLE DATA. Replace with client-confirmed data. See PLAN.md §9 and §11.
// The hours (7 h - 20 h, 7/7) and the order cut-off (18 h for next day, Click & Collect) are real;
// the scene captions are sample copy.

import type { DaypartTag } from './products'

export interface Daypart {
  key: 'matin' | 'metro' | 'midi' | 'gouter' | 'soir' | 'fermeture'
  /** product tag used for the shelf */
  tag: DaypartTag
  from: number
  to: number
  hour: string
  title: string
  caption: string
  paneLight: string
  paneGlow: number
  chapter: string
  picks: string[]
}

export const dayparts: Daypart[] = [
  {
    key: 'matin', tag: 'matin', from: 7, to: 8, hour: '7 h', title: 'Le fournil s’allume',
    caption: 'Premières flûtes, café à emporter.',
    paneLight: '#dce8ee', paneGlow: 0.1,
    chapter: 'Derrière la verrière, les boulangers façonnent et enfournent. La flûte Bécam sort en premier, les viennoiseries suivent. Le comptoir ouvre à 7 h pile.',
    picks: ['flute-becam-bien-cuite', 'croissant', 'pain-au-chocolat', 'pain-au-chocolat-praline', 'kouign-amann-indiv', 'pain-aux-raisins', 'chausson-pomme-feuillete', 'viennoise-nature'],
  },
  {
    key: 'metro', tag: 'matin', from: 8, to: 12, hour: '8 h', title: 'Un café avant le cours',
    caption: 'Viennoiseries et expresso, à deux pas du métro.',
    paneLight: '#e6eef2', paneGlow: 0.15,
    chapter: 'Sortie du métro Jules Ferry, face à la fac de droit : on prend un croissant, on s’assoit ou on file. La salle compte environ 50 places.',
    picks: ['croissant', 'pain-au-chocolat', 'brioche-suisse', 'cookie-3-chocolats', 'noeud-sucre', 'pain-brioche-3-chocolat', 'bostock-pommes-amandes', 'far-breton-individuel'],
  },
  {
    key: 'midi', tag: 'midi', from: 12, to: 16, hour: '12 h', title: 'Formules du midi',
    caption: 'Cinq formules, dès 7,90 €.',
    paneLight: '#f1f4f5', paneGlow: 0.05,
    chapter: 'Sandwichs croustillants, salades, wraps, quiches : le snacking est assemblé en boutique. La carte change deux fois par an, selon les saisons.',
    picks: ['croustillant-jambon-beurre', 'croustillant-poulet-crudites', 'salade-caesar', 'burger-l-original', 'quiche-chevre-epinards', 'bagel-chevre-abricot', 'happy-wrap', 'tarte-fine-chevre'],
  },
  {
    key: 'gouter', tag: 'gouter', from: 16, to: 18, hour: '16 h', title: 'L’heure du Choc’O Roi',
    caption: 'Goûter : Choc’O Roi, éclairs, cookies.',
    paneLight: 'rgba(194,168,98,.28)', paneGlow: 0.35,
    chapter: 'Le salon de thé se remplit. Le Choc’O Roi, signature du réseau, côtoie les éclairs, les cookies et le kouign-amann.',
    picks: ['choc-o-roi-caramel-individuel', 'choc-o-roi-chocolat-individuel', 'choc-o-roi-vanille-individuel', 'eclair-chocolat', 'eclair-cafe', 'cookie-gourmand-caramel-noix-de-pecan', 'paris-brest-individuel', 'cannele-bordelais'],
  },
  {
    key: 'soir', tag: 'soir', from: 18, to: 20, hour: '18 h', title: 'Pain du soir, commande du lendemain',
    caption: 'dernière heure pour commander pour demain.',
    paneLight: '#c9d6de', paneGlow: 0.45,
    chapter: 'Dernières baguettes pour le dîner. En Click & Collect, la commande passée avant 18 h est prête le lendemain, retrait de 7 h à 20 h.',
    picks: ['flute-becam-pas-trop-cuite', 'pave-plantagenet', 'pain-de-campagne-nature', 'pain-petit-epeautre-dore', 'quiche-lardon-fromage', 'prefou-a-l-ail', 'tarte-fine-aux-pommes-a-partager', 'entremet-choc-o-roi-a-partager'],
  },
  {
    key: 'fermeture', tag: 'soir', from: 20, to: 21, hour: '20 h', title: 'La verrière s’éteint',
    caption: 'fermeture, à demain.',
    paneLight: '#023b58', paneGlow: 1,
    chapter: 'Les panes passent au bleu nuit, une fleur de lys reste allumée. Rendez-vous demain à 7 h, tous les jours de la semaine.',
    picks: ['flute-becam-bien-cuite', 'croissant', 'kouign-amann-indiv', 'choc-o-roi-caramel-individuel'],
  },
]

export function partForHour(h: number): Daypart {
  if (h >= 20) return dayparts[5]
  return dayparts.find((d) => h >= d.from && h < d.to) ?? dayparts[0]
}

export function hourLabel(h: number): string {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return mm === 0 ? `${hh} h` : `${hh} h ${String(mm).padStart(2, '0')}`
}
