<template>
  <div v-if="recipe" class="detail">
    <div class="back-header">
      <button class="back-btn" @click="$router.back()">
        ← 返回
      </button>
      <button class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>

    <div class="cover">
      <img :src="recipe.image" :alt="recipe.name" />
    </div>

    <div class="content">
      <h1 class="title">{{ recipe.name }}</h1>

      <div class="meta">
        <span v-if="recipe.category" class="meta-tag">{{ recipe.category }}</span>
        <span v-if="recipe.area" class="meta-tag">{{ recipe.area }}</span>
      </div>

      <div v-if="recipe.tags?.length" class="tag-list">
        <span v-for="tag in recipe.tags" :key="tag" class="recipe-tag">{{ tag }}</span>
      </div>

      <div class="section">
        <h3 class="section-title">🥗 所需食材</h3>
        <div class="ingredients-list">
          <div v-for="(item, i) in recipe.ingredients" :key="i" class="item">
            <span class="name">{{ item.name }}</span>
            <span class="amount">{{ item.amount }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">👨‍🍳 做法步骤</h3>
        <div class="steps">
          <div v-for="(step, i) in recipe.instructions" :key="i" class="step-item">
            <div class="step-number">{{ i + 1 }}</div>
            <p class="step-text">{{ step }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="detail">
    <div class="loading">加载中...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRecipeById } from '../api/meal'
import type { Recipe } from '../types'

const route = useRoute()
const recipe = ref<Recipe | null>(null)
const favoritesIds = ref<string[]>(() => {
  const saved = localStorage.getItem('recipe_favorites')
  return saved ? JSON.parse(saved) : []
})

const isFavorite = computed(() => favoritesIds.value.includes(route.params.id as string))

const toggleFavorite = () => {
  const id = route.params.id as string
  const idx = favoritesIds.value.indexOf(id)
  if (idx > -1) {
    favoritesIds.value.splice(idx, 1)
  } else {
    favoritesIds.value.unshift(id)
  }
  localStorage.setItem('recipe_favorites', JSON.stringify(favoritesIds.value))
}

onMounted(async () => {
  const id = route.params.id as string
  recipe.value = await getRecipeById(id)
})
</script>

<style scoped>
.detail {
  background: white;
  margin: -16px;
  padding-bottom: 40px;
}

.back-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.back-btn,
.favorite-btn {
  padding: 10px 14px;
  border: 1px solid #eee;
  background: white;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.loading {
  padding: 80px 20px;
  text-align: center;
  color: #999;
  font-size: 18px;
}

.cover {
  width: 100%;
}

.cover img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
}

.content {
  padding: 24px 20px;
}

.title {
  font-size: 26px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.2;
}

.meta {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.meta-tag {
  padding: 6px 14px;
  background: #f3f4f6;
  color: #4b5563;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.tag-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.recipe-tag {
  padding: 6px 14px;
  background: linear-gradient(135deg, #fff0e9 0%, #ffede5 100%);
  color: #ff6b35;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 19px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  background: #f9fafb;
  border-radius: 12px;
  font-size: 15px;
}

.name {
  font-weight: 600;
  color: #1f2937;
}

.amount {
  color: #6b7280;
  font-weight: 500;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-item {
  display: flex;
  gap: 14px;
}

.step-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8f66 100%);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 15px;
}

.step-text {
  color: #4b5563;
  font-size: 15px;
  line-height: 1.7;
  padding-top: 6px;
  flex: 1;
}
</style>
