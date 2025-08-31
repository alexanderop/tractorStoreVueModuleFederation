import { DefineComponent } from 'vue'

interface BaseImageProps {
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

interface BaseImageEmits {
  load: [event: Event]
  error: [event: Event]
}

declare const BaseImage: DefineComponent<BaseImageProps, {}, {}, {}, {}, {}, {}, BaseImageEmits>

export default BaseImage