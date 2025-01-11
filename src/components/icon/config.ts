import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyStyleRoot,
  getZAnyConfig,
  type StyleConfiguredToClear,
} from '@/lib/anyConfig.js'
import { type ColorModeName, getColorByMode, zColorValueOptionalNullable } from '@/lib/color.js'
import { objectAssignExceptUndefined, omit } from '@/lib/utils.js'
import { zNumberOrStringOptionalNullable } from '@/lib/zod.js'
import { z } from 'zod'

export const zIconStyleRootConfigured = z
  .object({
    color: zColorValueOptionalNullable,
    size: zNumberOrStringOptionalNullable,
  })
  .strict()
export type IconStyleRootConfigured = z.output<typeof zIconStyleRootConfigured>

export const getIconStyleRootClearByConfigured = ({
  uinityConfig,
  styleRootConfigured,
  colorMode,
}: {
  uinityConfig: IconUinityConfig
  styleRootConfigured: IconStyleRootConfigured | undefined | null
  colorMode?: ColorModeName
}): StyleConfiguredToClear<IconStyleRootConfigured, never, 'color'> => {
  if (!styleRootConfigured) {
    return {}
  }
  return {
    ...omit(styleRootConfigured, ['color']),
    color: getColorByMode(colorMode, styleRootConfigured.color),
  }
}
export type IconStyleRootClear = ReturnType<typeof getIconStyleRootClearByConfigured>

export const zIconConfig = getZAnyConfig({
  zStyleRootConfigured: zIconStyleRootConfigured,
})
export type IconConfig = AnyConfig<IconStyleRootConfigured>

export const zIconUinityConfig = z.object({
  icon: zIconConfig.optional(),
})
export type IconUinityConfig<TIconConfig extends IconConfig = IconConfig> = { icon?: TIconConfig }

export type IconConfiguredCommonProps<TIconUinityConfig extends IconUinityConfig> = AnyConfiguredCommonProps<
  TIconUinityConfig['icon'],
  IconStyleRootConfigured
>

export const {
  getStyleRootClearWithoutBySize: getIconStyleRootClear,
  getStyleRootConfiguredWithoutBySize: getIconStyleRootConfigured,
} = getGetAnyStyleRoot<IconUinityConfig, IconStyleRootConfigured, IconStyleRootClear>({
  componentName: 'icon',
  assignStyleRootConfigured: (...stylesRoot) => {
    const result: IconStyleRootConfigured = stylesRoot[0] || {}
    for (const styleRoot of stylesRoot) {
      if (!styleRoot) {
        continue
      }
      objectAssignExceptUndefined(result, styleRoot)
    }
    return result
  },
  getStyleRootClearByConfiguredWithoutBySize: getIconStyleRootClearByConfigured,
})
