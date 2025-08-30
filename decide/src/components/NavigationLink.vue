<template>
  <a
    :href="href"
    :title="title"
    :target="target"
    :rel="rel"
    :class="className"
    :data-id="dataId"
    @click="onClick"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string
  title?: string
  target?: string
  rel?: string
  className?: string
  dataId?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function onClick(event: MouseEvent) {
  emit('click', event)
  
  // Only intercept internal links (starting with /)
  if (props.href && props.href.startsWith('/')) {
    // Don't intercept if user is doing special navigation
    if (event.ctrlKey || event.metaKey || event.shiftKey || props.target === '_blank') {
      return
    }
    
    event.preventDefault()
    
    // Dispatch navigation event for host to handle
    window.dispatchEvent(
      new CustomEvent('mf:navigate', { 
        detail: { to: props.href } 
      })
    )
  }
  
  // For external links or special cases, let the browser handle normally
}
</script>