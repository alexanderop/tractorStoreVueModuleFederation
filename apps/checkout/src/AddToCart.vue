<script setup lang="ts">
import { BaseButton, BaseNavigationLink } from '@tractor/shared'
import { computed } from 'vue'
import data from './data/db.json'
import './bootstrap'

interface Props {
  sku: string
}

const props = defineProps<Props>()

function getVariant(variants: any[], sku: string) {
  return variants.find(p => p.sku === sku)
}

const variant = computed(() => getVariant(data.variants, props.sku))
const outOfStock = computed(() => variant.value?.inventory === 0)

function handleSubmit(event: Event) {
  event.preventDefault()

  console.log('🛒 AddToCart: Dispatching add-to-cart event for sku:', props.sku)

  window.dispatchEvent(
    new CustomEvent('add-to-cart', {
      detail: { sku: props.sku },
    }),
  )

  // Don't navigate immediately, let the user see the cart count update
  // window.dispatchEvent(new CustomEvent('mf:navigate', { detail: { to: '/checkout/cart' } }))
}
</script>

<template>
  <form
    action="/checkout/cart/add"
    method="POST"
    class="c_AddToCart"
    data-boundary="checkout"
    @submit="handleSubmit"
  >
    <input type="hidden" name="sku" :value="sku">
    <div class="c_AddToCart__information">
      <p>{{ variant?.price }} Ø</p>
      <p v-if="variant && variant.inventory > 0" class="c_AddToCart__stock c_AddToCart__stock--ok">
        {{ variant.inventory }} in stock, free shipping
      </p>
      <p v-else class="c_AddToCart__stock c_AddToCart__stock--empty">
        out of stock
      </p>
    </div>
    <BaseButton
      :disabled="outOfStock"
      class-name="c_AddToCart__button"
      variant="primary"
      type="submit"
    >
      add to basket
    </BaseButton>
    <div class="c_AddToCart__confirmed c_AddToCart__confirmed--hidden">
      <p>Tractor was added.</p>
      <BaseNavigationLink href="/checkout/cart" class-name="c_AddToCart__link">
        View in basket.
      </BaseNavigationLink>
    </div>
  </form>
</template>

<style>
.c_AddToCart {
  padding: 1rem;
  margin: 0 -1rem 1rem;
}

.c_AddToCart__information {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.c_AddToCart__stock {
  display: block;
}

.c_AddToCart__stock--ok {
  color: green;
}

.c_AddToCart__stock--empty {
  color: red;
}

.c_AddToCart__confirmed {
  display: flex;
  align-items: baseline;
  gap: 0.75ch;
}

.c_AddToCart__confirmed a {
  color: inherit;
}

.c_AddToCart__confirmed--hidden {
  visibility: hidden;
}
</style>
