<template>
  <div class="home">
    <div class="section">
      <h3 class="section-title">分类浏览</h3>
      <div class="category-grid">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="{ active: activeCategory === cat.value }"
          @click="activeCategory = cat.value"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">
        {{ activeCategory || '全部' }}
        <span class="count">({{ filteredRecipes.length }})</span>
      </h3>
      <div class="recipes-grid">
        <div
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          class="recipe-card"
          @click="$router.push(`/recipe/${recipe.id}`)"
        >
          <div class="recipe-image">
            <img :src="recipe.image" :alt="recipe.name" loading="lazy" />
          </div>
          <div class="recipe-info">
            <div class="recipe-name">{{ recipe.name }}</div>
            <div class="recipe-tags">
              <span v-for="tag in recipe.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { recipes, categories } from '../data/recipes'

const activeCategory = ref('')
const filteredRecipes = computed(() => {
  if (activeCategory.value) {
    return recipes.filter((r) => r.category === activeCategory.value)
  }
  return recipes
})
</script>

<style scoped>
.home {
  padding-bottom: 20px;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
}

.count {
  margin-left: 6px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.category-grid button {
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

.category-grid button:hover {
  border-color: #ffd6c6;
}

.category-grid button.active {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8f66 100%);
  color: white;
  border-color: transparent;
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
