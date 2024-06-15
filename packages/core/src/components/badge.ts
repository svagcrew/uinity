import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const badgeConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zBadgeConfigSizeName = z.enum(badgeConfigSizesNames)
export type BadgeConfigSizeName = z.output<typeof zBadgeConfigSizeName>

export const badgeConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zBadgeConfigVariantName = z.enum(badgeConfigVariantNames)
export type BadgeConfigVariantName = z.output<typeof zBadgeConfigVariantName>

export const badgeConfigColorNames = ['brand', 'green', 'red'] as const
export const zBadgeConfigColorName = z.enum(badgeConfigColorNames)
export type BadgeConfigColorName = z.output<typeof zBadgeConfigColorName>

export const zBadgeConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type BadgeConfigSizeProps = z.output<typeof zBadgeConfigSizeProps>

export const zBadgeConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type BadgeConfigAppearenceProps = z.output<typeof zBadgeConfigAppearenceProps>

export const zBadgeConfigFinalProps = zBadgeConfigSizeProps.merge(zBadgeConfigAppearenceProps)
export type BadgeConfigFinalProps = z.output<typeof zBadgeConfigFinalProps>

export const zBadgeConfigGeneralProps = z.object({})
export type BadgeConfigGeneralProps = z.output<typeof zBadgeConfigGeneralProps>

export const zBadgeConfigVariantProps = z.object({
  color: zBadgeConfigColorName.optional(),
})
export type BadgeConfigVariantProps = z.output<typeof zBadgeConfigVariantProps>

export const zBadgeConfigInput = z.object({
  general: zBadgeConfigGeneralProps.optional(),
  variant: z.record(zBadgeConfigVariantName, zBadgeConfigVariantProps).optional(),
  color: z.record(zBadgeConfigColorName, zBadgeConfigAppearenceProps).optional(),
  size: z.record(zBadgeConfigSizeName, zBadgeConfigSizeProps).optional(),
})
export type BadgeConfigInput = z.output<typeof zBadgeConfigInput>

export const defaultBadgeConfigInput: BadgeConfigInput = {
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

export const normalizeBadgeConfig = (input: BadgeConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultBadgeConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultBadgeConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultBadgeConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultBadgeConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultBadgeConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultBadgeConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultBadgeConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultBadgeConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultBadgeConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultBadgeConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type BadgeConfig = ReturnType<typeof normalizeBadgeConfig>

export const normalizeBadgeColorName = (
  uinityConfig: UinityConfig,
  color?: BadgeConfigColorName | null | undefined
) => {
  if (color && uinityConfig.badge.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeBadgeSizeName = (uinityConfig: UinityConfig, size?: BadgeConfigSizeName | null | undefined) => {
  if (size && uinityConfig.badge.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeBadgeVariantName = (
  uinityConfig: UinityConfig,
  variant?: BadgeConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.badge.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getBadgeVariantProps = (
  uinityConfig: UinityConfig,
  variant?: BadgeConfigVariantName | undefined | null
) => {
  variant = normalizeBadgeVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.badge.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getBadgeConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: BadgeConfigVariantName | undefined | null,
  color?: BadgeConfigColorName | undefined | null,
  size?: BadgeConfigSizeName | undefined | null
) => {
  const { variantColor } = getBadgeVariantProps(uinityConfig, variant)
  color = normalizeBadgeColorName(uinityConfig, color || variantColor)
  size = normalizeBadgeSizeName(uinityConfig, size)
  return {
    ...uinityConfig.badge.color[color],
    ...uinityConfig.badge.size[size],
  }
}
