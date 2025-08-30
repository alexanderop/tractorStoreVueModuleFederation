export function src(image: string, size: number): string {
  return image.replace('[size]', `${size}`)
}

export function srcset(image: string, sizes: number[] = []): string {
  return sizes.map((size) => `${src(image, size)} ${size}w`).join(', ')
}