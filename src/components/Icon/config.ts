import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyConfiguredStyleRoot,
  getZAnyConfig,
  zOptionalNumberOrString,
  zOptionalString,
} from '@/lib/other.js'
import { z } from 'zod'

export const zIconStyleRoot = z.object({
  color: zOptionalString,
  size: zOptionalNumberOrString,
})
export type IconStyleRoot = z.output<typeof zIconStyleRoot>
export const zIconConfig = getZAnyConfig({
  zStyleRoot: zIconStyleRoot,
})

export type IconConfig = AnyConfig<IconStyleRoot>
export type IconUinityConfig<TIconConfig extends IconConfig = {}> = { icon: TIconConfig }
export type IconConfiguredCommonProps<TIconConfig extends IconConfig = {}> = AnyConfiguredCommonProps<TIconConfig>

export const getIconConfiguredStyleRoot = getGetAnyConfiguredStyleRoot<IconUinityConfig, IconStyleRoot>({
  componentName: 'icon',
  assignStyleRoot: (...stylesRoot) => {
    const result: IconStyleRoot = stylesRoot[0] || {}
    for (const styleRoot of stylesRoot) {
      if (!styleRoot) {
        continue
      }
      Object.assign(result, styleRoot)
    }
    return result
  },
})
