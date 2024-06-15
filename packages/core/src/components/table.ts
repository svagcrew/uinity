import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const tableConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zTableConfigSizeName = z.enum(tableConfigSizesNames)
export type TableConfigSizeName = z.output<typeof zTableConfigSizeName>

export const tableConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zTableConfigVariantName = z.enum(tableConfigVariantNames)
export type TableConfigVariantName = z.output<typeof zTableConfigVariantName>

export const tableConfigColorNames = ['brand', 'green', 'red'] as const
export const zTableConfigColorName = z.enum(tableConfigColorNames)
export type TableConfigColorName = z.output<typeof zTableConfigColorName>

export const zTableConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type TableConfigSizeProps = z.output<typeof zTableConfigSizeProps>

export const zTableConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type TableConfigAppearenceProps = z.output<typeof zTableConfigAppearenceProps>

export const zTableConfigFinalProps = zTableConfigSizeProps.merge(zTableConfigAppearenceProps)
export type TableConfigFinalProps = z.output<typeof zTableConfigFinalProps>

export const zTableConfigGeneralProps = z.object({})
export type TableConfigGeneralProps = z.output<typeof zTableConfigGeneralProps>

export const zTableConfigVariantProps = z.object({
  color: zTableConfigColorName.optional(),
})
export type TableConfigVariantProps = z.output<typeof zTableConfigVariantProps>

export const zTableConfigInput = z.object({
  general: zTableConfigGeneralProps.optional(),
  variant: z.record(zTableConfigVariantName, zTableConfigVariantProps).optional(),
  color: z.record(zTableConfigColorName, zTableConfigAppearenceProps).optional(),
  size: z.record(zTableConfigSizeName, zTableConfigSizeProps).optional(),
})
export type TableConfigInput = z.output<typeof zTableConfigInput>

export const defaultTableConfigInput: TableConfigInput = {
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

export const normalizeTableConfig = (input: TableConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultTableConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultTableConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultTableConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultTableConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultTableConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultTableConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultTableConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultTableConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultTableConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultTableConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type TableConfig = ReturnType<typeof normalizeTableConfig>

export const normalizeTableColorName = (
  uinityConfig: UinityConfig,
  color?: TableConfigColorName | null | undefined
) => {
  if (color && uinityConfig.table.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeTableSizeName = (uinityConfig: UinityConfig, size?: TableConfigSizeName | null | undefined) => {
  if (size && uinityConfig.table.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeTableVariantName = (
  uinityConfig: UinityConfig,
  variant?: TableConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.table.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getTableVariantProps = (
  uinityConfig: UinityConfig,
  variant?: TableConfigVariantName | undefined | null
) => {
  variant = normalizeTableVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.table.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getTableConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: TableConfigVariantName | undefined | null,
  color?: TableConfigColorName | undefined | null,
  size?: TableConfigSizeName | undefined | null
) => {
  const { variantColor } = getTableVariantProps(uinityConfig, variant)
  color = normalizeTableColorName(uinityConfig, color || variantColor)
  size = normalizeTableSizeName(uinityConfig, size)
  return {
    ...uinityConfig.table.color[color],
    ...uinityConfig.table.size[size],
  }
}
