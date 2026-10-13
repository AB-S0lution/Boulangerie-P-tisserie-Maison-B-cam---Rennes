// SAMPLE DATA. Original illustration keys (drawn in src/core/art.ts), no photographs.

export interface GalleryItem {
  id: string
  title: string
  alt: string
  category: 'Fournil' | 'Vitrine' | 'Choc’O Roi' | 'Quartier' | 'Saisons'
  art: string
  tall?: boolean
  tint: 'navy' | 'glass' | 'gold' | 'lin'
}

export const gallery: GalleryItem[] = [
  { id: 'g1', title: 'La flûte, au fournil', alt: 'Dessin d’une flûte rayée sur sa planche', category: 'Fournil', art: 'flute', tint: 'glass' },
  { id: 'g2', title: 'Le pavé Plantagenêt', alt: 'Dessin d’un pavé à la mie alvéolée', category: 'Fournil', art: 'pave', tint: 'lin', tall: true },
  { id: 'g3', title: 'Le boulanger et le four', alt: 'Silhouette d’un boulanger devant le four', category: 'Fournil', art: 'baker', tint: 'navy', tall: true },
  { id: 'g4', title: 'La grande boule', alt: 'Dessin d’une boule de campagne', category: 'Fournil', art: 'boule', tint: 'gold' },
  { id: 'g5', title: 'Le croissant', alt: 'Dessin d’un croissant doré', category: 'Vitrine', art: 'croissant', tint: 'gold' },
  { id: 'g6', title: 'Le kouign-amann', alt: 'Dessin d’un kouign-amann caramélisé', category: 'Vitrine', art: 'kouign', tint: 'lin', tall: true },
  { id: 'g7', title: 'Le far breton', alt: 'Dessin d’une part de far aux pruneaux', category: 'Vitrine', art: 'far', tint: 'glass' },
  { id: 'g8', title: 'L’éclair craquelin', alt: 'Dessin d’un éclair au craquelin', category: 'Vitrine', art: 'eclair', tint: 'navy' },
  { id: 'g9', title: 'Le macaron framboise', alt: 'Dessin d’un macaron rose', category: 'Vitrine', art: 'macaron', tint: 'lin' },
  { id: 'g10', title: 'La tasse de café', alt: 'Dessin d’une tasse fumante', category: 'Vitrine', art: 'cup', tint: 'glass', tall: true },
  { id: 'g11', title: 'Le Choc’O Roi', alt: 'Dessin de deux sablés bretons et crème, une fleur de lys au sommet', category: 'Choc’O Roi', art: 'chocoroi', tint: 'navy', tall: true },
  { id: 'g12', title: 'La boîte peuplier', alt: 'Dessin d’une boîte ronde en bois de peuplier', category: 'Choc’O Roi', art: 'poplarbox', tint: 'gold' },
  { id: 'g13', title: 'La fleur de lys', alt: 'Motif de fleur de lys', category: 'Choc’O Roi', art: 'lys', tint: 'navy' },
  { id: 'g14', title: 'Le tapis Lys et Hermine', alt: 'Motif de fleurs de lys et de mouchetures d’hermine', category: 'Choc’O Roi', art: 'tapisserie', tint: 'navy' },
  { id: 'g15', title: 'La bouche de métro', alt: 'Dessin de l’entrée de la station Jules Ferry', category: 'Quartier', art: 'metro', tint: 'glass', tall: true },
  { id: 'g16', title: 'La grille du Thabor', alt: 'Dessin d’une grille de parc', category: 'Quartier', art: 'thabor', tint: 'lin' },
  { id: 'g17', title: 'Le coucou de Rennes', alt: 'Dessin d’une poule au plumage rayé gris-bleu', category: 'Quartier', art: 'coucou', tint: 'glass' },
  { id: 'g18', title: 'La verrière', alt: 'Façade vitrée de la boulangerie', category: 'Quartier', art: 'verriere', tint: 'navy', tall: true },
  { id: 'g19', title: 'Le nœud rose', alt: 'Dessin d’un nœud feuilleté rose pour Octobre Rose', category: 'Saisons', art: 'noeud', tint: 'lin' },
  { id: 'g20', title: 'Le number cake', alt: 'Dessin d’un number cake en forme de chiffre', category: 'Saisons', art: 'numbercake', tint: 'gold' },
]
