<template>
  <div
    class="c_MiniCart"
    data-boundary="checkout"
  >
    <BaseButton 
      title="View Cart" 
      class-name="c_MiniCart__button" 
      href="/checkout/cart" 
      variant="secondary" 
      :rounded="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
      >
        <g clipPath="url(#a)">
          <path
            fill="#000"
            d="M2.75 27.5c0 1.5125 1.2375 2.75 2.75 2.75h22c1.5125 0 2.75-1.2375 2.75-2.75V9.625h-6.3188c-.649-3.5145-3.7311-6.1875-7.4312-6.1875-3.7001 0-6.78219 2.673-7.43119 6.1875H2.75V27.5ZM16.5 4.8125c2.9391 0 5.4003 2.06113 6.028 4.8125H10.472c.6277-2.75137 3.0889-4.8125 6.028-4.8125ZM8.9375 11v4.125h1.375V11h12.375v4.125h1.375V11h4.8125v16.5c0 .7583-.6167 1.375-1.375 1.375h-22c-.75831 0-1.375-.6167-1.375-1.375V11h4.8125Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path
              fill="#fff"
              d="M0 0h33v33H0z"
            />
          </clipPath>
        </defs>
      </svg>
      <div class="c_MiniCart__quantity">
        {{ quantity || '' }}
      </div>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import './bootstrap'
import { BaseButton } from '@tractor/shared'
import { useCart } from './stores/cartStore'

const { count: quantity } = useCart()
</script>

<style scoped>
.c_MiniCart {
  position: relative;
  margin-right: 1.5rem;
  padding: 1.5rem;
}

.c_MiniCart__quantity {
  background-color: #ff5a55;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  color: rgb(255, 255, 255);
  display: grid;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: bold;
  height: 20px;
  letter-spacing: normal;
  min-width: 20px;
  place-content: center;
  position: absolute;
  right: 0px;
  text-align: center;
  top: 0px;
  transform: scale(1);
  transition: all 0.3s;
}

.c_MiniCart svg {
  --minicart-translate: -2px;
  transform: translateY(var(--minicart-translate));
}

.c_MiniCart__quantity:empty {
  transform: scale(0);
}

@keyframes bounce {
  0% {
    transform: translateY(calc(var(--minicart-translate) + 0px));
  }
  33% {
    transform: translateY(calc(var(--minicart-translate) + 6px));
  }
  100% {
    transform: translateY(calc(var(--minicart-translate) + 0px));
  }
}

.c_MiniCart--highlight svg {
  animation: bounce 0.2s ease-out;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
  100% {
    transform: rotate(-6deg);
  }
}

.c_MiniCart--highlight svg g {
  transform-origin: center 7px;
  animation: shake 0.2s infinite ease-in-out;
}
</style>