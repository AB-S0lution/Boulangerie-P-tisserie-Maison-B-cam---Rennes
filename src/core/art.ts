// Original SVG illustration system (no photos, no franchisor logo or tapestry).
// One hand: 1.5 px navy line, flat gold / crust / schist fills. Colours come from CSS variables
// (--ill-*) so the drawings follow the light / dark theme.

const L = 'stroke="var(--ill-line)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
const crust = 'fill="var(--ill-crust)"'
const gold = 'fill="var(--ill-gold)"'
const mie = 'fill="var(--ill-mie)"'
const choc = 'fill="var(--ill-choc)"'
const cream = 'fill="var(--ill-cream)"'
const none = 'fill="none"'
const rose = 'fill="var(--ill-rose)"'
const green = 'fill="var(--ill-green)"'

/** Fleur de lys, drawn in a 24 x 24 box. Our own simplified drawing, not the franchisor's logo. */
export function lysPath(fill = 'var(--or)', stroke = 'var(--ill-line)'): string {
  return `<g fill="${fill}" stroke="${stroke}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
    <path d="M12 1.5c2.3 3.2 2.6 6.6 0 10.4c-2.6-3.8-2.3-7.2 0-10.4z"/>
    <path d="M10.6 12.2C8.4 7.6 3.4 8.2 3.2 12.4c-.1 2.6 2.4 3.9 4.6 3.1c-.4 1.4-1.2 2.2-2.2 2.5c2.6.6 4.4-.6 5-2.2z"/>
    <path d="M13.4 12.2c2.2-4.6 7.2-4 7.4.2c.1 2.6-2.4 3.9-4.6 3.1c.4 1.4 1.2 2.2 2.2 2.5c-2.6.6-4.4-.6-5-2.2z"/>
    <rect x="7.2" y="15.2" width="9.6" height="2" rx=".6"/>
    <path d="M10.4 17.2h3.2l.6 4.8c-.9-.5-1.5-.9-2.2-.9s-1.3.4-2.2.9z"/>
  </g>`
}

export function lysIcon(size = 24, cls = ''): string {
  return `<svg class="lys ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${lysPath('currentColor', 'none')}</svg>`
}

/** Ermine spot (Rennes coat of arms) in a 12 x 20 box. */
export function ermine(fill = 'currentColor'): string {
  return `<g fill="${fill}"><path d="M6 0c2 4 2 6 0 11c-2-5-2-7 0-11z"/><circle cx="2.2" cy="4" r="1.2"/><circle cx="9.8" cy="4" r="1.2"/><circle cx="6" cy="14.5" r="1.2"/></g>`
}

/** Tapisserie Lys et Hermine: our own pattern (alternating lys and ermine). */
export function tapisserie(id: string, bg = 'var(--bleu)', fg = 'var(--or)'): string {
  return `<svg class="tapis" width="100%" height="100%" aria-hidden="true" focusable="false">
    <defs><pattern id="${id}" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
      <rect width="64" height="64" fill="${bg}"/>
      <g transform="translate(8 6) scale(1.1)" color="${fg}" opacity=".9">${lysPath(fg, 'none')}</g>
      <g transform="translate(40 38) scale(1.1)" color="${fg}" opacity=".9">${lysPath(fg, 'none')}</g>
      <g transform="translate(46 8) scale(.9)" opacity=".55">${ermine(fg)}</g>
      <g transform="translate(14 38) scale(.9)" opacity=".55">${ermine(fg)}</g>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#${id})"/></svg>`
}

/** "Barres coucou": fine blue-grey barring used as a divider. */
export function coucouBars(): string {
  return `<svg class="coucou-bars" width="100%" height="14" aria-hidden="true" focusable="false"><defs><pattern id="coucou" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="none"/><path d="M0 11 C3.5 3 10.5 3 14 11" stroke="var(--coucou)" stroke-width="1.4" fill="none" opacity=".65"/></pattern></defs><rect width="100%" height="14" fill="url(#coucou)"/></svg>`
}

type Drawer = () => string

