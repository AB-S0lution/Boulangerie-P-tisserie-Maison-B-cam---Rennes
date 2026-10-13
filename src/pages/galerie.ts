import { boot } from '../core/shell'
import { $, $$, setHTML } from '../core/dom'
import { illo } from '../core/art'
import { gallery } from '../data/gallery'
import { pageHead } from '../core/parts'
import { photos, photoThemes, photoImg } from '../data/photos'

let cat = 'Tout'
const cats = ['Tout', 'Fournil', 'Vitrine', 'Choc’O Roi', 'Quartier', 'Saisons']
const main = `
${pageHead('La <span class="it">galerie</span>', `${photos.length} photos d’illustration et 20 dessins originaux. Aucune image ne montre la boutique ni le réseau.`, 'Galerie', 'galerie')}
<section class="section tight"><div class="container">
  <div class="tabs" role="group" aria-label="Catégories">${cats.map((c) => `<button type="button" role="tab" aria-selected="${c === 'Tout'}" data-cat="${c}">${c}</button>`).join('')}</div>
  <div class="gal" style="margin-top:28px" data-gal></div>
</div></section>
<section class="section tight" aria-labelledby="ph-h"><div class="container">
  <div class="sec-head"><h2 id="ph-h" data-split>Photos d’illustration</h2><p class="lead" data-reveal>${photos.length} photos libres de droits (licence Unsplash), choisies pour l’ambiance. Ce ne sont pas des photos de la boutique de Rennes.</p></div>
  ${photoThemes.map((t) => `<h3 class="ph-theme" data-reveal>${t}</h3><div class="photo-grid">${photos.filter((p) => p.theme === t).map((p) => `<figure data-reveal><a href="${p.url}" target="_blank" rel="noopener">${photoImg(p)}<span class="sr"> (voir la photo sur Unsplash, nouvel onglet)</span></a><figcaption>${p.alt}<span>Photo : ${p.credit}</span></figcaption></figure>`).join('')}</div>`).join('')}
</div></section>
<section class="section tight" aria-labelledby="dessins-h"><div class="container"><h2 id="dessins-h" data-split>Les dessins</h2></div></section>
<dialog class="light" aria-label="Illustration agrandie"><div class="light-in" data-light-close><div class="light-card"><div class="pane" data-light-pane></div><div class="cap"><b data-light-title></b><button type="button" class="btn sm" data-light-close>Fermer</button></div></div></div></dialog>`

function render(): void {
  const el = $('[data-gal]')
  if (!el) return
  const list = gallery.filter((g) => cat === 'Tout' || g.category === cat)
  setHTML(el, list.map((g) => `<button type="button" class="${g.tall ? 'tall' : ''}" data-id="${g.id}"><div class="pane t-${g.tint}">${illo(g.art, g.alt)}</div><div class="cap">${g.title}<span>${g.category}</span></div></button>`).join(''))
}

boot({
  nav: 'galerie/',
  main,
  setup(root) {
    render()
    const dlg = $<HTMLDialogElement>('dialog.light', root)
    root.addEventListener('click', (e) => {
      const t = e.target as Element
      const b = t.closest<HTMLElement>('[data-cat]')
      if (b) { cat = b.dataset.cat as string; $$('[data-cat]', root).forEach((x) => x.setAttribute('aria-selected', String(x === b))); render(); return }
      const g = t.closest<HTMLElement>('[data-id]')
      if (g && dlg) {
        const item = gallery.find((x) => x.id === g.dataset.id)
        if (!item) return
        const pane = $('[data-light-pane]', dlg); const title = $('[data-light-title]', dlg)
        if (pane) { pane.className = `pane t-${item.tint}`; pane.innerHTML = illo(item.art, item.alt) }
        if (title) title.textContent = item.title
        dlg.showModal()
      }
      if (t.closest('[data-light-close]') && (t.closest('button') || t.matches('.light-in'))) dlg?.close()
    })
  },
})
