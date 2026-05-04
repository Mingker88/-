<template>
  <div class="ingredients-search">
    <div class="section">
      <h3 class="section-title">选择你有的食材</h3>
      <div class="ingredients-grid">
        <button 
          v-for="ingredient in COMMON_INGREDIENTS"
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
      :disabled="selectedIngredients.length === 0"
      @click="search"
    >
      开始找菜谱
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { COMMON_INGREDIENTS } from '@/api/meal'

const props = defineProps<{
  // 预留属性
}>()

const emit = defineEmits<{
  showResult: [ingredients: string[]]
}>()

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
  if (selectedIngredients.value.length > 0) {
    emit('showResult', selectedIngredients.value)
  }
}
</script>

<style scoped>
.ingredients-search {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.ingredients-grid button {
  padding: 12px 8px;
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.ingredients-grid button.selected {
  background: #111;
  color: #fff;
  border-color: #111;
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
}

.remove-btn {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: #666;
}

.search-btn {
  width: 100%;
  padding: 15px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.search-btn:not(:disabled):hover {
  background: #333;
}
</style>
