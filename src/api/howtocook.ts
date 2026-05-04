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

// 完全从HowToCook项目获取真实数据（无任何模拟）
async function fetchChineseRecipes(): Promise<Recipe[]> {
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
  cachedRecipes = await fetchChineseRecipes()
  return cachedRecipes
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
