<template>
  <div class="ingredients">
    <div class="section">
      <h3 class="section-title">选择你家有的食材</h3>
      <p class="section-hint">选择食材，我们从 HowToCook 开源项目中匹配菜谱</p>
      <div class="ingredients-grid">
        <button
          v-for="ing in ingredientsList"
          :key="ing"
          :class="{ active: selectedIngredients.includes(ing) }"
          @click="toggleIngredient(ing)"
        >
          {{ ing }}
        </button>
      </div>
    </div>

    <div class="section" v-if="selectedIngredients.length > 0">
      <h3 class="section-title">
        已选食材
        <span class="count">({{ selectedIngredients.length }})</span>
      </h3>
      <div class="selected-list">
        <span v-for="ing in selectedIngredients" :key="ing" class="tag">
          {{ ing }}
          <button class="remove-btn" @click="removeIngredient(ing)">×</button>
        </span>
      </div>
    </div>

    <button class="search-btn" @click="searchRecipes">
      查找菜谱
    </button>

    <div class="section" v-if="matchedRecipes.length > 0 || loading">
      <h3 class="section-title">
        为你找到
        <span class="count">{{ matchedRecipes.length }}</span> 个菜谱
      </h3>
      <div v-if="loading" class="loading">正在搜索匹配的菜谱...</div>
      <div v-else class="recipes-grid">
        <div
          v-for="recipe in matchedRecipes"
          :key="recipe.id"
          class="recipe-card"
          @click="$router.push(`/recipe/${recipe.id}`)"
        >
          <div class="recipe-image">
            <img :src="recipe.image" :alt="recipe.name" loading="lazy" />
          </div>
          <div class="recipe-info">
            <div class="recipe-name">{{ recipe.name }}</div>
            <div class="recipe-tags" v-if="recipe.tags?.length">
              <span v-for="tag in recipe.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Recipe } from '../types'
import { searchRecipesByIngredients, ingredientsList } from '../api/howtocook'

const selectedIngredients = ref<string[]>([])
const matchedRecipes = ref<Recipe[]>([])
const loading = ref(false)

const toggleIngredient = (ing: string) => {
  const idx = selectedIngredients.value.indexOf(ing)
  if (idx > -1) {
    selectedIngredients.value.splice(idx, 1)
  } else {
    selectedIngredients.value.push(ing)
  }
}

const removeIngredient = (ing: string) => {
  const idx = selectedIngredients.value.indexOf(ing)
  if (idx > -1) selectedIngredients.value.splice(idx, 1)
}

const searchRecipes = async () => {
  loading.value = true
  try {
    matchedRecipes.value = await searchRecipesByIngredients(selectedIngredients.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.ingredients {
  padding-bottom: 20px;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.section-hint {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 14px;
}

.count {
  margin-left: 6px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.ingredients-grid button {
  padding: 12px 8px;
  border: 1px solid #eee;
  background: white;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.ingredients-grid button:hover {
  border-color: #ffd6c6;
}

.ingredients-grid button.active {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8f66 100%);
  color: white;
  border-color: transparent;
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #fff0e9 0%, #ffede5 100%);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #ff6b35;
}

.remove-btn {
  border: none;
  background: rgba(255, 107, 53, 0.15);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: #ff6b35;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.search-btn {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8f66 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 107, 53, 0.35);
  transition: all 0.2s;
  margin-bottom: 24px;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.45);
}

.loading {
  padding: 40px 0;
  text-align: center;
  color: #666;
  font-size: 16px;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.recipe-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s;
}

.recipe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.recipe-image {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-info {
  padding: 12px;
}

.recipe-name {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipe-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  padding: 3px 8px;
  background: #fff0e9;
  color: #ff6b35;
  border-radius: 10px;
  font-weight: 500;
}
</style>
