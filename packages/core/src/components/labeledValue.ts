import { getTextConfigFinalProps, zTextGetterProps } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const labeledValueConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zLabeledValueConfigSizeName = z.enum(labeledValueConfigSizesNames)
export type LabeledValueConfigSizeName = z.output<typeof zLabeledValueConfigSizeName>

export const labeledValueConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zLabeledValueConfigVariantName = z.enum(labeledValueConfigVariantNames)
export type LabeledValueConfigVariantName = z.output<typeof zLabeledValueConfigVariantName>

export const labeledValueConfigColorNames = ['default'] as const
export const zLabeledValueConfigColorName = z.enum(labeledValueConfigColorNames)
export type LabeledValueConfigColorName = z.output<typeof zLabeledValueConfigColorName>

export const zLabeledValueConfigFinalProps = z.object({
  labelText: zTextGetterProps.optional(),
  labelFontFamily: zOptionalString,
  labelFontWeight: zOptionalString,
  labelFontSize: zOptionalNumberOrString,
  labelLineHeight: zOptionalNumberOrString,
  labelColor: zColorValue.optional(),
  gapLabelValue: zOptionalNumberOrString,
  gapValueHint: zOptionalNumberOrString,
  siblingsGapHorizontal: zOptionalNumberOrString,
  siblingsGapVertical: zOptionalNumberOrString,
  valueText: zTextGetterProps.optional(),
  valueFontFamily: zOptionalString,
  valueFontWeight: zOptionalString,
  valueFontSize: zOptionalNumberOrString,
  valueLineHeight: zOptionalNumberOrString,
  valueColor: zColorValue.optional(),
  hintText: zTextGetterProps.optional(),
  hintFontFamily: zOptionalString,
  hintFontWeight: zOptionalString,
  hintFontSize: zOptionalNumberOrString,
  hintLineHeight: zOptionalNumberOrString,
  hintColor: zColorValue.optional(),
})
export type LabeledValueConfigFinalProps = z.output<typeof zLabeledValueConfigFinalProps>

export const zLabeledValueConfigGeneralProps = z.object({})
export type LabeledValueConfigGeneralProps = z.output<typeof zLabeledValueConfigGeneralProps>

export const zLabeledValueConfigVariantProps = z.object({
  color: zLabeledValueConfigColorName.optional(),
})
export type LabeledValueConfigVariantProps = z.output<typeof zLabeledValueConfigVariantProps>

export const zLabeledValueConfigInput = z.object({
  general: zLabeledValueConfigGeneralProps.optional(),
  variant: z.record(zLabeledValueConfigVariantName, zLabeledValueConfigVariantProps).optional(),
  color: z.record(zLabeledValueConfigColorName, zLabeledValueConfigFinalProps).optional(),
  size: z.record(zLabeledValueConfigSizeName, zLabeledValueConfigFinalProps).optional(),
})
export type LabeledValueConfigInput = z.output<typeof zLabeledValueConfigInput>

export const defaultLabeledValueConfigInput: LabeledValueConfigInput = {
  general: {},
  variant: {},
  color: {
    default: {
      labelColor: $.color.semantic.symbol.secondary,
      valueColor: $.color.semantic.symbol.primary,
      hintColor: $.color.semantic.symbol.tertiary,
    },
  },
  size: {
    xs: {
      labelText: {
        variant: 'body-xs',
      },
      valueText: {
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
      valueText: {
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
      valueText: {
        variant: 'body-l',
      },
      hintText: {
        variant: 'body-xs',
      },
    },
    l: {
      labelText: {
        variant: 'body-l',
      },
      valueText: {
        variant: 'body-l',
      },
      hintText: {
        variant: 'body-l',
      },
    },
  },
}

export const normalizeLabeledValueConfig = (input: LabeledValueConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultLabeledValueConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultLabeledValueConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultLabeledValueConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultLabeledValueConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultLabeledValueConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultLabeledValueConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultLabeledValueConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      default: {
        ...defaultLabeledValueConfigInput.color?.default,
        ...input?.color?.default,
      },
    },
  }
}
export type LabeledValueConfig = ReturnType<typeof normalizeLabeledValueConfig>

export const normalizeLabeledValueColorName = (
  uinityConfig: UinityConfig,
  color?: LabeledValueConfigColorName | null | undefined
) => {
  if (color && uinityConfig.labeledValue.color[color]) {
    return color
  }
  return 'default'
}

export const normalizeLabeledValueSizeName = (
  uinityConfig: UinityConfig,
  size?: LabeledValueConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.labeledValue.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeLabeledValueVariantName = (
  uinityConfig: UinityConfig,
  variant?: LabeledValueConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.labeledValue.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getLabeledValueVariantProps = (
  uinityConfig: UinityConfig,
  variant?: LabeledValueConfigVariantName | undefined | null
) => {
  variant = normalizeLabeledValueVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.labeledValue.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getLabeledValueConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: LabeledValueConfigVariantName | undefined | null,
  color?: LabeledValueConfigColorName | undefined | null,
  size?: LabeledValueConfigSizeName | undefined | null
) => {
  const { variantColor } = getLabeledValueVariantProps(uinityConfig, variant)
  color = normalizeLabeledValueColorName(uinityConfig, color || variantColor)
  size = normalizeLabeledValueSizeName(uinityConfig, size)
  const result = {
    ...uinityConfig.labeledValue.color[color],
    ...uinityConfig.labeledValue.size[size],
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
  if (result.valueText) {
    const valueTextConfigFinalProps = getTextConfigFinalProps(
      uinityConfig,
      result.valueText.variant,
      result.valueText.font,
      result.valueText.weight,
      result.valueText.size,
      result.valueText.lineHeight,
      result.valueText.color
    )
    result.valueFontFamily = result.valueFontFamily ?? valueTextConfigFinalProps.fontFamily
    result.valueFontWeight = result.valueFontWeight ?? valueTextConfigFinalProps.fontWeight
    result.valueFontSize = result.valueFontSize ?? valueTextConfigFinalProps.fontSize
    result.valueLineHeight = result.valueLineHeight ?? valueTextConfigFinalProps.lineHeight
    result.valueColor = result.valueColor ?? valueTextConfigFinalProps.color
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
