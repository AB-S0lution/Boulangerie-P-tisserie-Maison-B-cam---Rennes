import { boot } from '../core/shell'
import { business, mapsUrl, directionsUrl } from '../data/business'
import { landmarks, transport } from '../data/quartier'
import { pageHead, secHead, mapPane, wireMap } from '../core/parts'
import { url } from '../core/dom'
import { photoFigure } from '../data/photos'

const icons: Record<string, string> = { metro: 'Métro', bus: 'Bus', car: 'Car', velo: 'Vélo' }

const main = `
${pageHead('Le quartier, <span class="it">face au campus</span>', 'Au pied du métro Jules Ferry, entre la fac de droit, le Thabor et le marché des Lices.', 'Le quartier', 'quartier')}
<section class="section" aria-labelledby="m-h"><div class="container place">
  <div><h2 id="m-h" data-split style="margin-bottom:22px">Autour de la rue Jean Guéhenno</h2>${mapPane(landmarks.map((l) => l.id), true)}</div>
  <div>
    <h3>Repères</h3>
    <table class="tbl" style="margin-top:10px"><tbody>${landmarks.map((l) => `<tr><td>${l.name}</td><td class="price">${l.distance}</td></tr>`).join('')}</tbody></table>
    <div class="btn-row" style="margin-top:20px"><a class="btn" href="${directionsUrl}" target="_blank" rel="noopener">Itinéraire<span class="sr"> (nouvel onglet)</span></a><a class="btn ghost" href="${mapsUrl}" target="_blank" rel="noopener">Voir sur Google Maps<span class="sr"> (nouvel onglet)</span></a></div>
  </div>
</div></section>
<section class="section tight on-nuit" aria-labelledby="a-h"><div class="container">
  ${secHead('Y venir', 'Métro ligne B, station Jules Ferry, à 80 m : ascenseurs, accessible. Les lignes de bus ont été relevées dans les données OpenStreetMap de juillet 2026 : vérifiez sur le plan STAR.').replace('<h2 ', '<h2 id="a-h" ')}
  <div class="three">${transport.map((t) => `<div class="box"><span class="label">${icons[t.mode]}</span><h3>${t.lines}</h3><p class="muted">${t.stop} · ${t.distance}</p>${t.note ? `<p class="small muted">${t.note}</p>` : ''}</div>`).join('')}</div>
  <p class="small" style="margin-top:16px;color:#cbd9e1">Stationnement client : non communiqué, privilégiez métro, bus ou vélo.</p>
</div></section>
<section class="section" aria-labelledby="g-h"><div class="container two">
  <div><h2 id="g-h" data-split>Jean Guéhenno</h2>${photoFigure('petrissage', 'ph-fig wide', 'Le travail des mains. Photo d’illustration (Unsplash).')}</div>
  <div class="prose" data-reveal><p>La rue porte le nom de Jean Guéhenno (1890-1978), écrivain né à Fougères, fils de cordonnier. Il quitte l’école à 14 ans pour travailler en usine, étudie seul puis devient professeur et essayiste. Un clin d’œil au travail des mains et à la transmission, deux idées d’une boulangerie.</p></div>
</div></section>
<section class="section tight" aria-labelledby="l-h"><div class="container two">
  <div><h2 id="l-h" data-split>Un samedi aux Lices <span class="tag-sample">idée d’exemple</span></h2>${photoFigure('marche-etals', 'ph-fig wide', 'Un marché en plein air. Photo d’illustration (Unsplash), pas le marché des Lices.')}</div>
  <ol class="steps" data-reveal><li><div><b>7 h 30 : le marché des Lices</b><span>Environ 1,1 km, 15 minutes à pied. Marché du samedi depuis 1622.</span></div></li><li><div><b>10 h : un café, un kouign-amann</b><span>Retour rue Jean Guéhenno, ${business.address.street}.</span></div></li><li><div><b>16 h : goûter au Thabor</b><span>À 500 m, avec un Choc’O Roi individuel dans le sac.</span></div></li></ol>
</div></section>`

boot({ nav: 'le-quartier/', main, setup(root) { wireMap(root); void url } })
