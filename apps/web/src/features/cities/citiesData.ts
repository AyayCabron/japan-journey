export type CityTheme = 'tokyo' | 'hakone' | 'kyoto' | 'nara' | 'osaka' | 'nagoya'

export interface City {
  id: CityTheme
  name: string
  days: number
  dayLabel: string
  places: number
  budget: string
  description: string
}

export const cities: City[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    days: 9,
    dayLabel: 'dias',
    places: 42,
    budget: '¥132.000',
    description: 'Neon, velocidade e contraste — bairros como Shibuya e Akihabara nunca dormem.',
  },
  {
    id: 'hakone',
    name: 'Hakone',
    days: 2,
    dayLabel: 'dias',
    places: 8,
    budget: '¥38.000',
    description: 'Tudo desacelera: montanhas, onsen e o Monte Fuji ao fundo.',
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    days: 4,
    dayLabel: 'dias',
    places: 20,
    budget: '¥54.000',
    description: 'Mais madeira, mais templos, mais silêncio — a alma tradicional do Japão.',
  },
  {
    id: 'nara',
    name: 'Nara',
    days: 1,
    dayLabel: 'dia',
    places: 6,
    budget: '¥12.000',
    description: 'Parques abertos e cervos livres, um respiro entre duas grandes cidades.',
  },
  {
    id: 'osaka',
    name: 'Osaka',
    days: 3,
    dayLabel: 'dias',
    places: 18,
    budget: '¥46.000',
    description: 'Fica neon e divertido: comida de rua e a energia de Dotonbori.',
  },
  {
    id: 'nagoya',
    name: 'Nagoya',
    days: 1,
    dayLabel: 'dia',
    places: 9,
    budget: '¥20.000',
    description: 'Castelo, Ghibli Park e uma parada tranquila antes da volta.',
  },
]
