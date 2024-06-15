import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const selectConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zSelectConfigSizeName = z.enum(selectConfigSizesNames)
export type SelectConfigSizeName = z.output<typeof zSelectConfigSizeName>

export const selectConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zSelectConfigVariantName = z.enum(selectConfigVariantNames)
export type SelectConfigVariantName = z.output<typeof zSelectConfigVariantName>

export const selectConfigColorNames = ['brand', 'green', 'red'] as const
export const zSelectConfigColorName = z.enum(selectConfigColorNames)
export type SelectConfigColorName = z.output<typeof zSelectConfigColorName>

export const zSelectConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type SelectConfigSizeProps = z.output<typeof zSelectConfigSizeProps>

export const zSelectConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type SelectConfigAppearenceProps = z.output<typeof zSelectConfigAppearenceProps>

export const zSelectConfigFinalProps = zSelectConfigSizeProps.merge(zSelectConfigAppearenceProps)
export type SelectConfigFinalProps = z.output<typeof zSelectConfigFinalProps>

export const zSelectConfigGeneralProps = z.object({})
export type SelectConfigGeneralProps = z.output<typeof zSelectConfigGeneralProps>

export const zSelectConfigVariantProps = z.object({
  color: zSelectConfigColorName.optional(),
})
export type SelectConfigVariantProps = z.output<typeof zSelectConfigVariantProps>

export const zSelectConfigInput = z.object({
  general: zSelectConfigGeneralProps.optional(),
  variant: z.record(zSelectConfigVariantName, zSelectConfigVariantProps).optional(),
  color: z.record(zSelectConfigColorName, zSelectConfigAppearenceProps).optional(),
  size: z.record(zSelectConfigSizeName, zSelectConfigSizeProps).optional(),
})
export type SelectConfigInput = z.output<typeof zSelectConfigInput>

export const defaultSelectConfigInput: SelectConfigInput = {
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

export const normalizeSelectConfig = (input: SelectConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultSelectConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultSelectConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultSelectConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultSelectConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultSelectConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultSelectConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultSelectConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultSelectConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultSelectConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultSelectConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type SelectConfig = ReturnType<typeof normalizeSelectConfig>

export const normalizeSelectColorName = (
  uinityConfig: UinityConfig,
  color?: SelectConfigColorName | null | undefined
) => {
  if (color && uinityConfig.select.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeSelectSizeName = (uinityConfig: UinityConfig, size?: SelectConfigSizeName | null | undefined) => {
  if (size && uinityConfig.select.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeSelectVariantName = (
  uinityConfig: UinityConfig,
  variant?: SelectConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.select.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getSelectVariantProps = (
  uinityConfig: UinityConfig,
  variant?: SelectConfigVariantName | undefined | null
) => {
  variant = normalizeSelectVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.select.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getSelectConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: SelectConfigVariantName | undefined | null,
  color?: SelectConfigColorName | undefined | null,
  size?: SelectConfigSizeName | undefined | null
) => {
  const { variantColor } = getSelectVariantProps(uinityConfig, variant)
  color = normalizeSelectColorName(uinityConfig, color || variantColor)
  size = normalizeSelectSizeName(uinityConfig, size)
  return {
    ...uinityConfig.select.color[color],
    ...uinityConfig.select.size[size],
  }
}
