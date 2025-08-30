<template>
  <div class="e_Filter">
    Filter:
    <ul>
      <li
        v-for="(filter, i) in filters"
        :key="i"
        :class="{ 'e_Filter__filter--active': filter.active }"
      >
        <template v-if="filter.active">
          {{ filter.name }}
        </template>
        <a v-else :href="filter.url">{{ filter.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Filter {
  url: string
  name: string
  active: boolean
}

interface Props {
  filters: Filter[]
}

defineProps<Props>()
</script>

<style scoped>
.e_Filter {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--outer-space, 3rem);
  gap: 1rem;
}

.e_Filter ul {
  display: flex;
  list-style: none;
  gap: 0.8rem;
  padding: 0;
  margin: 0;
}

.e_Filter li {
  position: relative;
}

.e_Filter a {
  color: inherit;
  text-decoration: none;
}

.e_Filter__filter--active::before,
.e_Filter a:hover::before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  bottom: -2px;
  position: absolute;
}

.e_Filter__filter--active::before {
  background-color: black;
}

.e_Filter a:hover::before {
  background-color: #ff5a55;
}
</style>