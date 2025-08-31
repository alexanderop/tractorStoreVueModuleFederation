<template>
  <div class="e_StorePicker">
    <div
      class="e_StorePicker_control"
      data-boundary="explore"
    >
      <div
        class="e_StorePicker_selected"
        v-html="currentStore"
      />
      <BaseButton
        class-name="e_StorePicker_choose"
        type="button"
        @click="openDialog"
      >
        choose a store
      </BaseButton>
    </div>
    <dialog
      ref="dialogRef"
      class="e_StorePicker_dialog"
      data-boundary="explore"
    >
      <div class="e_StorePicker_wrapper">
        <h2>Stores</h2>
        <ul class="e_StorePicker_list">
          <li
            v-for="(store, i) in stores"
            :key="i"
            class="e_StorePicker_entry"
          >
            <div class="e_StorePicker_content">
              <img
                class="e_StorePicker_image"
                :src="src(store.image, 200)"
                :srcset="srcset(store.image, [200, 400])"
                width="200"
                height="200"
              >
              <p class="e_StorePicker_address">
                {{ store.name }}
                <br>
                {{ store.street }}
                <br>
                {{ store.city }}
              </p>
            </div>
            <BaseButton
              class-name="e_StorePicker_select"
              type="button"
              :data-id="store.id"
              @click="selectShop($event, store)"
            >
              select
            </BaseButton>
          </li>
        </ul>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import data from './data/db.json'
import { BaseButton, src, srcset } from '@tractor/shared'

const currentStore = ref('')
const dialogRef = ref<HTMLDialogElement>()

const stores = data.stores

const openDialog = () => {
  dialogRef.value?.showModal()
}

const selectShop = (event: Event, store: any) => {
  const target = event.target as HTMLElement
  const nameElement = target.closest('.e_StorePicker_entry')?.querySelector('.e_StorePicker_address')
  
  if (nameElement) {
    currentStore.value = nameElement.innerHTML
  }
  
  window.dispatchEvent(
    new CustomEvent('selected-shop', {
      detail: { shop: store.id },
    })
  )
  
  dialogRef.value?.close()
}
</script>

<style scoped>
.e_StorePicker_control {
  padding: 2rem;
  margin: 0 0 0 -1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 500px;
}

.e_StorePicker_dialog::backdrop {
  backdrop-filter: blur(2px);
}

.e_StorePicker_dialog {
  border: none;
  padding: 1rem 2rem;
  max-height: 90vh;
  border-radius: 1rem;
  overflow: visible;
}

.e_StorePicker_wrapper {
  display: block;
  max-height: calc(90vh - 2rem);
  max-width: 100%;
  padding: 0 5px;
  overflow: auto;
}

.e_StorePicker_list {
  display: grid;
  list-style-type: none;
  padding: 0;
}

@media (max-width: 499px) {
  .e_StorePicker_list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (min-width: 500px) and (max-width: 999px) {
  .e_StorePicker_list {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1000px) {
  .e_StorePicker_list {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
}

.e_StorePicker_content {
  position: relative;
}

.e_StorePicker_image {
  display: block;
  max-width: 200px;
  width: 100%;
  height: auto;
}

.e_StorePicker_address {
  margin: 1rem 0;
}

.e_StorePicker_selected {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.e_StorePicker_selected:empty {
  display: none;
}
</style>