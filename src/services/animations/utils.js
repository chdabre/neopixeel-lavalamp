// eslint-disable-next-line import/prefer-default-export
export function getRndColor() {
  /* eslint-disable no-bitwise */
  const r = 255 * Math.random() | 0;
  const g = 255 * Math.random() | 0;
  const b = 255 * Math.random() | 0;
  return `rgb(${r},${g},${b})`;
}

export function getRndHue() {
  /* eslint-disable no-bitwise */
  const h = 360 * Math.random() | 0;
  return `hsl(${h},100%,50%)`;
}
