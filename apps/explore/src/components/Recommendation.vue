<template>
  <li class="e_Recommendation">
    <BaseNavigationLink
      class="e_Recommendation_link"
      :href="url"
    >
      <img
        class="e_Recommendation_image"
        :src="src(image, 200)"
        :srcset="srcset(image, [200, 400])"
        alt=""
        sizes="200px"
        width="200"
        height="200"
      >
      <span class="e_Recommendation_name">{{ name }}</span>
    </BaseNavigationLink>
  </li>
</template>

<script setup lang="ts">
import { src, srcset } from '@tractor/shared'
import { BaseNavigationLink } from '@tractor/shared'

interface Props {
  image: string
  url: string
  name: string
}

defineProps<Props>()
</script>

<style scoped>
.e_Recommendation {
  margin: 0;
}

@media (min-width: 500px) and (max-width: 999px) {
  .e_Recommendation:nth-child(4) {
    display: none;
  }
}

.e_Recommendation_link {
  text-decoration: none;
  color: black;
}

.e_Recommendation_image {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  display: block;
}

.e_Recommendation_name {
  margin: 1rem 0;
  color: black;
  text-align: center;
  display: block;
}
</style>