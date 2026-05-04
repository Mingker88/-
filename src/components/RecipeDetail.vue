<template>
  <div class="recipe-detail">
    <div class="detail-header">
      <button class="back-btn" @click="emit('back')">
        ← 返回
      </button>
      <button class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
    
    <div class="recipe-cover">
      <img :src="recipe.image" :alt="recipe.name">
    </div>
    
    <div class="detail-content">
      <div class="title-section">
        <h1 class="recipe-title">{{ recipe.name }}</h1>
        <div class="recipe-meta">
          <span class="meta-item">{{ recipe.category }}</span>
          <span class="meta-item">{{ recipe.area }}</span>
        </div>
        <div class="tag-list">
          <span v-for="tag in recipe.tags" :key="tag" class="recipe-tag">{{ tag }}</span>
        </div>
      </div>
      
      <div class="detail-section">
        <h3 class="section-title">🥗 所需食材</h3>
        <div class="ingredients-list">
          <div 
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            class="ingredient-item"
          >
            <span class="ingredient-name">{{ ingredient.name }}</span>
            <span class="ingredient-amount">{{ ingredient.amount }}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <h3 class="section-title">👨‍🍳 做法步骤</h3>
        <div class="instructions">
          <div 
            v-for="(step, index) in recipe.instructions"
            :key="index"
            class="step-item"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <p class="step-text">{{ step }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '../data/recipes'

const props = defineProps<{
  recipe: Recipe
  isFavorite: boolean
}>()

const emit = defineEmits<{
  back: []
  toggleFavorite: [recipe: Recipe]
}>()

const toggleFavorite = () => {
  emit('toggleFavorite', props.recipe)
}
</script>

<style scoped>
.recipe-detail {
  background: #fff;
  min-height: 100vh;
  margin: -20px;
  margin-bottom: -100px;
}

.detail-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.back-btn,
.favorite-btn {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  background: #fff;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.back-btn:hover,
.favorite-btn:hover {
  background: #f9fafb;
}

.recipe-cover {
  width: 100%;
}

.recipe-cover img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
}

.detail-content {
  padding: 24px 20px;
}

.title-section {
  margin-bottom: 32px;
}

.recipe-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 12px;
}

.recipe-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.meta-item {
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
}

.recipe-tag {
  padding: 6px 14px;
  background: linear-gradient(135deg, #fff0e9 0%, #ffede5 100%);
  color: #ff6b35;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.detail-section {
  margin-bottom: 36px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  background: #f9fafb;
  border-radius: 12px;
  font-size: 15px;
}

.ingredient-name {
  font-weight: 600;
  color: #1f2937;
}

.ingredient-amount {
  color: #6b7280;
  font-weight: 500;
}

.instructions {
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
  color: #fff;
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
