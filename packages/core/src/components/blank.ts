import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const blankConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zBlankConfigSizeName = z.enum(blankConfigSizesNames)
export type BlankConfigSizeName = z.output<typeof zBlankConfigSizeName>

export const blankConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zBlankConfigVariantName = z.enum(blankConfigVariantNames)
export type BlankConfigVariantName = z.output<typeof zBlankConfigVariantName>

export const blankConfigColorNames = ['brand', 'green', 'red'] as const
export const zBlankConfigColorName = z.enum(blankConfigColorNames)
export type BlankConfigColorName = z.output<typeof zBlankConfigColorName>

export const zBlankConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type BlankConfigSizeProps = z.output<typeof zBlankConfigSizeProps>

export const zBlankConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type BlankConfigAppearenceProps = z.output<typeof zBlankConfigAppearenceProps>

export const zBlankConfigFinalProps = zBlankConfigSizeProps.merge(zBlankConfigAppearenceProps)
export type BlankConfigFinalProps = z.output<typeof zBlankConfigFinalProps>

export const zBlankConfigGeneralProps = z.object({})
export type BlankConfigGeneralProps = z.output<typeof zBlankConfigGeneralProps>

export const zBlankConfigVariantProps = z.object({
  color: zBlankConfigColorName.optional(),
})
export type BlankConfigVariantProps = z.output<typeof zBlankConfigVariantProps>

export const zBlankConfigInput = z.object({
  general: zBlankConfigGeneralProps.optional(),
  variant: z.record(zBlankConfigVariantName, zBlankConfigVariantProps).optional(),
  color: z.record(zBlankConfigColorName, zBlankConfigAppearenceProps).optional(),
  size: z.record(zBlankConfigSizeName, zBlankConfigSizeProps).optional(),
})
export type BlankConfigInput = z.output<typeof zBlankConfigInput>

export const defaultBlankConfigInput: BlankConfigInput = {
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

export const normalizeBlankConfig = (input: BlankConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultBlankConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultBlankConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultBlankConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultBlankConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultBlankConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultBlankConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultBlankConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultBlankConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultBlankConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultBlankConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type BlankConfig = ReturnType<typeof normalizeBlankConfig>

export const normalizeBlankColorName = (
  uinityConfig: UinityConfig,
  color?: BlankConfigColorName | null | undefined
) => {
  if (color && uinityConfig.blank.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeBlankSizeName = (uinityConfig: UinityConfig, size?: BlankConfigSizeName | null | undefined) => {
  if (size && uinityConfig.blank.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeBlankVariantName = (
  uinityConfig: UinityConfig,
  variant?: BlankConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.blank.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getBlankVariantProps = (
  uinityConfig: UinityConfig,
  variant?: BlankConfigVariantName | undefined | null
) => {
  variant = normalizeBlankVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.blank.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getBlankConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: BlankConfigVariantName | undefined | null,
  color?: BlankConfigColorName | undefined | null,
  size?: BlankConfigSizeName | undefined | null
) => {
  const { variantColor } = getBlankVariantProps(uinityConfig, variant)
  color = normalizeBlankColorName(uinityConfig, color || variantColor)
  size = normalizeBlankSizeName(uinityConfig, size)
  return {
    ...uinityConfig.blank.color[color],
    ...uinityConfig.blank.size[size],
  }
}
