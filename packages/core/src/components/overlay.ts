import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const overlayConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zOverlayConfigSizeName = z.enum(overlayConfigSizesNames)
export type OverlayConfigSizeName = z.output<typeof zOverlayConfigSizeName>

export const overlayConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zOverlayConfigVariantName = z.enum(overlayConfigVariantNames)
export type OverlayConfigVariantName = z.output<typeof zOverlayConfigVariantName>

export const overlayConfigColorNames = ['brand', 'green', 'red'] as const
export const zOverlayConfigColorName = z.enum(overlayConfigColorNames)
export type OverlayConfigColorName = z.output<typeof zOverlayConfigColorName>

export const zOverlayConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type OverlayConfigSizeProps = z.output<typeof zOverlayConfigSizeProps>

export const zOverlayConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type OverlayConfigAppearenceProps = z.output<typeof zOverlayConfigAppearenceProps>

export const zOverlayConfigFinalProps = zOverlayConfigSizeProps.merge(zOverlayConfigAppearenceProps)
export type OverlayConfigFinalProps = z.output<typeof zOverlayConfigFinalProps>

export const zOverlayConfigGeneralProps = z.object({})
export type OverlayConfigGeneralProps = z.output<typeof zOverlayConfigGeneralProps>

export const zOverlayConfigVariantProps = z.object({
  color: zOverlayConfigColorName.optional(),
})
export type OverlayConfigVariantProps = z.output<typeof zOverlayConfigVariantProps>

export const zOverlayConfigInput = z.object({
  general: zOverlayConfigGeneralProps.optional(),
  variant: z.record(zOverlayConfigVariantName, zOverlayConfigVariantProps).optional(),
  color: z.record(zOverlayConfigColorName, zOverlayConfigAppearenceProps).optional(),
  size: z.record(zOverlayConfigSizeName, zOverlayConfigSizeProps).optional(),
})
export type OverlayConfigInput = z.output<typeof zOverlayConfigInput>

export const defaultOverlayConfigInput: OverlayConfigInput = {
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

export const normalizeOverlayConfig = (input: OverlayConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultOverlayConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultOverlayConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultOverlayConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultOverlayConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultOverlayConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultOverlayConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultOverlayConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultOverlayConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultOverlayConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultOverlayConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type OverlayConfig = ReturnType<typeof normalizeOverlayConfig>

export const normalizeOverlayColorName = (
  uinityConfig: UinityConfig,
  color?: OverlayConfigColorName | null | undefined
) => {
  if (color && uinityConfig.overlay.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeOverlaySizeName = (uinityConfig: UinityConfig, size?: OverlayConfigSizeName | null | undefined) => {
  if (size && uinityConfig.overlay.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeOverlayVariantName = (
  uinityConfig: UinityConfig,
  variant?: OverlayConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.overlay.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getOverlayVariantProps = (
  uinityConfig: UinityConfig,
  variant?: OverlayConfigVariantName | undefined | null
) => {
  variant = normalizeOverlayVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.overlay.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getOverlayConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: OverlayConfigVariantName | undefined | null,
  color?: OverlayConfigColorName | undefined | null,
  size?: OverlayConfigSizeName | undefined | null
) => {
  const { variantColor } = getOverlayVariantProps(uinityConfig, variant)
  color = normalizeOverlayColorName(uinityConfig, color || variantColor)
  size = normalizeOverlaySizeName(uinityConfig, size)
  return {
    ...uinityConfig.overlay.color[color],
    ...uinityConfig.overlay.size[size],
  }
}
