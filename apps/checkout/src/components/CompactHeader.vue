<script setup lang="ts">
// No reactive logic needed for this component
</script>

<template>
  <header class="c_CompactHeader">
    <div class="c_CompactHeader__inner">
      <a
        class="c_CompactHeader__link"
        href="/"
      >
        <img
          class="c_CompactHeader__logo"
          src="https://blueprint.the-tractor.store/cdn/img/logo.svg"
          alt="Micro Frontends - Tractor Store"
        >
      </a>
    </div>
  </header>
</template>

<style scoped>
.c_CompactHeader {
  height: 80px;
  display: flex;
  margin: 1rem 0 2rem;
  border-bottom: 1px solid #eeebe2;
  align-items: center;
}

.c_CompactHeader__inner {
  display: flex;
  max-width: calc(1000px + (2 * var(--outer-space, 1rem)));
  padding: 0 var(--outer-space, 1rem);
  margin: 0 auto;
  align-items: center;
  flex: 1;
}

.c_CompactHeader__logo {
  display: block;
  width: 175px;
  aspect-ratio: 3.5;
}
</style>
