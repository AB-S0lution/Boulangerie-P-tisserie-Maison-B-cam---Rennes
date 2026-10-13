import { boot } from '../core/shell'
import { setHTML, $, $$ } from '../core/dom'
import { journalCategories, posts } from '../data/journal'
import { pageHead, postCard } from '../core/parts'

let cat = 'Tous'
const main = `
${pageHead('Le <span class="it">journal</span>', 'Coulisses du fournil, saisons, quartier, recettes et conseils. Articles d’exemple, écrits pour cette démonstration.', 'Journal', 'journal')}
<section class="section tight"><div class="container">
  <div class="tabs" role="group" aria-label="Catégories">${['Tous', ...journalCategories].map((c) => `<button type="button" role="tab" aria-selected="${c === 'Tous'}" data-cat="${c}">${c}</button>`).join('')}</div>
  <div class="posts" style="margin-top:28px;gap:14px" data-posts></div>
</div></section>`

function render(): void {
  const el = $('[data-posts]')
  if (!el) return
  const list = posts.filter((p) => cat === 'Tous' || p.category === cat)
  setHTML(el, list.map(postCard).join(''))
  el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((e) => { e.style.opacity = '1'; e.style.transform = 'none' })
}

boot({
  nav: 'journal/',
  main,
  setup(root) {
    render()
    root.addEventListener('click', (e) => {
      const b = (e.target as Element).closest<HTMLElement>('[data-cat]')
      if (!b) return
      cat = b.dataset.cat as string
      $$('[data-cat]', root).forEach((x) => x.setAttribute('aria-selected', String(x === b)))
      render()
    })
  },
})
