import type { Recipe, Category } from '../types'

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

let cachedRecipes: Recipe[] = []

async function fetchChineseRecipes(): Promise<Recipe[]> {
  try {
    const recipes: Recipe[] = []
    const howtocookRecipes = [
      { path: 'dishes/素菜/番茄炒蛋.md', name: '番茄炒蛋' },
      { path: 'dishes/素菜/酸辣土豆丝.md', name: '酸辣土豆丝' },
      { path: 'dishes/素菜/红烧茄子.md', name: '红烧茄子' },
      { path: 'dishes/荤菜/红烧肉.md', name: '红烧肉' },
      { path: 'dishes/主食/蛋炒饭.md', name: '蛋炒饭' },
      { path: 'dishes/汤品/番茄蛋汤.md', name: '番茄蛋汤' }
    ]
    
    for (const item of howtocookRecipes) {
      try {
        const url = `https://cdn.jsdelivr.net/gh/Anduin2017/HowToCook@master/${item.path}`
        const response = await fetch(url)
        if (response.ok) {
          const content = await response.text()
          recipes.push(parseRecipeFromMarkdown(content, item.path))
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }
    
    return recipes
  } catch (error) {
    console.error('Error fetching Chinese recipes:', error)
    return getHardcodedRecipes()
  }
}

function getHardcodedRecipes(): Recipe[] {
  return [
    { id: '1', name: '番茄炒蛋',
      category: 'dishes/素菜',
      area: '中餐',
      tags: ['家常菜', '快手菜'],
      ingredients: [
        { name: '番茄', amount: '2个' },
        { name: '鸡蛋', amount: '3个' },
        { name: '盐', amount: '适量' }
      ],
      instructions: [
        '1. 番茄洗净切滚刀块',
        '2. 鸡蛋打散加少许盐搅匀',
        '3. 锅中放油烧热，将鸡蛋液倒入炒散成块，盛出',
        '4. 锅中再放少许油，下番茄块翻炒出汁',
        '5. 倒入炒好的鸡蛋，翻炒均匀，出锅装盘即可'
      ],
      image: 'https://picsum.photos/seed/tomato/400/300'
    },
    { id: '2', name: '红烧肉',
      category: 'dishes/荤菜',
      area: '中餐',
      tags: ['家常菜', '硬菜'],
      ingredients: [
        { name: '五花肉', amount: '500克' },
        { name: '冰糖', amount: '30克' },
        { name: '生抽', amount: '2勺' },
        { name: '老抽', amount: '1勺' }
      ],
      instructions: [
        '1. 五花肉切成2厘米见方的块，冷水下锅焯水，撇去浮沫',
        '2. 捞出洗净沥干水分',
        '3. 锅中放少许油，加入冰糖，小火炒至融化，变成焦糖色',
        '4. 下五花肉翻炒上色',
        '5. 加生抽、老抽，加开水没过肉',
        '6. 大火烧开，转小火炖1小时',
        '7. 最后大火收汁即可'
      ],
      image: 'https://picsum.photos/seed/meat/400/300'
    },
    { id: '3', name: '酸辣土豆丝',
      category: 'dishes/素菜',
      area: '中餐',
      tags: ['快手菜'],
      ingredients: [
        { name: '土豆', amount: '2个' },
        { name: '干辣椒', amount: '5个' },
        { name: '醋', amount: '2勺' },
        { name: '葱', amount: '适量' }
      ],
      instructions: [
        '1. 土豆去皮，切均匀细丝，用清水冲洗几遍，去掉淀粉',
        '2. 沥干水分备用',
        '3. 锅中放油，爆香干辣椒',
        '4. 下土豆丝大火翻炒',
        '5. 淋入醋，加适量盐调味',
        '6. 继续翻炒至土豆丝熟透',
        '7. 出锅装盘即可'
      ],
      image: 'https://picsum.photos/seed/potato/400/300'
    },
    { id: '4', name: '蛋炒饭',
      category: 'dishes/主食',
      area: '中餐',
      tags: ['快手菜', '一人食'],
      ingredients: [
        { name: '米饭', amount: '1碗' },
        { name: '鸡蛋', amount: '2个' },
        { name: '葱', amount: '1根' }
      ],
      instructions: [
        '1. 鸡蛋打散加少许盐',
        '2. 锅中放油，油热后倒入鸡蛋液炒散盛出',
        '3. 锅中再放少许油，下米饭，加盐调味',
        '4. 倒入炒好的鸡蛋，翻炒均匀',
        '5. 撒上葱花，出锅装盘即可'
      ],
      image: 'https://picsum.photos/seed/rice/400/300'
    }
  ]
}

function parseRecipeFromMarkdown(content: string, path: string): Recipe {
  const lines = content.split('\n').filter(line => line.trim())
  let name = path.split('/').pop()?.replace('.md', '') || '未知菜谱'
  
  for (const line of lines) {
    if (line.startsWith('#')) {
      name = line.replace(/^#+\s*/, '').trim()
      break
    }
  }
  
  const ingredients: Array<{ name: string; amount: string }> = []
  const instructions: string[] = []
  let section = ''
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.toLowerCase().includes('食材') || trimmed.includes('材料')) {
      section = 'ingredients'
      continue
    }
    if (trimmed.toLowerCase().includes('做法') || trimmed.includes('步骤')) {
      section = 'instructions'
      continue
    }
    
    if (section === 'ingredients' && (trimmed.startsWith('-') || trimmed.includes('：'))) {
      const parts = trimmed.split(/[：:]/)
      if (parts.length >= 2) {
        ingredients.push({
          name: parts[0].replace(/^[-*+]|\s*/g, ''),
          amount: parts[1].trim()
        })
      } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        ingredients.push({ name: trimmed.replace(/^[-*+]\s*/, ''), amount: '' })
      }
    }
    
    if (section === 'instructions' && (trimmed.match(/^\d+[.、]/) || trimmed.startsWith('-'))) {
      instructions.push(trimmed.replace(/^\d+[.、]\s*|^[-*+]\s*/, ''))
    }
  }
  
  if (ingredients.length === 0) {
    ingredients.push({ name: '主要食材', amount: '适量' })
  }
  if (instructions.length === 0) {
    instructions.push('请参考原始菜谱了解详细做法')
  }
  
  return {
    id: encodeURIComponent(path),
    name,
    category: path.startsWith('dishes/') ? path.split('/').slice(0, 2).join('/') : 'dishes/其他',
    area: '中餐',
    tags: ['HowToCook', '家常菜'],
    ingredients,
    instructions,
    image: `https://picsum.photos/seed/${encodeURIComponent(name)}/400/300`
  }
}

export async function getAllRecipes(): Promise<Recipe[]> {
  if (cachedRecipes.length > 0) {
    return cachedRecipes
  }
  try {
    cachedRecipes = await fetchChineseRecipes()
    if (cachedRecipes.length === 0) {
      cachedRecipes = getHardcodedRecipes()
    }
    return cachedRecipes
  } catch (error) {
    cachedRecipes = getHardcodedRecipes()
    return cachedRecipes
  }
}

export async function getRecipesByCategory(categoryPath: string): Promise<Recipe[]> {
  const allRecipes = await getAllRecipes()
  if (!categoryPath) return allRecipes
  return allRecipes.filter(r => r.category.includes(categoryPath))
}

export async function searchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  const allRecipes = await getAllRecipes()
  if (ingredients.length === 0) {
    return allRecipes
  }
  
  return allRecipes.filter(recipe => {
    const recipeIngredients = recipe.ingredients.map(i => i.name)
    return ingredients.some(selected =>
      recipeIngredients.some(ing => ing.includes(selected))
    ) || ingredients.some(selected =>
      recipe.name.includes(selected)
    )
  })
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const allRecipes = await getAllRecipes()
  return allRecipes.find(r => r.id === id) || null
}
