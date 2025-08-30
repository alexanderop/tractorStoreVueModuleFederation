<script setup lang="ts">
import { computed, defineAsyncComponent, h } from 'vue'
import { useHistory } from './useHistory'

const path = useHistory()

// Enhanced fallback component
const createFallbackComponent = (name: string, remotePath: string) => ({
  setup() {
    return () => h('div', { 
      style: {
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        margin: '1rem 0',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, [
      h('h2', { style: { color: '#333', marginBottom: '1rem' } }, name),
      h('div', { style: { marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' } }, [
        h('strong', 'Remote: '),
        h('code', remotePath)
      ]),
      h('p', { style: { color: '#666', marginBottom: '1rem' } }, 'This page would load from a remote microfrontend.'),
      h('p', { style: { color: '#999', fontSize: '14px' } }, 'The remote service may be starting up or unavailable.')
    ])
  }
})

// Simple dynamic import approach for remote components
const ProductPage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading ProductPage via direct import from decide/ProductPage')
      // Direct import using Module Federation
      const module = await import('decide/ProductPage')
      console.log('Successfully imported decide/ProductPage:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import decide/ProductPage:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Product Page', 'decide/ProductPage'),
  timeout: 15000,
  delay: 200
})

const HomePage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading HomePage via direct import from explore/HomePage')
      const module = await import('explore/HomePage')
      console.log('Successfully imported explore/HomePage:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import explore/HomePage:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Home Page', 'explore/HomePage'),
  timeout: 15000,
  delay: 200
})

const StoresPage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading StoresPage via direct import from explore/StoresPage')
      const module = await import('explore/StoresPage')
      console.log('Successfully imported explore/StoresPage:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import explore/StoresPage:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Stores Page', 'explore/StoresPage'),
  timeout: 15000,
  delay: 200
})

const CategoryPage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading CategoryPage via direct import from explore/CategoryPage')
      const module = await import('explore/CategoryPage')
      console.log('Successfully imported explore/CategoryPage:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import explore/CategoryPage:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Category Page', 'explore/CategoryPage'),
  timeout: 15000,
  delay: 200
})

const CartPage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading CartPage via direct import from checkout/CartPage')
      const module = await import('checkout/CartPage')
      console.log('Successfully imported checkout/CartPage:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import checkout/CartPage:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Cart Page', 'checkout/CartPage'),
  timeout: 15000,
  delay: 200
})

const CheckoutPage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading CheckoutPage via direct import from checkout/Checkout')
      const module = await import('checkout/Checkout')
      console.log('Successfully imported checkout/Checkout:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import checkout/Checkout:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Checkout Page', 'checkout/Checkout'),
  timeout: 15000,
  delay: 200
})

const ThanksPage = defineAsyncComponent({
  loader: async () => {
    try {
      console.log('Loading ThanksPage via direct import from checkout/Thanks')
      const module = await import('checkout/Thanks')
      console.log('Successfully imported checkout/Thanks:', module)
      return module.default || module
    } catch (error) {
      console.error('Failed to import checkout/Thanks:', error)
      throw error
    }
  },
  errorComponent: createFallbackComponent('Thanks Page', 'checkout/Thanks'),
  timeout: 15000,
  delay: 200
})

const route = computed(() => {
  const p = path.value
  console.log('Current route:', p)
  
  if (p.startsWith('/product/')) {
    return { name: 'product', id: p.split('/')[2] }
  }
  if (p.startsWith('/products/')) {
    return { name: 'category', category: p.split('/')[2] }
  }
  return { name: p }
})
</script>

<template>
  <div class="route-content">
    <!-- Use actual remote component for product pages -->
    <component 
      v-if="route.name === 'product'"
      :is="ProductPage" 
      :id="route.id"
    />
    
    <!-- Use actual remote components -->
    <component 
      v-else-if="route.name === '/'"
      :is="HomePage"
    />
    
    <component 
      v-else-if="route.name === '/stores'"
      :is="StoresPage"
    />
    
    <component 
      v-else-if="route.name === '/products'"
      :is="CategoryPage"
    />
    
    <component 
      v-else-if="route.name === '/checkout/cart'"
      :is="CartPage"
    />
    
    <component 
      v-else-if="route.name === '/checkout/checkout'"
      :is="CheckoutPage"
    />
    
    <component 
      v-else-if="route.name === '/checkout/thanks'"
      :is="ThanksPage"
    />
    
    <component 
      v-else-if="route.name === 'category'"
      :is="CategoryPage"
      :category="route.category"
    />
    
    <div v-else>
      <h2>404 - Not Found</h2>
      <p>Route "{{ path }}" not found</p>
    </div>
  </div>
</template>

<style scoped>
.route-content {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin: 1rem 0;
}

.route-content h2 {
  color: #333;
  margin-bottom: 1rem;
}

.route-content p {
  color: #666;
  line-height: 1.5;
}
</style>
