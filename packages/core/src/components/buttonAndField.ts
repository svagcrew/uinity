import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const buttonAndFieldConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zButtonAndFieldConfigSizeName = z.enum(buttonAndFieldConfigSizesNames)
export type ButtonAndFieldConfigSizeName = z.output<typeof zButtonAndFieldConfigSizeName>

export const buttonAndFieldConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zButtonAndFieldConfigVariantName = z.enum(buttonAndFieldConfigVariantNames)
export type ButtonAndFieldConfigVariantName = z.output<typeof zButtonAndFieldConfigVariantName>

export const buttonAndFieldConfigColorNames = ['brand', 'green', 'red'] as const
export const zButtonAndFieldConfigColorName = z.enum(buttonAndFieldConfigColorNames)
export type ButtonAndFieldConfigColorName = z.output<typeof zButtonAndFieldConfigColorName>

export const zButtonAndFieldConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ButtonAndFieldConfigSizeProps = z.output<typeof zButtonAndFieldConfigSizeProps>

export const zButtonAndFieldConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ButtonAndFieldConfigAppearenceProps = z.output<typeof zButtonAndFieldConfigAppearenceProps>

export const zButtonAndFieldConfigFinalProps = zButtonAndFieldConfigSizeProps.merge(zButtonAndFieldConfigAppearenceProps)
export type ButtonAndFieldConfigFinalProps = z.output<typeof zButtonAndFieldConfigFinalProps>

export const zButtonAndFieldConfigGeneralProps = z.object({})
export type ButtonAndFieldConfigGeneralProps = z.output<typeof zButtonAndFieldConfigGeneralProps>

export const zButtonAndFieldConfigVariantProps = z.object({
  color: zButtonAndFieldConfigColorName.optional(),
})
export type ButtonAndFieldConfigVariantProps = z.output<typeof zButtonAndFieldConfigVariantProps>

export const zButtonAndFieldConfigInput = z.object({
  general: zButtonAndFieldConfigGeneralProps.optional(),
  variant: z.record(zButtonAndFieldConfigVariantName, zButtonAndFieldConfigVariantProps).optional(),
  color: z.record(zButtonAndFieldConfigColorName, zButtonAndFieldConfigAppearenceProps).optional(),
  size: z.record(zButtonAndFieldConfigSizeName, zButtonAndFieldConfigSizeProps).optional(),
})
export type ButtonAndFieldConfigInput = z.output<typeof zButtonAndFieldConfigInput>

export const defaultButtonAndFieldConfigInput: ButtonAndFieldConfigInput = {
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

export const normalizeButtonAndFieldConfig = (input: ButtonAndFieldConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultButtonAndFieldConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultButtonAndFieldConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultButtonAndFieldConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultButtonAndFieldConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultButtonAndFieldConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultButtonAndFieldConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultButtonAndFieldConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultButtonAndFieldConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultButtonAndFieldConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultButtonAndFieldConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ButtonAndFieldConfig = ReturnType<typeof normalizeButtonAndFieldConfig>

export const normalizeButtonAndFieldColorName = (
  uinityConfig: UinityConfig,
  color?: ButtonAndFieldConfigColorName | null | undefined
) => {
  if (color && uinityConfig.buttonAndField.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeButtonAndFieldSizeName = (uinityConfig: UinityConfig, size?: ButtonAndFieldConfigSizeName | null | undefined) => {
  if (size && uinityConfig.buttonAndField.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeButtonAndFieldVariantName = (
  uinityConfig: UinityConfig,
  variant?: ButtonAndFieldConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.buttonAndField.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getButtonAndFieldVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ButtonAndFieldConfigVariantName | undefined | null
) => {
  variant = normalizeButtonAndFieldVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.buttonAndField.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getButtonAndFieldConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ButtonAndFieldConfigVariantName | undefined | null,
  color?: ButtonAndFieldConfigColorName | undefined | null,
  size?: ButtonAndFieldConfigSizeName | undefined | null
) => {
  const { variantColor } = getButtonAndFieldVariantProps(uinityConfig, variant)
  color = normalizeButtonAndFieldColorName(uinityConfig, color || variantColor)
  size = normalizeButtonAndFieldSizeName(uinityConfig, size)
  return {
    ...uinityConfig.buttonAndField.color[color],
    ...uinityConfig.buttonAndField.size[size],
  }
}
