import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const controlIconConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zControlIconConfigSizeName = z.enum(controlIconConfigSizesNames)
export type ControlIconConfigSizeName = z.output<typeof zControlIconConfigSizeName>

export const controlIconConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zControlIconConfigVariantName = z.enum(controlIconConfigVariantNames)
export type ControlIconConfigVariantName = z.output<typeof zControlIconConfigVariantName>

export const controlIconConfigColorNames = ['brand', 'green', 'red'] as const
export const zControlIconConfigColorName = z.enum(controlIconConfigColorNames)
export type ControlIconConfigColorName = z.output<typeof zControlIconConfigColorName>

export const zControlIconConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ControlIconConfigSizeProps = z.output<typeof zControlIconConfigSizeProps>

export const zControlIconConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ControlIconConfigAppearenceProps = z.output<typeof zControlIconConfigAppearenceProps>

export const zControlIconConfigFinalProps = zControlIconConfigSizeProps.merge(zControlIconConfigAppearenceProps)
export type ControlIconConfigFinalProps = z.output<typeof zControlIconConfigFinalProps>

export const zControlIconConfigGeneralProps = z.object({})
export type ControlIconConfigGeneralProps = z.output<typeof zControlIconConfigGeneralProps>

export const zControlIconConfigVariantProps = z.object({
  color: zControlIconConfigColorName.optional(),
})
export type ControlIconConfigVariantProps = z.output<typeof zControlIconConfigVariantProps>

export const zControlIconConfigInput = z.object({
  general: zControlIconConfigGeneralProps.optional(),
  variant: z.record(zControlIconConfigVariantName, zControlIconConfigVariantProps).optional(),
  color: z.record(zControlIconConfigColorName, zControlIconConfigAppearenceProps).optional(),
  size: z.record(zControlIconConfigSizeName, zControlIconConfigSizeProps).optional(),
})
export type ControlIconConfigInput = z.output<typeof zControlIconConfigInput>

export const defaultControlIconConfigInput: ControlIconConfigInput = {
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

export const normalizeControlIconConfig = (input: ControlIconConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultControlIconConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultControlIconConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultControlIconConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultControlIconConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultControlIconConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultControlIconConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultControlIconConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultControlIconConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultControlIconConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultControlIconConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ControlIconConfig = ReturnType<typeof normalizeControlIconConfig>

export const normalizeControlIconColorName = (
  uinityConfig: UinityConfig,
  color?: ControlIconConfigColorName | null | undefined
) => {
  if (color && uinityConfig.controlIcon.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeControlIconSizeName = (uinityConfig: UinityConfig, size?: ControlIconConfigSizeName | null | undefined) => {
  if (size && uinityConfig.controlIcon.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeControlIconVariantName = (
  uinityConfig: UinityConfig,
  variant?: ControlIconConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.controlIcon.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getControlIconVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ControlIconConfigVariantName | undefined | null
) => {
  variant = normalizeControlIconVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.controlIcon.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getControlIconConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ControlIconConfigVariantName | undefined | null,
  color?: ControlIconConfigColorName | undefined | null,
  size?: ControlIconConfigSizeName | undefined | null
) => {
  const { variantColor } = getControlIconVariantProps(uinityConfig, variant)
  color = normalizeControlIconColorName(uinityConfig, color || variantColor)
  size = normalizeControlIconSizeName(uinityConfig, size)
  return {
    ...uinityConfig.controlIcon.color[color],
    ...uinityConfig.controlIcon.size[size],
  }
}
