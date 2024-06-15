import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const dividerConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zDividerConfigSizeName = z.enum(dividerConfigSizesNames)
export type DividerConfigSizeName = z.output<typeof zDividerConfigSizeName>

export const dividerConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zDividerConfigVariantName = z.enum(dividerConfigVariantNames)
export type DividerConfigVariantName = z.output<typeof zDividerConfigVariantName>

export const dividerConfigColorNames = ['brand', 'green', 'red'] as const
export const zDividerConfigColorName = z.enum(dividerConfigColorNames)
export type DividerConfigColorName = z.output<typeof zDividerConfigColorName>

export const zDividerConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type DividerConfigSizeProps = z.output<typeof zDividerConfigSizeProps>

export const zDividerConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type DividerConfigAppearenceProps = z.output<typeof zDividerConfigAppearenceProps>

export const zDividerConfigFinalProps = zDividerConfigSizeProps.merge(zDividerConfigAppearenceProps)
export type DividerConfigFinalProps = z.output<typeof zDividerConfigFinalProps>

export const zDividerConfigGeneralProps = z.object({})
export type DividerConfigGeneralProps = z.output<typeof zDividerConfigGeneralProps>

export const zDividerConfigVariantProps = z.object({
  color: zDividerConfigColorName.optional(),
})
export type DividerConfigVariantProps = z.output<typeof zDividerConfigVariantProps>

export const zDividerConfigInput = z.object({
  general: zDividerConfigGeneralProps.optional(),
  variant: z.record(zDividerConfigVariantName, zDividerConfigVariantProps).optional(),
  color: z.record(zDividerConfigColorName, zDividerConfigAppearenceProps).optional(),
  size: z.record(zDividerConfigSizeName, zDividerConfigSizeProps).optional(),
})
export type DividerConfigInput = z.output<typeof zDividerConfigInput>

export const defaultDividerConfigInput: DividerConfigInput = {
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

export const normalizeDividerConfig = (input: DividerConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultDividerConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultDividerConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultDividerConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultDividerConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultDividerConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultDividerConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultDividerConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultDividerConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultDividerConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultDividerConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type DividerConfig = ReturnType<typeof normalizeDividerConfig>

export const normalizeDividerColorName = (
  uinityConfig: UinityConfig,
  color?: DividerConfigColorName | null | undefined
) => {
  if (color && uinityConfig.divider.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeDividerSizeName = (uinityConfig: UinityConfig, size?: DividerConfigSizeName | null | undefined) => {
  if (size && uinityConfig.divider.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeDividerVariantName = (
  uinityConfig: UinityConfig,
  variant?: DividerConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.divider.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getDividerVariantProps = (
  uinityConfig: UinityConfig,
  variant?: DividerConfigVariantName | undefined | null
) => {
  variant = normalizeDividerVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.divider.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getDividerConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: DividerConfigVariantName | undefined | null,
  color?: DividerConfigColorName | undefined | null,
  size?: DividerConfigSizeName | undefined | null
) => {
  const { variantColor } = getDividerVariantProps(uinityConfig, variant)
  color = normalizeDividerColorName(uinityConfig, color || variantColor)
  size = normalizeDividerSizeName(uinityConfig, size)
  return {
    ...uinityConfig.divider.color[color],
    ...uinityConfig.divider.size[size],
  }
}
