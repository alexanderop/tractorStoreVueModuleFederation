<script setup lang="ts">
import Router from './Router.vue'
import { useHistory } from './useHistory'

const path = useHistory()
</script>

<template>
  <div>
    <h1>Vue 3 Host App Running</h1>
    <p>Current path: {{ path }}</p>
    <nav>
      <a href="/">Home</a> | 
      <a href="/stores">Stores</a> | 
      <a href="/products">Products</a> | 
      <a href="/product/AU-02">🔧 Product AU-02 (Decide)</a> | 
      <a href="/checkout/cart">Cart</a>
    </nav>
    
    <Suspense>
      <template #default>
        <Router />
      </template>

      <template #fallback>
        <div class="loader-frame">
          <span class="loader" />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background: #f0f0f0;
  margin-bottom: 1rem;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}
nav a:hover {
  color: #007bff;
}

/* same loader styles you had */
.loader-frame{display:flex;flex:1;align-items:center;justify-content:center;height:100%}
.loader{width:48px;height:48px;border:3px dotted #FFF;border-style:solid solid dotted dotted;border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;animation:rotation 2s linear infinite}
.loader::after{content:'';box-sizing:border-box;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;border:3px dotted #FF3D00;border-style:solid solid dotted;width:24px;height:24px;border-radius:50%;animation:rotationBack 1s linear infinite;transform-origin:center}
@keyframes rotation{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes rotationBack{0%{transform:rotate(0)}100%{transform:rotate(-360deg)}}
</style>
