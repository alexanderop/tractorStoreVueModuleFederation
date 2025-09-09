<script setup lang="ts">
import { BaseImage, loadRemoteComponent, useNavigation } from '@tractor/shared'
import { computed, defineAsyncComponent, ref } from 'vue'
import VariantOption from './components/VariantOption.vue'
import raw from './data/db.json'

interface Variant {
  name: string
  image: string
  sku: string
  color: string
  price: number
}

interface Product {
  name: string
  id: string
  category: string
  highlights?: string[]
  variants: Variant[]
  [k: string]: unknown
}

const props = defineProps<{ id: string }>()

const Recommendations = defineAsyncComponent(loadRemoteComponent('explore/Recommendations'))
const AddToCart = defineAsyncComponent(loadRemoteComponent('checkout/AddToCart'))

const products = (raw as { products: Product[] }).products
const { updateSearchParams } = useNavigation()

function readSkuFromUrl(): string | null {
  return new URL(location.href).searchParams.get('sku')
}
const sku = ref<string | null>(readSkuFromUrl())

function setSku(val: string) {
  updateSearchParams({ sku: val })
  sku.value = val
}

const product = computed<Product | undefined>(() =>
  products.find(p => p.id === props.id),
)

const name = computed(() => product.value?.name ?? '')
const variants = computed<Variant[]>(() => product.value?.variants ?? [])
const variant = computed<Variant | undefined>(() => {
  const list = variants.value
  if (!list.length)
    return undefined
  const v = list.find(x => x.sku === sku.value)
  return v ?? list[0]
})
const highlights = computed<string[]>(
  () => (product.value?.highlights ?? []) as string[],
)
</script>

<template>
  <div data-boundary-page="decide">
    <main class="d_ProductPage">
      <div v-if="!product">
        <h2>Product not found (id: {{ id }})</h2>
        <p>Available products: AU-01, AU-02, AU-03</p>
      </div>
      <div v-else class="d_ProductPage__details">
        <BaseImage
          v-if="variant"
          :src="variant.image"
          :src-sizes="[400, 800]"
          sizes="400px"
          :width="400"
          :height="400"
          :alt="`${name} - ${variant.name}`"
          class-name="d_ProductPage__productImage"
        />
        <div v-else>
          Variant not found
        </div>
        <div class="d_ProductPage__productInformation">
          <h2 class="d_ProductPage__title">
            {{ name }}
          </h2>
          <ul class="d_ProductPage__highlights">
            <li v-for="(highlight, i) in highlights" :key="i">
              {{ highlight }}
            </li>
          </ul>

          <ul class="d_ProductPage__variants">
            <VariantOption
              v-for="(v, i) in variants"
              :key="i"
              v-bind="v"
              :selected="!!(variant && v.sku === variant.sku)"
              @select="setSku"
            />
          </ul>

          <Suspense>
            <template #default>
              <AddToCart v-if="variant" :sku="variant.sku" />
            </template>
            <template #fallback>
              <div class="loading-skeleton">
                Loading cart...
              </div>
            </template>
          </Suspense>
        </div>
      </div>

      <Suspense>
        <template #default>
          <Recommendations v-if="variant" :skus="[variant.sku]" />
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
.d_ProductPage {
  margin: 0 auto;
  max-width: calc(1000px + var(--outer-space) * 2);
  padding: 0 var(--outer-space);
}

.d_ProductPage__details {
  display: grid;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

@media (max-width: 499px) {
  .d_ProductPage__details {
    grid-template:
      "image"
      "information";
  }
}

@media (min-width: 500px) and (max-width: 999px) {
  .d_ProductPage__details {
    grid-template:
      ". image. "
      ". information ." / 1fr 3fr 1fr;
  }
}

@media (min-width: 1000px) {
  .d_ProductPage__details {
    grid-template: "image information" 1fr / 4fr 5fr;
    gap: 10%;
    min-height: clamp(400px, calc(70vh - 400px), 650px);
  }
}

.d_ProductPage__productImage {
  grid-area: image;
  width: 100%;
  height: auto;
}

.d_ProductPage__productInformation {
  grid-area: information;
}

.d_ProductPage__title {
  margin: 0;
  font-size: 40px;
}

.d_ProductPage__highlights {
  padding: 0;
  list-style: none;
}

.d_ProductPage__highlights > li {
  margin-bottom: 1rem;
}

.d_ProductPage__variants {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style: none;
  margin-top: 3rem;
  padding: 0;
}
</style>
