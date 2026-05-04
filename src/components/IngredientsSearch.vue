<template>
  <div class="ingredients-search">
    <div class="section">
      <h3 class="section-title">选择你家有的食材</h3>
      <p class="section-hint">选择食材，为你推荐合适的菜谱</p>
      <div class="ingredients-grid">
        <button 
          v-for="ingredient in ingredients"
          :key="ingredient"
          :class="{ selected: selectedIngredients.includes(ingredient) }"
          @click="toggleIngredient(ingredient)"
        >
          {{ ingredient }}
        </button>
      </div>
    </div>
    
    <div class="section" v-if="selectedIngredients.length > 0">
      <h3 class="section-title">已选食材</h3>
      <div class="selected-list">
        <span 
          v-for="ingredient in selectedIngredients"
          :key="ingredient"
          class="tag"
        >
          {{ ingredient }}
          <button class="remove-btn" @click="removeIngredient(ingredient)">×</button>
        </span>
      </div>
    </div>
    
    <button 
      class="search-btn"
      :disabled="false"
      @click="search"
    >
      开始找菜谱 →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ingredientsList } from '../data/recipes'

const emit = defineEmits<{
  showResult: [ingredients: string[]]
}>()

const ingredients = ingredientsList
const selectedIngredients = ref<string[]>([])

const toggleIngredient = (ingredient: string) => {
  const index = selectedIngredients.value.indexOf(ingredient)
  if (index > -1) {
    selectedIngredients.value.splice(index, 1)
  } else {
    selectedIngredients.value.push(ingredient)
  }
}

const removeIngredient = (ingredient: string) => {
  const index = selectedIngredients.value.indexOf(ingredient)
  if (index > -1) {
    selectedIngredients.value.splice(index, 1)
  }
}

const search = () => {
  emit('showResult', selectedIngredients.value)
}
</script>

<style scoped>
.ingredients-search {
  margin-top: 8px;
}

.section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.section-hint {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.ingredients-grid button {
  padding: 14px 10px;
  border: 2px solid #e5e7eb;
  background: #fff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.ingredients-grid button:hover {
  border-color: #ffcbb0;
  background: #fff9f5;
}

.ingredients-grid button.selected {
  background: #ff6b35;
  color: #fff;
  border-color: #ff6b35;
  transform: scale(1.02);
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
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 107, 53, 0.35);
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.45);
}

.search-btn:active {
  transform: translateY(0);
}
</style>
