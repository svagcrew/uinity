import type { ColorModeName, ColorValue } from '@uinity/core/dist/utils/color.js'
import { getColorByMode } from '@uinity/core/dist/utils/color.js'

export const hardcodedColorMode = 'light' as const
export const getColorMode = (forceColorMode?: ColorModeName | null | undefined) => {
  return forceColorMode ?? hardcodedColorMode
}
export const useColorMode = (forceColorMode?: ColorModeName | null | undefined) => {
  const colorModeHere = getColorMode(forceColorMode)
  return {
    colorMode: colorModeHere,
    cm: colorModeHere,
    getColorByMode: (color: ColorValue) => getColorByMode(colorModeHere, color),
  }
}
