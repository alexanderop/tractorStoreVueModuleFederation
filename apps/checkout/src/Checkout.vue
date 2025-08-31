<script setup lang="ts">
import { BaseButton } from '@tractor/shared'
import { computed, defineAsyncComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import CompactHeader from './components/CompactHeader.vue'
import './bootstrap'

// Get components from explore microfrontend
const StorePicker = defineAsyncComponent(() => (window as any).getComponent?.('explore/StorePicker')())

const shop = ref('')

const formData = reactive({
  firstName: '',
  lastName: '',
})

const isInvalid = computed(() => !shop.value || !formData.firstName || !formData.lastName)

function handleShopChange(event: Event) {
  const customEvent = event as CustomEvent
  shop.value = customEvent.detail.shop
}

onMounted(() => {
  // Set up event listener
  window.addEventListener('selected-shop', handleShopChange)
})

onUnmounted(() => {
  window.removeEventListener('selected-shop', handleShopChange)
})

function handleSubmit(event: Event) {
  window.dispatchEvent(new CustomEvent('clear-cart'))
  window.dispatchEvent(new CustomEvent('mf:navigate', { detail: { to: '/checkout/thanks' } }))
  event.preventDefault()
}
</script>

<template>
  <div data-boundary-page="checkout">
    <CompactHeader />
    <main class="c_Checkout">
      <h2>Checkout</h2>
      <form
        action="/checkout/place-order"
        method="post"
        class="c_Checkout__form"
        @submit="handleSubmit"
      >
        <h3>Personal Data</h3>
        <fieldset class="c_Checkout__name">
          <div>
            <label class="c_Checkout__label" for="c_firstname">
              First name
            </label>
            <input
              id="c_firstname"
              v-model="formData.firstName"
              class="c_Checkout__input"
              type="text"
              name="firstName"
              required
            >
          </div>
          <div>
            <label class="c_Checkout__label" for="c_lastname">
              Last name
            </label>
            <input
              id="c_lastname"
              v-model="formData.lastName"
              class="c_Checkout__input"
              type="text"
              name="lastName"
              required
            >
          </div>
        </fieldset>

        <h3>Store Pickup</h3>
        <fieldset>
          <div class="c_Checkout__store">
            <component :is="StorePicker" />
          </div>
          <label class="c_Checkout__label" for="c_storeId">
            Store ID
          </label>
          <input
            id="c_storeId"
            class="c_Checkout__input"
            type="text"
            name="storeId"
            :value="shop"
            readonly
            required
          >
        </fieldset>

        <div class="c_Checkout__buttons">
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="isInvalid"
          >
            place order
          </BaseButton>
          <BaseButton href="/checkout/cart" variant="secondary">
            back to cart
          </BaseButton>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.c_Checkout {
  margin: 0 auto;
  max-width: calc(1000px + var(--outer-space, 1rem) * 2);
  padding: 0 var(--outer-space, 1rem);
}

.c_Checkout fieldset {
  border: 0;
  border-bottom: 2px solid black;
  padding: 0 0 2rem;
  margin: 0;
}

.c_Checkout__name {
  display: flex;
  gap: 0 4rem;
  flex-wrap: wrap;
}

.c_Checkout__buttons {
  margin: 3rem 0 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  flex-direction: row-reverse;
}

.c_Checkout__buttons > :deep(*) {
  flex: 0;
}

.c_Checkout__label {
  width: 100px;
  display: inline-block;
}

.c_Checkout__input {
  height: 40px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) inset;
}

.c_Checkout__input:read-only {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
