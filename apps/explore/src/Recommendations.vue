<script setup lang="ts">
import { computed } from 'vue'
import Recommendation from './components/Recommendation.vue'
import data from './data/db.json'

interface Props {
  skus: string[]
}

const props = defineProps<Props>()

const r = data.recommendations as Record<string, any>

function averageColor(colors: number[][]): number[] {
  const total = colors.reduce(
    (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
    [0, 0, 0],
  )
  return total.map(c => Math.round(c / colors.length))
}

function skusToColors(skus: string[]): number[][] {
  return skus.filter(sku => r[sku]).map(sku => r[sku].rgb)
}

function colorDistance(rgb1: number[], rgb2: number[]): number {
  const [r1, g1, b1] = rgb1
  const [r2, g2, b2] = rgb2
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

function recosForSkus(skus: string[], length = 4) {
  const targetRgb = averageColor(skusToColors(skus))
  const distances: Array<{ sku: string, distance: number }> = []

  for (const sku in r) {
    if (!skus.includes(sku)) {
      const distance = colorDistance(targetRgb, r[sku].rgb)
      distances.push({ sku, distance })
    }
  }

  distances.sort((a, b) => a.distance - b.distance)
  return distances.slice(0, length).map(d => r[d.sku])
}

const recommendations = computed(() => recosForSkus(props.skus))
</script>

<template>
  <div
    v-if="recommendations.length"
    class="e_Recommendations"
    data-boundary="explore"
  >
    <h2>Recommendations</h2>
    <ul class="e_Recommendations_list">
      <Recommendation
        v-for="(reco, i) in recommendations"
        :key="i"
        v-bind="reco"
      />
    </ul>
  </div>
</template>

<style>
.e_Recommendations {
  padding: 1rem;
  margin: 0 -1rem 3rem;
}

.e_Recommendations_list {
  position: relative;
  display: grid;
  gap: 40px;
  padding: 0;
  list-style-type: none;
}

@media (max-width: 499px) {
  .e_Recommendations_list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 500px) and (max-width: 999px) {
  .e_Recommendations_list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 1000px) {
  .e_Recommendations_list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
