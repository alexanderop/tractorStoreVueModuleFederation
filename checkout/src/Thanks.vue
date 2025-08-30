<template>
  <div data-boundary-page="checkout">
    <component :is="Header" v-if="Header" />
    <main class="c_Thanks">
      <h2 class="c_Thanks__title">Thanks for your order!</h2>
      <p class="c_Thanks__text">We'll notify you, when its ready for pickup.</p>
      <Button href="/" variant="secondary">
        Continue Shopping
      </Button>
    </main>
    <component :is="Footer" v-if="Footer" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import confetti from 'canvas-confetti'
import Button from './components/Button.vue'

// Get components from explore microfrontend
const Header = ref<any>(null)
const Footer = ref<any>(null)

onMounted(() => {
  Header.value = (window as any).getComponent?.('explore/Header')
  Footer.value = (window as any).getComponent?.('explore/Footer')
})

const confettiSettings = {
  particleCount: 3,
  scalar: 1.5,
  colors: ['#FFDE54', '#FF5A54', '#54FF90'],
  spread: 70,
}

const useConfetti = () => {
  onMounted(() => {
    const end = Date.now() + 1000

    const frame = () => {
      confetti({
        ...confettiSettings,
        angle: 60,
        origin: { x: 0 },
      })
      confetti({
        ...confettiSettings,
        angle: 120,
        origin: { x: 1 },
      })

      if (Date.now() < end) {
        window.requestAnimationFrame(frame)
      }
    }

    frame()
  })
}

// Trigger confetti animation
useConfetti()
</script>

<style scoped>
.c_Thanks {
  margin: 0 auto;
  max-width: calc(500px + var(--outer-space, 1rem) * 2);
  padding: 0 var(--outer-space, 1rem);
  min-height: 50vh;
}

.c_Thanks__title {
  margin: 4rem 0;
  font-size: 40px;
}

.c_Thanks__text {
  margin: 4rem 0;
}
</style>