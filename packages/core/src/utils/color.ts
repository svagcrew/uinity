import { zRequiredString } from '@/utils/other.js'
import { z } from 'zod'

export const colorModes = ['light', 'dark'] as const
export const zColorModeName = z.enum(colorModes)
export type ColorModeName = z.infer<typeof zColorModeName>
export const zColorValueModed = z.record(zColorModeName, zRequiredString)
export type ColorValueModed = z.infer<typeof zColorValueModed>
export const zColorValue = z.union([zRequiredString, zColorValueModed])
export type ColorValue = z.infer<typeof zColorValue>

export const getColorByMode = (mode: ColorModeName, color: ColorValue | undefined | null) => {
  if (!color) {
    return undefined
  }
  if (typeof color === 'string') {
    return color
  }
  return color[mode] || color.light || color.dark || undefined
}
