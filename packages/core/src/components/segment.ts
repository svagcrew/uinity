import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const segmentConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zSegmentConfigSizeName = z.enum(segmentConfigSizesNames)
export type SegmentConfigSizeName = z.output<typeof zSegmentConfigSizeName>

export const segmentConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zSegmentConfigVariantName = z.enum(segmentConfigVariantNames)
export type SegmentConfigVariantName = z.output<typeof zSegmentConfigVariantName>

export const segmentConfigColorNames = ['brand', 'green', 'red'] as const
export const zSegmentConfigColorName = z.enum(segmentConfigColorNames)
export type SegmentConfigColorName = z.output<typeof zSegmentConfigColorName>

export const zSegmentConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type SegmentConfigSizeProps = z.output<typeof zSegmentConfigSizeProps>

export const zSegmentConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type SegmentConfigAppearenceProps = z.output<typeof zSegmentConfigAppearenceProps>

export const zSegmentConfigFinalProps = zSegmentConfigSizeProps.merge(zSegmentConfigAppearenceProps)
export type SegmentConfigFinalProps = z.output<typeof zSegmentConfigFinalProps>

export const zSegmentConfigGeneralProps = z.object({})
export type SegmentConfigGeneralProps = z.output<typeof zSegmentConfigGeneralProps>

export const zSegmentConfigVariantProps = z.object({
  color: zSegmentConfigColorName.optional(),
})
export type SegmentConfigVariantProps = z.output<typeof zSegmentConfigVariantProps>

export const zSegmentConfigInput = z.object({
  general: zSegmentConfigGeneralProps.optional(),
  variant: z.record(zSegmentConfigVariantName, zSegmentConfigVariantProps).optional(),
  color: z.record(zSegmentConfigColorName, zSegmentConfigAppearenceProps).optional(),
  size: z.record(zSegmentConfigSizeName, zSegmentConfigSizeProps).optional(),
})
export type SegmentConfigInput = z.output<typeof zSegmentConfigInput>

export const defaultSegmentConfigInput: SegmentConfigInput = {
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

export const normalizeSegmentConfig = (input: SegmentConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultSegmentConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultSegmentConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultSegmentConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultSegmentConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultSegmentConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultSegmentConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultSegmentConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultSegmentConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultSegmentConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultSegmentConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type SegmentConfig = ReturnType<typeof normalizeSegmentConfig>

export const normalizeSegmentColorName = (
  uinityConfig: UinityConfig,
  color?: SegmentConfigColorName | null | undefined
) => {
  if (color && uinityConfig.segment.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeSegmentSizeName = (uinityConfig: UinityConfig, size?: SegmentConfigSizeName | null | undefined) => {
  if (size && uinityConfig.segment.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeSegmentVariantName = (
  uinityConfig: UinityConfig,
  variant?: SegmentConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.segment.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getSegmentVariantProps = (
  uinityConfig: UinityConfig,
  variant?: SegmentConfigVariantName | undefined | null
) => {
  variant = normalizeSegmentVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.segment.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getSegmentConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: SegmentConfigVariantName | undefined | null,
  color?: SegmentConfigColorName | undefined | null,
  size?: SegmentConfigSizeName | undefined | null
) => {
  const { variantColor } = getSegmentVariantProps(uinityConfig, variant)
  color = normalizeSegmentColorName(uinityConfig, color || variantColor)
  size = normalizeSegmentSizeName(uinityConfig, size)
  return {
    ...uinityConfig.segment.color[color],
    ...uinityConfig.segment.size[size],
  }
}
