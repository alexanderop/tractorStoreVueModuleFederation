<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

declare global {
  interface Window {
    getComponent: (id: string) => () => Promise<any>
  }
}

const Header = defineAsyncComponent(() => window.getComponent('explore/Header')())
const Footer = defineAsyncComponent(() => window.getComponent('explore/Footer')())
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <component :is="Header" />
      </template>
      <template #fallback>
        <div class="header-loading">
          Loading header...
        </div>
      </template>
    </Suspense>

    <main>
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="loader-frame">
            <span class="loader" />
          </div>
        </template>
      </Suspense>
    </main>

    <Suspense>
      <template #default>
        <component :is="Footer" />
      </template>
      <template #fallback>
        <div class="footer-loading">
          Loading footer...
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.header-loading,
.footer-loading {
  padding: 1rem;
  text-align: center;
  color: #666;
}

.loader-frame {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loader {
  width: 48px;
  height: 48px;
  border: 3px dotted #FFF;
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px dotted #FF3D00;
  border-style: solid solid dotted;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  animation: rotationBack 1s linear infinite;
  transform-origin: center;
}

@keyframes rotation {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}

@keyframes rotationBack {
  0% { transform: rotate(0); }
  100% { transform: rotate(-360deg); }
}
</style>
