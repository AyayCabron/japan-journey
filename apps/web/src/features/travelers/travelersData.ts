export interface Traveler {
  id: string
  name: string
  emoji: string
  paymentProgress: number
  spentJpy: number
  wishlist: string[]
}

export const travelers: Traveler[] = [
  {
    id: 'dani',
    name: 'Dani',
    emoji: '👩',
    paymentProgress: 78,
    spentJpy: 42000,
    wishlist: ['Uniqlo', 'Daiso', 'Donguri Republic'],
  },
  {
    id: 'baby',
    name: 'Baby',
    emoji: '🐾',
    paymentProgress: 60,
    spentJpy: 21000,
    wishlist: ['Pokémon Center Shibuya', 'Kirby Café'],
  },
  {
    id: 'claudinho-dinho',
    name: 'Claudinho Dinho',
    emoji: '🧑',
    paymentProgress: 90,
    spentJpy: 38500,
    wishlist: ['Apple Marunouchi', 'Yodobashi Akiba'],
  },
  {
    id: 'rayo-lightyear',
    name: 'Rayo Lightyear',
    emoji: '⚡',
    paymentProgress: 55,
    spentJpy: 18000,
    wishlist: ['Nintendo Tokyo', 'Mandarake Complex'],
  },
  {
    id: 'tai',
    name: 'Tai',
    emoji: '🧑‍🦱',
    paymentProgress: 70,
    spentJpy: 29500,
    wishlist: ['Ippudo', 'Sushiro'],
  },
  {
    id: 'vini',
    name: 'Vini',
    emoji: '👤',
    paymentProgress: 78,
    spentJpy: 42000,
    wishlist: ['Nintendo Tokyo', 'Sony Store', 'Pokémon Center Shibuya'],
  },
]
