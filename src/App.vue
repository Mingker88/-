<template>
  <div class="app">
    <div class="header">
      <h1>食材找菜谱</h1>
    </div>
    
    <div class="nav-tabs">
      <button 
        :class="{ active: activeTab === 'ingredients' }"
        @click="activeTab = 'ingredients'"
      >
        选食材
      </button>
      <button 
        :class="{ active: activeTab === 'favorites' }"
        @click="activeTab = 'favorites'"
      >
        收藏
      </button>
    </div>
    
    <div class="content">
      <IngredientsSearch 
        v-if="activeTab === 'ingredients'"
        @show-result="showResult"
      />
      <RecipesList 
        v-if="showResultPage"
        :recipes="searchResults"
        @back="showResultPage = false"
        @select="showRecipeDetail"
      />
      <RecipeDetail 
        v-if="selectedRecipe"
        :recipe="selectedRecipe"
        :is-favorite="isFavorite(selectedRecipe.idMeal)"
        @back="selectedRecipe = null"
        @toggle-favorite="toggleFavorite"
      />
      <Favorites 
        v-if="activeTab === 'favorites' && !showResultPage && !selectedRecipe"
        :favorites="favorites"
        @select="showRecipeDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IngredientsSearch from './components/IngredientsSearch.vue'
import RecipesList from './components/RecipesList.vue'
import RecipeDetail from './components/RecipeDetail.vue'
import Favorites from './components/Favorites.vue'
import type { Meal } from '@/types'
import { searchMealsByIngredients, getMealById } from '@/api/meal'

const activeTab = ref<'ingredients' | 'favorites'>('ingredients')
const searchResults = ref<Meal[]>([])
const showResultPage = ref(false)
const selectedRecipe = ref<Meal | null>(null)
const favorites = ref<Meal[]>([])

// 收藏功能
const loadFavorites = () => {
  const saved = localStorage.getItem('recipe_favorites')
  if (saved) {
    const ids = JSON.parse(saved)
    // 重新加载收藏的食谱
    Promise.all(ids.map((id: string) => getMealById(id))).then(meals => {
      favorites.value = meals.filter((m): m is Meal => m !== null)
    })
  }
}

const isFavorite = (id: string) => {
  const saved = localStorage.getItem('recipe_favorites')
  if (!saved) return false
  const ids = JSON.parse(saved)
  return ids.includes(id)
}

const toggleFavorite = (recipe: Meal) => {
  const saved = localStorage.getItem('recipe_favorites')
  let ids: string[] = saved ? JSON.parse(saved) : []
  
  if (ids.includes(recipe.idMeal)) {
    ids = ids.filter(id => id !== recipe.idMeal)
  } else {
    ids.unshift(recipe.idMeal)
  }
  
  localStorage.setItem('recipe_favorites', JSON.stringify(ids))
  loadFavorites()
}

// 搜索食谱
const showResult = async (ingredients: string[]) => {
  searchResults.value = await searchMealsByIngredients(ingredients)
  showResultPage.value = true
}

const showRecipeDetail = (recipe: Meal) => {
  selectedRecipe.value = recipe
}

onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #fff;
}

.header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}

.header h1 {
  font-size: 24px;
  font-weight: 600;
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
}

.nav-tabs button {
  flex: 1;
  padding: 15px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  position: relative;
}

.nav-tabs button.active {
  font-weight: 600;
}

.nav-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: #111;
}

.content {
  padding-bottom: 20px;
}
</style>
