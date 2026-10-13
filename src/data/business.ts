// REAL DATA ONLY (verified, PLAN.md §1, researched 2026-10-13). Do not add invented facts here.
// Anything unverified is marked `todo` and must not be shown as fact.

export interface Business {
  name: string
  listingName: string
  legalName: string
  legalForm: string
  capital: string
  siren: string
  siret: string
  rcs: string
  naf: string
  address: { street: string; postalCode: string; city: string; country: string }
  geo: { lat: number; lng: number }
  googlePlaceId: string
  phone: { display: string; tel: string }
  emails: { shop: string; shopSource: string; network: string }
  urls: { storePage: string; clickAndCollect: string; networkOrdering: string; recruitment: string; loyalty: string }
  social: { instagram: string; facebook: string; youtube: string; linkedin: string; note: string }
  opened: string
  openingRank: string
  sizeM2: number
  seatsIndoor: number
  promoCode: string
  franchisorLine: string
  priceRange: string
  todo: string[]
  verifiedOn: string
}

export const business: Business = {
  name: 'Maison Bécam',
  listingName: 'Boulangerie Pâtisserie Maison Bécam - Rennes',
  legalName: 'BB FERRY',
  legalForm: 'SAS',
  capital: '50 000 €',
  siren: '938 606 597',
  siret: '938 606 597 00012',
  rcs: 'RCS Rennes',
  naf: '10.71C',
  address: { street: '69 rue Jean Guéhenno', postalCode: '35700', city: 'Rennes', country: 'FR' },
  geo: { lat: 48.118358, lng: -1.671279 },
  googlePlaceId: 'ChIJPf3YDyjfDkgROOvn1ag6A68',
  phone: { display: '02 21 65 61 00', tel: '+33221656100' },
  emails: {
    shop: 'ferry.rennes@maisonbecam.com',
    shopSource: 'single-source (Bakeronline), à confirmer avec la boutique',
    network: 'contact@maisonbecam.com',
  },
  urls: {
    storePage: 'https://maisonbecam.com/pages/boulangerie-maison-becam-rennes',
    clickAndCollect: 'https://bakeronline.fr/fr-fr/maisonbecamrennes',
    networkOrdering: 'https://commande.maisonbecam.com',
    recruitment: 'https://maisonbecam.nous-recrutons.fr/',
    loyalty: 'https://maisonbecam.com/pages/programme-de-fidelite',
  },
  social: {
    instagram: 'https://www.instagram.com/maison_becam/',
    facebook: 'https://www.facebook.com/maison.becam/',
    youtube: 'https://www.youtube.com/channel/UCXmxO6gSl53zpoj-llbGuPg',
    linkedin: 'https://fr.linkedin.com/company/maison-b-cam',
    note: 'Comptes nationaux du réseau Maison Bécam : la boutique de Rennes n’a pas de compte propre.',
  },
  opened: '2025-03-22',
  openingRank: '28e maison du réseau, première en Bretagne',
  sizeM2: 300,
  seatsIndoor: 50,
  promoCode: 'CHOCOROI',
  franchisorLine: 'Franchise du réseau Maison Bécam, fondé à Angers en 2005',
  priceRange: '€',
  todo: [
    'Terrasse (32 places annoncées en 2025) : état actuel à confirmer',
    'Moyens de paiement en boutique',
    'Accès PMR de la boutique et stationnement',
    'Horaires des jours fériés',
    'Accord du franchiseur pour un site local',
  ],
  verifiedOn: '2026-10-13',
}

export const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${business.googlePlaceId}`
export const reviewUrl = `https://search.google.com/local/writereview?placeid=${business.googlePlaceId}`
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}&destination_place_id=${business.googlePlaceId}`
export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`
