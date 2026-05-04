import type { Recipe, Category } from '../types/index'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// 常用食材列表（用于食材选择页）
export const INGREDIENTS = [
  'Chicken', 'Beef', 'Pork', 'Eggs', 'Rice', 'Onion', 'Tomato', 'Potato',
  'Carrot', 'Cheese', 'Milk', 'Butter', 'Bacon', 'Fish', 'Shrimp', 'Garlic',
  'Bell Pepper', 'Mushroom', 'Broccoli', 'Lettuce', 'Spinach', 'Pasta',
  'Noodles', 'Bread', 'Flour', 'Sugar', 'Salt', 'Vinegar', 'Soy Sauce',
  'Olive Oil', 'Oil', 'Chili', 'Pepper', 'Cinnamon', 'Cumin', 'Thyme',
  'Lemon', 'Apple', 'Banana'
]

// 获取分类
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories.php`)
  const data = await response.json()
  return data.categories.map((c: any) => ({ name: c.strCategory, value: c.strCategory }))
}

// 按分类获取菜谱
export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
  const data = await response.json()
  return (data.meals || []).map((m: any) => ({
    id: m.idMeal,
    name: m.strMeal,
    image: m.strMealThumb,
    category,
    area: '',
    tags: [],
    ingredients: [],
    instructions: []
  }))
}

// 获取所有菜谱（首页）
export async function getAllRecipes(): Promise<Recipe[]> {
  // 获取前20个随机菜谱
  const randomRecipes = []
  for (let i = 0; i < 20; i++) {
    const res = await getRandomRecipe()
    if (res) randomRecipes.push(res)
  }
  return randomRecipes
}

// 按食材搜索菜谱
export async function getRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
  const data = await response.json()
  if (!data.meals) return []
  
  // 获取详细信息
  const fullRecipes = await Promise.all(
    data.meals.slice(0, 12).map((m: any) => getRecipeById(m.idMeal))
  )
  return fullRecipes.filter(Boolean) as Recipe[]
}

// 根据多个食材匹配
export async function searchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  if (ingredients.length === 0) return getAllRecipes()
  
  // 用第一个食材搜索
  const recipes = await getRecipesByIngredient(ingredients[0])
  return recipes
}

// 获取单个菜谱详情
export async function getRecipeById(id: string): Promise<Recipe | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data = await response.json()
  if (!data.meals) return null
  
  const meal = data.meals[0]
  const ingredients: Array<{name: string, amount: string}> = []
  
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name?.trim()) ingredients.push({ name: name.trim(), amount: measure?.trim() || '' })
  }
  
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    ingredients,
    instructions: meal.strInstructions ? meal.strInstructions.split('\n').filter(Boolean) : []
  }
}

// 获取随机菜谱
export async function getRandomRecipe(): Promise<Recipe | null> {
  const response = await fetch(`${BASE_URL}/random.php`)
  const data = await response.json()
  if (!data.meals) return null
  
  const meal = data.meals[0]
  const ingredients: Array<{name: string, amount: string}> = []
  
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name?.trim()) ingredients.push({ name: name.trim(), amount: measure?.trim() || '' })
  }
  
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    ingredients,
    instructions: meal.strInstructions ? meal.strInstructions.split('\n').filter(Boolean) : []
  }
}
