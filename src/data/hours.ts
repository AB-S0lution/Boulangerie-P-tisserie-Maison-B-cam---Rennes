// REAL DATA (PLAN.md §1): open 7 days a week, 07:00-20:00. Holiday hours may vary.

export interface DayHours {
  /** 0 = dimanche, 1 = lundi ... 6 = samedi (JS getDay) */
  day: number
  label: string
  short: string
  open: string
  close: string
}

export const weekHours: DayHours[] = [
  { day: 1, label: 'Lundi', short: 'Lun', open: '07:00', close: '20:00' },
  { day: 2, label: 'Mardi', short: 'Mar', open: '07:00', close: '20:00' },
  { day: 3, label: 'Mercredi', short: 'Mer', open: '07:00', close: '20:00' },
  { day: 4, label: 'Jeudi', short: 'Jeu', open: '07:00', close: '20:00' },
  { day: 5, label: 'Vendredi', short: 'Ven', open: '07:00', close: '20:00' },
  { day: 6, label: 'Samedi', short: 'Sam', open: '07:00', close: '20:00' },
  { day: 0, label: 'Dimanche', short: 'Dim', open: '07:00', close: '20:00' },
]

export const OPEN_HOUR = 7
export const CLOSE_HOUR = 20

export const holidayNote =
  'Horaires susceptibles de varier les jours fériés : consultez la fiche Google de la boutique.'

export interface HoursException {
  date: string
  closed: boolean
  note: string
  source: string
  confidence: 'single'
}

export const exceptions: HoursException[] = [
  { date: '05-01', closed: true, note: 'Fermé le 1er mai (relevé en 2025)', source: 'Rennes Infos Autrement, avril 2025', confidence: 'single' },
]
