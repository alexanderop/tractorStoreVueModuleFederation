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
    
    <!-- Fallbacks for other routes -->
    <div v-else-if="route.name === '/'">
      <h2>Home Page</h2>
      <p>This is the home page fallback. Remote: explore/HomePage</p>
    </div>
    
    <div v-else-if="route.name === '/stores'">
      <h2>Stores Page</h2>
      <p>This is the stores page fallback. Remote: explore/StoresPage</p>
    </div>
    
    <div v-else-if="route.name === '/products'">
      <h2>Products/Category Page</h2>
      <p>This is the products page fallback. Remote: explore/CategoryPage</p>
    </div>
    
    <div v-else-if="route.name === '/checkout/cart'">
      <h2>Cart Page</h2>
      <p>This is the cart page fallback. Remote: checkout/CartPage</p>
    </div>
    
    <div v-else-if="route.name === '/checkout/checkout'">
      <h2>Checkout Page</h2>
      <p>This is the checkout page fallback. Remote: checkout/Checkout</p>
    </div>
    
    <div v-else-if="route.name === '/checkout/thanks'">
      <h2>Thanks Page</h2>
      <p>This is the thanks page fallback. Remote: checkout/Thanks</p>
    </div>
    
    <div v-else-if="route.name === 'category'">
      <h2>Category Page</h2>
      <p>Category: {{ route.category }}</p>
      <p>This is the category page fallback. Remote: explore/CategoryPage</p>
    </div>
    
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
