import { boot } from '../core/shell'
import { business, directionsUrl, mapsUrl } from '../data/business'
import { holidayNote } from '../data/hours'
import { hoursTable, pageHead, mapPane, wireMap } from '../core/parts'
import { $ } from '../core/dom'

const main = `
${pageHead('Contact et <span class="it">accès</span>', 'Ouvert tous les jours de 7 h à 20 h, au pied du métro Jules Ferry.', 'Contact', 'contact')}
<section class="section" aria-labelledby="c-h"><div class="container place">
  <div>
    <h2 id="c-h" data-split style="margin-bottom:20px">Nous trouver</h2>
    <dl class="facts"><div><dt>Adresse</dt><dd>${business.address.street}<br>${business.address.postalCode} ${business.address.city}</dd></div>
      <div><dt>Téléphone</dt><dd><a class="link" href="tel:${business.phone.tel}">${business.phone.display}</a></dd></div>
      <div><dt>E-mail</dt><dd><a class="link" href="mailto:${business.emails.shop}">${business.emails.shop}</a><br><span class="small muted">Adresse relevée sur la plateforme de commande, à confirmer avec la boutique.</span></dd></div>
      <div><dt>Réseau</dt><dd><a class="link" href="mailto:${business.emails.network}">${business.emails.network}</a> (presse, franchise)</dd></div>
      <div><dt>Réseaux sociaux</dt><dd><a class="link" href="${business.social.instagram}" target="_blank" rel="noopener">Instagram</a>, <a class="link" href="${business.social.facebook}" target="_blank" rel="noopener">Facebook</a>, <a class="link" href="${business.social.linkedin}" target="_blank" rel="noopener">LinkedIn</a><br><span class="small muted">${business.social.note}</span></dd></div>
      <div><dt>Accès</dt><dd>Métro B, Jules Ferry (80 m). <a class="link" href="${directionsUrl}" target="_blank" rel="noopener">Itinéraire</a> · <a class="link" href="${mapsUrl}" target="_blank" rel="noopener">Google Maps</a></dd></div>
      <div><dt>À confirmer</dt><dd class="small muted">Paiement en boutique, accès fauteuil roulant, stationnement.</dd></div></dl>
    <h3 style="margin:32px 0 10px">Horaires</h3>${hoursTable()}
    <p class="note" style="margin-top:12px">${holidayNote} Le 1er mai 2025, la boutique était fermée.</p>
  </div>
  <div>${mapPane(['metro', 'droit'])}</div>
</div></section>
<section class="section tight" aria-labelledby="f-h"><div class="container two">
  <div><h2 id="f-h" data-split>Un message ?</h2><p class="lead" style="margin-top:14px">Le formulaire ouvre votre messagerie : rien n’est envoyé depuis ce site.</p></div>
  <form class="form" data-form>
    <label>Votre nom<input name="nom" autocomplete="name" required></label>
    <label>Votre e-mail<input name="mail" type="email" autocomplete="email" required></label>
    <label>Votre message<textarea name="msg" required></textarea><span class="help">Pour une commande, utilisez plutôt le Click &amp; Collect avant 18 h.</span></label>
    <button class="btn" type="submit">Ouvrir ma messagerie</button>
  </form>
</div></section>`

boot({
  nav: 'contact/',
  main,
  setup(root) {
    wireMap(root)
    $<HTMLFormElement>('[data-form]', root)?.addEventListener('submit', (e) => {
      e.preventDefault()
      const f = new FormData(e.target as HTMLFormElement)
      const body = `${f.get('msg')}\n\n${f.get('nom')} (${f.get('mail')})`
      location.href = `mailto:${business.emails.shop}?subject=${encodeURIComponent('Message depuis le site')}&body=${encodeURIComponent(body)}`
    })
  },
})
