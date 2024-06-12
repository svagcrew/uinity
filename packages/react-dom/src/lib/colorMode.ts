import type { ColorValue } from '@uinity/core/dist/utils/color.js'
import { getColorByMode } from '@uinity/core/dist/utils/color.js'

export const colorMode = 'light' as const
export const useColorMode = () => {
  return { colorMode, getColorByMode: (color: ColorValue) => getColorByMode(colorMode, color) }
}
export const getColorMode = () => {
  return colorMode
}
