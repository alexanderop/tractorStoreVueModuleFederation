<script setup lang="ts">
import { src, srcset } from '@tractor/shared'
import { defineAsyncComponent } from 'vue'
import data from './data/db.json'

const Recommendations = defineAsyncComponent(() => (window as any).getComponent?.('explore/Recommendations')())

const teaser = data.teaser
const skus = ['CL-01-GY', 'AU-07-MT']
</script>

<template>
  <div data-boundary-page="explore">
    <main class="e_HomePage">
      <a
        v-for="({ title, image, url }, i) in teaser"
        :key="i"
        class="e_HomePage__categoryLink"
        :href="url"
      >
        <img
          :src="src(image, 500)"
          :srcset="srcset(image, [500, 1000])"
          sizes="100vw, (min-width: 500px) 50vw"
          alt=""
        >
        {{ title }}
      </a>
      <div class="e_HomePage__recommendations">
        <component
          :is="Recommendations"
          :skus="skus"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.e_HomePage {
  max-width: calc(1000px + var(--outer-space, 3rem) * 2);
  padding: 0 var(--outer-space, 3rem);
  margin: 3rem auto 0;
}

@media (min-width: 500px) {
  .e_HomePage {
    grid-template-columns: 1fr 1fr;
    display: grid;
    gap: 1rem;
  }
}

.e_HomePage__categoryLink {
  display: block;
  position: relative;
  margin-bottom: 2rem;
  color: inherit;
  text-align: center;
  text-decoration: none;
}

.e_HomePage__categoryLink:hover,
.e_HomePage__categoryLink:focus {
  text-decoration: underline;
}

.e_HomePage__categoryLink img {
  width: 100%;
  aspect-ratio: 1000 / 560;
  margin-bottom: 0.75rem;
}

.e_HomePage__recommendations {
  grid-column: span 2;
}
</style>
