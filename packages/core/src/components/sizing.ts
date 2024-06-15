import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const sizingConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zSizingConfigSizeName = z.enum(sizingConfigSizesNames)
export type SizingConfigSizeName = z.output<typeof zSizingConfigSizeName>

export const sizingConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zSizingConfigVariantName = z.enum(sizingConfigVariantNames)
export type SizingConfigVariantName = z.output<typeof zSizingConfigVariantName>

export const sizingConfigColorNames = ['brand', 'green', 'red'] as const
export const zSizingConfigColorName = z.enum(sizingConfigColorNames)
export type SizingConfigColorName = z.output<typeof zSizingConfigColorName>

export const zSizingConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type SizingConfigSizeProps = z.output<typeof zSizingConfigSizeProps>

export const zSizingConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type SizingConfigAppearenceProps = z.output<typeof zSizingConfigAppearenceProps>

export const zSizingConfigFinalProps = zSizingConfigSizeProps.merge(zSizingConfigAppearenceProps)
export type SizingConfigFinalProps = z.output<typeof zSizingConfigFinalProps>

export const zSizingConfigGeneralProps = z.object({})
export type SizingConfigGeneralProps = z.output<typeof zSizingConfigGeneralProps>

export const zSizingConfigVariantProps = z.object({
  color: zSizingConfigColorName.optional(),
})
export type SizingConfigVariantProps = z.output<typeof zSizingConfigVariantProps>

export const zSizingConfigInput = z.object({
  general: zSizingConfigGeneralProps.optional(),
  variant: z.record(zSizingConfigVariantName, zSizingConfigVariantProps).optional(),
  color: z.record(zSizingConfigColorName, zSizingConfigAppearenceProps).optional(),
  size: z.record(zSizingConfigSizeName, zSizingConfigSizeProps).optional(),
})
export type SizingConfigInput = z.output<typeof zSizingConfigInput>

export const defaultSizingConfigInput: SizingConfigInput = {
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

export const normalizeSizingConfig = (input: SizingConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultSizingConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultSizingConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultSizingConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultSizingConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultSizingConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultSizingConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultSizingConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultSizingConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultSizingConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultSizingConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type SizingConfig = ReturnType<typeof normalizeSizingConfig>

export const normalizeSizingColorName = (
  uinityConfig: UinityConfig,
  color?: SizingConfigColorName | null | undefined
) => {
  if (color && uinityConfig.sizing.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeSizingSizeName = (uinityConfig: UinityConfig, size?: SizingConfigSizeName | null | undefined) => {
  if (size && uinityConfig.sizing.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeSizingVariantName = (
  uinityConfig: UinityConfig,
  variant?: SizingConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.sizing.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getSizingVariantProps = (
  uinityConfig: UinityConfig,
  variant?: SizingConfigVariantName | undefined | null
) => {
  variant = normalizeSizingVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.sizing.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getSizingConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: SizingConfigVariantName | undefined | null,
  color?: SizingConfigColorName | undefined | null,
  size?: SizingConfigSizeName | undefined | null
) => {
  const { variantColor } = getSizingVariantProps(uinityConfig, variant)
  color = normalizeSizingColorName(uinityConfig, color || variantColor)
  size = normalizeSizingSizeName(uinityConfig, size)
  return {
    ...uinityConfig.sizing.color[color],
    ...uinityConfig.sizing.size[size],
  }
}
