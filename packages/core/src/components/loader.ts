import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const loaderConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zLoaderConfigSizeName = z.enum(loaderConfigSizesNames)
export type LoaderConfigSizeName = z.output<typeof zLoaderConfigSizeName>

export const loaderConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zLoaderConfigVariantName = z.enum(loaderConfigVariantNames)
export type LoaderConfigVariantName = z.output<typeof zLoaderConfigVariantName>

export const loaderConfigColorNames = ['brand', 'green', 'red'] as const
export const zLoaderConfigColorName = z.enum(loaderConfigColorNames)
export type LoaderConfigColorName = z.output<typeof zLoaderConfigColorName>

export const zLoaderConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type LoaderConfigSizeProps = z.output<typeof zLoaderConfigSizeProps>

export const zLoaderConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type LoaderConfigAppearenceProps = z.output<typeof zLoaderConfigAppearenceProps>

export const zLoaderConfigFinalProps = zLoaderConfigSizeProps.merge(zLoaderConfigAppearenceProps)
export type LoaderConfigFinalProps = z.output<typeof zLoaderConfigFinalProps>

export const zLoaderConfigGeneralProps = z.object({})
export type LoaderConfigGeneralProps = z.output<typeof zLoaderConfigGeneralProps>

export const zLoaderConfigVariantProps = z.object({
  color: zLoaderConfigColorName.optional(),
})
export type LoaderConfigVariantProps = z.output<typeof zLoaderConfigVariantProps>

export const zLoaderConfigInput = z.object({
  general: zLoaderConfigGeneralProps.optional(),
  variant: z.record(zLoaderConfigVariantName, zLoaderConfigVariantProps).optional(),
  color: z.record(zLoaderConfigColorName, zLoaderConfigAppearenceProps).optional(),
  size: z.record(zLoaderConfigSizeName, zLoaderConfigSizeProps).optional(),
})
export type LoaderConfigInput = z.output<typeof zLoaderConfigInput>

export const defaultLoaderConfigInput: LoaderConfigInput = {
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

export const normalizeLoaderConfig = (input: LoaderConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultLoaderConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultLoaderConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultLoaderConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultLoaderConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultLoaderConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultLoaderConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultLoaderConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultLoaderConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultLoaderConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultLoaderConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type LoaderConfig = ReturnType<typeof normalizeLoaderConfig>

export const normalizeLoaderColorName = (
  uinityConfig: UinityConfig,
  color?: LoaderConfigColorName | null | undefined
) => {
  if (color && uinityConfig.loader.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeLoaderSizeName = (uinityConfig: UinityConfig, size?: LoaderConfigSizeName | null | undefined) => {
  if (size && uinityConfig.loader.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeLoaderVariantName = (
  uinityConfig: UinityConfig,
  variant?: LoaderConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.loader.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getLoaderVariantProps = (
  uinityConfig: UinityConfig,
  variant?: LoaderConfigVariantName | undefined | null
) => {
  variant = normalizeLoaderVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.loader.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getLoaderConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: LoaderConfigVariantName | undefined | null,
  color?: LoaderConfigColorName | undefined | null,
  size?: LoaderConfigSizeName | undefined | null
) => {
  const { variantColor } = getLoaderVariantProps(uinityConfig, variant)
  color = normalizeLoaderColorName(uinityConfig, color || variantColor)
  size = normalizeLoaderSizeName(uinityConfig, size)
  return {
    ...uinityConfig.loader.color[color],
    ...uinityConfig.loader.size[size],
  }
}
