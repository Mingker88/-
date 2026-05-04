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

// 使用 TheMealDB 真实第三方 API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// 从 TheMealDB 获取菜谱
async function fetchMealDBRecipes(): Promise<Recipe[]> {
  const recipes: Recipe[] = []
  
  // 获取中餐菜谱
  try {
    const chineseResp = await fetch(`${BASE_URL}/filter.php?c=Chinese`)
    if (chineseResp.ok) {
      const chineseData = await chineseResp.json()
      if (chineseData.meals) {
        for (const meal of chineseData.meals.slice(0, 6)) {
          const detailResp = await fetch(`${BASE_URL}/lookup.php?i=${meal.idMeal}`)
          if (detailResp.ok) {
            const detailData = await detailResp.json()
            if (detailData.meals?.[0]) {
              recipes.push(convertMealDBRecipe(detailData.meals[0]))
            }
          }
        }
      }
    }
    
    // 再获取一些其他类型的
    const randomPromises = []
    for (let i = 0; i < 3; i++) {
      randomPromises.push(fetch(`${BASE_URL}/random.php`))
    }
    const randomResponses = await Promise.all(randomPromises)
    
    for (const resp of randomResponses) {
      if (resp.ok) {
        const data = await resp.json()
        if (data.meals?.[0]) {
          recipes.push(convertMealDBRecipe(data.meals[0]))
        }
      }
    }
  } catch (error) {
    console.error('Error fetching from TheMealDB:', error)
  }
  
  if (recipes.length === 0) {
    throw new Error('No recipes fetched from API')
  }
  
  return recipes
}

function convertMealDBRecipe(meal: any): Recipe {
  const ingredients: Array<{ name: string; amount: string }> = []
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient?.trim()) {
      ingredients.push({ name: ingredient.trim(), amount: measure?.trim() || '' })
    }
  }
  
  const instructions: string[] = meal.strInstructions?.split('\n').filter((line: string) => line.trim()) || []
  
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: `dishes/${meal.strCategory || '其他'}`,
    area: meal.strArea || '中餐',
    tags: meal.strTags?.split(',') || [],
    ingredients,
    instructions,
    image: meal.strMealThumb || 'https://picsum.photos/seed/recipe/400/300'
  }
}

let cachedRecipes: Recipe[] = []

export async function getAllRecipes(): Promise<Recipe[]> {
  if (cachedRecipes.length > 0) {
    return cachedRecipes
  }
  cachedRecipes = await fetchMealDBRecipes()
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
  
  // 使用 TheMealDB 的按食材搜索功能
  try {
    const searchResults: Recipe[] = []
    for (const ingredient of ingredients.slice(0, 1)) {
      const resp = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
      if (resp.ok) {
        const data = await resp.json()
        if (data.meals) {
          for (const meal of data.meals.slice(0, 5)) {
            const detailResp = await fetch(`${BASE_URL}/lookup.php?i=${meal.idMeal}`)
            if (detailResp.ok) {
              const detailData = await detailResp.json()
              if (detailData.meals?.[0]) {
                searchResults.push(convertMealDBRecipe(detailData.meals[0]))
              }
            }
          }
        }
      }
    }
    return searchResults.length > 0 ? searchResults : allRecipes
  } catch (error) {
    console.error('Search error:', error)
    return allRecipes
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const resp = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
    if (resp.ok) {
      const data = await resp.json()
      if (data.meals?.[0]) {
        return convertMealDBRecipe(data.meals[0])
      }
    }
  } catch (error) {
    console.error('Error fetching recipe by ID:', error)
  }
  
  const allRecipes = await getAllRecipes()
  return allRecipes.find(r => r.id === id) || null
}
