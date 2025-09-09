<script setup lang="ts">
import { BaseNavigationLink, loadRemoteComponent } from '@tractor/shared'
import { defineAsyncComponent } from 'vue'
import Navigation from './components/Navigation.vue'

const MiniCart = defineAsyncComponent(loadRemoteComponent('checkout/MiniCart'))
</script>

<template>
  <header
    class="e_Header"
    data-boundary="explore"
  >
    <div class="e_Header__cutter">
      <div class="e_Header__inner">
        <BaseNavigationLink
          class="e_Header__link"
          href="/"
        >
          <img
            class="e_Header__logo"
            src="https://blueprint.the-tractor.store/cdn/img/logo.svg"
            alt="Micro Frontends - Tractor Store"
          >
        </BaseNavigationLink>
        <div class="e_Header__navigation">
          <Navigation />
        </div>
        <div class="e_Header__cart">
          <component :is="MiniCart" />
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.e_Header {
  max-width: calc(1000px + var(--outer-space, 3rem) * 2);
  margin: 1rem auto 0;
  align-items: center;
}

.e_Header__cutter {
  overflow: hidden;
  padding: 0 0 30px;
}

@media (min-width: 1100px) {
  .e_Header__cutter {
    margin: 0 calc(var(--outer-space, 3rem) * -1);
  }
}

.e_Header__inner {
  min-height: 135px;
  box-shadow: 0 0 20px 10px #eb5b5920;
  border-bottom: 1px solid #eeebe2;
  mix-blend-mode: darken;
  flex: 1;
}

@media (max-width: 999px) {
  .e_Header__inner {
    display: grid;
    grid-template:
      "logo mini-cart"
      "navigation navigation";
  }
}

@media (min-width: 1000px) {
  .e_Header__inner {
    padding: 0 var(--outer-space, 3rem);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

@media (min-width: 1000px) and (max-width: 1099px) {
  .e_Header__inner {
    padding: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.e_Header__inner::before,
.e_Header__inner::after {
  position: absolute;
  top: 0;
  width: 48px;
  height: calc(100% + 30px);
}

@media (min-width: 1000px) {
  .e_Header__inner::before,
  .e_Header__inner::after {
    content: "";
    display: block;
  }
}

@media (max-width: 1099px) {
  .e_Header__inner::before,
  .e_Header__inner::after {
    width: var(--outer-space, 3rem);
  }
}

@media (min-width: 1100px) {
  .e_Header__inner::before,
  .e_Header__inner::after {
    width: calc(var(--outer-space, 3rem) * 2);
  }
}

.e_Header__inner::before {
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

@media (min-width: 1100px) {
  .e_Header__inner::before {
    left: calc(var(--outer-space, 3rem) * -1);
  }
}

.e_Header__inner::after {
  right: 0;
  background: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

@media (min-width: 1100px) {
  .e_Header__inner::after {
    right: calc(var(--outer-space, 3rem) * -1);
  }
}

.e_Header__logo {
  aspect-ratio: 3.5;
  display: block;
}

@media (max-width: 499px) {
  .e_Header__logo {
    width: 170px;
  }
}

@media (min-width: 500px) {
  .e_Header__logo {
    width: 270px;
  }
}

.e_Header__link {
  grid-area: logo;
  display: flex;
  margin-left: var(--outer-space, 3rem);
  align-items: center;
}

.e_Header__cart {
  grid-area: mini-cart;
  display: flex;
  justify-content: flex-end;
}

.e_Header__navigation {
  grid-area: navigation;
}

@media (max-width: 999px) {
  .e_Header__navigation {
    margin-bottom: 1rem;
  }
}
</style>
