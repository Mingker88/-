<template>
  <div class="favorites">
    <div class="header">
      <h2 class="title">❤️ 我的收藏</h2>
    </div>

    <div v-if="favorites.length === 0 && !loading" class="empty">
      <div class="empty-icon">🍳</div>
      <p class="empty-text">还没有收藏任何菜谱</p>
      <p class="empty-hint">去首页或食材页找找喜欢的菜谱吧</p>
    </div>

    <div v-else>
      <div v-if="loading" class="loading">正在加载收藏的菜谱...</div>
      <div v-else class="recipes-grid">
        <div
          v-for="recipe in favorites"
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
import { ref, onMounted, watch } from 'vue'
import { getRecipeById } from '../api/howtocook'
import type { Recipe } from '../types'

const favoritesIds = ref<string[]>(() => {
  const saved = localStorage.getItem('recipe_favorites')
  return saved ? JSON.parse(saved) : []
})
const favorites = ref<Recipe[]>([])
const loading = ref(false)

async function loadFavorites() {
  loading.value = true
  const ids = favoritesIds.value
  const recipes: Recipe[] = []
  for (const id of ids.slice(0, 20)) { // 限制加载数量
    try {
      const recipe = await getRecipeById(id)
      if (recipe) recipes.push(recipe)
    } catch (error) {
      console.error('Error loading favorite:', id, error)
    }
  }
  favorites.value = recipes
  loading.value = false
}

onMounted(() => loadFavorites())
</script>

<style scoped>
.favorites {
  padding-bottom: 20px;
}

.header {
  margin-bottom: 18px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.loading {
  padding: 40px 0;
  text-align: center;
  color: #666;
  font-size: 16px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 18px;
  color: #374151;
  margin-bottom: 8px;
  font-weight: 600;
}

.empty-hint {
  font-size: 14px;
  color: #9ca3af;
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
