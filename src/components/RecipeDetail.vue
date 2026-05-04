<template>
  <div class="recipe-detail">
    <div class="detail-header">
      <button class="back-btn" @click="emit('back')">
        ← 返回
      </button>
      <button class="favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
        <span v-if="isFavorite">★</span>
        <span v-else>☆</span>
      </button>
    </div>
    
    <div class="recipe-cover">
      <img :src="recipe.strMealThumb" :alt="recipe.strMeal">
    </div>
    
    <div class="detail-content">
      <h1 class="recipe-title">{{ recipe.strMeal }}</h1>
      
      <div class="recipe-tags">
        <span v-if="recipe.strCategory" class="tag">{{ recipe.strCategory }}</span>
        <span v-if="recipe.strArea" class="tag">{{ recipe.strArea }}</span>
      </div>
      
      <div class="detail-section" v-if="recipe.ingredients && recipe.ingredients.length > 0">
        <h3 class="section-title">所需食材</h3>
        <div class="ingredients-list">
          <div 
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            class="ingredient-item"
          >
            <span class="ingredient-name">{{ ingredient.name }}</span>
            <span class="ingredient-measure">{{ ingredient.measure }}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-section" v-if="recipe.strInstructions">
        <h3 class="section-title">做法</h3>
        <div class="instructions">
          <p v-for="(step, index) in recipe.strInstructions.split('\n').filter(Boolean)" :key="index">
            {{ step }}
          </p>
        </div>
      </div>
      
      <div class="detail-section" v-if="recipe.strSource">
        <a 
          :href="recipe.strSource"
          target="_blank"
          rel="noopener noreferrer"
          class="source-link"
        >
          查看原文 →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Meal } from '@/types'

const props = defineProps<{
  recipe: Meal
  isFavorite: boolean
}>()

const emit = defineEmits<{
  back: []
  toggleFavorite: [recipe: Meal]
}>()

const toggleFavorite = () => {
  emit('toggleFavorite', props.recipe)
}
</script>

<style scoped>
.recipe-detail {
  background: #fff;
  min-height: 100vh;
}

.detail-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #fff;
  z-index: 10;
  border-bottom: 1px solid #e5e5e5;
}

.back-btn, .favorite-btn {
  padding: 8px 12px;
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.favorite-btn.active {
  color: #f44336;
  border-color: #f44336;
}

.recipe-cover {
  width: 100%;
}

.recipe-cover img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.detail-content {
  padding: 20px;
}

.recipe-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
}

.recipe-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
}

.recipe-tags .tag {
  padding: 6px 12px;
  background: #f5f5f5;
  border-radius: 15px;
  font-size: 13px;
  color: #666;
}

.detail-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 14px;
}

.ingredient-name {
  font-weight: 500;
}

.ingredient-measure {
  color: #666;
}

.instructions {
  line-height: 1.8;
  color: #444;
  font-size: 14px;
}

.instructions p {
  margin-bottom: 12px;
}

.source-link {
  display: inline-block;
  padding: 12px 24px;
  background: #111;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
}
</style>
