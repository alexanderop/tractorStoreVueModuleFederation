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
              class="c_Checkout__input" 
              type="text" 
              id="c_firstname" 
              name="firstName" 
              required 
              v-model="formData.firstName" 
            />
          </div>
          <div>
            <label class="c_Checkout__label" for="c_lastname">
              Last name
            </label>
            <input 
              class="c_Checkout__input" 
              type="text" 
              id="c_lastname" 
              name="lastName" 
              required 
              v-model="formData.lastName" 
            />
          </div>
        </fieldset>

        <h3>Store Pickup</h3>
        <fieldset>
          <div class="c_Checkout__store">
            <component :is="StorePicker" v-if="StorePicker" />
          </div>
          <label class="c_Checkout__label" for="c_storeId">
            Store ID
          </label>
          <input 
            class="c_Checkout__input" 
            type="text" 
            id="c_storeId" 
            name="storeId" 
            :value="shop" 
            readonly 
            required 
          />
        </fieldset>

        <div class="c_Checkout__buttons">
          <Button 
            type="submit" 
            variant="primary" 
            :disabled="isInvalid"
          >
            place order
          </Button>
          <Button href="/checkout/cart" variant="secondary">
            back to cart
          </Button>
        </div>
      </form>
    </main>
    <component :is="Footer" v-if="Footer" />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onUnmounted, ref } from 'vue'
import CompactHeader from './components/CompactHeader.vue'
import Button from './components/Button.vue'

// Get components from explore microfrontend
const StorePicker = ref<any>(null)
const Footer = ref<any>(null)

const shop = ref('')

const formData = reactive({
  firstName: '',
  lastName: '',
})

const isInvalid = computed(() => !shop.value || !formData.firstName || !formData.lastName)

const handleShopChange = (event: Event) => {
  const customEvent = event as CustomEvent
  shop.value = customEvent.detail.shop
}

onMounted(async () => {
  // Load remote components
  try {
    if ((window as any).getComponent) {
      // window.getComponent returns a function that returns a promise
      const storePickerLoader = (window as any).getComponent('explore/StorePicker')
      const footerLoader = (window as any).getComponent('explore/Footer')
      
      // Call the loader functions and await the promises
      StorePicker.value = await storePickerLoader()
      Footer.value = await footerLoader()
    }
  } catch (error) {
    console.warn('Failed to load remote components for Checkout:', error)
  }
  
  // Set up event listener
  window.addEventListener('selected-shop', handleShopChange)
})

onUnmounted(() => {
  window.removeEventListener('selected-shop', handleShopChange)
})

const handleSubmit = (event: Event) => {
  window.dispatchEvent(new CustomEvent('clear-cart'))
  window.history.pushState({}, '', '/checkout/thanks')
  event.preventDefault()
}
</script>

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