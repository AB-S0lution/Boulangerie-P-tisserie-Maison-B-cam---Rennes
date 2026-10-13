import { boot } from '../core/shell'
import { loyaltyRules, rewardLadder } from '../data/loyalty'
import { business } from '../data/business'
import { pageHead } from '../core/parts'
import { tapisserie } from '../core/art'

const main = `
${pageHead('Les <span class="it">Lys d’Or</span>', 'Le programme de fidélité du réseau Maison Bécam.', 'Les Lys d’Or', 'fidelite')}
<section class="section" aria-labelledby="r-h"><div class="container two">
  <div><h2 id="r-h" data-split>Comment ça marche</h2>
    <dl class="facts" style="margin-top:20px"><div><dt>Gagner</dt><dd>${loyaltyRules.earn}</dd></div><div><dt>Bienvenue</dt><dd>${loyaltyRules.welcome}</dd></div><div><dt>Utiliser</dt><dd>${loyaltyRules.redeem}</dd></div><div><dt>Où</dt><dd>${loyaltyRules.scope}</dd></div></dl>
    <p class="warn" style="margin-top:16px">${loyaltyRules.todo}</p>
    <div class="btn-row" style="margin-top:20px"><a class="btn" href="${business.urls.loyalty}" target="_blank" rel="noopener">Règlement sur maisonbecam.com<span class="sr"> (nouvel onglet)</span></a></div></div>
  <div style="position:relative;min-height:260px;border:1px solid var(--line);overflow:hidden" role="img" aria-label="Motif de fleurs de lys et d’hermine">${tapisserie('tapis-fid')}</div>
</div></section>
<section class="section tight" aria-labelledby="l-h"><div class="container">
  <h2 id="l-h" data-split>Un exemple de récompenses</h2><p class="muted" style="margin:12px 0 24px"><span class="tag-sample">exemple</span> Cette échelle est une illustration, pas le barème du réseau.</p>
  <div class="ladder" style="max-width:720px">${rewardLadder.map((r) => `<div data-reveal><span class="n">${r.lys}</span><span>${r.label}</span><span class="tag-sample">exemple</span></div>`).join('')}</div>
</div></section>`

boot({ nav: 'fidelite/', main })
