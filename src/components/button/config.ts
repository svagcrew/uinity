import { getIconStyleRootClear } from '@/components/icon/config.js'
import {
  type AnyConfig,
  type AnyConfiguredCommonProps,
  getGetAnyStyleRoot,
  getZAnyConfig,
  type StyleConfiguredToClear,
} from '@/lib/anyConfig.js'
import {
  type ByAllSizesClearOptionalNullable,
  type ByAllSizesConfiguredOptionalNullable,
  bySizeKeys,
  getZPartByAllSizesConfiguredOptionalNullable,
} from '@/lib/bySize.js'
import { type ColorModeName, getColorByMode } from '@/lib/color.js'
import { zCssCamelCaseObjectExtendedSilent } from '@/lib/css.js'
import { objectAssignExceptUndefined, omit } from '@/lib/utils.js'
import {
  zNumberOrStringOptionalNullable,
  zRecordOfStringsOptionalNullable,
  zStringOptionalNullable,
} from '@/lib/zod.js'
import { z } from 'zod'

export const zButtonStyleCoreConfigured = z
  .object({
    special: z
      .object({
        gapHorizontalIconText: zNumberOrStringOptionalNullable.describe('Gap between icon and text'),
      })
      .optional()
      .nullable(),
    button: zCssCamelCaseObjectExtendedSilent({}),
    icon: zCssCamelCaseObjectExtendedSilent({
      iconVariant: zStringOptionalNullable,
      iconSettings: zRecordOfStringsOptionalNullable,
      size: zNumberOrStringOptionalNullable,
    }),
    iconStart: zCssCamelCaseObjectExtendedSilent({
      iconVariant: zStringOptionalNullable,
      iconSettings: zRecordOfStringsOptionalNullable,
      size: zNumberOrStringOptionalNullable,
    }),
    content: zCssCamelCaseObjectExtendedSilent({}),
    iconEnd: zCssCamelCaseObjectExtendedSilent({
      iconVariant: zStringOptionalNullable,
      iconSettings: zRecordOfStringsOptionalNullable,
      size: zNumberOrStringOptionalNullable,
    }),
  })
  .strict()
export type ButtonStyleCoreConfigured = z.output<typeof zButtonStyleCoreConfigured>

export const getButtonStyleCoreClearByConfigured = ({
  uinityConfig,
  styleCoreConfigured,
  colorMode,
}: {
  uinityConfig: ButtonUinityConfig
  styleCoreConfigured: ButtonStyleCoreConfigured | undefined | null
  colorMode?: ColorModeName
}): StyleConfiguredToClear<
  ButtonStyleCoreConfigured,
  'iconSettings' | 'iconVariant',
  'textColor' | 'backgroundColor' | 'iconColor' | 'borderColor'
> => {
  if (!styleCoreConfigured) {
    return {}
  }
  const iconStyleRootClear = getIconStyleRootClear({
    uinityConfig: uinityConfig as never,
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

export const buttonStatesKeys = ['rest', 'hover', 'active', 'focus', 'disabled'] as const
export type ButtonStateKey = (typeof buttonStatesKeys)[number]
export const zButtonStyleStatesConfigured = z.object({
  // TODO: use generated style with map or reduce
  rest: zButtonStyleCoreConfigured.optional().nullable(),
  hover: zButtonStyleCoreConfigured.optional().nullable(),
  active: zButtonStyleCoreConfigured.optional().nullable(),
  focus: zButtonStyleCoreConfigured.optional().nullable(),
  disabled: zButtonStyleCoreConfigured.optional().nullable(),
})
export type ButtonStyleStatesConfigured = z.output<typeof zButtonStyleStatesConfigured>
export type ButtonStyleStatesClear = Partial<Record<ButtonStateKey, ButtonStyleCoreClear | null | undefined>>

export const zButtonStyleRootConfiguredWithoutBySize = zButtonStyleStatesConfigured
export type ButtonStyleRootConfiguredWithoutBySize = z.output<typeof zButtonStyleRootConfiguredWithoutBySize>

export const zButtonStyleRootConfigured = zButtonStyleRootConfiguredWithoutBySize.extend(
  getZPartByAllSizesConfiguredOptionalNullable({ zStyle: zButtonStyleRootConfiguredWithoutBySize })
) as z.ZodObject<any, any, any> // becourse of typescript overloading
export type ButtonStyleRootConfigured = ByAllSizesConfiguredOptionalNullable<ButtonStyleRootConfiguredWithoutBySize>

export type ButtonStyleRootClearWithoutBySize = ButtonStyleStatesClear
export type ButtonStyleRootClear = ByAllSizesClearOptionalNullable<ButtonStyleRootClearWithoutBySize>

export const zButtonConfig = getZAnyConfig({
  zStyleRootConfigured: zButtonStyleRootConfigured,
}) as z.ZodObject<any, any, any> // becourse of typescript overloading
export type ButtonConfig = AnyConfig<ButtonStyleRootConfigured>

export const zButtonUinityConfig = z.object({
  button: zButtonConfig.optional(),
})
export type ButtonUinityConfig<TButtonConfig extends ButtonConfig = ButtonConfig> = {
  button?: TButtonConfig
}

export type ButtonConfiguredCommonProps<TButtonUinityConfig extends ButtonUinityConfig> = AnyConfiguredCommonProps<
  TButtonUinityConfig['button'],
  ButtonStyleRootConfigured
>

export const {
  getStyleRootClearWithBySize: getButtonStyleRootClear,
  getStyleRootConfiguredWithBySize: getButtonStyleRootConfigured,
} = getGetAnyStyleRoot<ButtonUinityConfig, ButtonStyleRootConfigured, ButtonStyleRootClear>({
  componentName: 'button',
  assignStyleRootConfigured: (...stylesRoot) => {
    const result: ButtonStyleRootConfigured = stylesRoot[0] || {}
    for (const buttonStateKey of buttonStatesKeys) {
      result[buttonStateKey] ||= {}
    }
    for (const bySizeKey of bySizeKeys) {
      result[bySizeKey] ||= []
    }
    for (const styleRoot of stylesRoot) {
      if (!styleRoot) {
        continue
      }
      for (const buttonStateKey of buttonStatesKeys) {
        objectAssignExceptUndefined(result[buttonStateKey], styleRoot[buttonStateKey])
      }
      for (const bySizeKey of bySizeKeys) {
        ;(result as any)[bySizeKey].push(...(styleRoot[bySizeKey] || []))
      }
    }
    return result
  },
  getStyleRootClearByConfiguredWithoutBySize: ({ uinityConfig, styleRootConfigured, colorMode }) => {
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
