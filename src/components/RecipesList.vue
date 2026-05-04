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
        :key="recipe.id"
        class="recipe-card"
        @click="emit('select', recipe)"
      >
        <div class="recipe-image">
          <img :src="recipe.image" :alt="recipe.name" loading="lazy">
          <div class="category-badge">{{ recipe.category }}</div>
        </div>
        <div class="recipe-info">
          <h3 class="recipe-name">{{ recipe.name }}</h3>
          <div class="recipe-tags">
            <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '../data/recipes'

defineProps<{
  recipes: Recipe[]
}>()

const emit = defineEmits<{
  back: []
  select: [recipe: Recipe]
}>()
</script>

<style scoped>
.recipes-list {
  margin-top: -12px;
}

.header-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.back-btn {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  background: #fff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #f9fafb;
}

.list-title {
  font-size: 17px;
  font-weight: 700;
  color: #1f2937;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.recipe-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.recipe-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.recipe-info {
  padding: 14px;
}

.recipe-name {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
}

.recipe-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  background: #fff0e9;
  color: #ff6b35;
  border-radius: 10px;
  font-weight: 500;
}
</style>