const dots = (pts: number[][], r = 1.4, f = 'var(--ill-line)') => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="none"/>`).join('')

const D: Record<string, Drawer> = {
  flute: () =>
    `<g transform="rotate(-24 60 62)"><rect x="6" y="48" width="108" height="28" rx="14" ${crust}/><path d="M24 52l9 20M44 52l9 20M64 52l9 20M84 52l9 20" ${none} stroke="var(--ill-mie)" stroke-width="2.6"/></g>`,
  pave: () =>
    `<rect x="20" y="42" width="80" height="42" rx="13" ${crust}/><path d="M34 54c10-6 16 6 26 0s16 6 26 0" ${none}/><path d="M36 66c9 5 15-5 24 0s15 5 24 0" ${none}/>${dots([[30, 50], [92, 76], [70, 48], [44, 78]], 1.2)}`,
  boule: () =>
    `<ellipse cx="60" cy="68" rx="42" ry="30" ${crust}/><path d="M36 54c8 8 14 26 14 34M60 44v44M84 54c-8 8-14 26-14 34" ${none} stroke="var(--ill-mie)" stroke-width="2.4"/>`,
  painmie: () =>
    `<path d="M22 50c-6-14 6-24 18-20c6-8 34-8 40 0c12-4 24 6 18 20v32H22z" ${crust}/><path d="M22 82h76" />${dots([[44, 62], [60, 66], [78, 60]], 1.3)}`,
  bun: () =>
    `<path d="M20 70c0-30 80-30 80 0z" ${crust}/><path d="M24 76h72c0 8-8 12-36 12s-36-4-36-12z" ${mie}/>${dots([[44, 54], [58, 48], [72, 54], [52, 62], [68, 62]], 1.5, 'var(--ill-mie)')}`,
  croissant: () =>
    `<g ${crust}><ellipse cx="60" cy="58" rx="19" ry="28"/><ellipse cx="34" cy="68" rx="13" ry="21" transform="rotate(32 34 68)"/><ellipse cx="86" cy="68" rx="13" ry="21" transform="rotate(-32 86 68)"/><ellipse cx="17" cy="82" rx="8" ry="14" transform="rotate(60 17 82)"/><ellipse cx="103" cy="82" rx="8" ry="14" transform="rotate(-60 103 82)"/></g><path d="M48 40c4 8 4 28 0 36M72 40c-4 8-4 28 0 36" ${none} stroke="var(--ill-mie)" stroke-width="2"/>`,
  painchoc: () =>
    `<rect x="18" y="40" width="84" height="42" rx="18" ${crust}/><rect x="14" y="52" width="8" height="18" rx="3" ${choc}/><rect x="98" y="52" width="8" height="18" rx="3" ${choc}/><path d="M38 44v34M56 44v34M74 44v34M92 46v30" ${none} stroke="var(--ill-mie)" stroke-width="2"/>`,
  brioche: () =>
    `<circle cx="60" cy="40" r="14" ${crust}/><path d="M24 90c-8-30 8-46 36-46s44 16 36 46z" ${crust}/><path d="M38 56l6 32M52 52l2 36M68 52l-2 36M82 56l-6 32" ${none} stroke="var(--ill-mie)" stroke-width="2"/>`,
  noeud: () =>
    `<path d="M60 62c-14-26-42-22-42 0s28 26 42 0c14 26 42 22 42 0s-28-26-42 0z" ${rose}/><circle cx="60" cy="62" r="7" ${crust}/><path d="M26 58c4-4 10-4 14 0M80 58c4-4 10-4 14 0" ${none} stroke="var(--ill-cream)" stroke-width="2"/>`,
  cookie: () =>
    `<path d="M60 22c10 0 12 8 22 8s16 8 14 18s8 14 2 22s-4 14-14 18s-14 10-24 8s-14-6-24-8s-14-12-12-22s-8-14-2-22s6-14 16-16s12-8 22-6z" ${gold}/>${dots([[46, 44], [72, 40], [84, 62], [52, 62], [68, 78], [40, 76], [90, 44]], 4.2, 'var(--ill-choc)')}`,
  chausson: () =>
    `<path d="M16 84c0-40 28-58 52-58s36 24 36 58z" ${crust}/><path d="M32 78c4-20 12-34 26-44M48 80c4-18 12-30 24-38M64 82c3-14 8-24 18-30" ${none} stroke="var(--ill-mie)" stroke-width="2"/>`,
  kouign: () =>
    `<circle cx="60" cy="62" r="38" ${crust}/><circle cx="60" cy="62" r="26" ${gold}/><path d="M60 24v76M22 62h76M33 35l54 54M87 35l-54 54" ${none} stroke="var(--ill-mie)" stroke-width="1.8"/><circle cx="60" cy="62" r="7" fill="var(--ill-choc)" stroke="none"/>`,
  far: () =>
    `<path d="M16 88L60 28l44 60z" ${gold}/><path d="M16 88h88" />${dots([[44, 72], [60, 62], [76, 74], [58, 80], [68, 52]], 5.2, 'var(--ill-choc)')}`,
  beignet: () =>
    `<circle cx="60" cy="64" r="34" ${crust}/>${dots([[40, 52], [56, 40], [76, 46], [84, 64], [70, 80], [48, 80], [38, 66], [60, 60], [62, 74]], 2.2, 'var(--ill-cream)')}`,
  choux: () =>
    `<g ${crust}><circle cx="38" cy="78" r="22"/><circle cx="82" cy="78" r="22"/><circle cx="60" cy="50" r="22"/></g>${dots([[34, 70], [90, 72], [56, 42], [66, 56]], 1.8, 'var(--ill-cream)')}`,
  chocoroi: () =>
    `<ellipse cx="60" cy="86" rx="38" ry="12" ${choc}/><path d="M22 86V72h76v14" ${choc}/><ellipse cx="60" cy="72" rx="38" ry="12" ${cream}/><path d="M22 72V58h76v14" ${cream}/><ellipse cx="60" cy="58" rx="38" ry="12" ${choc}/><ellipse cx="60" cy="46" rx="34" ry="10" ${gold}/><path d="M26 46v12M94 46v12" /><g transform="translate(48 30) scale(1)">${lysPath('var(--ill-choc)', 'none')}</g>`,
  'chocoroi-gateau': () =>
    `<ellipse cx="60" cy="82" rx="46" ry="14" ${choc}/><path d="M14 82V64h92v18" ${choc}/><ellipse cx="60" cy="64" rx="46" ry="14" ${gold}/><path d="M60 50v28M20 58l40 12M100 58L60 70M30 52l30 18M90 52L60 70" ${none} stroke="var(--ill-choc)" stroke-width="1" /><g transform="translate(48 28)">${lysPath('var(--ill-choc)', 'none')}</g>`,
  poplarbox: () =>
    `<ellipse cx="60" cy="86" rx="44" ry="14" fill="#d9c08a"/><path d="M16 86V62h88v24" fill="#d9c08a"/><ellipse cx="60" cy="62" rx="44" ry="14" fill="#ecd9a8"/><path d="M30 60c20-6 40-6 60 0M26 64c24-6 44-6 68 0" ${none} stroke="#b89b5d" stroke-width="1"/><g transform="translate(48 46) scale(1)">${lysPath('var(--ill-choc)', 'none')}</g>`,
  entremet: () =>
    `<rect x="20" y="48" width="80" height="14" rx="2" ${choc}/><rect x="20" y="62" width="80" height="12" rx="2" ${gold}/><rect x="20" y="74" width="80" height="14" rx="2" ${cream}/><path d="M16 46c0-10 88-10 88 0v4H16z" ${choc}/>${dots([[44, 42], [62, 40], [80, 42]], 2.2, 'var(--ill-gold)')}<path d="M92 36l4-8" stroke="var(--ill-gold)" stroke-width="2"/>`,
  eclair: () =>
    `<rect x="12" y="52" width="96" height="28" rx="14" ${crust}/><path d="M16 56c6-12 82-12 88 0c-4 6-84 6-88 0z" ${choc}/>${dots([[34, 64], [54, 66], [74, 64], [92, 62]], 1.6, 'var(--ill-cream)')}`,
  parisbrest: () =>
    `<circle cx="60" cy="62" r="36" ${crust}/><circle cx="60" cy="62" r="15" fill="var(--ill-bg)" /><path d="M32 40c10-8 46-8 56 0" ${none} stroke="var(--ill-mie)" stroke-width="2"/>${dots([[40, 38], [54, 32], [68, 32], [82, 40], [86, 56], [34, 54]], 2, 'var(--ill-cream)')}`,
  tarte: () =>
    `<ellipse cx="60" cy="72" rx="46" ry="18" ${crust}/><ellipse cx="60" cy="66" rx="40" ry="14" ${gold}/>${dots([[40, 66], [52, 62], [66, 64], [78, 68], [60, 70], [48, 72]], 5, 'var(--ill-rose)')}<path d="M16 72c2 6 6 10 14 12M104 72c-2 6-6 10-14 12" ${none}/>`,
  macaron: () =>
    `<path d="M20 58c0-24 80-24 80 0z" ${rose}/><rect x="22" y="58" width="76" height="9" rx="4" ${cream}/><path d="M20 67c0 24 80 24 80 0z" ${rose}/><path d="M30 52c10-6 22-8 34-6" ${none} stroke="var(--ill-cream)" stroke-width="2"/>`,
  verrine: () =>
    `<path d="M34 24h52l-6 70c0 6-6 8-20 8s-20-2-20-8z" fill="var(--ill-glass)"/><path d="M38 60h44l-2 30c0 4-4 6-20 6s-20-2-20-6z" ${cream}/><path d="M37 46h46l-1 14H38z" ${choc}/><path d="M36 34h48l-1 12H37z" ${rose}/><circle cx="60" cy="30" r="5" ${rose}/>`,
  cannele: () =>
    `<path d="M38 32c0-10 44-10 44 0l-6 56c0 8-32 8-32 0z" fill="#8a5a2a"/><path d="M48 30l-3 58M60 30v60M72 30l3 58" ${none} stroke="var(--ill-crust)" stroke-width="2"/><ellipse cx="60" cy="32" rx="22" ry="6" ${gold}/>`,
  numbercake: () =>
    `<path d="M30 28c20-10 40-6 40 14c0 14-30 18-30 38h46v12H22V82c0-24 30-28 30-40c0-6-10-6-22 2z" ${rose}/>${dots([[36, 32], [56, 28], [66, 44], [52, 66], [38, 80], [66, 88], [86, 88]], 4.5, 'var(--ill-cream)')}<ellipse cx="80" cy="90" rx="8" ry="6" ${rose} /><path d="M70 34v-10" stroke="var(--ill-gold)" stroke-width="2.5"/>`,
  sandwich: () =>
    `<path d="M10 66c0-18 100-18 100 0v6H10z" ${crust}/><path d="M12 72c14 6 26-2 38 4s26 0 40 4s16-2 20-6" ${green}/><rect x="12" y="76" width="96" height="8" rx="3" ${rose}/><path d="M10 84h100v6c0 10-100 10-100 0z" ${crust}/><path d="M26 56l6-6M50 52l6-6M74 52l6-6" ${none} stroke="var(--ill-mie)" stroke-width="2"/>`,
  croque: () =>
    `<path d="M24 52h72l8 14v22H16V66z" ${crust}/><path d="M24 52l-8 14h88l-8-14z" ${gold}/><path d="M16 66c10 8 18 2 30 6s22 0 30 6s20 2 28-6" ${none} stroke="var(--ill-cream)" stroke-width="3"/>`,
  quiche: () =>
    `<ellipse cx="60" cy="74" rx="46" ry="16" ${crust}/><ellipse cx="60" cy="68" rx="38" ry="12" fill="#e8cf7e"/>${dots([[42, 66], [56, 70], [72, 64], [82, 68]], 3, 'var(--ill-green)')}<path d="M16 74c2 8 8 12 16 14M104 74c-2 8-8 12-16 14" ${none}/>`,
  tartefine: () =>
    `<rect x="18" y="40" width="84" height="48" rx="4" ${gold}/><rect x="26" y="48" width="68" height="32" rx="2" ${cream}/>${dots([[40, 58], [58, 64], [76, 58], [48, 72], [70, 72]], 5, 'var(--ill-rose)')}${dots([[44, 56], [82, 70]], 3, 'var(--ill-green)')}`,
  wrap: () =>
    `<g transform="rotate(-20 60 62)"><rect x="12" y="44" width="96" height="36" rx="18" fill="#e7d2a0"/><ellipse cx="102" cy="62" rx="9" ry="16" ${cream}/><path d="M96 54l4 4M98 66l5-2M100 58l3 6" ${none} stroke="var(--ill-green)" stroke-width="2.6"/><path d="M24 52v20M52 50v24M80 50v24" ${none} stroke="#c9ad6c"/></g>`,
  burger: () =>
    `<path d="M22 56c0-26 76-26 76 0z" ${crust}/><path d="M16 60c10 8 14 0 22 4s14 0 22 4s14-4 22 0s14 2 22-6" ${green}/><rect x="20" y="66" width="80" height="10" rx="5" fill="#6b3d2a"/><rect x="24" y="76" width="72" height="5" fill="#e8c24a"/><path d="M22 82h76c0 8-8 12-38 12s-38-4-38-12z" ${crust}/>${dots([[44, 42], [60, 36], [76, 42]], 1.5, 'var(--ill-mie)')}`,
  hotdog: () =>
    `<rect x="10" y="62" width="100" height="26" rx="13" ${crust}/><rect x="6" y="52" width="108" height="14" rx="7" fill="#b2482f"/><path d="M20 58c10 4 14-4 22 0s14 4 22 0s14-4 22 0s10 2 18-2" ${none} stroke="#e8c24a" stroke-width="3"/>`,
  bagel: () =>
    `<circle cx="60" cy="62" r="40" ${crust}/><circle cx="60" cy="62" r="15" fill="var(--ill-bg)"/>${dots([[30, 46], [42, 32], [64, 28], [84, 38], [92, 62], [84, 88], [60, 96], [34, 84], [26, 64]], 1.8, 'var(--ill-cream)')}`,
  salade: () =>
    `<path d="M16 62h88c0 28-20 40-44 40S16 90 16 62z" fill="var(--ill-glass)"/><g ${green}><circle cx="38" cy="52" r="14"/><circle cx="60" cy="46" r="16"/><circle cx="82" cy="52" r="14"/></g>${dots([[48, 54], [68, 56], [58, 42]], 4, 'var(--ill-rose)')}<path d="M16 62h88" />`,
  club: () =>
    `<path d="M16 86L56 28l40 58z" ${mie}/><path d="M26 86l30-44l30 44z" ${green}/><path d="M36 86l20-30l20 30z" ${rose}/><path d="M16 86h80" /><path d="M56 28v-12" /><circle cx="56" cy="14" r="3" ${rose}/>`,
  prefou: () =>
    `<ellipse cx="60" cy="64" rx="48" ry="24" ${crust}/><path d="M24 62h72" ${none} stroke="var(--ill-mie)" stroke-width="2"/>${dots([[32, 66], [48, 58], [66, 70], [84, 62], [58, 60], [76, 72]], 3, 'var(--ill-green)')}`,
  plateau: () =>
    `<ellipse cx="60" cy="68" rx="52" ry="30" fill="var(--ill-glass)"/><g ${crust}><circle cx="36" cy="62" r="10"/><circle cx="60" cy="52" r="10"/><circle cx="84" cy="62" r="10"/></g><g ${gold}><circle cx="46" cy="82" r="9"/><circle cx="74" cy="82" r="9"/></g><g ${rose}><circle cx="60" cy="72" r="6"/></g>`,
  // -- gallery / decor only --
  baker: () =>
    `<rect x="8" y="88" width="104" height="10" rx="2" fill="var(--ill-choc)"/><ellipse cx="62" cy="82" rx="20" ry="8" ${mie}/><circle cx="46" cy="36" r="11" fill="var(--ill-line)"/><path d="M36 28c0-12 20-12 20 0z" ${cream}/><path d="M32 90c-4-30 4-42 14-42s18 12 16 42z" fill="var(--ill-line)"/><path d="M52 58c10 4 16 12 18 22" ${none} stroke="var(--ill-line)" stroke-width="7"/>`,
  cup: () =>
    `<path d="M24 52h60v26c0 14-12 22-30 22s-30-8-30-22z" fill="var(--ill-glass)"/><path d="M84 58h8c8 0 8 16 0 16h-8" /><path d="M46 36c-4-6 4-8 0-14M62 36c-4-6 4-8 0-14" ${none}/><path d="M30 58h48v8H30z" fill="var(--ill-choc)" stroke="none"/><ellipse cx="54" cy="104" rx="38" ry="4" fill="var(--ill-line)" opacity=".15" stroke="none"/>`,
  lys: () => `<g transform="translate(10 10) scale(4)">${lysPath('var(--ill-gold)', 'var(--ill-line)')}</g>`,
  tapisserie: () => `<rect x="10" y="10" width="100" height="100" fill="var(--bleu)" stroke="none"/><g transform="translate(18 16) scale(1.5)">${lysPath('var(--or)', 'none')}</g><g transform="translate(66 62) scale(1.5)">${lysPath('var(--or)', 'none')}</g><g transform="translate(78 20) scale(1.2)" opacity=".7">${ermine('var(--or)')}</g><g transform="translate(28 66) scale(1.2)" opacity=".7">${ermine('var(--or)')}</g>`,
  metro: () =>
    `<path d="M14 94V54c0-20 92-20 92 0v40z" fill="var(--ill-glass)"/><path d="M14 54c0-20 92-20 92 0M32 94V44M60 94V38M88 94V44" ${none}/><circle cx="60" cy="24" r="12" fill="var(--bleu)"/><text x="60" y="29" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" stroke="none" font-family="Montserrat, sans-serif">B</text><path d="M14 94h92" />`,
  thabor: () =>
    `<path d="M14 98V40M30 98V34M46 98V40M62 98V34M78 98V40M94 98V34M106 98V40" ${none} stroke-width="2"/><path d="M10 40h100M10 98h100" /><g ${gold}><circle cx="30" cy="30" r="3"/><circle cx="62" cy="30" r="3"/><circle cx="94" cy="30" r="3"/></g><path d="M12 108c20-8 30-8 48 0s36 8 48 0" ${none} stroke="var(--ill-green)" stroke-width="3"/>`,
  coucou: () =>
    `<path d="M26 68c0-24 30-34 52-26c8-12 22-6 18 6c-2 6-8 8-8 14c8 4 6 20-6 26c-12 6-40 6-52-4z" fill="var(--coucou)"/><path d="M34 62c8 2 14 0 20-6M38 74c10 2 20 0 28-8M48 86c8 0 16-2 24-8M70 52c6 2 10 0 14-4" ${none} stroke="var(--ill-line)" stroke-width="1.2"/><path d="M88 44l10 2l-8 4z" fill="var(--ill-gold)"/><circle cx="84" cy="44" r="1.8" fill="var(--ill-line)" stroke="none"/><path d="M52 98l-3 10M64 98l3 10M46 108h8M62 108h10" ${none}/>`,
  verriere: () =>
    `<rect x="10" y="14" width="100" height="90" fill="var(--ill-glass)"/><path d="M43 14v90M77 14v90M10 59h100" ${none} stroke-width="2.5"/><g transform="translate(46 26) scale(.9)">${lysPath('var(--ill-gold)', 'none')}</g><path d="M20 98V80l8-10l8 10v18M86 98V84h12v14" fill="var(--ill-line)" stroke="none"/>`,
}

