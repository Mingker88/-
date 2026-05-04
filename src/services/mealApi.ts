import type { Meal, MealApiResponse, Category, CategoryApiResponse, Area, AreaApiResponse, Ingredient } from '@/types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getRandomMeal(): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data: MealApiResponse = await response.json();
  return data.meals ? parseMeal(data.meals[0]) : null;
}

export async function getRandomMeals(count: number): Promise<Meal[]> {
  const promises = Array.from({ length: count }, () => getRandomMeal());
  const meals = await Promise.all(promises);
  return meals.filter((meal): meal is Meal => meal !== null);
}

export async function searchMeals(keyword: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(keyword)}`);
  const data: MealApiResponse = await response.json();
  return data.meals ? data.meals.map(parseMeal) : [];
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data: CategoryApiResponse = await response.json();
  return data.categories || [];
}

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  const data: MealApiResponse = await response.json();
  return data.meals || [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data: MealApiResponse = await response.json();
  return data.meals ? parseMeal(data.meals[0]) : null;
}

export async function getAreas(): Promise<Area[]> {
  const response = await fetch(`${BASE_URL}/list.php?a=list`);
  const data: AreaApiResponse = await response.json();
  return data.meals || [];
}

export async function getMealsByArea(area: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  const data: MealApiResponse = await response.json();
  return data.meals || [];
}

function parseMeal(raw: Meal): Meal {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}` as keyof Meal] as string;
    const measure = raw[`strMeasure${i}` as keyof Meal] as string;
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }
  
  return {
    idMeal: raw.idMeal,
    strMeal: raw.strMeal,
    strMealThumb: raw.strMealThumb,
    strCategory: raw.strCategory,
    strArea: raw.strArea,
    strInstructions: raw.strInstructions,
    strYoutube: raw.strYoutube,
    strSource: raw.strSource,
    ingredients,
  };
}
