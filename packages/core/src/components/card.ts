import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const cardConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zCardConfigSizeName = z.enum(cardConfigSizesNames)
export type CardConfigSizeName = z.output<typeof zCardConfigSizeName>

export const cardConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zCardConfigVariantName = z.enum(cardConfigVariantNames)
export type CardConfigVariantName = z.output<typeof zCardConfigVariantName>

export const cardConfigColorNames = ['brand', 'green', 'red'] as const
export const zCardConfigColorName = z.enum(cardConfigColorNames)
export type CardConfigColorName = z.output<typeof zCardConfigColorName>

export const zCardConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type CardConfigSizeProps = z.output<typeof zCardConfigSizeProps>

export const zCardConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type CardConfigAppearenceProps = z.output<typeof zCardConfigAppearenceProps>

export const zCardConfigFinalProps = zCardConfigSizeProps.merge(zCardConfigAppearenceProps)
export type CardConfigFinalProps = z.output<typeof zCardConfigFinalProps>

export const zCardConfigGeneralProps = z.object({})
export type CardConfigGeneralProps = z.output<typeof zCardConfigGeneralProps>

export const zCardConfigVariantProps = z.object({
  color: zCardConfigColorName.optional(),
})
export type CardConfigVariantProps = z.output<typeof zCardConfigVariantProps>

export const zCardConfigInput = z.object({
  general: zCardConfigGeneralProps.optional(),
  variant: z.record(zCardConfigVariantName, zCardConfigVariantProps).optional(),
  color: z.record(zCardConfigColorName, zCardConfigAppearenceProps).optional(),
  size: z.record(zCardConfigSizeName, zCardConfigSizeProps).optional(),
})
export type CardConfigInput = z.output<typeof zCardConfigInput>

export const defaultCardConfigInput: CardConfigInput = {
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

export const normalizeCardConfig = (input: CardConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultCardConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultCardConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultCardConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultCardConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultCardConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultCardConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultCardConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultCardConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultCardConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultCardConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type CardConfig = ReturnType<typeof normalizeCardConfig>

export const normalizeCardColorName = (
  uinityConfig: UinityConfig,
  color?: CardConfigColorName | null | undefined
) => {
  if (color && uinityConfig.card.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeCardSizeName = (uinityConfig: UinityConfig, size?: CardConfigSizeName | null | undefined) => {
  if (size && uinityConfig.card.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeCardVariantName = (
  uinityConfig: UinityConfig,
  variant?: CardConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.card.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getCardVariantProps = (
  uinityConfig: UinityConfig,
  variant?: CardConfigVariantName | undefined | null
) => {
  variant = normalizeCardVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.card.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getCardConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: CardConfigVariantName | undefined | null,
  color?: CardConfigColorName | undefined | null,
  size?: CardConfigSizeName | undefined | null
) => {
  const { variantColor } = getCardVariantProps(uinityConfig, variant)
  color = normalizeCardColorName(uinityConfig, color || variantColor)
  size = normalizeCardSizeName(uinityConfig, size)
  return {
    ...uinityConfig.card.color[color],
    ...uinityConfig.card.size[size],
  }
}
