import { boot } from '../core/shell'
import { esc, formatDateFR, getParam, url } from '../core/dom'
import { illo } from '../core/art'
import { posts } from '../data/journal'
import { postCard } from '../core/parts'
import { photoForPost, photoImg } from '../data/photos'

const post = posts.find((p) => p.slug === getParam('a'))
if (post) document.title = `${post.title} | Journal | Maison Bécam Rennes`
const rel = post ? posts.filter((p) => p.slug !== post.slug && p.category === post.category).concat(posts.filter((p) => p.slug !== post.slug && p.category !== post.category)).slice(0, 3) : []

const ph = post ? photoForPost(post.slug, post.illustration) : undefined
const cover = post
  ? ph
    ? `<figure class="article-cover">${photoImg(ph, 'photo', true)}<span class="photo-tag">Photo d’illustration</span><div class="sheet-illo" aria-hidden="true">${illo(post.illustration, '')}</div><figcaption>${ph.alt}. Photo : ${ph.credit}.</figcaption></figure>`
    : `<div class="article-cover art">${illo(post.illustration, '')}</div>`
  : ''

const main = post
  ? `<section class="page-head"><div class="container"><p class="crumbs"><a href="${url()}">Accueil</a><span aria-hidden="true">/</span><a href="${url('journal/')}">Journal</a><span aria-hidden="true">/</span><span>${post.category}</span></p><h1 style="max-width:22ch">${esc(post.title)}</h1><p class="lead">${post.category} · ${formatDateFR(post.date)} · ${post.readingTime} min de lecture</p></div></section>
<section class="section tight"><div class="container"><div class="article">${cover}${post.body.map((b) => `<p>${esc(b)}</p>`).join('')}<p class="small muted" style="margin-top:28px"><span class="tag-sample">contenu d’exemple</span> Article écrit pour cette démonstration ; les faits cités sont issus de sources datées.</p></div></div></section>
<section class="section tight"><div class="container"><h2 style="margin-bottom:24px">À lire aussi</h2><div class="posts">${rel.map(postCard).join('')}</div></div></section>`
  : `<section class="section"><div class="container"><div class="empty">${illo('croissant')}<h1 style="font-size:2rem">Cet article n’existe pas</h1><a class="btn" href="${url('journal/')}">Retour au journal</a></div></div></section>`

boot({ nav: 'journal/', main })
