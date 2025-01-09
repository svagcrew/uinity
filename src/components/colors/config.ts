import { zColorValueOptionalNullable } from '@/lib/color.js'
import { z } from 'zod'

export const zColorsBaseConfig = z.record(z.string(), z.record(z.string(), zColorValueOptionalNullable))
export type ColorsBaseConfig = z.output<typeof zColorsBaseConfig>

export const zColorsSemanticConfig = z.record(z.string(), z.record(z.string(), zColorValueOptionalNullable))
export type ColorsSemanticConfig = z.output<typeof zColorsSemanticConfig>

export const zColorsConfig = z.object({
  base: zColorsBaseConfig,
  semantic: zColorsSemanticConfig,
})
export type ColorsConfig = z.output<typeof zColorsConfig>

export const zColorsUinityConfig = z.object({
  colors: zColorsConfig,
})
export type ColorsUinityConfig<TColorsConfig extends ColorsConfig = ColorsConfig> = {
  colors: TColorsConfig
}
