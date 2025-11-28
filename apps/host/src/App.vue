<script setup lang="ts">
import Layout from './components/Layout.vue'
</script>

<template>
  <Layout />
</template>

<style>
nav {

}
nav a {
  text-decoration: none;
  color: #333;
}
nav a:hover {
  color: #007bff;
}

/* Loading states for remote components */
.loading-skeleton {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
  color: #666;
  text-align: center;
  font-style: italic;
}

/* Loader styles */
.loader-frame{display:flex;flex:1;align-items:center;justify-content:center;height:100%}
.loader{width:48px;height:48px;border:3px dotted #FFF;border-style:solid solid dotted dotted;border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;animation:rotation 2s linear infinite}
.loader::after{content:'';box-sizing:border-box;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;border:3px dotted #FF3D00;border-style:solid solid dotted;width:24px;height:24px;border-radius:50%;animation:rotationBack 1s linear infinite;transform-origin:center}
@keyframes rotation{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes rotationBack{0%{transform:rotate(0)}100%{transform:rotate(-360deg)}}
</style>
