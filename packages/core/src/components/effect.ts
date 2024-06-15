import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const effectConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zEffectConfigSizeName = z.enum(effectConfigSizesNames)
export type EffectConfigSizeName = z.output<typeof zEffectConfigSizeName>

export const effectConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zEffectConfigVariantName = z.enum(effectConfigVariantNames)
export type EffectConfigVariantName = z.output<typeof zEffectConfigVariantName>

export const effectConfigColorNames = ['brand', 'green', 'red'] as const
export const zEffectConfigColorName = z.enum(effectConfigColorNames)
export type EffectConfigColorName = z.output<typeof zEffectConfigColorName>

export const zEffectConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type EffectConfigSizeProps = z.output<typeof zEffectConfigSizeProps>

export const zEffectConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type EffectConfigAppearenceProps = z.output<typeof zEffectConfigAppearenceProps>

export const zEffectConfigFinalProps = zEffectConfigSizeProps.merge(zEffectConfigAppearenceProps)
export type EffectConfigFinalProps = z.output<typeof zEffectConfigFinalProps>

export const zEffectConfigGeneralProps = z.object({})
export type EffectConfigGeneralProps = z.output<typeof zEffectConfigGeneralProps>

export const zEffectConfigVariantProps = z.object({
  color: zEffectConfigColorName.optional(),
})
export type EffectConfigVariantProps = z.output<typeof zEffectConfigVariantProps>

export const zEffectConfigInput = z.object({
  general: zEffectConfigGeneralProps.optional(),
  variant: z.record(zEffectConfigVariantName, zEffectConfigVariantProps).optional(),
  color: z.record(zEffectConfigColorName, zEffectConfigAppearenceProps).optional(),
  size: z.record(zEffectConfigSizeName, zEffectConfigSizeProps).optional(),
})
export type EffectConfigInput = z.output<typeof zEffectConfigInput>

export const defaultEffectConfigInput: EffectConfigInput = {
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

export const normalizeEffectConfig = (input: EffectConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultEffectConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultEffectConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultEffectConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultEffectConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultEffectConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultEffectConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultEffectConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultEffectConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultEffectConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultEffectConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type EffectConfig = ReturnType<typeof normalizeEffectConfig>

export const normalizeEffectColorName = (
  uinityConfig: UinityConfig,
  color?: EffectConfigColorName | null | undefined
) => {
  if (color && uinityConfig.effect.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeEffectSizeName = (uinityConfig: UinityConfig, size?: EffectConfigSizeName | null | undefined) => {
  if (size && uinityConfig.effect.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeEffectVariantName = (
  uinityConfig: UinityConfig,
  variant?: EffectConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.effect.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getEffectVariantProps = (
  uinityConfig: UinityConfig,
  variant?: EffectConfigVariantName | undefined | null
) => {
  variant = normalizeEffectVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.effect.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getEffectConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: EffectConfigVariantName | undefined | null,
  color?: EffectConfigColorName | undefined | null,
  size?: EffectConfigSizeName | undefined | null
) => {
  const { variantColor } = getEffectVariantProps(uinityConfig, variant)
  color = normalizeEffectColorName(uinityConfig, color || variantColor)
  size = normalizeEffectSizeName(uinityConfig, size)
  return {
    ...uinityConfig.effect.color[color],
    ...uinityConfig.effect.size[size],
  }
}
