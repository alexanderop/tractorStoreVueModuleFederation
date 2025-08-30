<template>
  <div data-boundary-page="explore">
    <component :is="Header" />
    <main class="e_CategoryPage">
      <h2>{{ title }}</h2>
      <div class="e_CategoryPage__subline">
        <p>{{ products.length }} products</p>
        <Filter :filters="filters" />
      </div>
      <ul class="e_CategoryPage_list">
        <Product
          v-for="(product, i) in products"
          :key="i"
          v-bind="product"
        />
      </ul>
    </main>
    <component :is="Footer" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import data from './data/db.json'
import Product from './components/Product.vue'
import Filter from './components/Filter.vue'

interface Props {
  category?: string
}

const props = defineProps<Props>()

const Header = defineAsyncComponent(() => (window as any).getComponent?.('explore/Header')())
const Footer = defineAsyncComponent(() => (window as any).getComponent?.('explore/Footer')())

const cat = computed(() => 
  props.category && data.categories.find((c) => c.key === props.category)
)

const title = computed(() => 
  cat.value ? cat.value.name : 'All Machines'
)

const products = computed(() => {
  const allProducts = cat.value 
    ? cat.value.products 
    : data.categories.flatMap((c) => c.products)
  
  // sort products by price descending
  return allProducts.sort((a, b) => b.startPrice - a.startPrice)
})

const filters = computed(() => [
  { url: '/products', name: 'All', active: !cat.value },
  ...data.categories.map((c) => ({
    url: `/products/${c.key}`,
    name: c.name,
    active: c.key === props.category,
  })),
])

</script>

<style scoped>
.e_CategoryPage {
  max-width: calc(1000px + var(--outer-space, 3rem) * 2);
  padding: 0 var(--outer-space, 3rem);
  margin: 0 auto;
}

.e_CategoryPage_list {
  display: grid;
  grid-gap: 40px;
  padding: 0;
  list-style-type: none;
}

@media (max-width: 499px) {
  .e_CategoryPage_list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 500px) and (max-width: 999px) {
  .e_CategoryPage_list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1000px) {
  .e_CategoryPage_list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.e_CategoryPage__subline {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
}

.e_CategoryPage__subline * {
  margin: 0;
  line-height: 1.5;
}
</style>