<template>
  <div class="app">
    <div class="header">
      <h1 class="app-title">🍳 食材找菜谱</h1>
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
        收藏夹
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
        :is-favorite="isFavorite(selectedRecipe.id)"
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
import { ref, computed } from 'vue'
import IngredientsSearch from './components/IngredientsSearch.vue'
import RecipesList from './components/RecipesList.vue'
import RecipeDetail from './components/RecipeDetail.vue'
import Favorites from './components/Favorites.vue'
import { recipes, type Recipe } from './data/recipes'

const activeTab = ref<'ingredients' | 'favorites'>('ingredients')
const searchResults = ref<Recipe[]>([])
const showResultPage = ref(false)
const selectedRecipe = ref<Recipe | null>(null)

const favoritesIds = ref<string[]>(() => {
  const saved = localStorage.getItem('recipe_favorites')
  return saved ? JSON.parse(saved) : []
})

const favorites = computed(() => {
  return recipes.filter(r => favoritesIds.value.includes(r.id))
})

const isFavorite = (id: string) => {
  return favoritesIds.value.includes(id)
}

const toggleFavorite = (recipe: Recipe) => {
  const index = favoritesIds.value.indexOf(recipe.id)
  if (index > -1) {
    favoritesIds.value.splice(index, 1)
  } else {
    favoritesIds.value.unshift(recipe.id)
  }
  localStorage.setItem('recipe_favorites', JSON.stringify(favoritesIds.value))
}

const showResult = (selectedIngredients: string[]) => {
  if (selectedIngredients.length === 0) {
    searchResults.value = recipes
  } else {
    searchResults.value = recipes.filter(recipe => {
      return selectedIngredients.some(ing => 
        recipe.ingredients.some(i => i.name.includes(ing))
      )
    })
  }
  showResultPage.value = true
}

const showRecipeDetail = (recipe: Recipe) => {
  selectedRecipe.value = recipe
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff0e9 0%, #ffffff 300px);
}

.header {
  padding: 24px 20px 16px;
  text-align: center;
}

.app-title {
  font-size: 26px;
  font-weight: 700;
  color: #ff6b35;
  letter-spacing: -0.5px;
}

.nav-tabs {
  display: flex;
  background: #fff;
  margin: 0 20px;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  gap: 4px;
}

.nav-tabs button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-tabs button.active {
  background: #ff6b35;
  color: #fff;
}

.content {
  padding: 20px 20px 100px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
