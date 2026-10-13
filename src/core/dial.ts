// The day dial: « La verrière, 7 h → 20 h ». Signature interaction.
// It snaps to the real Paris time on load and broadcasts the chosen hour to the verrière, the shelf and the captions.

import gsap from 'gsap'
import { dayparts, hourLabel, partForHour, type Daypart } from '../data/dayparts'
import { CLOSE_HOUR, OPEN_HOUR } from '../data/hours'
import { parisNow, prefersReducedMotion } from './dom'

export interface DialDetail { hour: number; part: Daypart }

let current = CLOSE_HOUR

export const currentHour = (): number => current

export function startHour(): number {
  const { hour } = parisNow()
  return hour >= OPEN_HOUR && hour < CLOSE_HOUR ? Math.round(hour * 4) / 4 : CLOSE_HOUR
}

export function dialHTML(mini = false): string {
  const ticks = Array.from({ length: 14 }, (_, i) => `<span>${7 + i} h</span>`).join('')
  const quick = [
    ['Matin', 7.5], ['Midi', 12.5], ['Goûter', 16.5], ['Soir', 18.5], ['Fermeture', 20],
  ]
    .map(([l, h]) => `<button type="button" data-h="${h}" aria-pressed="false">${l}</button>`)
    .join('')
  return `<div class="dial ${mini ? 'mini sticky' : ''}" data-dial>
    <div class="container dial-in">
      <div class="dial-title">La verrière, 7 h → 20 h<span>Faites glisser la fleur de lys</span></div>
      <div class="dial-rule">
        <label class="sr" for="dial-${mini ? 'mini' : 'main'}">Heure de la journée, de 7 h à 20 h</label>
        <input id="dial-${mini ? 'mini' : 'main'}" class="dial-range" type="range" min="7" max="20" step="0.25" value="${startHour()}" aria-describedby="dial-cap-${mini ? 'mini' : 'main'}">
        <div class="dial-ticks" aria-hidden="true">${ticks}</div>
        <p class="dial-caption" id="dial-cap-${mini ? 'mini' : 'main'}" aria-live="polite"></p>
      </div>
      <div class="dial-quick" role="group" aria-label="Moments de la journée">${quick}</div>
    </div>
  </div>`
}

function apply(hour: number, emit = true): void {
  current = hour
  const part = partForHour(hour)
  document.querySelectorAll<HTMLElement>('[data-part-target]').forEach((el) => { el.dataset.part = part.key })
  document.querySelectorAll<HTMLInputElement>('.dial-range').forEach((inp) => {
    inp.value = String(hour)
    inp.style.setProperty('--p', `${((hour - 7) / 13) * 100}%`)
    inp.setAttribute('aria-valuetext', `${hourLabel(hour)}, ${part.title}`)
  })
  document.querySelectorAll<HTMLElement>('.dial-caption').forEach((c) => {
    c.innerHTML = `<b>${hourLabel(hour)}</b> : ${part.caption}`
  })
  document.querySelectorAll<HTMLButtonElement>('.dial-quick button').forEach((b) => {
    const h = Number(b.dataset.h)
    b.setAttribute('aria-pressed', String(partForHour(h).key === part.key || (part.key === 'metro' && h === 7.5)))
  })
  if (emit) document.dispatchEvent(new CustomEvent<DialDetail>('bec:dial', { detail: { hour, part } }))
}

export function mountDials(demo = false): void {
  const inputs = document.querySelectorAll<HTMLInputElement>('.dial-range')
  if (!inputs.length) return
  const target = startHour()
  apply(target)
  inputs.forEach((inp) => {
    inp.addEventListener('input', () => apply(Number(inp.value)))
  })
  document.querySelectorAll<HTMLButtonElement>('.dial-quick button').forEach((b) => {
    b.addEventListener('click', () => {
      const h = Number(b.dataset.h)
      if (prefersReducedMotion()) return apply(h)
      const o = { h: current }
      gsap.to(o, { h, duration: 0.7, ease: 'power3.inOut', onUpdate: () => apply(Math.round(o.h * 4) / 4) })
    })
  })
  if (demo && !prefersReducedMotion() && target > OPEN_HOUR) {
    // Demonstration: the handle slides from 7 h to the current time.
    const o = { h: OPEN_HOUR }
    apply(OPEN_HOUR)
    gsap.to(o, { h: target, duration: 1.6, delay: 1.1, ease: 'power3.inOut', onUpdate: () => apply(Math.round(o.h * 4) / 4) })
  }
}

export { dayparts }
