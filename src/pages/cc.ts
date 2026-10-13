import { boot } from '../core/shell'
import { $, money, setHTML, url } from '../core/dom'
import { illo } from '../core/art'
import { pageHead, secHead, commanderBtn, ccSteps } from '../core/parts'
import { business } from '../data/business'
import { faq } from '../data/faq'
import { productBySlug } from '../core/cards'
import { clearList, getList, setQty } from '../core/list'

const main = `
${pageHead('Click &amp; <span class="it">Collect</span>', 'Commandez avant 18 h pour le lendemain, retirez de 7 h à 20 h. Ici, préparez votre liste ; la commande se fait sur la plateforme.', 'Click & Collect', 'cc')}
<section class="section" aria-labelledby="how-h"><div class="container two">
  <div><h2 id="how-h" data-split>Comment ça marche</h2>${ccSteps()}
    <div class="code-card" style="margin-top:28px"><span class="label">Code promo plateforme</span><b>${business.promoCode}</b><p class="muted small">10 % dès 5 € d’achat, sur la plateforme de commande. À vérifier au moment de commander.</p></div></div>
  <div><h2 data-split>Ma liste</h2>
    <p class="muted small" style="margin:10px 0 16px">Une aide-mémoire enregistrée dans votre navigateur. Elle ne passe aucune commande et n’est envoyée nulle part.</p>
    <div data-list></div>
    <div class="btn-row" style="margin-top:20px">${commanderBtn('gold')}<button type="button" class="btn" data-copy>Copier ma liste</button><button type="button" class="btn ghost" data-clear>Vider</button></div>
    <p class="small" role="status" data-msg style="margin-top:10px"></p>
  </div>
</div></section>
<section class="section tight" aria-labelledby="q-h"><div class="container">${secHead('Questions fréquentes').replace('<h2 ', '<h2 id="q-h" ')}
  <div class="faq-list" style="max-width:780px">${faq.filter((f) => ['cc', 'code', 'allergenes', 'paiement'].includes(f.id)).map((f) => `<details><summary>${f.q}</summary><div class="ans"><p>${f.a}</p></div></details>`).join('')}</div>
  <p style="margin-top:20px"><a class="link" href="${url('faq/')}">Toutes les questions</a></p></div></section>`

function render(): void {
  const el = $('[data-list]')
  if (!el) return
  const l = getList()
  const rows = Object.entries(l).map(([s, q]) => ({ p: productBySlug(s), q })).filter((x) => x.p)
  if (!rows.length) {
    setHTML(el, `<div class="empty">${illo('painmie')}<h3>Votre liste est vide</h3><p class="muted">Ajoutez des produits depuis la carte avec le bouton +.</p><a class="btn" href="${url('la-carte/')}">Parcourir la carte</a></div>`)
    return
  }
  const total = rows.reduce((a, r) => a + r.p!.priceCents * r.q, 0)
  setHTML(el, `<div class="list-items">${rows.map(({ p, q }) => `<div class="list-item"><div class="illo-box">${illo(p!.illustration)}</div><div><b>${p!.name}</b><br><span class="price muted small">${money(p!.priceCents)}</span></div><div class="qty" role="group" aria-label="Quantité : ${p!.name}"><button type="button" data-dec="${p!.slug}" aria-label="Retirer un">−</button><span>${q}</span><button type="button" data-inc="${p!.slug}" aria-label="Ajouter un">+</button></div></div>`).join('')}</div>
  <p style="margin-top:14px;font-weight:600">Total indicatif : <span class="price">${money(total)}</span></p><p class="small muted">Prix indicatifs relevés en octobre 2026.</p>`)
}

boot({
  nav: 'click-and-collect/',
  main,
  setup(root) {
    render()
    document.addEventListener('bec:list', render)
    root.addEventListener('click', (e) => {
      const t = e.target as Element
      const inc = t.closest<HTMLElement>('[data-inc]'); const dec = t.closest<HTMLElement>('[data-dec]')
      if (inc) setQty(inc.dataset.inc as string, (getList()[inc.dataset.inc as string] ?? 0) + 1)
      if (dec) setQty(dec.dataset.dec as string, (getList()[dec.dataset.dec as string] ?? 0) - 1)
      if (t.closest('[data-clear]')) clearList()
      if (t.closest('[data-copy]')) {
        const txt = Object.entries(getList()).map(([s, q]) => `${q} x ${productBySlug(s)?.name ?? s}`).join('\n')
        navigator.clipboard?.writeText(txt).then(() => { const m = $('[data-msg]'); if (m) m.textContent = 'Liste copiée.' }, () => { const m = $('[data-msg]'); if (m) m.textContent = 'Copie impossible sur ce navigateur.' })
      }
    })
  },
})
