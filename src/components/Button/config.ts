import { getIconStyleRootClear, type IconConfig } from '@/components/Icon/config.js'
import { type AnyConfig, type AnyConfiguredCommonProps, getGetAnyStyleRoot, getZAnyConfig } from '@/lib/anyConfig.js'
import type { BreakSizes } from '@/lib/bySize.js'
import {
  type ColorModeName,
  getColorByMode,
  type WithColorsClearPartial,
  zColorValueOptionalNullable,
} from '@/lib/color.js'
import { objectAssignExceptUndefined, omit } from '@/lib/utils.js'
import {
  zNumberOrStringOptionalNullable,
  zRecordOfStringsOptionalNullable,
  zStringOptionalNullable,
} from '@/lib/zod.js'
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
  // TODO:ASAP add wsr for button
  // TODO:ASAP remove wsr from icon
  const iconStyleRootClear = getIconStyleRootClear({
    uinityConfig,
    styleRootConfiguredOverrides: {
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
    iconColor: iconStyleRootClear.color,
    borderColor: getColorByMode(colorMode, styleCoreConfigured.borderColor),
    iconSize: iconStyleRootClear.size,
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
export type ButtonStyleRootClearNormalized = ButtonStyleStatesClear
export type ButtonStyleRootClearInput = Partial<ButtonStyleRootClearNormalized>
export const zButtonConfig = getZAnyConfig({
  zStyleRootConfigured: zButtonStyleRootConfigured,
})

export type ButtonConfig = AnyConfig<ButtonStyleRootConfigured>
export type ButtonUinityConfig<
  TButtonConfig extends ButtonConfig = ButtonConfig,
  TBreakSizes extends BreakSizes = BreakSizes,
  TIconConfig extends IconConfig = IconConfig,
> = {
  button: TButtonConfig
  breakSizes: TBreakSizes
  icon: TIconConfig
}
export type ButtonConfiguredCommonProps<TButtonUinityConfig extends ButtonUinityConfig> = AnyConfiguredCommonProps<
  TButtonUinityConfig['button'],
  ButtonStyleRootConfigured
>

export const {
  getStyleRootClear: getButtonStyleRootClear,
  getStyleRootClearByConfigured: getButtonStyleRootClearByConfigured,
  getStyleRootConfigured: getButtonStyleRootConfigured,
} = getGetAnyStyleRoot<ButtonUinityConfig, ButtonStyleRootConfigured, ButtonStyleRootClearNormalized>({
  componentName: 'button',
  assignStyleRootConfigured: (...stylesRoot) => {
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
  getStyleRootClearByConfigured: ({ uinityConfig, styleRootConfigured, colorMode }) => {
    return {
      rest: getButtonStyleCoreClearByConfigured({
        uinityConfig,
        styleCoreConfigured: styleRootConfigured?.rest,
        colorMode,
      }),
      hover: getButtonStyleCoreClearByConfigured({
        uinityConfig,
        styleCoreConfigured: styleRootConfigured?.hover,
        colorMode,
      }),
      active: getButtonStyleCoreClearByConfigured({
        uinityConfig,
        styleCoreConfigured: styleRootConfigured?.active,
        colorMode,
      }),
      focus: getButtonStyleCoreClearByConfigured({
        uinityConfig,
        styleCoreConfigured: styleRootConfigured?.focus,
        colorMode,
      }),
      disabled: getButtonStyleCoreClearByConfigured({
        uinityConfig,
        styleCoreConfigured: styleRootConfigured?.disabled,
        colorMode,
      }),
    }
  },
})
