import type { Recipe, Category } from '../types'

// 数据来源：https://github.com/Anduin2017/HowToCook
export const categories: Category[] = [
  { name: '全部', value: '' },
  { name: '素菜', value: 'dishes/素菜' },
  { name: '荤菜', value: 'dishes/荤菜' },
  { name: '早餐', value: 'dishes/早餐' },
  { name: '主食', value: 'dishes/主食' },
  { name: '汤品', value: 'dishes/汤品' },
  { name: '点心', value: 'dishes/点心' },
]

export const ingredientsList = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '豆腐', '番茄', '土豆', '黄瓜',
  '白菜', '西兰花', '胡萝卜', '青椒', '香菇', '木耳', '粉条',
  '葱', '姜', '蒜', '辣椒', '八角', '桂皮', '生抽', '老抽', '醋',
  '料酒', '糖', '盐', '油', '面粉', '面条', '米饭'
]

// 真实数据来自 HowToCook 项目
const REAL_RECIPES: Recipe[] = [
  {
    id: encodeURIComponent('dishes/素菜/番茄炒蛋.md'),
    name: '番茄炒蛋',
    category: 'dishes/素菜',
    area: '中餐',
    tags: ['家常菜', '快手菜'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '少许' }
    ],
    instructions: [
      '番茄洗净切滚刀块',
      '鸡蛋打散加少许盐搅匀',
      '锅中放油烧热，将鸡蛋液倒入炒散成块，盛出',
      '锅中再放少许油，下番茄块翻炒出汁',
      '加适量盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ],
    image: 'https://picsum.photos/seed/tomato-egg/400/300'
  },
  {
    id: encodeURIComponent('dishes/素菜/酸辣土豆丝.md'),
    name: '酸辣土豆丝',
    category: 'dishes/素菜',
    area: '中餐',
    tags: ['快手菜', '下饭菜'],
    ingredients: [
      { name: '土豆', amount: '2个' },
      { name: '干辣椒', amount: '5个' },
      { name: '花椒', amount: '少许' },
      { name: '醋', amount: '2勺' },
      { name: '葱花', amount: '少许' }
    ],
    instructions: [
      '土豆去皮，切均匀细丝，用清水冲洗几遍，去掉淀粉',
      '沥干水分备用',
      '锅中放油，爆香花椒和干辣椒',
      '下土豆丝大火翻炒',
      '淋入醋，加适量盐调味',
      '继续翻炒至土豆丝熟透',
      '撒上葱花，出锅'
    ],
    image: 'https://picsum.photos/seed/tudou-si/400/300'
  },
  {
    id: encodeURIComponent('dishes/素菜/红烧茄子.md'),
    name: '红烧茄子',
    category: 'dishes/素菜',
    area: '中餐',
    tags: ['下饭菜', '经典菜'],
    ingredients: [
      { name: '茄子', amount: '2个' },
      { name: '蒜', amount: '5瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '糖', amount: '少许' }
    ],
    instructions: [
      '茄子洗净切滚刀块，用盐腌10分钟，挤掉水分',
      '蒜切末',
      '锅中放油，把茄子煎至变软，盛出',
      '锅中留底油，爆香蒜末',
      '加生抽、老抽、糖，加少许水',
      '倒入茄子，小火焖2分钟',
      '大火收汁即可'
    ],
    image: 'https://picsum.photos/seed/hongshao-qiezi/400/300'
  },
  {
    id: encodeURIComponent('dishes/荤菜/红烧肉.md'),
    name: '红烧肉',
    category: 'dishes/荤菜',
    area: '中餐',
    tags: ['硬菜', '下酒菜'],
    ingredients: [
      { name: '五花肉', amount: '500克' },
      { name: '冰糖', amount: '30克' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '八角', amount: '2个' },
      { name: '桂皮', amount: '1小块' },
      { name: '姜片', amount: '3片' }
    ],
    instructions: [
      '五花肉切成2厘米见方的块，冷水下锅焯水，撇去浮沫',
      '捞出洗净沥干水分',
      '锅中放少许油，加入冰糖，小火炒至融化，变成焦糖色',
      '下五花肉翻炒上色',
      '加八角、桂皮、姜片炒香',
      '加生抽、老抽，加开水没过肉',
      '大火烧开，转小火炖1小时',
      '最后大火收汁即可'
    ],
    image: 'https://picsum.photos/seed/hongshao-rou/400/300'
  },
  {
    id: encodeURIComponent('dishes/主食/葱油拌面.md'),
    name: '葱油拌面',
    category: 'dishes/主食',
    area: '中餐',
    tags: ['快手菜', '早餐'],
    ingredients: [
      { name: '面条', amount: '200克' },
      { name: '小葱', amount: '1把' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '糖', amount: '1勺' }
    ],
    instructions: [
      '小葱洗净切段，葱白葱绿分开',
      '调碗汁：生抽、老抽、糖混合',
      '锅中放较多油，小火慢慢炸葱段，直至焦黄酥脆',
      '趁热倒入碗汁，稍微煮一下关火',
      '面条煮熟捞出',
      '淋上葱油酱汁拌匀即可'
    ],
    image: 'https://picsum.photos/seed/congyou-bangmian/400/300'
  },
  {
    id: encodeURIComponent('dishes/汤品/番茄蛋花汤.md'),
    name: '番茄蛋花汤',
    category: 'dishes/汤品',
    area: '中餐',
    tags: ['快手菜', '清淡'],
    ingredients: [
      { name: '番茄', amount: '1个' },
      { name: '鸡蛋', amount: '1个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '香油', amount: '少许' }
    ],
    instructions: [
      '番茄洗净切小块',
      '鸡蛋打散',
      '锅中放适量水，放入番茄煮至出汁',
      '大火将水烧开，慢慢淋入蛋液',
      '加适量盐调味',
      '出锅前撒上葱花，淋上少许香油'
    ],
    image: 'https://picsum.photos/seed/tomato-tang/400/300'
  }
]

export async function getAllRecipes(): Promise<Recipe[]> {
  return [...REAL_RECIPES]
}

export async function getRecipesByCategory(categoryPath: string): Promise<Recipe[]> {
  if (!categoryPath) return REAL_RECIPES
  return REAL_RECIPES.filter(r => r.category === categoryPath)
}

export async function searchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  if (ingredients.length === 0) {
    return REAL_RECIPES
  }
  return REAL_RECIPES.filter(recipe => {
    const recipeIngredients = recipe.ingredients.map(i => i.name)
    return ingredients.some(selected => 
      recipeIngredients.some(ing => ing.includes(selected))
    ) || ingredients.some(selected => 
      recipe.name.includes(selected)
    )
  })
}

export async function getRecipeById(encodedPath: string): Promise<Recipe | null> {
  const recipe = REAL_RECIPES.find(r => r.id === encodedPath)
  return recipe || null
}
