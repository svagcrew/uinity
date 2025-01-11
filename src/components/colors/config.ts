import { zColorValueOptionalNullable } from '@/lib/color.js'
import { z } from 'zod'

export const zColorsLastLevelConfig = z.record(z.string(), zColorValueOptionalNullable)
export const zColorsPreLastLevelConfig = z.record(z.string(), zColorsLastLevelConfig)
export const zColorsPrePreLastLevelConfig = z.record(z.string(), zColorsPreLastLevelConfig)
export const zColorsPrePrePreLastLevelConfig = z.record(z.string(), zColorsPrePreLastLevelConfig)
export const zColorsPrePrePrePreLastLevelConfig = z.record(z.string(), zColorsPrePrePreLastLevelConfig)

export const zColorsConfig = z.union([
  zColorsLastLevelConfig,
  zColorsPreLastLevelConfig,
  zColorsPrePreLastLevelConfig,
  zColorsPrePrePreLastLevelConfig,
  zColorsPrePrePrePreLastLevelConfig,
])
export type ColorsConfig = z.output<typeof zColorsConfig>

export const zColorsUinityConfig = z.object({
  colors: zColorsConfig,
})
export type ColorsUinityConfig<TColorsConfig extends ColorsConfig = ColorsConfig> = {
  colors: TColorsConfig
}
