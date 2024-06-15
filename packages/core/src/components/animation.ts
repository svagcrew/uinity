import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const animationConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zAnimationConfigSizeName = z.enum(animationConfigSizesNames)
export type AnimationConfigSizeName = z.output<typeof zAnimationConfigSizeName>

export const animationConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zAnimationConfigVariantName = z.enum(animationConfigVariantNames)
export type AnimationConfigVariantName = z.output<typeof zAnimationConfigVariantName>

export const animationConfigColorNames = ['brand', 'green', 'red'] as const
export const zAnimationConfigColorName = z.enum(animationConfigColorNames)
export type AnimationConfigColorName = z.output<typeof zAnimationConfigColorName>

export const zAnimationConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type AnimationConfigSizeProps = z.output<typeof zAnimationConfigSizeProps>

export const zAnimationConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type AnimationConfigAppearenceProps = z.output<typeof zAnimationConfigAppearenceProps>

export const zAnimationConfigFinalProps = zAnimationConfigSizeProps.merge(zAnimationConfigAppearenceProps)
export type AnimationConfigFinalProps = z.output<typeof zAnimationConfigFinalProps>

export const zAnimationConfigGeneralProps = z.object({})
export type AnimationConfigGeneralProps = z.output<typeof zAnimationConfigGeneralProps>

export const zAnimationConfigVariantProps = z.object({
  color: zAnimationConfigColorName.optional(),
})
export type AnimationConfigVariantProps = z.output<typeof zAnimationConfigVariantProps>

export const zAnimationConfigInput = z.object({
  general: zAnimationConfigGeneralProps.optional(),
  variant: z.record(zAnimationConfigVariantName, zAnimationConfigVariantProps).optional(),
  color: z.record(zAnimationConfigColorName, zAnimationConfigAppearenceProps).optional(),
  size: z.record(zAnimationConfigSizeName, zAnimationConfigSizeProps).optional(),
})
export type AnimationConfigInput = z.output<typeof zAnimationConfigInput>

export const defaultAnimationConfigInput: AnimationConfigInput = {
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

export const normalizeAnimationConfig = (input: AnimationConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultAnimationConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultAnimationConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultAnimationConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultAnimationConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultAnimationConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultAnimationConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultAnimationConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultAnimationConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultAnimationConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultAnimationConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type AnimationConfig = ReturnType<typeof normalizeAnimationConfig>

export const normalizeAnimationColorName = (
  uinityConfig: UinityConfig,
  color?: AnimationConfigColorName | null | undefined
) => {
  if (color && uinityConfig.animation.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeAnimationSizeName = (uinityConfig: UinityConfig, size?: AnimationConfigSizeName | null | undefined) => {
  if (size && uinityConfig.animation.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeAnimationVariantName = (
  uinityConfig: UinityConfig,
  variant?: AnimationConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.animation.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getAnimationVariantProps = (
  uinityConfig: UinityConfig,
  variant?: AnimationConfigVariantName | undefined | null
) => {
  variant = normalizeAnimationVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.animation.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getAnimationConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: AnimationConfigVariantName | undefined | null,
  color?: AnimationConfigColorName | undefined | null,
  size?: AnimationConfigSizeName | undefined | null
) => {
  const { variantColor } = getAnimationVariantProps(uinityConfig, variant)
  color = normalizeAnimationColorName(uinityConfig, color || variantColor)
  size = normalizeAnimationSizeName(uinityConfig, size)
  return {
    ...uinityConfig.animation.color[color],
    ...uinityConfig.animation.size[size],
  }
}
