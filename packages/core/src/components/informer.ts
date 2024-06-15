import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const informerConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zInformerConfigSizeName = z.enum(informerConfigSizesNames)
export type InformerConfigSizeName = z.output<typeof zInformerConfigSizeName>

export const informerConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zInformerConfigVariantName = z.enum(informerConfigVariantNames)
export type InformerConfigVariantName = z.output<typeof zInformerConfigVariantName>

export const informerConfigColorNames = ['brand', 'green', 'red'] as const
export const zInformerConfigColorName = z.enum(informerConfigColorNames)
export type InformerConfigColorName = z.output<typeof zInformerConfigColorName>

export const zInformerConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type InformerConfigSizeProps = z.output<typeof zInformerConfigSizeProps>

export const zInformerConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type InformerConfigAppearenceProps = z.output<typeof zInformerConfigAppearenceProps>

export const zInformerConfigFinalProps = zInformerConfigSizeProps.merge(zInformerConfigAppearenceProps)
export type InformerConfigFinalProps = z.output<typeof zInformerConfigFinalProps>

export const zInformerConfigGeneralProps = z.object({})
export type InformerConfigGeneralProps = z.output<typeof zInformerConfigGeneralProps>

export const zInformerConfigVariantProps = z.object({
  color: zInformerConfigColorName.optional(),
})
export type InformerConfigVariantProps = z.output<typeof zInformerConfigVariantProps>

export const zInformerConfigInput = z.object({
  general: zInformerConfigGeneralProps.optional(),
  variant: z.record(zInformerConfigVariantName, zInformerConfigVariantProps).optional(),
  color: z.record(zInformerConfigColorName, zInformerConfigAppearenceProps).optional(),
  size: z.record(zInformerConfigSizeName, zInformerConfigSizeProps).optional(),
})
export type InformerConfigInput = z.output<typeof zInformerConfigInput>

export const defaultInformerConfigInput: InformerConfigInput = {
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

export const normalizeInformerConfig = (input: InformerConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultInformerConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultInformerConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultInformerConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultInformerConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultInformerConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultInformerConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultInformerConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultInformerConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultInformerConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultInformerConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type InformerConfig = ReturnType<typeof normalizeInformerConfig>

export const normalizeInformerColorName = (
  uinityConfig: UinityConfig,
  color?: InformerConfigColorName | null | undefined
) => {
  if (color && uinityConfig.informer.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeInformerSizeName = (uinityConfig: UinityConfig, size?: InformerConfigSizeName | null | undefined) => {
  if (size && uinityConfig.informer.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeInformerVariantName = (
  uinityConfig: UinityConfig,
  variant?: InformerConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.informer.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getInformerVariantProps = (
  uinityConfig: UinityConfig,
  variant?: InformerConfigVariantName | undefined | null
) => {
  variant = normalizeInformerVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.informer.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getInformerConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: InformerConfigVariantName | undefined | null,
  color?: InformerConfigColorName | undefined | null,
  size?: InformerConfigSizeName | undefined | null
) => {
  const { variantColor } = getInformerVariantProps(uinityConfig, variant)
  color = normalizeInformerColorName(uinityConfig, color || variantColor)
  size = normalizeInformerSizeName(uinityConfig, size)
  return {
    ...uinityConfig.informer.color[color],
    ...uinityConfig.informer.size[size],
  }
}
