import { getTextConfigFinalProps, zTextGetterProps } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const formItemConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zFormItemConfigSizeName = z.enum(formItemConfigSizesNames)
export type FormItemConfigSizeName = z.output<typeof zFormItemConfigSizeName>

export const formItemConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zFormItemConfigVariantName = z.enum(formItemConfigVariantNames)
export type FormItemConfigVariantName = z.output<typeof zFormItemConfigVariantName>

export const formItemConfigColorNames = ['default'] as const
export const zFormItemConfigColorName = z.enum(formItemConfigColorNames)
export type FormItemConfigColorName = z.output<typeof zFormItemConfigColorName>

export const zFormItemConfigFinalProps = z.object({
  labelText: zTextGetterProps.optional(),
  labelFontFamily: zOptionalString,
  labelFontWeight: zOptionalString,
  labelFontSize: zOptionalNumberOrString,
  labelLineHeight: zOptionalNumberOrString,
  labelColor: zColorValue.optional(),
  gapLabelContent: zOptionalNumberOrString,
  gapContentFooter: zOptionalNumberOrString,
  gapErrorHint: zOptionalNumberOrString,
  siblingsGapHorizontal: zOptionalNumberOrString,
  siblingsGapVertical: zOptionalNumberOrString,
  errorText: zTextGetterProps.optional(),
  errorFontFamily: zOptionalString,
  errorFontWeight: zOptionalString,
  errorFontSize: zOptionalNumberOrString,
  errorLineHeight: zOptionalNumberOrString,
  errorColor: zColorValue.optional(),
  hintText: zTextGetterProps.optional(),
  hintFontFamily: zOptionalString,
  hintFontWeight: zOptionalString,
  hintFontSize: zOptionalNumberOrString,
  hintLineHeight: zOptionalNumberOrString,
  hintColor: zColorValue.optional(),
})
export type FormItemConfigFinalProps = z.output<typeof zFormItemConfigFinalProps>

export const zFormItemConfigGeneralProps = z.object({})
export type FormItemConfigGeneralProps = z.output<typeof zFormItemConfigGeneralProps>

export const zFormItemConfigVariantProps = z.object({
  color: zFormItemConfigColorName.optional(),
})
export type FormItemConfigVariantProps = z.output<typeof zFormItemConfigVariantProps>

export const zFormItemConfigInput = z.object({
  general: zFormItemConfigGeneralProps.optional(),
  variant: z.record(zFormItemConfigVariantName, zFormItemConfigVariantProps).optional(),
  color: z.record(zFormItemConfigColorName, zFormItemConfigFinalProps).optional(),
  size: z.record(zFormItemConfigSizeName, zFormItemConfigFinalProps).optional(),
})
export type FormItemConfigInput = z.output<typeof zFormItemConfigInput>

export const defaultFormItemConfigInput: FormItemConfigInput = {
  general: {},
  variant: {},
  color: {
    default: {
      labelColor: $.color.semantic.symbol.primary,
      hintColor: $.color.semantic.symbol.tertiary,
      errorColor: $.color.core.red[50],
    },
  },
  size: {
    xs: {
      labelText: {
        variant: 'body-xs',
      },
      errorText: {
        variant: 'body-xs',
      },
      hintText: {
        variant: 'body-xs',
      },
    },
    s: {
      labelText: {
        variant: 'body-s',
      },
      errorText: {
        variant: 'body-s',
      },
      hintText: {
        variant: 'body-s',
      },
    },
    m: {
      labelText: {
        variant: 'body-m',
      },
      errorText: {
        variant: 'body-m',
      },
      hintText: {
        variant: 'body-m',
      },
    },
    l: {
      labelText: {
        variant: 'body-l',
      },
      errorText: {
        variant: 'body-l',
      },
      hintText: {
        variant: 'body-l',
      },
    },
  },
}

