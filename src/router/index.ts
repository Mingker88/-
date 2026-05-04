import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ingredients from '../views/Ingredients.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import Favorites from '../views/Favorites.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetail
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
