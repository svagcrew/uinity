import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const toggleSwitchConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zToggleSwitchConfigSizeName = z.enum(toggleSwitchConfigSizesNames)
export type ToggleSwitchConfigSizeName = z.output<typeof zToggleSwitchConfigSizeName>

export const toggleSwitchConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zToggleSwitchConfigVariantName = z.enum(toggleSwitchConfigVariantNames)
export type ToggleSwitchConfigVariantName = z.output<typeof zToggleSwitchConfigVariantName>

export const toggleSwitchConfigColorNames = ['brand', 'green', 'red'] as const
export const zToggleSwitchConfigColorName = z.enum(toggleSwitchConfigColorNames)
export type ToggleSwitchConfigColorName = z.output<typeof zToggleSwitchConfigColorName>

export const zToggleSwitchConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ToggleSwitchConfigSizeProps = z.output<typeof zToggleSwitchConfigSizeProps>

export const zToggleSwitchConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ToggleSwitchConfigAppearenceProps = z.output<typeof zToggleSwitchConfigAppearenceProps>

export const zToggleSwitchConfigFinalProps = zToggleSwitchConfigSizeProps.merge(zToggleSwitchConfigAppearenceProps)
export type ToggleSwitchConfigFinalProps = z.output<typeof zToggleSwitchConfigFinalProps>

export const zToggleSwitchConfigGeneralProps = z.object({})
export type ToggleSwitchConfigGeneralProps = z.output<typeof zToggleSwitchConfigGeneralProps>

export const zToggleSwitchConfigVariantProps = z.object({
  color: zToggleSwitchConfigColorName.optional(),
})
export type ToggleSwitchConfigVariantProps = z.output<typeof zToggleSwitchConfigVariantProps>

export const zToggleSwitchConfigInput = z.object({
  general: zToggleSwitchConfigGeneralProps.optional(),
  variant: z.record(zToggleSwitchConfigVariantName, zToggleSwitchConfigVariantProps).optional(),
  color: z.record(zToggleSwitchConfigColorName, zToggleSwitchConfigAppearenceProps).optional(),
  size: z.record(zToggleSwitchConfigSizeName, zToggleSwitchConfigSizeProps).optional(),
})
export type ToggleSwitchConfigInput = z.output<typeof zToggleSwitchConfigInput>

export const defaultToggleSwitchConfigInput: ToggleSwitchConfigInput = {
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

export const normalizeToggleSwitchConfig = (input: ToggleSwitchConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultToggleSwitchConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultToggleSwitchConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultToggleSwitchConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultToggleSwitchConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultToggleSwitchConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultToggleSwitchConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultToggleSwitchConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultToggleSwitchConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultToggleSwitchConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultToggleSwitchConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ToggleSwitchConfig = ReturnType<typeof normalizeToggleSwitchConfig>

export const normalizeToggleSwitchColorName = (
  uinityConfig: UinityConfig,
  color?: ToggleSwitchConfigColorName | null | undefined
) => {
  if (color && uinityConfig.toggleSwitch.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeToggleSwitchSizeName = (uinityConfig: UinityConfig, size?: ToggleSwitchConfigSizeName | null | undefined) => {
  if (size && uinityConfig.toggleSwitch.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeToggleSwitchVariantName = (
  uinityConfig: UinityConfig,
  variant?: ToggleSwitchConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.toggleSwitch.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getToggleSwitchVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ToggleSwitchConfigVariantName | undefined | null
) => {
  variant = normalizeToggleSwitchVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.toggleSwitch.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getToggleSwitchConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ToggleSwitchConfigVariantName | undefined | null,
  color?: ToggleSwitchConfigColorName | undefined | null,
  size?: ToggleSwitchConfigSizeName | undefined | null
) => {
  const { variantColor } = getToggleSwitchVariantProps(uinityConfig, variant)
  color = normalizeToggleSwitchColorName(uinityConfig, color || variantColor)
  size = normalizeToggleSwitchSizeName(uinityConfig, size)
  return {
    ...uinityConfig.toggleSwitch.color[color],
    ...uinityConfig.toggleSwitch.size[size],
  }
}
