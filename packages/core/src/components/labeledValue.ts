import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const labeledValueConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zLabeledValueConfigSizeName = z.enum(labeledValueConfigSizesNames)
export type LabeledValueConfigSizeName = z.output<typeof zLabeledValueConfigSizeName>

export const labeledValueConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zLabeledValueConfigVariantName = z.enum(labeledValueConfigVariantNames)
export type LabeledValueConfigVariantName = z.output<typeof zLabeledValueConfigVariantName>

export const labeledValueConfigColorNames = ['brand', 'green', 'red'] as const
export const zLabeledValueConfigColorName = z.enum(labeledValueConfigColorNames)
export type LabeledValueConfigColorName = z.output<typeof zLabeledValueConfigColorName>

export const zLabeledValueConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type LabeledValueConfigSizeProps = z.output<typeof zLabeledValueConfigSizeProps>

export const zLabeledValueConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type LabeledValueConfigAppearenceProps = z.output<typeof zLabeledValueConfigAppearenceProps>

export const zLabeledValueConfigFinalProps = zLabeledValueConfigSizeProps.merge(zLabeledValueConfigAppearenceProps)
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
  color: z.record(zLabeledValueConfigColorName, zLabeledValueConfigAppearenceProps).optional(),
  size: z.record(zLabeledValueConfigSizeName, zLabeledValueConfigSizeProps).optional(),
})
export type LabeledValueConfigInput = z.output<typeof zLabeledValueConfigInput>

export const defaultLabeledValueConfigInput: LabeledValueConfigInput = {
  general: {},
  variant: {
    primary: {
      color: 'brand',
    },
    secondary: {
      color: 'green',
    },
    trietary: {
      color: 'red',
    },
  },
  color: {
    brand: {
      background: {
        light: $.color.core.brand[60],
        dark: $.color.core.brand[60],
      },
      childrenBackground: {
        light: $.color.core.brand[50],
        dark: $.color.core.brand[50],
      },
    },
    green: {
      background: {
        light: $.color.core.green[60],
        dark: $.color.core.green[60],
      },
      childrenBackground: {
        light: $.color.core.green[50],
        dark: $.color.core.green[50],
      },
    },
    red: {
      background: {
        light: $.color.core.red[60],
        dark: $.color.core.red[60],
      },
      childrenBackground: {
        light: $.color.core.red[50],
        dark: $.color.core.red[50],
      },
    },
  },
  size: {
    xs: {
      width: 16,
      height: 16,
    },
    s: {
      width: 24,
      height: 24,
    },
    m: {
      width: 32,
      height: 32,
    },
    l: {
      width: 40,
      height: 40,
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
      brand: {
        ...defaultLabeledValueConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultLabeledValueConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultLabeledValueConfigInput.color?.red,
        ...input?.color?.red,
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
  return 'brand'
}

export const normalizeLabeledValueSizeName = (uinityConfig: UinityConfig, size?: LabeledValueConfigSizeName | null | undefined) => {
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
  return {
    ...uinityConfig.labeledValue.color[color],
    ...uinityConfig.labeledValue.size[size],
  }
}
