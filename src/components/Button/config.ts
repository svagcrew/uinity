import { getIconConfiguredStyleRoot, type IconConfig } from '@/components/Icon/config.js'
import {
  type ColorModeName,
  getColorByMode,
  type WithColorsClearPartial,
  zColorValueOptionalNullable,
} from '@/lib/color.js'
import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyConfiguredStyleRoot,
  getZAnyConfig,
  objectAssignExceptUndefined,
  omit,
  zNumberOrStringOptionalNullable,
  zRecordOfStringsOptionalNullable,
  zStringOptionalNullable,
} from '@/lib/other.js'

import { z } from 'zod'

export const zButtonStyleCoreConfigured = z.object({
  gapHorizontalAccessoryText: zNumberOrStringOptionalNullable,
  textFont: zStringOptionalNullable,
  textWeight: zNumberOrStringOptionalNullable,
  textSize: zNumberOrStringOptionalNullable,
  textLineHeight: zNumberOrStringOptionalNullable,
  borderWidth: zNumberOrStringOptionalNullable,
  minHeight: zNumberOrStringOptionalNullable,
  backgroundColor: zColorValueOptionalNullable,
  borderColor: zColorValueOptionalNullable,
  textColor: zColorValueOptionalNullable,
  iconColor: zColorValueOptionalNullable,
  iconSize: zNumberOrStringOptionalNullable,
  iconSettings: zRecordOfStringsOptionalNullable,
  iconVariant: zStringOptionalNullable,
})
export type ButtonStyleCoreConfigured = z.output<typeof zButtonStyleCoreConfigured>
export const getButtonStyleCoreClearByConfigured = ({
  uinityConfig,
  styleCoreConfigured,
  colorMode,
}: {
  uinityConfig: ButtonUinityConfig
  styleCoreConfigured: ButtonStyleCoreConfigured | undefined | null
  colorMode?: ColorModeName
}): Omit<
  WithColorsClearPartial<ButtonStyleCoreConfigured, 'textColor' | 'backgroundColor' | 'iconColor' | 'borderColor'>,
  'iconSettings' | 'iconVariant'
> => {
  if (!styleCoreConfigured) {
    return {}
  }
  const iconStyleRoot = getIconConfiguredStyleRoot({
    uinityConfig,
    $style: {
      color: getColorByMode(colorMode, styleCoreConfigured.iconColor),
      size: styleCoreConfigured.iconSize,
    },
    settings: styleCoreConfigured.iconSettings,
    variantName: styleCoreConfigured.iconVariant,
  })
  return {
    ...omit(styleCoreConfigured, [
      'textColor',
      'backgroundColor',
      'iconColor',
      'borderColor',
      'iconSettings',
      'iconVariant',
    ]),
    textColor: getColorByMode(colorMode, styleCoreConfigured.textColor),
    backgroundColor: getColorByMode(colorMode, styleCoreConfigured.backgroundColor),
    iconColor: iconStyleRoot.color,
    borderColor: getColorByMode(colorMode, styleCoreConfigured.borderColor),
    iconSize: iconStyleRoot.size,
  }
}
export type ButtonStyleCoreClear = ReturnType<typeof getButtonStyleCoreClearByConfigured>
export const zButtonStyleStatesConfigured = z.object({
  rest: zButtonStyleCoreConfigured.optional().nullable(),
  hover: zButtonStyleCoreConfigured.optional().nullable(),
  active: zButtonStyleCoreConfigured.optional().nullable(),
  focus: zButtonStyleCoreConfigured.optional().nullable(),
  disabled: zButtonStyleCoreConfigured.optional().nullable(),
})
export type ButtonStyleStatesConfigured = z.output<typeof zButtonStyleStatesConfigured>
export type ButtonStyleStatesClear = {
  rest: ButtonStyleCoreClear
  hover: ButtonStyleCoreClear
  active: ButtonStyleCoreClear
  focus: ButtonStyleCoreClear
  disabled: ButtonStyleCoreClear
}
export const zButtonStyleRootConfigured = zButtonStyleStatesConfigured
export type ButtonStyleRootConfigured = z.output<typeof zButtonStyleRootConfigured>
export type ButtonStyleRootClear = ButtonStyleStatesClear
export type ButtonStyleRootClearInput = Partial<ButtonStyleRootClear>
export const zButtonConfig = getZAnyConfig({
  zStyleRoot: zButtonStyleRootConfigured,
})

export type ButtonConfig = AnyConfig<ButtonStyleRootConfigured>
export type ButtonUinityConfig<
  TButtonConfig extends ButtonConfig = ButtonConfig,
  TIconConfig extends IconConfig = IconConfig,
> = {
  button: TButtonConfig
  icon: TIconConfig
}
export type ButtonConfiguredCommonProps<TButtonConfig extends ButtonConfig = ButtonConfig> = AnyConfiguredCommonProps<
  TButtonConfig,
  ButtonStyleRootConfigured
>

export const getButtonStyleRootConfigured = getGetAnyConfiguredStyleRoot<ButtonUinityConfig, ButtonStyleRootConfigured>(
  {
    componentName: 'button',
    assignStyleRoot: (...stylesRoot) => {
      const result: ButtonStyleRootConfigured = stylesRoot[0] || {}
      result.rest ||= {}
      result.hover ||= {}
      result.active ||= {}
      result.focus ||= {}
      result.disabled ||= {}

      for (const styleRoot of stylesRoot) {
        if (!styleRoot) {
          continue
        }
        objectAssignExceptUndefined(result.rest, styleRoot.rest)
        objectAssignExceptUndefined(result.hover, styleRoot.hover)
        objectAssignExceptUndefined(result.active, styleRoot.active)
        objectAssignExceptUndefined(result.focus, styleRoot.focus)
        objectAssignExceptUndefined(result.disabled, styleRoot.disabled)
      }
      return result
    },
  }
)
export const getButtonStyleRootClear = ({
  uinityConfig,
  styleRootConfigured,
  colorMode,
}: {
  uinityConfig: ButtonUinityConfig
  styleRootConfigured: ButtonStyleRootConfigured
  colorMode?: ColorModeName
}) => {
  return {
    rest: getButtonStyleCoreClearByConfigured({
      uinityConfig,
      styleCoreConfigured: styleRootConfigured.rest,
      colorMode,
    }),
    hover: getButtonStyleCoreClearByConfigured({
      uinityConfig,
      styleCoreConfigured: styleRootConfigured.hover,
      colorMode,
    }),
    active: getButtonStyleCoreClearByConfigured({
      uinityConfig,
      styleCoreConfigured: styleRootConfigured.active,
      colorMode,
    }),
    focus: getButtonStyleCoreClearByConfigured({
      uinityConfig,
      styleCoreConfigured: styleRootConfigured.focus,
      colorMode,
    }),
    disabled: getButtonStyleCoreClearByConfigured({
      uinityConfig,
      styleCoreConfigured: styleRootConfigured.disabled,
      colorMode,
    }),
  }
}
