import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const delimitedLineConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zDelimitedLineConfigSizeName = z.enum(delimitedLineConfigSizesNames)
export type DelimitedLineConfigSizeName = z.output<typeof zDelimitedLineConfigSizeName>

export const delimitedLineConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zDelimitedLineConfigVariantName = z.enum(delimitedLineConfigVariantNames)
export type DelimitedLineConfigVariantName = z.output<typeof zDelimitedLineConfigVariantName>

export const delimitedLineConfigColorNames = ['brand', 'green', 'red'] as const
export const zDelimitedLineConfigColorName = z.enum(delimitedLineConfigColorNames)
export type DelimitedLineConfigColorName = z.output<typeof zDelimitedLineConfigColorName>

export const zDelimitedLineConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type DelimitedLineConfigSizeProps = z.output<typeof zDelimitedLineConfigSizeProps>

export const zDelimitedLineConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type DelimitedLineConfigAppearenceProps = z.output<typeof zDelimitedLineConfigAppearenceProps>

export const zDelimitedLineConfigFinalProps = zDelimitedLineConfigSizeProps.merge(zDelimitedLineConfigAppearenceProps)
export type DelimitedLineConfigFinalProps = z.output<typeof zDelimitedLineConfigFinalProps>

export const zDelimitedLineConfigGeneralProps = z.object({})
export type DelimitedLineConfigGeneralProps = z.output<typeof zDelimitedLineConfigGeneralProps>

export const zDelimitedLineConfigVariantProps = z.object({
  color: zDelimitedLineConfigColorName.optional(),
})
export type DelimitedLineConfigVariantProps = z.output<typeof zDelimitedLineConfigVariantProps>

export const zDelimitedLineConfigInput = z.object({
  general: zDelimitedLineConfigGeneralProps.optional(),
  variant: z.record(zDelimitedLineConfigVariantName, zDelimitedLineConfigVariantProps).optional(),
  color: z.record(zDelimitedLineConfigColorName, zDelimitedLineConfigAppearenceProps).optional(),
  size: z.record(zDelimitedLineConfigSizeName, zDelimitedLineConfigSizeProps).optional(),
})
export type DelimitedLineConfigInput = z.output<typeof zDelimitedLineConfigInput>

export const defaultDelimitedLineConfigInput: DelimitedLineConfigInput = {
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

export const normalizeDelimitedLineConfig = (input: DelimitedLineConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultDelimitedLineConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultDelimitedLineConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultDelimitedLineConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultDelimitedLineConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultDelimitedLineConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultDelimitedLineConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultDelimitedLineConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultDelimitedLineConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultDelimitedLineConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultDelimitedLineConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type DelimitedLineConfig = ReturnType<typeof normalizeDelimitedLineConfig>

export const normalizeDelimitedLineColorName = (
  uinityConfig: UinityConfig,
  color?: DelimitedLineConfigColorName | null | undefined
) => {
  if (color && uinityConfig.delimitedLine.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeDelimitedLineSizeName = (uinityConfig: UinityConfig, size?: DelimitedLineConfigSizeName | null | undefined) => {
  if (size && uinityConfig.delimitedLine.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeDelimitedLineVariantName = (
  uinityConfig: UinityConfig,
  variant?: DelimitedLineConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.delimitedLine.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getDelimitedLineVariantProps = (
  uinityConfig: UinityConfig,
  variant?: DelimitedLineConfigVariantName | undefined | null
) => {
  variant = normalizeDelimitedLineVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.delimitedLine.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getDelimitedLineConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: DelimitedLineConfigVariantName | undefined | null,
  color?: DelimitedLineConfigColorName | undefined | null,
  size?: DelimitedLineConfigSizeName | undefined | null
) => {
  const { variantColor } = getDelimitedLineVariantProps(uinityConfig, variant)
  color = normalizeDelimitedLineColorName(uinityConfig, color || variantColor)
  size = normalizeDelimitedLineSizeName(uinityConfig, size)
  return {
    ...uinityConfig.delimitedLine.color[color],
    ...uinityConfig.delimitedLine.size[size],
  }
}
