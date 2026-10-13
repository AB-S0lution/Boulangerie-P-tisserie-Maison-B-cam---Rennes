// Reusable page parts.

import { business, mapsUrl } from '../data/business'
import { weekHours, holidayNote } from '../data/hours'
import { landmarks } from '../data/quartier'
import { posts, type Post } from '../data/journal'
import { reviews } from '../data/reviews'
import { illo, mapBase, tapisserie } from './art'
import { esc, formatDateFR, parisNow, url } from './dom'
import { photoForIllustration, photoImg } from '../data/photos'

export function pageHead(title: string, lead: string, crumb: string, id: string): string {
  return `<section class="page-head">
    <div class="tapis-wrap">${tapisserie('tapis-' + id)}</div>
    <div class="container">
      <p class="crumbs"><a href="${url()}">Accueil</a><span aria-hidden="true">/</span><span>${crumb}</span></p>
      <h1 data-split>${title}</h1>
      <p class="lead" data-reveal>${lead}</p>
    </div>
  </section>`
}

export function secHead(title: string, lead = '', extra = ''): string {
  return `<div class="sec-head"><h2 data-split>${title}</h2>${lead ? `<p class="lead" data-reveal>${lead}</p>` : ''}${extra}</div>`
}

export function commanderBtn(cls = 'gold', label = 'Commander'): string {
  return `<a class="btn ${cls}" href="${business.urls.clickAndCollect}" target="_blank" rel="noopener">${label}<span class="sr"> (nouvel onglet)</span></a>`
}

export function hoursTable(): string {
  const { day } = parisNow()
  return `<table class="hours"><caption class="sr">Horaires d’ouverture</caption><tbody>${weekHours.map((d) => `<tr class="${d.day === day ? 'today' : ''}"><th scope="row">${d.label}</th><td>7 h - 20 h</td></tr>`).join('')}</tbody></table>
  <p class="small muted" style="margin-top:12px">${holidayNote}</p>`
}

export function postCard(p: Post): string {
  const ph = photoForIllustration(p.illustration)
  return `<a class="post-card" href="${url(`journal/article/?a=${p.slug}`)}" data-reveal>
    <div class="pane${ph ? ' has-photo' : ''}">${ph ? `${photoImg({ ...ph, alt: '' })}<span class="photo-tag">Photo d’illustration</span>` : illo(p.illustration)}</div>
    <div class="body"><p class="meta">${p.category} · ${formatDateFR(p.date)} · ${p.readingTime} min</p><h3>${esc(p.title)}</h3><p class="muted small">${esc(p.excerpt)}</p></div>
  </a>`
}

export function postCards(n = 3): string {
  return `<div class="posts">${posts.slice(0, n).map(postCard).join('')}</div>`
}

export function quoteCard(id: number, full = false): string {
  const r = reviews.find((x) => x.id === id)
  if (!r) return ''
  return `<figure class="qcard ${full ? 'full' : ''}" style="margin:0" data-reveal><blockquote><p lang="${r.lang}">« ${esc(r.text)} »</p></blockquote><footer><span class="stars" aria-label="${r.stars} étoiles sur 5">${'★'.repeat(r.stars)}</span><br>Avis Google, via ${r.via}</footer></figure>`
}

export function mapPane(ids: string[], tall = false): string {
  const shown = landmarks.filter((l) => ids.includes(l.id))
  return `<div class="map ${tall ? 'tall' : ''}" role="group" aria-label="Carte illustrée du quartier (schéma, pas à l’échelle)">${mapBase()}
    <div class="pin shop" style="left:56%;top:52%"><span class="dot" aria-hidden="true"></span><span class="nm">Maison Bécam</span></div>
    ${shown.map((l) => `<div class="pin" data-pin="${l.id}" style="left:${l.x}%;top:${l.y}%"><button type="button" class="dot" aria-label="${esc(l.name)}, à ${l.distance}"></button><span class="nm">${esc(l.name.replace(/ \(ligne B\)/, ''))}</span></div>`).join('')}
  </div>
  <div class="map-detail" aria-live="polite" data-map-detail><b>Maison Bécam</b><br><span class="muted small">${business.address.street}, face au campus. Choisissez un repère sur la carte.</span></div>
  <p class="small muted" style="margin-top:8px">Schéma illustré, distances à vol d’oiseau approximatives. <a class="link" href="${mapsUrl}" target="_blank" rel="noopener">Ouvrir Google Maps<span class="sr"> (nouvel onglet)</span></a></p>`
}

export function wireMap(root: HTMLElement): void {
  const detail = root.querySelector<HTMLElement>('[data-map-detail]')
  root.querySelectorAll<HTMLElement>('[data-pin]').forEach((pin) => {
    const l = landmarks.find((x) => x.id === pin.dataset.pin)
    pin.querySelector('button')?.addEventListener('click', () => {
      root.querySelectorAll('.pin.active').forEach((p) => p.classList.remove('active'))
      pin.classList.add('active')
      if (detail && l) detail.innerHTML = `<b>${esc(l.name)}</b> · ${l.distance} · ${l.walk} à pied<br><span class="muted small">${esc(l.note)}</span>`
    })
  })
}

export function ccSteps(): string {
  return `<ol class="steps">
    <li><div><b>Choisissez vos produits</b><span>Préparez « Ma liste » ici, ou commandez directement sur la plateforme.</span></div></li>
    <li><div><b>Commandez avant 18 h</b><span>Pour un retrait le lendemain. Dernière heure pour commander : 18 h.</span></div></li>
    <li><div><b>Retirez de 7 h à 20 h</b><span>Au 69 rue Jean Guéhenno, sans attendre au comptoir.</span></div></li>
  </ol>`
}
