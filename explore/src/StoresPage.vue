<template>
  <div data-boundary-page="explore">
    <component :is="Header" v-if="Header" />
    <main class="e_StoresPage">
      <h2>Our Stores</h2>
      <p>
        Want to see our products in person? Visit one of our stores to see our products up close and talk to our
        experts. We have stores in the following locations:
      </p>
      <ul class="e_StoresPage_list">
        <Store
          v-for="(store, i) in stores"
          :key="i"
          v-bind="store"
        />
      </ul>
    </main>
    <component :is="Footer" v-if="Footer" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import data from './data/db.json'
import Store from './components/Store.vue'

const Header = ref<Component | null>(null)
const Footer = ref<Component | null>(null)

const stores = data.stores

onMounted(() => {
  // Try to get the components from window
  if ((window as any).getComponent) {
    try {
      Header.value = (window as any).getComponent('explore/Header')
      Footer.value = (window as any).getComponent('explore/Footer')
    } catch (error) {
      console.warn('Components not available via window.getComponent:', error)
      // Fallback to local components
      import('./Header.vue').then(module => Header.value = module.default)
      import('./Footer.vue').then(module => Footer.value = module.default)
    }
  } else {
    // Fallback to local components
    import('./Header.vue').then(module => Header.value = module.default)
    import('./Footer.vue').then(module => Footer.value = module.default)
  }
})
</script>

<style scoped>
.e_StoresPage {
  max-width: calc(1000px + var(--outer-space, 3rem) * 2);
  padding: 0 var(--outer-space, 3rem);
  margin: 0 auto;
}

.e_StoresPage_list {
  list-style: none;
  padding: 0;
  margin: 5em 0 4em;
  display: flex;
  justify-content: space-between;
  gap: 2em;
  flex-wrap: wrap;
}

.e_StoresPage p {
  max-width: 80ch;
}
</style>