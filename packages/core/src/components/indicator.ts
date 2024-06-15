import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const indicatorConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zIndicatorConfigSizeName = z.enum(indicatorConfigSizesNames)
export type IndicatorConfigSizeName = z.output<typeof zIndicatorConfigSizeName>

export const indicatorConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zIndicatorConfigVariantName = z.enum(indicatorConfigVariantNames)
export type IndicatorConfigVariantName = z.output<typeof zIndicatorConfigVariantName>

export const indicatorConfigColorNames = ['brand', 'green', 'red'] as const
export const zIndicatorConfigColorName = z.enum(indicatorConfigColorNames)
export type IndicatorConfigColorName = z.output<typeof zIndicatorConfigColorName>

export const zIndicatorConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type IndicatorConfigSizeProps = z.output<typeof zIndicatorConfigSizeProps>

export const zIndicatorConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type IndicatorConfigAppearenceProps = z.output<typeof zIndicatorConfigAppearenceProps>

export const zIndicatorConfigFinalProps = zIndicatorConfigSizeProps.merge(zIndicatorConfigAppearenceProps)
export type IndicatorConfigFinalProps = z.output<typeof zIndicatorConfigFinalProps>

export const zIndicatorConfigGeneralProps = z.object({})
export type IndicatorConfigGeneralProps = z.output<typeof zIndicatorConfigGeneralProps>

export const zIndicatorConfigVariantProps = z.object({
  color: zIndicatorConfigColorName.optional(),
})
export type IndicatorConfigVariantProps = z.output<typeof zIndicatorConfigVariantProps>

export const zIndicatorConfigInput = z.object({
  general: zIndicatorConfigGeneralProps.optional(),
  variant: z.record(zIndicatorConfigVariantName, zIndicatorConfigVariantProps).optional(),
  color: z.record(zIndicatorConfigColorName, zIndicatorConfigAppearenceProps).optional(),
  size: z.record(zIndicatorConfigSizeName, zIndicatorConfigSizeProps).optional(),
})
export type IndicatorConfigInput = z.output<typeof zIndicatorConfigInput>

export const defaultIndicatorConfigInput: IndicatorConfigInput = {
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

export const normalizeIndicatorConfig = (input: IndicatorConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultIndicatorConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultIndicatorConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultIndicatorConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultIndicatorConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultIndicatorConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultIndicatorConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultIndicatorConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultIndicatorConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultIndicatorConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultIndicatorConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type IndicatorConfig = ReturnType<typeof normalizeIndicatorConfig>

export const normalizeIndicatorColorName = (
  uinityConfig: UinityConfig,
  color?: IndicatorConfigColorName | null | undefined
) => {
  if (color && uinityConfig.indicator.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeIndicatorSizeName = (uinityConfig: UinityConfig, size?: IndicatorConfigSizeName | null | undefined) => {
  if (size && uinityConfig.indicator.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeIndicatorVariantName = (
  uinityConfig: UinityConfig,
  variant?: IndicatorConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.indicator.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getIndicatorVariantProps = (
  uinityConfig: UinityConfig,
  variant?: IndicatorConfigVariantName | undefined | null
) => {
  variant = normalizeIndicatorVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.indicator.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getIndicatorConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: IndicatorConfigVariantName | undefined | null,
  color?: IndicatorConfigColorName | undefined | null,
  size?: IndicatorConfigSizeName | undefined | null
) => {
  const { variantColor } = getIndicatorVariantProps(uinityConfig, variant)
  color = normalizeIndicatorColorName(uinityConfig, color || variantColor)
  size = normalizeIndicatorSizeName(uinityConfig, size)
  return {
    ...uinityConfig.indicator.color[color],
    ...uinityConfig.indicator.size[size],
  }
}
