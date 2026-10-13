import { boot } from '../core/shell'
import { business } from '../data/business'
import { pageHead, secHead, commanderBtn } from '../core/parts'
import { routeSvg, illo } from '../core/art'
import { timeline } from '../data/timeline'
import { roles, teamFacts, values } from '../data/team'
import { gsap, ScrollTrigger } from '../core/motion'
import { prefersReducedMotion } from '../core/dom'
import { photo, photoFigure, photoImg } from '../data/photos'

const rolePhoto: Record<string, string> = { boulanger: 'petrissage', snacking: 'sandwich-jambon', vente: 'comptoir-vitrine', barista: 'cafe-tasse', apprenti: 'rouleau-patissier', resp: 'pains-etageres' }

const main = `
${pageHead('La maison, <span class="it">de l’Anjou à Rennes</span>', 'Une boulangerie de réseau, ouverte à Rennes le 22 mars 2025, avec un fournil à vue.', 'La maison', 'maison')}
<section class="section" aria-labelledby="r-h"><div class="container two">
  <div><h2 id="r-h" data-split>La boutique de Rennes</h2></div>
  <div class="prose" data-reveal>
    <p>La 28e maison du réseau Maison Bécam, et la première en Bretagne, a ouvert le 22 mars 2025 au 69 rue Jean Guéhenno : 300 m² au rez-de-chaussée d’un immeuble neuf, avec environ 50 places assises et un fournil visible derrière une grande verrière.</p>
    <p>À l’ouverture, ses responsables disaient vouloir « allier savoir-faire artisanal et plaisir gourmand » et répondre à « une demande forte des habitants » (Ouest-France, avril 2025). Une phrase résume l’état d’esprit : « Quelqu’un peut venir tous les jours et ne jamais manger la même chose » (actu.fr, février 2025).</p>
    <p>L’équipe a été formée quatre semaines dans une boutique d’Angers avant l’ouverture. Les invendus du soir devaient être proposés via Too Good To Go (annoncé en 2025, à confirmer).</p>
  </div>
</div></section>
<section class="section tight" aria-label="Photos d’illustration du métier"><div class="container">
  <div class="photo-trio">${['farine-plan-travail', 'pate-mains', 'pains-sortis-four'].map((sl) => `<figure data-reveal>${photoImg(photo(sl))}<figcaption>${photo(sl).alt}</figcaption></figure>`).join('')}</div>
  <p class="small muted" style="margin-top:10px">Photos d’illustration (Unsplash), pas des photos de la boutique ni de son équipe.</p>
</div></section>

<section class="section on-nuit" aria-labelledby="v-h"><div class="container">
  ${secHead('B-É-C-A-M', 'Cinq valeurs, une lettre chacune, énoncées par la boutique de Rennes dans ses offres d’emploi. Touchez une lettre.').replace('<h2 ', '<h2 id="v-h" ')}
  <div class="values">${values.map((v) => `<button type="button" aria-expanded="false"><span class="l">${v.letter}</span><span class="w">${v.word}</span><span class="t">${v.text}</span></button>`).join('')}</div>
</div></section>

<section class="section" aria-labelledby="d-h"><div class="container route-wrap">
  ${secHead('D’Angers à Rennes', 'Le réseau est né à Angers en 2005 ; Rennes est sa 28e maison, 70 km après Laval, la plus proche.').replace('<h2 ', '<h2 id="d-h" ')}
  <div class="on-navy" style="padding:24px;border-radius:2px">${routeSvg()}
    <div class="route-notes"><div><b>Angers, 2005</b><p class="small">Cécile et Nicolas Bécam fondent l’entreprise.</p></div><div><b>Laval</b><p class="small">La plus proche boutique du réseau, à environ 70 km.</p></div><div><b>Rennes, 22 mars 2025</b><p class="small">28e maison, première en Bretagne.</p></div></div></div>
</div></section>

<section class="section tight" aria-labelledby="t-h"><div class="container two">
  <div><h2 id="t-h" data-split>Les dates du réseau</h2><p class="lead" data-reveal style="margin-top:14px">Les points du réseau sont crédités à « le réseau Maison Bécam », pas à la boutique de Rennes.</p>
    <div class="box" style="margin-top:28px" data-reveal><h3>Classement Capital × Statista 2025</h3><p class="muted">Le réseau a été élu en novembre 2024 « Meilleure Boulangerie de France 2025 » parmi les enseignes de boulangerie, avec 8,35/10 sur 20 000 consommateurs. C’est un classement d’expérience client, daté, qui ne vise pas la boutique de Rennes.</p></div></div>
  <ol class="timeline" style="padding:0;margin-top:0">${timeline.map((t) => `<li class="${t.scope}" data-reveal><span class="d">${t.date} · ${t.scope === 'rennes' ? 'Rennes' : 'Réseau'}</span><h3>${t.title}</h3><p>${t.text}</p></li>`).join('')}</ol>
</div></section>

<section class="section" aria-labelledby="e-h"><div class="container">
  ${secHead('L’équipe', 'Des métiers, pas de noms : l’équipe s’est montée en 2025 avec 15 recrutements.').replace('<h2 ', '<h2 id="e-h" ')}
  <div class="three">${teamFacts.map((f) => `<div class="box" data-reveal><span style="font-family:var(--font-display);font-size:3.4rem;line-height:1;color:var(--accent-text)">${f.value}</span><b>${f.label}</b><p class="small muted">${f.note}</p></div>`).join('')}</div>
  <div class="three" style="margin-top:14px">${roles.map((r) => `<div class="box has-photo" data-reveal>${photoFigure(rolePhoto[r.id] ?? 'fournil-verriere', 'ph-fig box-ph', '')}<h3>${r.title}</h3><p class="muted">${r.text}</p><span class="tag-sample" style="justify-self:start">texte d’exemple</span></div>`).join('')}</div>
  <div class="btn-row" style="margin-top:28px"><a class="btn" href="${business.urls.recruitment}" target="_blank" rel="noopener">Offres d’emploi du réseau<span class="sr"> (nouvel onglet)</span></a>${commanderBtn('gold')}</div>
  <p class="small muted" style="margin-top:14px">Le réseau propose des apprentissages en boulangerie, pâtisserie, snacking et vente.</p>
</div></section>
<section class="section tight on-navy"><div class="container" style="display:grid;place-items:center;gap:8px;text-align:center">${illo('lys')}<p class="lead" style="color:#dbe6ec">L’Anjou et la Bretagne se retrouvent : fleur de lys et hermine.</p></div></section>`

boot({
  nav: 'la-maison/',
  main,
  setup(root) {
    root.querySelectorAll<HTMLButtonElement>('.values button').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'))))
    const line = root.querySelector<SVGPathElement>('.route-line')
    if (line && !prefersReducedMotion()) {
      gsap.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: '.route-wrap', start: 'top 70%', end: 'bottom 55%', scrub: 0.6 } })
      gsap.from(root.querySelectorAll('.route .stop'), { scale: 0, transformOrigin: 'center', duration: 0.6, ease: 'back.out(2)', stagger: 0.5, scrollTrigger: { trigger: '.route-wrap', start: 'top 60%', toggleActions: 'play none none none' } })
    }
    void ScrollTrigger
  },
})
