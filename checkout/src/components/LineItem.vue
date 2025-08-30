<template>
  <li class="c_LineItem">
    <a :href="url" class="c_LineItem__image">
      <img
        :src="imageSrc"
        :srcset="imageSrcset"
        sizes="200px"
        :alt="name"
        width="200"
        height="200"
      />
    </a>
    <div class="c_LineItem__details">
      <a :href="url" class="c_LineItem__name">
        <strong>{{ name }}</strong>
        <br />
        {{ sku }}
      </a>

      <div class="c_LineItem__quantity">
        <span>{{ quantity }}</span>

        <form action="/checkout/cart/remove" method="post" @submit="handleSubmit">
          <input type="hidden" name="sku" :value="sku" />
          <Button
            variant="secondary"
            :rounded="true"
            type="submit"
            value="remove"
            size="small"
            :title="`Remove ${name} from cart`"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" width="20" viewBox="0 0 48 48">
              <path
                fill="#000"
                d="m40 5.172-16 16-16-16L5.171 8l16.001 16L5.171 40 8 42.828l16-16 16 16L42.828 40l-16-16 16-16L40 5.172Z"
              />
            </svg>
          </Button>
        </form>
      </div>
      <div class="c_LineItem__price">{{ total }} Ø</div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from './Button.vue'
import { src, srcset } from '../utils/utils'

interface Props {
  sku: string
  id: string
  name: string
  quantity: number
  total: number
  image: string
}

const props = defineProps<Props>()

const url = computed(() => `/product/${props.id}?sku=${props.sku}`)
const imageSrc = computed(() => src(props.image, 200))
const imageSrcset = computed(() => srcset(props.image, [200, 400]))

const handleSubmit = (event: Event) => {
  window.dispatchEvent(
    new CustomEvent('remove-from-cart', {
      detail: { sku: props.sku },
    }),
  )
  event.preventDefault()
}
</script>

<style scoped>
.c_LineItem {
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.c_LineItem__image {
  flex-basis: 150px;
  padding-right: 2rem;
}

.c_LineItem__image img {
  display: block;
  aspect-ratio: 1 / 1;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.c_LineItem__details {
  flex-grow: 1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}

.c_LineItem__name {
  padding-right: 2rem;
  flex-grow: 1;
  color: inherit;
  text-decoration: none;
  min-width: 300px;
}

.c_LineItem__quantity {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.c_LineItem__price {
  flex-basis: 100px;
  text-align: end;
}

.c_LineItem__removeIcon {
  width: 33px;
}
</style>