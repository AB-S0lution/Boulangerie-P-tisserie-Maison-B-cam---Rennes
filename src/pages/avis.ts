import { boot } from '../core/shell'
import { business, reviewUrl } from '../data/business'
import { praiseThemes, ratingSnapshot, reviews } from '../data/reviews'
import { pageHead, quoteCard, secHead } from '../core/parts'

const main = `
${pageHead('Les <span class="it">avis</span>', 'Ce que disent les clients, avec leurs mots. Pas de prénoms : seulement la plateforme.', 'Avis', 'avis')}
<section class="section" aria-labelledby="r-h"><div class="container two">
  <div class="rating" data-reveal><span class="big">${String(ratingSnapshot.rating).replace('.', ',')}</span><div><span class="stars" aria-hidden="true">★★★★★</span><h2 id="r-h" style="font-size:clamp(1.5rem,2.4vw,2rem);margin-top:4px">sur Google · plus de 1 000 avis</h2><p class="small muted">Relevé en ${ratingSnapshot.seen} (${ratingSnapshot.source}). ${ratingSnapshot.note}</p></div></div>
  <div class="prose" data-reveal><p>La note est restée stable entre 4,6 et 4,7 pendant que le nombre d’avis passait d’environ 250 à plus de 1 000 en dix-huit mois.</p><p class="muted small">Seuls les avis Google sont cités. La note d’une autre adresse du réseau (Facebook, TripAdvisor d’Angers) n’a pas de rapport avec la boutique de Rennes.</p></div>
</div></section>
<section class="section tight on-nuit" aria-labelledby="t-h"><div class="container">
  ${secHead('Ce qui revient le plus').replace('<h2 ', '<h2 id="t-h" ')}
  <div class="theme-bento">${praiseThemes.map((t) => `<div data-reveal><h3>${t.label}</h3><p>${t.blurb}</p></div>`).join('')}</div>
</div></section>
<section class="section" aria-labelledby="q-h"><div class="container">
  ${secHead('Treize avis Google', 'Citations authentiques, orthographe d’origine (accents rétablis seulement).').replace('<h2 ', '<h2 id="q-h" ')}
  <div class="masonry">${reviews.map((r) => quoteCard(r.id, true)).join('')}</div>
  <div class="btn-row" style="margin-top:28px"><a class="btn gold" href="${reviewUrl}" target="_blank" rel="noopener">Laisser un avis sur Google<span class="sr"> (nouvel onglet)</span></a></div>
  <p class="small muted" style="margin-top:12px">La boutique répond aux avis sur Google. ${business.name} ne publie aucun faux avis.</p>
</div></section>`

boot({ nav: 'avis/', main })
