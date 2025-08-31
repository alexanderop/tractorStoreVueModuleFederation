<script setup lang="ts">
</script>

<template>
  <footer
    class="e_Footer"
    data-boundary="explore"
  >
    <div class="e_Footer__cutter">
      <div class="e_Footer__inner">
        <div class="e_Footer__initiative">
          <img
            src="https://blueprint.the-tractor.store/cdn/img/neulandlogo.svg"
            alt="neuland - Büro für Informatik"
            width="45"
            height="40"
          >
          <p>
            based on{' '}
            <a
              href="https://micro-frontends.org/tractor-store/"
              target="_blank"
            >
              the tractor store 2.0
            </a>
            <br>a{' '}
            <a
              href="https://neuland-bfi.de"
              target="_blank"
            >
              neuland
            </a>{' '}
            project
          </p>
        </div>

        <div class="e_Footer__credits">
          <h3>techstack</h3>
          <p>SPA, Module Federation, Vue</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.e_Footer {
  max-width: calc(1000px + var(--outer-space, 3rem) * 2);
  margin: 1rem auto 2rem;
  align-items: center;
}

.e_Footer__cutter {
  overflow: hidden;
  padding: 30px 0 0;
}

@media (min-width: 1100px) {
  .e_Footer__cutter {
    margin: 0 calc(var(--outer-space, 3rem) * -1);
  }
}

.e_Footer__inner {
  min-height: 135px;
  box-shadow: 0 10px 20px 10px #eb5b5920;
  border-top: 1px solid #eeebe2;
  mix-blend-mode: darken;
}

@media (max-width: 999px) {
  .e_Footer__inner {
    padding: 3rem var(--outer-space, 3rem);
  }
}

@media (min-width: 1000px) {
  .e_Footer__inner {
    display: flex;
    padding: 3rem calc(2 * var(--outer-space, 3rem));
  }
}

@media (min-width: 1000px) and (max-width: 1099px) {
  .e_Footer__inner {
    padding: 3rem var(--outer-space, 3rem);
    display: flex;
  }
}

.e_Footer__inner::before,
.e_Footer__inner::after {
  position: absolute;
  top: 0;
  width: 48px;
  height: calc(100% + 30px);
}

@media (min-width: 1000px) {
  .e_Footer__inner::before,
  .e_Footer__inner::after {
    content: "";
    display: block;
  }
}

@media (max-width: 1099px) {
  .e_Footer__inner::before,
  .e_Footer__inner::after {
    width: var(--outer-space, 3rem);
  }
}

@media (min-width: 1100px) {
  .e_Footer__inner::before,
  .e_Footer__inner::after {
    width: calc(var(--outer-space, 3rem) * 2);
  }
}

.e_Footer__inner::before {
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

@media (min-width: 1100px) {
  .e_Footer__inner::before {
    left: calc(var(--outer-space, 3rem) * -1);
  }
}

.e_Footer__inner::after {
  right: 0;
  background: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

@media (min-width: 1100px) {
  .e_Footer__inner::after {
    right: calc(var(--outer-space, 3rem) * -1);
  }
}

.e_Footer a {
  color: #ff5a55;
}

.e_Footer__initiative {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1;
  margin-bottom: 2rem;
}

.e_Footer__initiative,
.e_Footer__credits {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
}

.e_Footer__initiative img {
  margin-top: 4px;
  width: 45px;
}

.e_Footer__initiative p {
  margin: 0;
}

.e_Footer__credits h3 {
  margin: 0;
  font-size: 1em;
  font-weight: normal;
  color: #ff5a55;
}

.e_Footer__credits p {
  margin: 0 0 1rem;
}

.e_Footer__credits img {
  display: inline-block;
  width: 15px;
}
</style>
