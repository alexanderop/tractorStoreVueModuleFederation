import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { remote } from '../utils/remote'

const routes: RouteRecordRaw[] = [
  { path: '/', component: remote('explore/HomePage') },
  { path: '/products/:category?', component: remote('explore/CategoryPage'), props: true },
  { path: '/stores', component: remote('explore/StoresPage') },
  { path: '/product/:id', component: remote('decide/ProductPage'), props: true },
  { path: '/checkout/cart', component: remote('checkout/CartPage') },
  { path: '/checkout/checkout', component: remote('checkout/Checkout') },
  { path: '/checkout/thanks', component: remote('checkout/Thanks') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
