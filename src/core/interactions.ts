// Delegated interactions for product cards: add to « Ma liste », open the sheet drawer.

import { productBySlug, productSheet } from './cards'
import { setHTML } from './dom'
import { addToList, inList } from './list'
import { flourPuff } from './motion'

const plus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'

let dlg: HTMLDialogElement | null = null

function sheet(): HTMLDialogElement {
  if (dlg) return dlg
  dlg = document.createElement('dialog')
  dlg.className = 'sheet'
  dlg.setAttribute('aria-label', 'Fiche produit')
  dlg.innerHTML = '<div class="sheet-in"><button type="button" class="sheet-close" aria-label="Fermer la fiche" data-close>✕</button><div data-sheet-body class="sheet-body" style="display:grid;gap:18px"></div></div>'
  document.body.appendChild(dlg)
  dlg.addEventListener('click', (e) => { if (e.target === dlg || (e.target as Element).closest('[data-close]')) dlg?.close() })
  dlg.addEventListener('close', () => { history.replaceState(null, '', location.pathname + location.search) })
  return dlg
}

export function openSheet(slug: string): void {
  const p = productBySlug(slug)
  if (!p) return
  const d = sheet()
  const body = d.querySelector<HTMLElement>('[data-sheet-body]')
  if (body) setHTML(body, productSheet(p) + `<a class="link" href="${import.meta.env.BASE_URL}produit/?p=${p.slug}">Ouvrir la fiche complète</a>`)
  if (!d.open) d.showModal()
  history.replaceState(null, '', `#p=${slug}`)
}

export function wireProducts(): void {
  document.addEventListener('click', (e) => {
    const t = e.target as Element
    const add = t.closest<HTMLElement>('[data-add]')
    if (add) {
      e.preventDefault()
      const slug = add.dataset.add as string
      addToList(slug)
      flourPuff(add)
      document.querySelectorAll<HTMLElement>(`.pcard [data-add="${slug}"]`).forEach((b) => {
        b.classList.add('done')
        b.innerHTML = check
        b.setAttribute('aria-label', 'Ajouté à ma liste')
      })
      if (add.classList.contains('btn')) add.textContent = 'Ajouté à ma liste (+1)'
      return
    }
    const open = t.closest<HTMLElement>('[data-open]')
    if (open) openSheet(open.dataset.open as string)
  })
}

export { inList, plus }
