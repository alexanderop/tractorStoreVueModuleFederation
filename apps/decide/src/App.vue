<script setup lang="ts">
import ProductPage from './ProductPage.vue'

// read product id from search params
function readId(): string {
  const url = new URL(location.href)
  return url.searchParams.get('id') ?? 'AU-02'
}
const id = readId()
</script>

<template>
  <ProductPage :id="id" />
</template>

<style scoped>
/* optional local preview styles */
</style>