export function illoKeys(): string[] {
  return Object.keys(D)
}

/** An illustration as an inline SVG (viewBox 120 x 120). `label` becomes the accessible name. */
export function illo(key: string, label = '', cls = ''): string {
  const draw = D[key] ?? D.boule
  const aria = label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"'
  return `<svg class="illo ${cls}" viewBox="0 0 120 120" ${aria} focusable="false"><g ${L}>${draw()}</g></svg>`
}

/** The hero verrière: 6 glass panes onto the fournil. data-part on the wrapper selects the scene. */
export function verriere(): string {
  const fog = [0, 1, 2, 3, 4, 5].map((i) => `<rect class="fog" data-i="${i}" x="${[22, 214, 406, 22, 214, 406][i]}" y="${[22, 22, 22, 252, 252, 252][i]}" width="172" height="220" fill="var(--verre)"/>`).join('')
  const paneRect = (x: number, y: number) => `<rect x="${x}" y="${y}" width="172" height="220"/>`
  const panes = [[22, 22], [214, 22], [406, 22], [22, 252], [214, 252], [406, 252]]
  const tints = ['matin', 'metro', 'midi', 'gouter', 'soir', 'fermeture']
    .map((t) => `<g class="tint tint-${t}" fill="var(--tint-${t})">${panes.map(([x, y]) => paneRect(x, y)).join('')}</g>`)
    .join('')
  return `<svg class="verriere" viewBox="0 0 600 490" role="img" aria-label="Illustration de la verrière : six vitres sur le fournil, avec boulangers, four, vitrine et machine à café" focusable="false">
    <rect x="0" y="0" width="600" height="490" fill="var(--bleu-nuit)"/>
    ${tints}
    <g class="glow" fill="var(--or)">${panes.map(([x, y]) => paneRect(x, y)).join('')}</g>
    <!-- pane 1 : baker shaping dough -->
    <g transform="translate(22 22)" stroke="var(--bleu)" stroke-width="1.5">
      <rect x="0" y="176" width="172" height="44" fill="var(--bleu)"/><rect x="14" y="168" width="144" height="10" fill="var(--bleu-clair)"/>
      <ellipse cx="96" cy="162" rx="30" ry="9" fill="var(--ill-mie)"/><ellipse cx="96" cy="160" rx="22" ry="5" fill="var(--ill-cream)" stroke="none"/>
      <circle cx="64" cy="76" r="17" fill="var(--bleu)"/><path d="M46 66c0-22 36-22 36 0z" fill="#fff" stroke="none"/><path d="M42 168c-8-56 4-78 22-78s30 20 24 78z" fill="var(--bleu)"/><path d="M80 112c20 6 30 22 32 46" fill="none" stroke="var(--bleu)" stroke-width="14"/>
    </g>
    <!-- pane 2 : oven -->
    <g transform="translate(214 22)" stroke="var(--bleu)" stroke-width="1.5">
      <rect x="0" y="0" width="172" height="220" fill="var(--bleu)" opacity=".92"/><path d="M26 220V110c0-62 120-62 120 0v110z" fill="var(--four)"/><path d="M42 220V116c0-44 88-44 88 0v104z" fill="var(--or)" opacity=".85"/>
      <g fill="var(--ill-crust)" stroke="var(--bleu)"><rect x="50" y="170" width="72" height="14" rx="7" transform="rotate(-8 86 177)"/><rect x="54" y="150" width="64" height="13" rx="6.5" transform="rotate(6 86 156)"/></g><rect x="20" y="206" width="132" height="8" fill="var(--bleu-clair)"/>
    </g>
    <!-- pane 3 : flûtes in basket -->
    <g transform="translate(406 22)" stroke="var(--bleu)" stroke-width="1.5">
      <rect x="0" y="184" width="172" height="36" fill="var(--bleu)"/>
      <g fill="var(--ill-crust)"><rect x="34" y="30" width="22" height="160" rx="11" transform="rotate(-8 45 110)"/><rect x="62" y="22" width="22" height="168" rx="11" transform="rotate(-2 73 106)"/><rect x="90" y="30" width="22" height="160" rx="11" transform="rotate(5 101 110)"/><rect x="118" y="40" width="22" height="150" rx="11" transform="rotate(11 129 115)"/></g>
      <path d="M22 140h128l-10 64H32z" fill="var(--ill-gold)"/><path d="M30 160h112M34 180h104" stroke="var(--bleu)" fill="none"/>
    </g>
    <!-- pane 4 : scenes per day-part -->
    <g transform="translate(22 252)" stroke="var(--bleu)" stroke-width="1.5">
      <rect x="0" y="170" width="172" height="50" fill="var(--bleu)"/>
      <g class="scene sc-matin"><rect x="22" y="130" width="128" height="32" rx="4" fill="#d9c08a"/><rect x="30" y="102" width="108" height="24" rx="12" fill="var(--ill-crust)" transform="rotate(-6 84 114)"/><path d="M50 108l6 14M72 104l6 14M94 100l6 14" stroke="var(--ill-mie)" stroke-width="3" fill="none"/><path d="M118 86l30-26" stroke="var(--bleu)" stroke-width="3"/></g>
      <g class="scene sc-metro"><path d="M30 164h112" /><path d="M54 164v-58c0-26 64-26 64 0v58z" fill="var(--ill-mie)"/><rect x="62" y="116" width="48" height="10" rx="5" fill="var(--ill-crust)"/><circle cx="86" cy="70" r="12" fill="var(--bleu)"/></g>
      <g class="scene sc-midi"><rect x="22" y="130" width="128" height="32" rx="4" fill="#d9c08a"/><g><rect x="30" y="100" width="48" height="24" rx="10" fill="var(--ill-crust)"/><rect x="34" y="112" width="40" height="6" fill="var(--ill-green)" stroke="none"/><rect x="88" y="100" width="48" height="24" rx="10" fill="var(--ill-crust)"/><rect x="92" y="112" width="40" height="6" fill="var(--ill-rose)" stroke="none"/></g></g>
      <g class="scene sc-gouter"><rect x="22" y="138" width="128" height="24" rx="3" fill="#ecd9a8"/><g fill="var(--ill-choc)"><rect x="32" y="108" width="34" height="30" rx="4"/><rect x="72" y="108" width="34" height="30" rx="4"/><rect x="112" y="108" width="30" height="30" rx="4"/></g><g fill="var(--or)" stroke="none"><circle cx="49" cy="116" r="5"/><circle cx="89" cy="116" r="5"/><circle cx="127" cy="116" r="5"/></g></g>
      <g class="scene sc-soir"><path d="M30 164c0-34 20-44 56-44s56 10 56 44z" fill="var(--ill-gold)"/><g fill="var(--ill-crust)"><rect x="48" y="90" width="20" height="60" rx="10" transform="rotate(-10 58 120)"/><rect x="76" y="86" width="20" height="64" rx="10" transform="rotate(4 86 118)"/><rect x="104" y="92" width="20" height="58" rx="10" transform="rotate(14 114 121)"/></g></g>
      <g class="scene sc-fermeture"><g transform="translate(46 52) scale(3.4)"><path d="M12 1.5c2.3 3.2 2.6 6.6 0 10.4c-2.6-3.8-2.3-7.2 0-10.4z" fill="var(--or)" stroke="none"/><path d="M10.6 12.2C8.4 7.6 3.4 8.2 3.2 12.4c-.1 2.6 2.4 3.9 4.6 3.1c-.4 1.4-1.2 2.2-2.2 2.5c2.6.6 4.4-.6 5-2.2z M13.4 12.2c2.2-4.6 7.2-4 7.4.2c.1 2.6-2.4 3.9-4.6 3.1c.4 1.4 1.2 2.2 2.2 2.5c-2.6.6-4.4-.6-5-2.2z M7.2 15.2h9.6v2H7.2z M10.4 17.2h3.2l.6 4.8c-.9-.5-1.5-.9-2.2-.9s-1.3.4-2.2.9z" fill="var(--or)" stroke="none"/></g></g>
    </g>
    <!-- pane 5 : coffee machine -->
    <g transform="translate(214 252)" stroke="var(--bleu)" stroke-width="1.5">
      <rect x="0" y="176" width="172" height="44" fill="var(--bleu)"/>
      <rect x="30" y="52" width="112" height="100" rx="6" fill="var(--bleu)"/><rect x="42" y="64" width="88" height="24" rx="3" fill="var(--bleu-clair)"/><circle cx="62" cy="76" r="6" fill="var(--or)"/><circle cx="110" cy="76" r="6" fill="var(--or)"/><rect x="72" y="100" width="28" height="34" fill="var(--bleu-clair)"/><rect x="62" y="150" width="48" height="28" rx="4" fill="#fff"/>
    </g>
    <!-- pane 6 : metro mouth + lys -->
    <g transform="translate(406 252)" stroke="var(--bleu)" stroke-width="1.5">
      <rect x="0" y="176" width="172" height="44" fill="var(--bleu)"/>
      <path d="M20 176V96c0-42 132-42 132 0v80z" fill="var(--bleu-clair)"/><path d="M44 176V104c0-26 84-26 84 0v72z" fill="var(--verre)" opacity=".75"/><circle cx="86" cy="52" r="20" fill="var(--bleu)" stroke="#fff"/><text x="86" y="60" text-anchor="middle" font-size="22" font-weight="700" fill="#fff" stroke="none" font-family="Montserrat, sans-serif">B</text>
    </g>
    <!-- mullions -->
    <g fill="var(--bleu)" stroke="var(--or)" stroke-width="1" stroke-opacity=".5"><rect x="0" y="0" width="600" height="22"/><rect x="0" y="468" width="600" height="22"/><rect x="0" y="0" width="22" height="490"/><rect x="578" y="0" width="22" height="490"/><rect x="194" y="0" width="20" height="490"/><rect x="386" y="0" width="20" height="490"/><rect x="0" y="242" width="600" height="10"/></g>
    <g class="fogs">${fog}</g>
  </svg>`
}

