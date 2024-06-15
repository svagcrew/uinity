import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const contextMenuItemConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zContextMenuItemConfigSizeName = z.enum(contextMenuItemConfigSizesNames)
export type ContextMenuItemConfigSizeName = z.output<typeof zContextMenuItemConfigSizeName>

export const contextMenuItemConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zContextMenuItemConfigVariantName = z.enum(contextMenuItemConfigVariantNames)
export type ContextMenuItemConfigVariantName = z.output<typeof zContextMenuItemConfigVariantName>

export const contextMenuItemConfigColorNames = ['brand', 'green', 'red'] as const
export const zContextMenuItemConfigColorName = z.enum(contextMenuItemConfigColorNames)
export type ContextMenuItemConfigColorName = z.output<typeof zContextMenuItemConfigColorName>

export const zContextMenuItemConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ContextMenuItemConfigSizeProps = z.output<typeof zContextMenuItemConfigSizeProps>

export const zContextMenuItemConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ContextMenuItemConfigAppearenceProps = z.output<typeof zContextMenuItemConfigAppearenceProps>

export const zContextMenuItemConfigFinalProps = zContextMenuItemConfigSizeProps.merge(zContextMenuItemConfigAppearenceProps)
export type ContextMenuItemConfigFinalProps = z.output<typeof zContextMenuItemConfigFinalProps>

export const zContextMenuItemConfigGeneralProps = z.object({})
export type ContextMenuItemConfigGeneralProps = z.output<typeof zContextMenuItemConfigGeneralProps>

export const zContextMenuItemConfigVariantProps = z.object({
  color: zContextMenuItemConfigColorName.optional(),
})
export type ContextMenuItemConfigVariantProps = z.output<typeof zContextMenuItemConfigVariantProps>

export const zContextMenuItemConfigInput = z.object({
  general: zContextMenuItemConfigGeneralProps.optional(),
  variant: z.record(zContextMenuItemConfigVariantName, zContextMenuItemConfigVariantProps).optional(),
  color: z.record(zContextMenuItemConfigColorName, zContextMenuItemConfigAppearenceProps).optional(),
  size: z.record(zContextMenuItemConfigSizeName, zContextMenuItemConfigSizeProps).optional(),
})
export type ContextMenuItemConfigInput = z.output<typeof zContextMenuItemConfigInput>

export const defaultContextMenuItemConfigInput: ContextMenuItemConfigInput = {
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

export const normalizeContextMenuItemConfig = (input: ContextMenuItemConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultContextMenuItemConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultContextMenuItemConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultContextMenuItemConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultContextMenuItemConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultContextMenuItemConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultContextMenuItemConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultContextMenuItemConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultContextMenuItemConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultContextMenuItemConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultContextMenuItemConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ContextMenuItemConfig = ReturnType<typeof normalizeContextMenuItemConfig>

export const normalizeContextMenuItemColorName = (
  uinityConfig: UinityConfig,
  color?: ContextMenuItemConfigColorName | null | undefined
) => {
  if (color && uinityConfig.contextMenuItem.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeContextMenuItemSizeName = (uinityConfig: UinityConfig, size?: ContextMenuItemConfigSizeName | null | undefined) => {
  if (size && uinityConfig.contextMenuItem.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeContextMenuItemVariantName = (
  uinityConfig: UinityConfig,
  variant?: ContextMenuItemConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.contextMenuItem.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getContextMenuItemVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ContextMenuItemConfigVariantName | undefined | null
) => {
  variant = normalizeContextMenuItemVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.contextMenuItem.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getContextMenuItemConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ContextMenuItemConfigVariantName | undefined | null,
  color?: ContextMenuItemConfigColorName | undefined | null,
  size?: ContextMenuItemConfigSizeName | undefined | null
) => {
  const { variantColor } = getContextMenuItemVariantProps(uinityConfig, variant)
  color = normalizeContextMenuItemColorName(uinityConfig, color || variantColor)
  size = normalizeContextMenuItemSizeName(uinityConfig, size)
  return {
    ...uinityConfig.contextMenuItem.color[color],
    ...uinityConfig.contextMenuItem.size[size],
  }
}
