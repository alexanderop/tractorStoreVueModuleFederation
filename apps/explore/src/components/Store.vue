<script setup lang="ts">
import { src, srcset } from '@tractor/shared'

interface Props {
  name: string
  image: string
  street: string
  city: string
}

defineProps<Props>()
</script>

<template>
  <li class="e_Store">
    <div class="e_Store_content">
      <img
        class="e_Store_image"
        :src="src(image, 200)"
        :srcset="srcset(image, [200, 400])"
        width="200"
        height="200"
      >
      <p class="e_Store_address">
        {{ name }}
        <br>
        {{ street }}
        <br>
        {{ city }}
      </p>
    </div>
  </li>
</template>

<style scoped>
.e_Store {
  margin: 0;
}

.e_Store_content {
  position: relative;
}

.e_Store_image {
  display: block;
  max-width: 200px;
  width: 100%;
  height: auto;
}

.e_Store_address {
  margin: 1rem 0;
}
</style>
