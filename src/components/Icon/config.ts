import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyConfiguredStyleRoot,
  getZAnyConfig,
  objectAssignExceptUndefined,
  zNumberOrStringOptionalNullable,
  zStringOptionalNullable,
} from '@/lib/other.js'
import { z } from 'zod'

export const zIconStyleRoot = z.object({
  color: zStringOptionalNullable,
  size: zNumberOrStringOptionalNullable,
})
export type IconStyleRoot = z.output<typeof zIconStyleRoot>
export const zIconConfig = getZAnyConfig({
  zStyleRoot: zIconStyleRoot,
})

export type IconConfig = AnyConfig<IconStyleRoot>
export type IconUinityConfig<TIconConfig extends IconConfig = IconConfig> = { icon: TIconConfig }
export type IconConfiguredCommonProps<TIconConfig extends IconConfig = IconConfig> = AnyConfiguredCommonProps<
  TIconConfig,
  IconStyleRoot
>

export const getIconConfiguredStyleRoot = getGetAnyConfiguredStyleRoot<IconUinityConfig, IconStyleRoot>({
  componentName: 'icon',
  assignStyleRoot: (...stylesRoot) => {
    const result: IconStyleRoot = stylesRoot[0] || {}
    for (const styleRoot of stylesRoot) {
      if (!styleRoot) {
        continue
      }
      objectAssignExceptUndefined(result, styleRoot)
    }
    return result
  },
})
