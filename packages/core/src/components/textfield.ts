import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const textfieldConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zTextfieldConfigSizeName = z.enum(textfieldConfigSizesNames)
export type TextfieldConfigSizeName = z.output<typeof zTextfieldConfigSizeName>

export const textfieldConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zTextfieldConfigVariantName = z.enum(textfieldConfigVariantNames)
export type TextfieldConfigVariantName = z.output<typeof zTextfieldConfigVariantName>

export const textfieldConfigColorNames = ['brand', 'green', 'red'] as const
export const zTextfieldConfigColorName = z.enum(textfieldConfigColorNames)
export type TextfieldConfigColorName = z.output<typeof zTextfieldConfigColorName>

export const zTextfieldConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  maxWidth: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type TextfieldConfigSizeProps = z.output<typeof zTextfieldConfigSizeProps>

export const zTextfieldConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type TextfieldConfigAppearenceProps = z.output<typeof zTextfieldConfigAppearenceProps>

export const zTextfieldConfigFinalProps = zTextfieldConfigSizeProps.merge(zTextfieldConfigAppearenceProps)
export type TextfieldConfigFinalProps = z.output<typeof zTextfieldConfigFinalProps>

export const zTextfieldConfigGeneralProps = z.object({})
export type TextfieldConfigGeneralProps = z.output<typeof zTextfieldConfigGeneralProps>

export const zTextfieldConfigVariantProps = z.object({
  color: zTextfieldConfigColorName.optional(),
})
export type TextfieldConfigVariantProps = z.output<typeof zTextfieldConfigVariantProps>

export const zTextfieldConfigInput = z.object({
  general: zTextfieldConfigGeneralProps.optional(),
  variant: z.record(zTextfieldConfigVariantName, zTextfieldConfigVariantProps).optional(),
  color: z.record(zTextfieldConfigColorName, zTextfieldConfigAppearenceProps).optional(),
  size: z.record(zTextfieldConfigSizeName, zTextfieldConfigSizeProps).optional(),
})
export type TextfieldConfigInput = z.output<typeof zTextfieldConfigInput>

export const defaultTextfieldConfigInput: TextfieldConfigInput = {
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
      height: 16,
      maxWidth: 320,
    },
    s: {
      height: 24,
      maxWidth: 320,
    },
    m: {
      height: 32,
      maxWidth: 320,
    },
    l: {
      height: 40,
      maxWidth: 320,
    },
  },
}

export const normalizeTextfieldConfig = (input: TextfieldConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultTextfieldConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultTextfieldConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultTextfieldConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultTextfieldConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultTextfieldConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultTextfieldConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultTextfieldConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultTextfieldConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultTextfieldConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultTextfieldConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type TextfieldConfig = ReturnType<typeof normalizeTextfieldConfig>

export const normalizeTextfieldColorName = (
  uinityConfig: UinityConfig,
  color?: TextfieldConfigColorName | null | undefined
) => {
  if (color && uinityConfig.textfield.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeTextfieldSizeName = (
  uinityConfig: UinityConfig,
  size?: TextfieldConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.textfield.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeTextfieldVariantName = (
  uinityConfig: UinityConfig,
  variant?: TextfieldConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.textfield.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getTextfieldVariantProps = (
  uinityConfig: UinityConfig,
  variant?: TextfieldConfigVariantName | undefined | null
) => {
  variant = normalizeTextfieldVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.textfield.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getTextfieldConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: TextfieldConfigVariantName | undefined | null,
  color?: TextfieldConfigColorName | undefined | null,
  size?: TextfieldConfigSizeName | undefined | null
) => {
  const { variantColor } = getTextfieldVariantProps(uinityConfig, variant)
  color = normalizeTextfieldColorName(uinityConfig, color || variantColor)
  size = normalizeTextfieldSizeName(uinityConfig, size)
  return {
    ...uinityConfig.textfield.color[color],
    ...uinityConfig.textfield.size[size],
  }
}
