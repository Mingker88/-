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
import type { Recipe, Category } fromimport type { Recipe, Category } from '../import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', valueimport type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜',import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋',import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: 'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amountimport type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category:import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: 'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: 'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: 'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: 'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: '糖', amount: '1勺' }
    ],
    instructions: [
      'import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: '糖', amount: '1勺' }
    ],
    instructions: [
      '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟',
      '调碗import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: '糖', amount: '1勺' }
    ],
    instructions: [
      '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟',
      '调碗汁：生抽、醋、糖、淀粉、少许水混合',
      '花生米炸至import type { Recipe, Category } from '../types/index'

// 免费中文食谱API方案
// 使用开源的模拟数据，也支持你自己换成真实API

// 分类数据
const CATEGORIES: Category[] = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '粤菜', value: '粤菜' },
  { name: '湘菜', value: '湘菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '甜点', value: '甜点' }
]

// 常用食材
export const INGREDIENTS = [
  '鸡蛋', '猪肉', '牛肉', '鸡肉', '鱼', '虾',
  '豆腐', '白菜', '青菜', '菠菜', '韭菜', '土豆',
  '黄瓜', '萝卜', '茄子', '辣椒', '番茄', '南瓜',
  '葱', '姜', '蒜', '花椒', '八角', '桂皮',
  '生抽', '老抽', '醋', '料酒', '糖', '盐',
  '米饭', '面条', '面粉', '油', '豆芽', '木耳'
]

// 模拟的中文食谱数据
const RECIPES: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/fanqie/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜', '家常'],
    ingredients: [
      { name: '番茄', amount: '2个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '半勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切块，鸡蛋打散加少许盐',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出备用',
      '锅中放少许油，下番茄块翻炒至出汁',
      '加盐和少许糖调味',
      '倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/gongbao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜', '川菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: '糖', amount: '1勺' }
    ],
    instructions: [
      '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟',
      '调碗汁：生抽、醋、糖、淀粉、少许水混合',
      '花生米炸至金黄捞出备用',
      '锅中放油，爆香干辣椒和花椒',
      '下