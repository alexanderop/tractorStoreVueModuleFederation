<script setup lang="ts">
import Store from './components/Store.vue'
import data from './data/db.json'

const stores = data.stores
</script>

<template>
  <div data-boundary-page="explore">
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
  </div>
</template>

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
