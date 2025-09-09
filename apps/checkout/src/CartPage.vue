<script setup lang="ts">
import { BaseButton, loadRemoteComponent } from '@tractor/shared'
import { computed, defineAsyncComponent } from 'vue'
import LineItem from './components/LineItem.vue'
import data from './data/db.json'
import { useCart } from './stores/cartStore'
import './bootstrap'

interface LineItemData {
  sku: string
  id: string
  name: string
  quantity: number
  total: number
  image: string
  price: number
}

// Get components from explore microfrontend
const Recommendations = defineAsyncComponent(loadRemoteComponent('explore/Recommendations'))

const { items: cartItems } = useCart()

function convertToLineItems(items: Array<{ sku: string, quantity: number }>): LineItemData[] {
  return items.reduce((res: LineItemData[], { sku, quantity }) => {
    const variant = data.variants.find(p => p.sku === sku)
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity })
    }
    return res
  }, [])
}

const lineItems = computed(() => convertToLineItems(cartItems.value))
const total = computed(() => lineItems.value.reduce((res, { total }) => res + total, 0))
const skus = computed(() => lineItems.value.map(({ sku }) => sku))
</script>

<template>
  <div data-boundary-page="checkout">
    <main class="c_CartPage">
      <h2>Basket</h2>
      <ul class="c_CartPage__lineItems">
        <LineItem
          v-for="(li, i) in lineItems"
          :key="i"
          v-bind="li"
        />
      </ul>
      <hr>
      <p class="c_CartPage__total">
        Total: {{ total }} Ø
      </p>
      <div class="c_CartPage__buttons">
        <BaseButton href="/checkout/checkout" variant="primary">
          Checkout
        </BaseButton>
        <BaseButton href="/" variant="secondary">
          Continue Shopping
        </BaseButton>
      </div>
      <Suspense>
        <template #default>
          <component :is="Recommendations" :skus="skus" />
        </template>
        <template #fallback>
          <div class="loading-skeleton">
            Loading recommendations...
          </div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<style>
.c_CartPage {
  margin: 0 auto;
  max-width: calc(1000px + var(--outer-space, 1rem) * 2);
  padding: 0 var(--outer-space, 1rem);
}

.c_CartPage__lineItems {
  list-style: none;
  padding: 0;
}

.c_CartPage hr {
  border: 0;
  height: 2px;
  background-color: black;
}

.c_CartPage__total {
  margin: 2rem 0 3rem;
  text-align: right;
  font-weight: bold;
}

.c_CartPage__buttons {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 4rem;
  gap: 2rem;
}

.c_CartPage__buttons > :deep(*) {
  flex: 0;
}
</style>
