export function src(image, size) {
    return image.replace('[size]', `${size}`);
}
export function srcset(image, sizes = []) {
    return sizes.map((size) => `${src(image, size)} ${size}w`).join(', ');
}
