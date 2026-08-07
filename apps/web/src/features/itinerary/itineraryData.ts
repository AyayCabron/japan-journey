export type ItineraryCategory = 'travel' | 'culture' | 'tech' | 'food' | 'shop' | 'park'

export interface ItineraryItem {
  category: ItineraryCategory
  categoryLabel: string
  title: string
  description: string
}

export const itineraryItems: ItineraryItem[] = [
  {
    category: 'travel',
    categoryLabel: 'Deslocamento',
    title: 'Voo',
    description: 'Curitiba → São Paulo → Tokyo (Narita / Haneda)',
  },
  {
    category: 'culture',
    categoryLabel: 'Cultura',
    title: 'Chegada em Tokyo',
    description: 'Shibuya Crossing, Hachiko, Shinjuku à noite',
  },
  {
    category: 'culture',
    categoryLabel: 'Cultura',
    title: 'Asakusa & Ueno',
    description: 'Senso-ji, Tokyo Skytree, Ueno Park',
  },
  {
    category: 'tech',
    categoryLabel: 'Tecnologia',
    title: 'Akihabara',
    description: 'Yodobashi Camera, Bic Camera, Super Potato, Mandarake',
  },
  {
    category: 'food',
    categoryLabel: 'Alimentação',
    title: 'Rota do ramen & sushi',
    description: 'Ichiran, Ippudo, Uobei, Rokurinsha — e uma parada na konbini pra doces e bebidas',
  },
  {
    category: 'park',
    categoryLabel: 'Parques',
    title: 'Disney & Universal',
    description: 'Disneyland, DisneySea, Nintendo World',
  },
  {
    category: 'shop',
    categoryLabel: 'Compras',
    title: 'Bugigangas & presentinhos',
    description: 'Don Quijote, Daiso, Seria, 3Coins, Loft — itens pra casa e lembrancinhas',
  },
  {
    category: 'culture',
    categoryLabel: 'Cultura',
    title: 'Hakone',
    description: 'Monte Fuji, teleférico, cruzeiro no Lago Ashi, onsen e ryokan',
  },
  {
    category: 'culture',
    categoryLabel: 'Cultura',
    title: 'Kyoto',
    description: 'Fushimi Inari, Bamboo Forest, Gion, Kinkakuji',
  },
  {
    category: 'food',
    categoryLabel: 'Alimentação',
    title: 'Sabores de Kyoto',
    description: 'Mercado Nishiki e doces tradicionais em Gion',
  },
  {
    category: 'culture',
    categoryLabel: 'Cultura',
    title: 'Nara',
    description: 'Parque dos Cervos e templos',
  },
  {
    category: 'park',
    categoryLabel: 'Parques',
    title: 'Osaka',
    description: 'Universal Studios (Super Nintendo World, Harry Potter), Dotonbori, Namba',
  },
  {
    category: 'shop',
    categoryLabel: 'Compras',
    title: 'Shinsaibashi',
    description: 'Eletrônicos, tênis e mais uma rodada no Don Quijote',
  },
  {
    category: 'culture',
    categoryLabel: 'Cultura',
    title: 'Nagoya',
    description: 'Ghibli Park, Castelo de Nagoya, bairro Osu',
  },
  {
    category: 'travel',
    categoryLabel: 'Deslocamento',
    title: 'Volta pra casa',
    description: 'Tokyo → São Paulo → Curitiba',
  },
]
