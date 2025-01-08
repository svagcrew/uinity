import {
  type ColorModeName,
  getColorByMode,
  type WithColorsClearPartial,
  zColorValueOptionalNullable,
} from '@/lib/color.js'
import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyStyleRoot,
  getZAnyConfig,
  objectAssignExceptUndefined,
  omit,
  zNumberOrStringOptionalNullable,
} from '@/lib/other.js'
import { z } from 'zod'

export const zIconStyleRootConfigured = z.object({
  color: zColorValueOptionalNullable,
  size: zNumberOrStringOptionalNullable,
})
export type IconStyleRootConfigured = z.output<typeof zIconStyleRootConfigured>
export const getIconStyleRootClearByConfigured = ({
  uinityConfig,
  styleRootConfigured,
  colorMode,
}: {
  uinityConfig: IconUinityConfig
  styleRootConfigured: IconStyleRootConfigured | undefined | null
  colorMode?: ColorModeName
}): Omit<WithColorsClearPartial<IconStyleRootConfigured, 'color'>, never> => {
  if (!styleRootConfigured) {
    return {}
  }
  return {
    ...omit(styleRootConfigured, ['color']),
    color: getColorByMode(colorMode, styleRootConfigured.color),
  }
}
export type IconStyleRootClearNormalized = ReturnType<typeof getIconStyleRootClearByConfigured>
export type IconStyleRootClearInput = IconStyleRootClearNormalized
export const zIconConfig = getZAnyConfig({
  zStyleRoot: zIconStyleRootConfigured,
})

export type IconConfig = AnyConfig<IconStyleRootConfigured>
export type IconUinityConfig<TIconConfig extends IconConfig = IconConfig> = { icon: TIconConfig }
export type IconConfiguredCommonProps<TIconUinityConfig extends IconUinityConfig> = AnyConfiguredCommonProps<
  TIconUinityConfig['icon'],
  IconStyleRootConfigured
>

export const { getStyleRootClear: getIconStyleRootClear, getStyleRootConfigured: getIconStyleRootConfigured } =
  getGetAnyStyleRoot<IconUinityConfig, IconStyleRootConfigured, IconStyleRootClearNormalized>({
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
    getStyleRootClearByConfigured: getIconStyleRootClearByConfigured,
  })
