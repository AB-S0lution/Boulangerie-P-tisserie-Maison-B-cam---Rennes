// SAMPLE DATA (wording) built on REAL answers where known (PLAN.md §11). Unknown items say « à confirmer ».

export interface Faq {
  id: string
  q: string
  a: string
  topic: 'Horaires' | 'Commander' | 'Carte' | 'Lieu' | 'Équipe'
  linkLabel?: string
  linkHref?: string
}

export const faq: Faq[] = [
  { id: 'horaires', topic: 'Horaires', q: 'Quels sont les horaires d’ouverture ?', a: 'La boutique est ouverte tous les jours, du lundi au dimanche, de 7 h à 20 h, sans interruption.' },
  { id: 'feries', topic: 'Horaires', q: 'Êtes-vous ouverts le dimanche et les jours fériés ?', a: 'Le dimanche, oui, aux mêmes horaires. Les jours fériés, les horaires sont susceptibles de varier : consultez la fiche Google de la boutique avant de venir.', linkLabel: 'Fiche Google', linkHref: 'maps' },
  { id: 'mai', topic: 'Horaires', q: 'Et le 1er mai ?', a: 'La boutique était fermée le 1er mai en 2025. Vérifiez l’information avant de venir.' },
  { id: 'adresse', topic: 'Lieu', q: 'Où se trouve la boutique et comment y venir ?', a: 'Au 69 rue Jean Guéhenno, 35700 Rennes, face au campus et au pied du métro Jules Ferry (ligne B). Les bus C2, 10 et N5 s’arrêtent devant la porte.', linkLabel: 'Voir le quartier', linkHref: 'le-quartier' },
  { id: 'cc', topic: 'Commander', q: 'Comment fonctionne le Click & Collect ?', a: 'Vous commandez sur le site de commande en ligne avant 18 h pour un retrait le lendemain, entre 7 h et 20 h. Nous ne prenons pas de commande sur ce site de démonstration.', linkLabel: 'Click & Collect', linkHref: 'click-and-collect' },
  { id: 'code', topic: 'Commander', q: 'Existe-t-il un code promo ?', a: 'Le code CHOCOROI donne 10 % de réduction dès 5 € d’achat sur la plateforme de commande en ligne. Vérifiez sa validité au moment de commander.' },
  { id: 'brunch', topic: 'Carte', q: 'Proposez-vous un brunch ?', a: 'Non. Le brunch Maison Bécam existe dans d’autres adresses du réseau, mais pas à Rennes.' },
  { id: 'pizza', topic: 'Carte', q: 'Y a-t-il des pizzas ?', a: 'Les pizzas existent au catalogue du réseau et la presse en a parlé à l’ouverture, mais elles ne figurent pas au Click & Collect de Rennes. Selon disponibilité en boutique.' },
  { id: 'sur-place', topic: 'Carte', q: 'Tout est-il fait sur place ?', a: 'Pains et viennoiseries sont pétris, façonnés et cuits dans la boutique, derrière la verrière. Les pâtisseries viennent de l’atelier de pâtisserie du réseau, et les sandwichs et salades sont assemblés en boutique.' },
  { id: 'allergenes', topic: 'Carte', q: 'Où trouver les allergènes ?', a: 'Chaque produit de la carte affiche la liste officielle quand elle existe. Quand elle n’est pas publiée, nous écrivons « nous consulter en boutique » : demandez à l’équipe. Une contamination croisée est toujours possible.' },
  { id: 'gluten', topic: 'Carte', q: 'Avez-vous du pain sans gluten ?', a: 'Non. Le Pain sans blé et le Pain petit épeautre doré contiennent du gluten. Le petit épeautre est présenté comme « pauvre en gluten » par la maison. À confirmer en boutique selon votre situation.' },
  { id: 'places', topic: 'Lieu', q: 'Y a-t-il de la place pour s’asseoir ?', a: 'Oui, le salon de thé compte environ 50 places à l’intérieur. Une terrasse de 32 places a été annoncée en 2025 : à confirmer.' },
  { id: 'paiement', topic: 'Lieu', q: 'Quels moyens de paiement acceptez-vous ?', a: 'À confirmer avec la boutique (cartes, sans contact, titres-restaurant).' },
  { id: 'recrutement', topic: 'Équipe', q: 'Recrutez-vous ?', a: 'Le réseau publie ses offres, y compris les apprentissages en boulangerie, pâtisserie, snacking et vente.', linkLabel: 'Voir les offres', linkHref: 'recrutement' },
]
