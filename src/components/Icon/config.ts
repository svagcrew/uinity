import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyStyleRoot,
  getZAnyConfig,
  type StyleConfiguredToClear,
  type StyleConfiguredToClearWithBySize,
} from '@/lib/anyConfig.js'
import { getClearBySizeByConfigured, getZPartByAllSizesOptionalNullable } from '@/lib/bySize.js'
import { type ColorModeName, getColorByMode, zColorValueOptionalNullable } from '@/lib/color.js'
import { objectAssignExceptUndefined, omit } from '@/lib/utils.js'
import { zNumberOrStringOptionalNullable } from '@/lib/zod.js'
import { z } from 'zod'

export const zIconStyleRootConfiguredWithoutBySize = z.object({
  color: zColorValueOptionalNullable,
  size: zNumberOrStringOptionalNullable,
})
export type IconStyleRootConfiguredWithoutBySize = z.output<typeof zIconStyleRootConfiguredWithoutBySize>
export const zIconStyleRootConfigured = zIconStyleRootConfiguredWithoutBySize.extend(
  getZPartByAllSizesOptionalNullable({ zStyle: zIconStyleRootConfiguredWithoutBySize })
)
export type IconStyleRootConfigured = z.output<typeof zIconStyleRootConfigured>
export const getIconStyleRootClearByConfiguredWithoutBySize = ({
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
export const getIconStyleRootClearByConfigured = ({
  uinityConfig,
  styleRootConfigured,
  colorMode,
}: {
  uinityConfig: IconUinityConfig
  styleRootConfigured: IconStyleRootConfigured | undefined | null
  colorMode?: ColorModeName
}): StyleConfiguredToClearWithBySize<IconStyleRootConfigured, never, 'color'> => {
  return {
    ...getIconStyleRootClearByConfiguredWithoutBySize({ uinityConfig, styleRootConfigured, colorMode }),
    ...getClearBySizeByConfigured({
      uinityConfig,
      styleRootConfigured,
      colorMode,
      getStyleRootClearByConfiguredWithoutBySize: getIconStyleRootClearByConfiguredWithoutBySize,
    }),
  }
}
export type IconStyleRootClearNormalized = ReturnType<typeof getIconStyleRootClearByConfigured>
export type IconStyleRootClearInput = IconStyleRootClearNormalized
export const zIconConfig = getZAnyConfig({
  zStyleRootConfigured: zIconStyleRootConfigured,
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
