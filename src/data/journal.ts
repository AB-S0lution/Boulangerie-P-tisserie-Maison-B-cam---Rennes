// SAMPLE DATA. All posts are demo content written for this site (PLAN.md §11), not news from the shop.
// Facts quoted in the posts come from PLAN.md and carry their date or source in the text.

export type JournalCategory = 'Saisons' | 'Coulisses du fournil' | 'Quartier' | 'Recettes & conseils' | 'Réseau'

export interface Post {
  slug: string
  title: string
  date: string
  category: JournalCategory
  excerpt: string
  body: string[]
  readingTime: number
  illustration: string
  sample: true
}

export const journalCategories: JournalCategory[] = ['Saisons', 'Coulisses du fournil', 'Quartier', 'Recettes & conseils', 'Réseau']

export const posts: Post[] = [
  {
    slug: 'la-flute-becam-deux-cuissons', title: 'La flûte Bécam, au choix bien cuite ou pas trop cuite', date: '2026-09-12', category: 'Coulisses du fournil',
    excerpt: 'Le produit signature de la maison se commande selon votre goût de la croûte.', readingTime: 3, illustration: 'flute', sample: true,
    body: [
      'La flûte Bécam est présentée par la maison comme son produit signature. Elle est faite de farine Maison Bécam, de levure boulangère, d’eau et de sel. Elle pèse 250 g.',
      'À Rennes, on la trouve en trois versions : bien cuite, pas trop cuite et pré-cuite blanche. Les trois sont au même prix, 1,30 € au relevé d’octobre 2026.',
      'Pour une croûte qui craque sous la dent, choisissez bien cuite. Pour une mie plus tendre et une croûte fine, pas trop cuite. Quant à la pré-cuite blanche, elle se termine à la maison.',
    ],
  },
  {
    slug: 'derriere-la-verriere-une-matinee', title: 'Derrière la verrière : une matinée au fournil', date: '2026-08-30', category: 'Coulisses du fournil',
    excerpt: 'Pétrir, façonner, cuire : ce que l’on voit depuis le comptoir.', readingTime: 4, illustration: 'baker', sample: true,
    body: [
      'La boutique de la rue Jean Guéhenno a été pensée avec une grande verrière sur le fournil. Les clients voient les boulangers à l’œuvre, c’est la promesse du lieu.',
      'En avril 2025, les responsables de la boutique la résumaient ainsi à la presse : « On pétrit, on façonne, on cuit tout sur place derrière une grande verrière où les clients peuvent voir les boulangers à l’œuvre » (Rennes Infos Autrement).',
      'Soyons précis : ce sont les pains et les viennoiseries qui sont travaillés sur place. Les pâtisseries viennent de l’atelier du réseau, et les sandwichs et salades sont assemblés en boutique.',
      'Le meilleur moment pour regarder ? Dès 7 h, quand les premières flûtes sortent du four.',
    ],
  },
  {
    slug: 'choc-o-roi-du-chateau-au-campus', title: 'Le Choc’O Roi, du château du Roi René au campus', date: '2026-07-04', category: 'Réseau',
    excerpt: 'Une recette lancée à Angers en 2013, aujourd’hui servie au pied du métro Jules Ferry.', readingTime: 4, illustration: 'chocoroi', sample: true,
    body: [
      'Le Choc’O Roi est né le 3 février 2013 au château du Roi René, à Angers. C’est une marque déposée du réseau Maison Bécam, vendue uniquement dans ses boutiques.',
      'Sa composition officielle : une pâte sucrée Fleur de Lys, un sablé breton chocolat et une crème pâtissière Choc’O Roi. La presse y ajoute un chocolat à 65 % et une pointe de fleur de sel de Guérande.',
      'Il se décline en individuel (caramel, chocolat, vanille) à 3,90 €, en gâteau dans une boîte en peuplier et en entremet à partager à 27,90 €.',
    ],
  },
  {
    slug: 'kouign-amann-notre-facon', title: 'Kouign-amann et far breton : les recettes bretonnes de la maison', date: '2026-06-18', category: 'Recettes & conseils',
    excerpt: 'Deux recettes proposées seulement à Rennes, Nantes et Guérande.', readingTime: 3, illustration: 'kouign', sample: true,
    body: [
      'D’après les fiches officielles, le kouign-amann individuel est disponible seulement dans les boulangeries de Nantes, Rennes et Guérande. Le far breton individuel aussi.',
      'Le kouign-amann est fait de pâte à croissant, de beurre et de sucre. Il coûte 2,95 € en individuel, 12,90 € à partager. Le far breton, aux pruneaux, coûte 3,50 €.',
      'Notre conseil : passez-le trois minutes au four doux avant de le déguster, la croûte retrouve son croustillant.',
    ],
  },
  {
    slug: 'octobre-rose-le-noeud-rose', title: 'Octobre Rose : le Nœud Rose sucré', date: '2026-10-01', category: 'Saisons',
    excerpt: 'Une pâte à croissant, une compotée de framboise, une édition limitée.', readingTime: 2, illustration: 'noeud', sample: true,
    body: [
      'À l’occasion d’Octobre Rose, la carte de Click & Collect de Rennes propose le Nœud Rose sucré : de la pâte à croissant et de la compotée de framboise, à 2,50 €.',
      'Aucune information n’est donnée sur un éventuel reversement dans ce cadre : demandez en boutique.',
    ],
  },
  {
    slug: 'commander-la-veille-avant-18-h', title: 'Commander la veille avant 18 h : mode d’emploi', date: '2026-09-02', category: 'Recettes & conseils',
    excerpt: 'Pour éviter la file d’attente de l’heure du déjeuner.', readingTime: 3, illustration: 'plateau', sample: true,
    body: [
      'Quelques avis évoquent de l’attente aux heures de pointe, ce qui est normal pour une boulangerie qui ne désemplit pas. La solution : le Click & Collect.',
      'Commandez la veille avant 18 h, passez retirer votre commande le lendemain entre 7 h et 20 h. Le code CHOCOROI donne 10 % de réduction dès 5 € sur la plateforme.',
      'Sur ce site de démonstration, « Ma liste » vous aide à préparer le panier, mais ne passe aucune commande.',
    ],
  },
  {
    slug: 'un-samedi-aux-lices-un-gouter-au-thabor', title: 'Un samedi aux Lices, un goûter au Thabor', date: '2026-05-23', category: 'Quartier',
    excerpt: 'Une promenade de 1,1 km depuis le métro Jules Ferry.', readingTime: 4, illustration: 'thabor', sample: true,
    body: [
      'Le marché des Lices se tient le samedi matin de 7 h 30 à 13 h 30 depuis 1622 : plus de 300 commerçants et environ 10 000 visiteurs, selon l’office de tourisme de Bretagne.',
      'Depuis la boutique, comptez environ 15 minutes à pied jusqu’à la place des Lices. Au retour, passez par le Thabor, à 500 m environ de la rue Jean Guéhenno.',
      'Prenez un Choc’O Roi individuel au passage : c’est un goûter qui voyage bien dans un sac.',
    ],
  },
  {
    slug: 'anti-gaspi-les-paniers-du-soir', title: 'Anti-gaspi : les paniers du soir', date: '2026-04-10', category: 'Réseau',
    excerpt: 'Too Good To Go avait été annoncé à l’ouverture de la boutique.', readingTime: 2, illustration: 'plateau', sample: true,
    body: [
      'À l’ouverture en 2025, la boutique avait annoncé vendre ses invendus du soir via Too Good To Go : un panier d’une valeur de 15 € cédé 5 € (actu.fr, février 2025).',
      'Nous n’avons pas pu vérifier que ce dispositif est toujours actif : consultez l’application pour le savoir.',
    ],
  },
  {
    slug: 'plantagenet-le-pave-a-la-mie-brune', title: 'Plantagenêt : le pavé à la mie brune et alvéolée', date: '2026-03-15', category: 'Coulisses du fournil',
    excerpt: 'Farine T65, seigle, levain de seigle et graines germées.', readingTime: 3, illustration: 'pave', sample: true,
    body: [
      'Le pavé Plantagenêt est annoncé comme un pain à la mie brune et alvéolée. Sa composition officielle : farine T65, farine de seigle, levain de seigle et graines germées. Il pèse 700 g et contient du gluten et du sésame.',
      'Il se garde bien et accompagne les fromages, les soupes et le saumon fumé. Il coûte 4,90 €.',
    ],
  },
  {
    slug: 'galette-des-rois-preparez-lepiphanie', title: 'Galette des Rois : préparez l’Épiphanie', date: '2025-12-18', category: 'Saisons',
    excerpt: 'La galette est une collection saisonnière du réseau.', readingTime: 2, illustration: 'tarte', sample: true,
    body: [
      'La Galette des Rois fait partie des collections saisonnières du réseau Maison Bécam, avec la Chandeleur, Pâques ou les fêtes de fin d’année.',
      'Cet article est un exemple de contenu : les dates, les tailles et les prix de la galette à Rennes sont à confirmer en boutique.',
    ],
  },
]
