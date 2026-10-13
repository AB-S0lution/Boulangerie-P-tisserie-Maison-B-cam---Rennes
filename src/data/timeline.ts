// REAL milestones (PLAN.md §2), each marked with its scope: network or Rennes shop.
// Network facts are credited to « le réseau Maison Bécam », never to the Rennes shop.

export interface TimelineEntry {
  id: string
  date: string
  year: number
  scope: 'reseau' | 'rennes'
  title: string
  text: string
  source: string
}

export const timeline: TimelineEntry[] = [
  { id: 't1998', date: '1998', year: 1998, scope: 'reseau', title: 'Meilleur apprenti boulanger', text: 'Nicolas Bécam est Meilleur Apprenti Boulanger du Maine-et-Loire.', source: 'maisonbecam.com' },
  { id: 't2005', date: '2005', year: 2005, scope: 'reseau', title: 'La Boulangerie St Julien, à Angers', text: 'Cécile et Nicolas Bécam fondent l’entreprise à Angers.', source: 'maisonbecam.com' },
  { id: 't2012', date: '2012', year: 2012, scope: 'reseau', title: 'Atelier de pâtisserie et Farine Maison Bécam', text: 'Création de l’atelier de pâtisserie et de la farine du réseau, avec la Minoterie Girardeau.', source: 'maisonbecam.com' },
  { id: 't2013', date: '3 février 2013', year: 2013, scope: 'reseau', title: 'Naissance du Choc’O Roi', text: 'Lancement au Château du Roi René, à Angers. Il portera plus tard le label « Produit en Anjou ».', source: 'maisonbecam.com' },
  { id: 't2015', date: '2015', year: 2015, scope: 'reseau', title: 'Meilleur croissant du Maine-et-Loire', text: 'Première place au concours du meilleur croissant, deuxième et troisième places en 2017.', source: 'maisonbecam.com' },
  { id: 't2020', date: '2020', year: 2020, scope: 'reseau', title: 'Première ouverture hors Anjou', text: 'Le réseau s’installe à Nantes.', source: 'maisonbecam.com' },
  { id: 't2022', date: 'mars 2022', year: 2022, scope: 'reseau', title: 'Nouvel atelier de pâtisserie', text: 'Un atelier central de 1 200 m² fabrique les pâtisseries livrées dans les boutiques.', source: 'maisonbecam.com' },
  { id: 't2024c', date: 'décembre 2024', year: 2024, scope: 'rennes', title: 'Création de la société à Rennes', text: 'BB FERRY SAS est créée pour ouvrir la boutique de la rue Jean Guéhenno.', source: 'BODACC' },
  { id: 't2024a', date: '30 novembre 2024', year: 2024, scope: 'reseau', title: 'Classement Capital × Statista 2025', text: 'Élue « Meilleure Boulangerie de France 2025 » parmi les enseignes, 8,35/10 sur 20 000 consommateurs interrogés. Classement d’expérience client, daté de 2024, qui ne concerne pas spécifiquement Rennes.', source: 'Capital × Statista' },
  { id: 't2025o', date: '22 mars 2025', year: 2025, scope: 'rennes', title: 'Ouverture à Rennes', text: 'La 28e maison du réseau et la première en Bretagne ouvre au pied du métro Jules Ferry.', source: 'Blog Maison Bécam' },
  { id: 't2025a', date: '10 avril 2025', year: 2025, scope: 'reseau', title: '20 ans du réseau', text: 'Le réseau célèbre ses vingt ans d’artisanat.', source: 'snacking.fr' },
  { id: 't2025p', date: '2025', year: 2025, scope: 'reseau', title: 'PME de l’année 2025, Région Ouest', text: 'Lauréat des Trophées PME RMC / BFM, 16e édition.', source: 'L’Express Franchise' },
  { id: 't2025r', date: 'avril 2025', year: 2025, scope: 'rennes', title: 'La presse locale s’y intéresse', text: 'Rennes Infos Autrement, Bonjour Rennes et Ouest-France présentent la boutique.', source: 'Presse locale' },
  { id: 't2026', date: '14 avril 2026', year: 2026, scope: 'reseau', title: 'Figure Snacking de l’année 2026', text: 'Distinction remise au Snack Show.', source: 'L’Express Franchise' },
]
