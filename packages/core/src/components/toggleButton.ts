import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const toggleButtonConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zToggleButtonConfigSizeName = z.enum(toggleButtonConfigSizesNames)
export type ToggleButtonConfigSizeName = z.output<typeof zToggleButtonConfigSizeName>

export const toggleButtonConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zToggleButtonConfigVariantName = z.enum(toggleButtonConfigVariantNames)
export type ToggleButtonConfigVariantName = z.output<typeof zToggleButtonConfigVariantName>

export const toggleButtonConfigColorNames = ['brand', 'green', 'red'] as const
export const zToggleButtonConfigColorName = z.enum(toggleButtonConfigColorNames)
export type ToggleButtonConfigColorName = z.output<typeof zToggleButtonConfigColorName>

export const zToggleButtonConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ToggleButtonConfigSizeProps = z.output<typeof zToggleButtonConfigSizeProps>

export const zToggleButtonConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ToggleButtonConfigAppearenceProps = z.output<typeof zToggleButtonConfigAppearenceProps>

export const zToggleButtonConfigFinalProps = zToggleButtonConfigSizeProps.merge(zToggleButtonConfigAppearenceProps)
export type ToggleButtonConfigFinalProps = z.output<typeof zToggleButtonConfigFinalProps>

export const zToggleButtonConfigGeneralProps = z.object({})
export type ToggleButtonConfigGeneralProps = z.output<typeof zToggleButtonConfigGeneralProps>

export const zToggleButtonConfigVariantProps = z.object({
  color: zToggleButtonConfigColorName.optional(),
})
export type ToggleButtonConfigVariantProps = z.output<typeof zToggleButtonConfigVariantProps>

export const zToggleButtonConfigInput = z.object({
  general: zToggleButtonConfigGeneralProps.optional(),
  variant: z.record(zToggleButtonConfigVariantName, zToggleButtonConfigVariantProps).optional(),
  color: z.record(zToggleButtonConfigColorName, zToggleButtonConfigAppearenceProps).optional(),
  size: z.record(zToggleButtonConfigSizeName, zToggleButtonConfigSizeProps).optional(),
})
export type ToggleButtonConfigInput = z.output<typeof zToggleButtonConfigInput>

export const defaultToggleButtonConfigInput: ToggleButtonConfigInput = {
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

export const normalizeToggleButtonConfig = (input: ToggleButtonConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultToggleButtonConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultToggleButtonConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultToggleButtonConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultToggleButtonConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultToggleButtonConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultToggleButtonConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultToggleButtonConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultToggleButtonConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultToggleButtonConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultToggleButtonConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ToggleButtonConfig = ReturnType<typeof normalizeToggleButtonConfig>

export const normalizeToggleButtonColorName = (
  uinityConfig: UinityConfig,
  color?: ToggleButtonConfigColorName | null | undefined
) => {
  if (color && uinityConfig.toggleButton.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeToggleButtonSizeName = (uinityConfig: UinityConfig, size?: ToggleButtonConfigSizeName | null | undefined) => {
  if (size && uinityConfig.toggleButton.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeToggleButtonVariantName = (
  uinityConfig: UinityConfig,
  variant?: ToggleButtonConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.toggleButton.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getToggleButtonVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ToggleButtonConfigVariantName | undefined | null
) => {
  variant = normalizeToggleButtonVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.toggleButton.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getToggleButtonConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ToggleButtonConfigVariantName | undefined | null,
  color?: ToggleButtonConfigColorName | undefined | null,
  size?: ToggleButtonConfigSizeName | undefined | null
) => {
  const { variantColor } = getToggleButtonVariantProps(uinityConfig, variant)
  color = normalizeToggleButtonColorName(uinityConfig, color || variantColor)
  size = normalizeToggleButtonSizeName(uinityConfig, size)
  return {
    ...uinityConfig.toggleButton.color[color],
    ...uinityConfig.toggleButton.size[size],
  }
}
