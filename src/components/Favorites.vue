<template>
  <div class="favorites">
    <div class="favorites-header">
      <h2>我的收藏</h2>
    </div>
    
    <div v-if="favorites.length === 0" class="empty-state">
      <div class="empty-icon">☆</div>
      <p class="empty-text">还没有收藏任何菜谱</p>
      <p class="empty-hint">去选食材页面找喜欢的菜谱吧</p>
    </div>
    
    <div v-else class="recipes-grid">
      <div 
        v-for="recipe in favorites"
        :key="recipe.idMeal"
        class="recipe-card"
        @click="emit('select', recipe)"
      >
        <div class="recipe-image">
          <img :src="recipe.strMealThumb" :alt="recipe.strMeal" loading="lazy">
        </div>
        <div class="recipe-info">
          <h3 class="recipe-name">{{ recipe.strMeal }}</h3>
          <div class="recipe-meta">
            <span v-if="recipe.strCategory" class="meta-tag">{{ recipe.strCategory }}</span>
            <span v-if="recipe.strArea" class="meta-tag">{{ recipe.strArea }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Meal } from '@/types'

defineProps<{
  favorites: Meal[]
}>()

const emit = defineEmits<{
  select: [recipe: Meal]
}>()
</script>

<style scoped>
.favorites {
  padding: 0 20px 20px;
}

.favorites-header {
  padding: 15px 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.favorites-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 48px;
  color: #e5e5e5;
  margin-bottom: 15px;
}

.empty-text {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 14px;
  color: #999;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.recipe-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.recipe-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recipe-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.meta-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: #f5f5f5;
  border-radius: 10px;
  color: #666;
}
</style>
