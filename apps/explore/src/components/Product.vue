<template>
  <li class="e_Product">
    <BaseNavigationLink
      class="e_Product_link"
      :href="url"
    >
      <BaseImage
        :src="image"
        :src-sizes="[200, 400, 800]"
        sizes="300px"
        :width="200"
        :height="200"
        :alt="`${name} tractor`"
        class-name="e_Product_image"
      />
      <span class="e_Product_name">{{ name }}</span>
      <span class="e_Product_price">{{ fmtprice(startPrice) }}</span>
    </BaseNavigationLink>
  </li>
</template>

<script setup lang="ts">
import { BaseImage, BaseNavigationLink } from '@tractor/shared'

// Simple price formatter - replace with actual implementation if needed
const fmtprice = (price: number) => `$${price.toFixed(2)}`

interface Props {
  name: string
  url: string
  image: string
  startPrice: number
}

defineProps<Props>()
</script>

<style scoped>
.e_Product {
  margin: 0;
}

.e_Product_link {
  text-decoration: none;
  color: black;
}

.e_Product_image {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  display: block;
}

.e_Product_name {
  margin: 12px 0 8px;
  color: black;
  text-align: center;
  display: block;
}

.e_Product_price {
  margin: 8px 0;
  color: black;
  text-align: center;
  display: block;
}
</style>