import type { Meal, MealApiResponse, Category, CategoryApiResponse, Ingredient } from '@/types'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// 常用食材列表
export const COMMON_INGREDIENTS = [
  '鸡肉', '猪肉', '牛肉', '鱼肉', '虾', '鸡蛋', '豆腐',
  '白菜', '青菜', '土豆', '西红柿', '黄瓜', '胡萝卜', '洋葱',
  '米饭', '面条', '面粉', '牛奶', '奶酪', '黄油'
]

// 获取随机食谱
export async function getRandomMeal(): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/random.php`)
  const data: MealApiResponse = await response.json()
  return data.meals ? parseMeal(data.meals[0]) : null
}

// 获取多个随机食谱
export async function getRandomMeals(count: number): Promise<Meal[]> {
  const promises = Array.from({ length: count }, () => getRandomMeal())
  const meals = await Promise.all(promises)
  return meals.filter((meal): meal is Meal => meal !== null)
}

// 按食材搜索食谱
export async function searchMealsByIngredients(ingredients: string[]): Promise<Meal[]> {
  // 先尝试用第一个食材搜索
  if (ingredients.length > 0) {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredients[0])}`)
      const data: MealApiResponse = await response.json()
      if (data.meals) {
        // 过滤出包含更多匹配食材的食谱
        const detailedMeals = await Promise.all(
          data.meals.slice(0, 10).map(meal => getMealById(meal.idMeal))
        )
        return detailedMeals.filter((meal): meal is Meal => meal !== null)
      }
    } catch (e) {
      console.error('按食材搜索失败:', e)
    }
  }
  
  // 失败则返回随机食谱
  return getRandomMeals(8)
}

// 按关键词搜索
export async function searchMeals(keyword: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(keyword)}`)
  const data: MealApiResponse = await response.json()
  return data.meals ? data.meals.map(parseMeal) : []
}

// 获取分类列表
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories.php`)
  const data: CategoryApiResponse = await response.json()
  return data.categories || []
}

// 按分类获取食谱
export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
  const data: MealApiResponse = await response.json()
  return data.meals || []
}

// 获取食谱详情
export async function getMealById(id: string): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data: MealApiResponse = await response.json()
  return data.meals ? parseMeal(data.meals[0]) : null
}

// 解析食谱数据
function parseMeal(raw: any): Meal {
  const ingredients: Ingredient[] = []
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}`] as string
    const measure = raw[`strMeasure${i}`] as string
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      })
    }
  }
  
  return {
    idMeal: raw.idMeal,
    strMeal: raw.strMeal,
    strMealThumb: raw.strMealThumb,
    strCategory: raw.strCategory,
    strArea: raw.strArea,
    strInstructions: raw.strInstructions,
    strSource: raw.strSource,
    ingredients,
  }
}
