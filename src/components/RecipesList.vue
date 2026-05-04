<template>
  <div class="recipes-list">
    <div class="header-bar">
      <button class="back-btn" @click="emit('back')">
        ← 返回
      </button>
      <h2 class="list-title">找到 {{ recipes.length }} 个菜谱</h2>
    </div>
    
    <div class="recipes-grid">
      <div 
        v-for="recipe in recipes"
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
  recipes: Meal[]
}>()

const emit = defineEmits<{
  back: []
  select: [recipe: Meal]
}>()
</script>

<style scoped>
.recipes-list {
  padding: 0 20px 20px;
}

.header-bar {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.back-btn {
  padding: 8px 12px;
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.list-title {
  font-size: 16px;
  font-weight: 600;
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
