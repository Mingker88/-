export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  ingredients?: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Area {
  strArea: string;
}

export interface MealApiResponse {
  meals: Meal[] | null;
}

export interface CategoryApiResponse {
  categories: Category[] | null;
}

export interface AreaApiResponse {
  meals: Area[] | null;
}
