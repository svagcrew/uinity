import { z } from 'zod'

export const zBreakSizesConfig = z.record(z.string(), z.number())
export type BreakSizesConfig = z.output<typeof zBreakSizesConfig>

export const zBreakSizesUinityConfig = z.object({
  breakSizes: zBreakSizesConfig.optional(),
})
export type BreakSizesUinityConfig<TBreakSizesConfig extends BreakSizesConfig = BreakSizesConfig> = {
  breakSizes?: TBreakSizesConfig
}
