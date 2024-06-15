import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const avatarConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zAvatarConfigSizeName = z.enum(avatarConfigSizesNames)
export type AvatarConfigSizeName = z.output<typeof zAvatarConfigSizeName>

export const avatarConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zAvatarConfigVariantName = z.enum(avatarConfigVariantNames)
export type AvatarConfigVariantName = z.output<typeof zAvatarConfigVariantName>

export const avatarConfigColorNames = ['brand', 'green', 'red'] as const
export const zAvatarConfigColorName = z.enum(avatarConfigColorNames)
export type AvatarConfigColorName = z.output<typeof zAvatarConfigColorName>

export const zAvatarConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type AvatarConfigSizeProps = z.output<typeof zAvatarConfigSizeProps>

export const zAvatarConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type AvatarConfigAppearenceProps = z.output<typeof zAvatarConfigAppearenceProps>

export const zAvatarConfigFinalProps = zAvatarConfigSizeProps.merge(zAvatarConfigAppearenceProps)
export type AvatarConfigFinalProps = z.output<typeof zAvatarConfigFinalProps>

export const zAvatarConfigGeneralProps = z.object({})
export type AvatarConfigGeneralProps = z.output<typeof zAvatarConfigGeneralProps>

export const zAvatarConfigVariantProps = z.object({
  color: zAvatarConfigColorName.optional(),
})
export type AvatarConfigVariantProps = z.output<typeof zAvatarConfigVariantProps>

export const zAvatarConfigInput = z.object({
  general: zAvatarConfigGeneralProps.optional(),
  variant: z.record(zAvatarConfigVariantName, zAvatarConfigVariantProps).optional(),
  color: z.record(zAvatarConfigColorName, zAvatarConfigAppearenceProps).optional(),
  size: z.record(zAvatarConfigSizeName, zAvatarConfigSizeProps).optional(),
})
export type AvatarConfigInput = z.output<typeof zAvatarConfigInput>

export const defaultAvatarConfigInput: AvatarConfigInput = {
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

export const normalizeAvatarConfig = (input: AvatarConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultAvatarConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultAvatarConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultAvatarConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultAvatarConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultAvatarConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultAvatarConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultAvatarConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultAvatarConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultAvatarConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultAvatarConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type AvatarConfig = ReturnType<typeof normalizeAvatarConfig>

export const normalizeAvatarColorName = (
  uinityConfig: UinityConfig,
  color?: AvatarConfigColorName | null | undefined
) => {
  if (color && uinityConfig.avatar.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeAvatarSizeName = (uinityConfig: UinityConfig, size?: AvatarConfigSizeName | null | undefined) => {
  if (size && uinityConfig.avatar.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeAvatarVariantName = (
  uinityConfig: UinityConfig,
  variant?: AvatarConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.avatar.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getAvatarVariantProps = (
  uinityConfig: UinityConfig,
  variant?: AvatarConfigVariantName | undefined | null
) => {
  variant = normalizeAvatarVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.avatar.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getAvatarConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: AvatarConfigVariantName | undefined | null,
  color?: AvatarConfigColorName | undefined | null,
  size?: AvatarConfigSizeName | undefined | null
) => {
  const { variantColor } = getAvatarVariantProps(uinityConfig, variant)
  color = normalizeAvatarColorName(uinityConfig, color || variantColor)
  size = normalizeAvatarSizeName(uinityConfig, size)
  return {
    ...uinityConfig.avatar.color[color],
    ...uinityConfig.avatar.size[size],
  }
}
