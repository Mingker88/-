<template>
  <div class="app">
    <div class="header">
      <h1 class="app-title">🍳 菜谱小助手</h1>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="tab-bar">
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="tab-item"
        active-class="active"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-text">{{ tab.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tabs = ref([
  { name: '首页', path: '/', icon: '🏠' },
  { name: '食材', path: '/ingredients', icon: '🥗' },
  { name: '收藏', path: '/favorites', icon: '❤️' },
])
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff0e9 0%, #ffffff 300px);
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
}

.header {
  padding: 20px;
  text-align: center;
}

.app-title {
  font-size: 24px;
  font-weight: 700;
  color: #ff6b35;
}

.content {
  flex: 1;
  padding: 0 16px 16px;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 100;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 12px;
}

.tab-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.tab-item.active {
  color: #ff6b35;
}

.tab-item.active .tab-text {
  font-weight: 600;
}
</style>