export const normalizeFormItemConfig = (input: FormItemConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultFormItemConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultFormItemConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultFormItemConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultFormItemConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultFormItemConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultFormItemConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultFormItemConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      default: {
        ...defaultFormItemConfigInput.color?.default,
        ...input?.color?.default,
      },
    },
  }
}
export type FormItemConfig = ReturnType<typeof normalizeFormItemConfig>

export const normalizeFormItemColorName = (
  uinityConfig: UinityConfig,
  color?: FormItemConfigColorName | null | undefined
) => {
  if (color && uinityConfig.formItem.color[color]) {
    return color
  }
  return 'default'
}

export const normalizeFormItemSizeName = (
  uinityConfig: UinityConfig,
  size?: FormItemConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.formItem.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeFormItemVariantName = (
  uinityConfig: UinityConfig,
  variant?: FormItemConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.formItem.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getFormItemVariantProps = (
  uinityConfig: UinityConfig,
  variant?: FormItemConfigVariantName | undefined | null
) => {
  variant = normalizeFormItemVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.formItem.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getFormItemConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: FormItemConfigVariantName | undefined | null,
  color?: FormItemConfigColorName | undefined | null,
  size?: FormItemConfigSizeName | undefined | null
) => {
  const { variantColor } = getFormItemVariantProps(uinityConfig, variant)
  color = normalizeFormItemColorName(uinityConfig, color || variantColor)
  size = normalizeFormItemSizeName(uinityConfig, size)
  const result = {
    ...uinityConfig.formItem.color[color],
    ...uinityConfig.formItem.size[size],
  }
  if (result.labelText) {
    const labelTextConfigFinalProps = getTextConfigFinalProps(
      uinityConfig,
      result.labelText.variant,
      result.labelText.font,
      result.labelText.weight,
      result.labelText.size,
      result.labelText.lineHeight,
      result.labelText.color
    )
    result.labelFontFamily = result.labelFontFamily ?? labelTextConfigFinalProps.fontFamily
    result.labelFontWeight = result.labelFontWeight ?? labelTextConfigFinalProps.fontWeight
    result.labelFontSize = result.labelFontSize ?? labelTextConfigFinalProps.fontSize
    result.labelLineHeight = result.labelLineHeight ?? labelTextConfigFinalProps.lineHeight
    result.labelColor = result.labelColor ?? labelTextConfigFinalProps.color
  }
  if (result.errorText) {
    const errorTextConfigFinalProps = getTextConfigFinalProps(
      uinityConfig,
      result.errorText.variant,
      result.errorText.font,
      result.errorText.weight,
      result.errorText.size,
      result.errorText.lineHeight,
      result.errorText.color
    )
    result.errorFontFamily = result.errorFontFamily ?? errorTextConfigFinalProps.fontFamily
    result.errorFontWeight = result.errorFontWeight ?? errorTextConfigFinalProps.fontWeight
    result.errorFontSize = result.errorFontSize ?? errorTextConfigFinalProps.fontSize
    result.errorLineHeight = result.errorLineHeight ?? errorTextConfigFinalProps.lineHeight
    result.errorColor = result.errorColor ?? errorTextConfigFinalProps.color
  }
  if (result.hintText) {
    const hintTextConfigFinalProps = getTextConfigFinalProps(
      uinityConfig,
      result.hintText.variant,
      result.hintText.font,
      result.hintText.weight,
      result.hintText.size,
      result.hintText.lineHeight,
      result.hintText.color
    )
    result.hintFontFamily = result.hintFontFamily ?? hintTextConfigFinalProps.fontFamily
    result.hintFontWeight = result.hintFontWeight ?? hintTextConfigFinalProps.fontWeight
    result.hintFontSize = result.hintFontSize ?? hintTextConfigFinalProps.fontSize
    result.hintLineHeight = result.hintLineHeight ?? hintTextConfigFinalProps.lineHeight
    result.hintColor = result.hintColor ?? hintTextConfigFinalProps.color
  }
  return result
}
