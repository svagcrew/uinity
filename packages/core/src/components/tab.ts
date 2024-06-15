import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const tabConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zTabConfigSizeName = z.enum(tabConfigSizesNames)
export type TabConfigSizeName = z.output<typeof zTabConfigSizeName>

export const tabConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zTabConfigVariantName = z.enum(tabConfigVariantNames)
export type TabConfigVariantName = z.output<typeof zTabConfigVariantName>

export const tabConfigColorNames = ['brand', 'green', 'red'] as const
export const zTabConfigColorName = z.enum(tabConfigColorNames)
export type TabConfigColorName = z.output<typeof zTabConfigColorName>

export const zTabConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type TabConfigSizeProps = z.output<typeof zTabConfigSizeProps>

export const zTabConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type TabConfigAppearenceProps = z.output<typeof zTabConfigAppearenceProps>

export const zTabConfigFinalProps = zTabConfigSizeProps.merge(zTabConfigAppearenceProps)
export type TabConfigFinalProps = z.output<typeof zTabConfigFinalProps>

export const zTabConfigGeneralProps = z.object({})
export type TabConfigGeneralProps = z.output<typeof zTabConfigGeneralProps>

export const zTabConfigVariantProps = z.object({
  color: zTabConfigColorName.optional(),
})
export type TabConfigVariantProps = z.output<typeof zTabConfigVariantProps>

export const zTabConfigInput = z.object({
  general: zTabConfigGeneralProps.optional(),
  variant: z.record(zTabConfigVariantName, zTabConfigVariantProps).optional(),
  color: z.record(zTabConfigColorName, zTabConfigAppearenceProps).optional(),
  size: z.record(zTabConfigSizeName, zTabConfigSizeProps).optional(),
})
export type TabConfigInput = z.output<typeof zTabConfigInput>

export const defaultTabConfigInput: TabConfigInput = {
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

export const normalizeTabConfig = (input: TabConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultTabConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultTabConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultTabConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultTabConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultTabConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultTabConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultTabConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultTabConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultTabConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultTabConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type TabConfig = ReturnType<typeof normalizeTabConfig>

export const normalizeTabColorName = (
  uinityConfig: UinityConfig,
  color?: TabConfigColorName | null | undefined
) => {
  if (color && uinityConfig.tab.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeTabSizeName = (uinityConfig: UinityConfig, size?: TabConfigSizeName | null | undefined) => {
  if (size && uinityConfig.tab.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeTabVariantName = (
  uinityConfig: UinityConfig,
  variant?: TabConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.tab.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getTabVariantProps = (
  uinityConfig: UinityConfig,
  variant?: TabConfigVariantName | undefined | null
) => {
  variant = normalizeTabVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.tab.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getTabConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: TabConfigVariantName | undefined | null,
  color?: TabConfigColorName | undefined | null,
  size?: TabConfigSizeName | undefined | null
) => {
  const { variantColor } = getTabVariantProps(uinityConfig, variant)
  color = normalizeTabColorName(uinityConfig, color || variantColor)
  size = normalizeTabSizeName(uinityConfig, size)
  return {
    ...uinityConfig.tab.color[color],
    ...uinityConfig.tab.size[size],
  }
}
