export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  category: CategoryId
}

export type CategoryId = 'breakfast' | 'coffee' | 'desserts' | 'lunch'

export type Category = {
  id: CategoryId
  title: string
  emoji: string
}

export const categories: Category[] = [
  { id: 'breakfast', title: 'Завтраки', emoji: '🍳' },
  { id: 'coffee', title: 'Кофе', emoji: '☕️' },
  { id: 'desserts', title: 'Десерты', emoji: '🍰' },
  { id: 'lunch', title: 'Обеды', emoji: '🥗' },
]

export const menuItems: MenuItem[] = [
  // Завтраки
  {
    id: 'syrniki',
    name: 'Сырники с малиной',
    description: 'Воздушные сырники из творога с малиновым соусом и сметаной',
    price: 420,
    emoji: '🥞',
    category: 'breakfast',
  },
  {
    id: 'granola',
    name: 'Гранола с йогуртом',
    description: 'Домашняя гранола, греческий йогурт, ягоды, мёд',
    price: 380,
    emoji: '🥣',
    category: 'breakfast',
  },
  {
    id: 'eggs-benedict',
    name: 'Яйца Бенедикт',
    description: 'Два яйца пашот, голландский соус, бекон, тост из бриошь',
    price: 540,
    emoji: '🍳',
    category: 'breakfast',
  },
  // Кофе
  {
    id: 'cappuccino',
    name: 'Капучино',
    description: 'Эспрессо и нежная молочная пена с корицей',
    price: 280,
    emoji: '☕️',
    category: 'coffee',
  },
  {
    id: 'latte',
    name: 'Раф «Корица»',
    description: 'Фирменный раф со сливками, ванилью и палочкой корицы',
    price: 340,
    emoji: '🥛',
    category: 'coffee',
  },
  {
    id: 'flat-white',
    name: 'Флэт уайт',
    description: 'Двойной эспрессо и микропена молока',
    price: 310,
    emoji: '☕️',
    category: 'coffee',
  },
  // Десерты
  {
    id: 'cheesecake',
    name: 'Чизкейк Нью-Йорк',
    description: 'Классический чизкейк с песочной основой',
    price: 390,
    emoji: '🍰',
    category: 'desserts',
  },
  {
    id: 'cinnamon-roll',
    name: 'Булочка с корицей',
    description: 'Тёплая булочка с глазурью из крем-сыра',
    price: 260,
    emoji: '🥐',
    category: 'desserts',
  },
  // Обеды
  {
    id: 'caesar',
    name: 'Цезарь с курицей',
    description: 'Романо, гриль-курица, пармезан, чесночные крутоны',
    price: 520,
    emoji: '🥗',
    category: 'lunch',
  },
  {
    id: 'pumpkin-soup',
    name: 'Тыквенный крем-суп',
    description: 'С тыквенными семечками и трюфельным маслом',
    price: 380,
    emoji: '🍲',
    category: 'lunch',
  },
]