/** Illustrated map of the quartier (shop, metro, campus ...). Landmarks are placed from data in quartier.ts. */
export function mapBase(): string {
  return `<svg class="map-base" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <rect width="100" height="100" fill="var(--map-bg)"/>
    <path d="M0 62C20 58 36 56 56 50S88 40 100 30" stroke="var(--map-road)" stroke-width="3.2" fill="none"/>
    <path d="M56 50C56 70 60 86 66 100" stroke="var(--map-road)" stroke-width="2.4" fill="none"/>
    <path d="M24 0C26 20 30 40 34 60S40 90 40 100" stroke="var(--map-road)" stroke-width="2.4" fill="none"/>
    <path d="M0 30C26 32 50 28 100 8" stroke="var(--map-road)" stroke-width="1.8" fill="none"/>
    <path d="M0 84C30 80 60 84 100 78" stroke="var(--map-road)" stroke-width="1.8" fill="none"/>
    <rect x="62" y="4" width="22" height="18" rx="2" fill="var(--map-park)"/><circle cx="90" cy="76" r="8" fill="var(--map-park)" opacity=".7"/>
  </svg>`
}

/** Route Angers - Laval - Rennes (stylised), path used for the DrawSVG scroll animation. */
export function routeSvg(): string {
  return `<svg class="route" viewBox="0 0 800 300" role="img" aria-label="Itinéraire illustré d’Angers à Rennes en passant par Laval" focusable="false">
    <path id="route-path" d="M70 220 C 170 210, 230 140, 330 130 S 520 120, 560 110 S 680 90, 730 70" fill="none" stroke="var(--or)" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 9" opacity=".5"/>
    <path class="route-line" d="M70 220 C 170 210, 230 140, 330 130 S 520 120, 560 110 S 680 90, 730 70" fill="none" stroke="var(--or)" stroke-width="3.5" stroke-linecap="round"/>
    <g class="stop s-angers" transform="translate(70 220)"><circle r="9" fill="var(--bleu)" stroke="var(--or)" stroke-width="2"/><g transform="translate(-12 -40)">${lysPath('var(--or)', 'none')}</g></g>
    <g class="stop s-laval" transform="translate(330 130)"><circle r="7" fill="var(--bleu)" stroke="var(--or)" stroke-width="2"/></g>
    <g class="stop s-rennes" transform="translate(730 70)"><circle r="10" fill="var(--bleu)" stroke="var(--or)" stroke-width="2"/><g transform="translate(-6 -38)" color="var(--or)">${ermine('var(--or)')}</g></g>
  </svg>`
}
