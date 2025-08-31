<template>
  <a
    v-if="href"
    :href="href"
    :title="title"
    :data-id="dataId"
    :class="buttonClasses"
    @click="onClick"
  >
    <div class="button__inner">
      <slot />
    </div>
  </a>
  <button
    v-else
    :type="type || 'button'"
    :value="value"
    :disabled="disabled"
    :title="title"
    :data-id="dataId"
    :class="buttonClasses"
    @click="emit('click', $event)"
  >
    <div class="button__inner">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits<{ (e: 'click', ev: Event): void }>()

interface Props {
  href?: string
  type?: 'button' | 'submit' | 'reset'
  value?: string
  disabled?: boolean
  rounded?: boolean
  className?: string
  dataId?: string
  size?: 'normal' | 'small'
  variant?: 'primary' | 'secondary'
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  variant: 'secondary'
})

function onClick(ev: Event) {
  emit('click', ev)
  if (props.href && props.href.startsWith('/')) {
    ev.preventDefault()
    window.dispatchEvent(
      new CustomEvent('mf:navigate', { detail: { to: props.href } })
    )
  }
}

const buttonClasses = computed(() => {
  const classes = [
    'button',
    `button--${props.variant}`,
    `button--size-${props.size}`,
    props.className || ''
  ]
  
  if (props.rounded) {
    classes.push('button--rounded')
  }
  
  return classes.join(' ').trim()
})
</script>

<style>
.button--size-normal {
  --button-height: 50px;
}

.button--size-small {
  --button-height: 40px;
}

.button {
  display: block;
  height: var(--button-height);
  width: 100%;
  border-radius: calc(var(--button-height) / 2);
  padding: 2px;
  border: 0;
  background: linear-gradient(180deg, rgb(168, 168, 168), rgb(255, 255, 255)),
    var(--accent-color);
  box-shadow:
    0 -2px 3px rgb(229, 229, 229),
    0 2px 3px 2px rgb(255, 255, 255),
    0 0 25px rgba(0, 0, 0, 0.05),
    0 -10px 5px rgb(255, 255, 255) inset;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-decoration: none;
  font-size: 16px;
}

.button--primary {
  --accent-color: #333;
  color: #fff;
}

.button--secondary {
  --accent-color: #ffffff;
  color: #000;
}

.button--rounded.button--size-normal {
  width: var(--button-height);
}

@media (max-width: 499px) {
  .button--rounded.button--size-normal {
    --button-height: 40px;
  }
}

@media (min-width: 500px) {
  .button--rounded.button--size-normal {
    --button-height: 66px;
  }
}

.button--rounded.button--size-small {
  --button-height: 40px;
  width: var(--button-height);
}

.button--rounded .button__inner {
  padding: 0;
}

@media (max-width: 499px) {
  .button--rounded svg {
    width: 20px;
    height: 20px;
  }
}

.button[disabled] {
  --accent-color: #d3d3d3;
  pointer-events: none;
}

.button::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  left: 0;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.19),
      rgba(255, 255, 255, 0.3)
    ),
    var(--accent-color);
  content: "";
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.1);
  display: block;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    background 0.1s 0.2s;
}

.button__inner {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--accent-color);
  height: calc(var(--button-height) - 4px);
  border-radius: inherit;
  display: grid;
  place-content: center;
  transition:
    transform 0.3s,
    background 0.3s,
    box-shadow 0.3s;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
}

.button:hover .button__inner,
.button:focus .button__inner {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    var(--accent-color);
}

.button:active::before {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.09), rgba(0, 0, 0, 0.16)),
    var(--accent-color);
  box-shadow:
    0 0 3px rgba(0, 0, 0, 0.6) inset,
    0 2px 1px -1px rgba(0, 0, 0, 0.1);
  transform: scale(0.97);
  transition:
    all 0.1s,
    background 0.05s;
}

.button:active .button__inner {
  transform: scale(0.97);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--accent-color);
  transition: all 0.1s;
  box-shadow:
    0 5px 5px rgba(0, 0, 0, 0.2) inset,
    0 -3px 3px rgba(255, 255, 255, 0.2) inset;
}
</style>