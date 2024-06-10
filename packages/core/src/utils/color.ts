import type { ColorModeName, ColorValue } from '@/utils/other.js'

export const getCssColorValue = (color: ColorValue | undefined | null, mode?: ColorModeName | null | undefined) => {
  if (!color) {
    return '#000000'
  }
  if (typeof color === 'string') {
    return color
  }
  const result = color[mode || 'light']
  if (!result) {
    return '#000000'
  }
  return result
}
