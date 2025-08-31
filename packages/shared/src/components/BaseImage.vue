<template>
  <img
    :src="computedSrc"
    :srcset="computedSrcset"
    :sizes="sizes"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :decoding="decoding"
    :class="imageClasses"
    :style="imageStyles"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedBy"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { src, srcset } from '../utils/utils'

interface Props {
  src: string
  alt: string
  srcSizes?: number[]
  sizes?: string
  width?: number | string
  height?: number | string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  className?: string
  ariaLabel?: string
  ariaDescribedBy?: string
  fallbackSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  decoding: 'async',
  objectFit: 'cover'
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const imageError = ref(false)

const computedSrc = computed(() => {
  if (imageError.value && props.fallbackSrc) {
    return props.fallbackSrc
  }
  
  if (props.srcSizes && props.srcSizes.length > 0) {
    return src(props.src, props.srcSizes[0])
  }
  
  return props.src
})

const computedSrcset = computed(() => {
  if (imageError.value && props.fallbackSrc) {
    return undefined
  }
  
  if (props.srcSizes && props.srcSizes.length > 0) {
    return srcset(props.src, props.srcSizes)
  }
  
  return undefined
})

const imageClasses = computed(() => {
  const classes = ['c_BaseImage']
  
  if (props.className) {
    classes.push(props.className)
  }
  
  return classes.join(' ')
})

const imageStyles = computed(() => {
  if (props.objectFit) {
    return { objectFit: props.objectFit }
  }
  
  return undefined
})

function onLoad(event: Event) {
  imageError.value = false
  emit('load', event)
}

function onError(event: Event) {
  imageError.value = true
  emit('error', event)
}
</script>

<style scoped>
.c_BaseImage {
  max-width: 100%;
  height: auto;
}
</style>