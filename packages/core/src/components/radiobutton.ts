import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const radiobuttonConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zRadiobuttonConfigSizeName = z.enum(radiobuttonConfigSizesNames)
export type RadiobuttonConfigSizeName = z.output<typeof zRadiobuttonConfigSizeName>

export const radiobuttonConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zRadiobuttonConfigVariantName = z.enum(radiobuttonConfigVariantNames)
export type RadiobuttonConfigVariantName = z.output<typeof zRadiobuttonConfigVariantName>

export const radiobuttonConfigColorNames = ['brand', 'green', 'red'] as const
export const zRadiobuttonConfigColorName = z.enum(radiobuttonConfigColorNames)
export type RadiobuttonConfigColorName = z.output<typeof zRadiobuttonConfigColorName>

export const zRadiobuttonConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type RadiobuttonConfigSizeProps = z.output<typeof zRadiobuttonConfigSizeProps>

export const zRadiobuttonConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type RadiobuttonConfigAppearenceProps = z.output<typeof zRadiobuttonConfigAppearenceProps>

export const zRadiobuttonConfigFinalProps = zRadiobuttonConfigSizeProps.merge(zRadiobuttonConfigAppearenceProps)
export type RadiobuttonConfigFinalProps = z.output<typeof zRadiobuttonConfigFinalProps>

export const zRadiobuttonConfigGeneralProps = z.object({})
export type RadiobuttonConfigGeneralProps = z.output<typeof zRadiobuttonConfigGeneralProps>

export const zRadiobuttonConfigVariantProps = z.object({
  color: zRadiobuttonConfigColorName.optional(),
})
export type RadiobuttonConfigVariantProps = z.output<typeof zRadiobuttonConfigVariantProps>

export const zRadiobuttonConfigInput = z.object({
  general: zRadiobuttonConfigGeneralProps.optional(),
  variant: z.record(zRadiobuttonConfigVariantName, zRadiobuttonConfigVariantProps).optional(),
  color: z.record(zRadiobuttonConfigColorName, zRadiobuttonConfigAppearenceProps).optional(),
  size: z.record(zRadiobuttonConfigSizeName, zRadiobuttonConfigSizeProps).optional(),
})
export type RadiobuttonConfigInput = z.output<typeof zRadiobuttonConfigInput>

export const defaultRadiobuttonConfigInput: RadiobuttonConfigInput = {
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

export const normalizeRadiobuttonConfig = (input: RadiobuttonConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultRadiobuttonConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultRadiobuttonConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultRadiobuttonConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultRadiobuttonConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultRadiobuttonConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultRadiobuttonConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultRadiobuttonConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultRadiobuttonConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultRadiobuttonConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultRadiobuttonConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type RadiobuttonConfig = ReturnType<typeof normalizeRadiobuttonConfig>

export const normalizeRadiobuttonColorName = (
  uinityConfig: UinityConfig,
  color?: RadiobuttonConfigColorName | null | undefined
) => {
  if (color && uinityConfig.radiobutton.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeRadiobuttonSizeName = (uinityConfig: UinityConfig, size?: RadiobuttonConfigSizeName | null | undefined) => {
  if (size && uinityConfig.radiobutton.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeRadiobuttonVariantName = (
  uinityConfig: UinityConfig,
  variant?: RadiobuttonConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.radiobutton.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getRadiobuttonVariantProps = (
  uinityConfig: UinityConfig,
  variant?: RadiobuttonConfigVariantName | undefined | null
) => {
  variant = normalizeRadiobuttonVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.radiobutton.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getRadiobuttonConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: RadiobuttonConfigVariantName | undefined | null,
  color?: RadiobuttonConfigColorName | undefined | null,
  size?: RadiobuttonConfigSizeName | undefined | null
) => {
  const { variantColor } = getRadiobuttonVariantProps(uinityConfig, variant)
  color = normalizeRadiobuttonColorName(uinityConfig, color || variantColor)
  size = normalizeRadiobuttonSizeName(uinityConfig, size)
  return {
    ...uinityConfig.radiobutton.color[color],
    ...uinityConfig.radiobutton.size[size],
  }
}
