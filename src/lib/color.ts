import { zStringOptionalNullable, zStringRequired } from '@/lib/other.js'
import { z } from 'zod'

export const zColorModeName = zStringRequired
export type ColorModeName = z.output<typeof zColorModeName>
export const zColorValueModed = z.record(zColorModeName, zStringOptionalNullable)
export type ColorValueModed = z.output<typeof zColorValueModed>
export const zColorValue = z.union([zStringRequired, zColorValueModed])
export const zColorValueOptionalNullable = z.union([zColorValue, z.null(), z.undefined()])
export type ColorValue = z.output<typeof zColorValue>
export type ColorValueClear = string | null | undefined
export type WithColorsClear<TSource extends {}, TKey extends string> = Omit<TSource, TKey> &
  Record<TKey, ColorValueClear>
export type WithColorsClearPartial<TSource extends {}, TKey extends string> = Omit<TSource, TKey> &
  Partial<Record<TKey, ColorValueClear>>

export const getColorByMode = (mode: ColorModeName | undefined, color: ColorValue | undefined | null) => {
  if (!color) {
    return color
  }
  if (typeof color === 'string') {
    return color
  }
  return (mode && color[mode]) ?? Object.values(color)[0] ?? undefined
}
