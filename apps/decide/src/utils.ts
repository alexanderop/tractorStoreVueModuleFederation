export function src(image: string, size: number | string): string {
  return image.replace("[size]", `${size}`);
}

export function srcset(image: string, sizes: Array<number | string> = []): string {
  return sizes.map((size) => `${src(image, size)} ${size}w`).join(", ");
}
