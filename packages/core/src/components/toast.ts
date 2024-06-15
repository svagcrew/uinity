import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const toastConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zToastConfigSizeName = z.enum(toastConfigSizesNames)
export type ToastConfigSizeName = z.output<typeof zToastConfigSizeName>

export const toastConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zToastConfigVariantName = z.enum(toastConfigVariantNames)
export type ToastConfigVariantName = z.output<typeof zToastConfigVariantName>

export const toastConfigColorNames = ['brand', 'green', 'red'] as const
export const zToastConfigColorName = z.enum(toastConfigColorNames)
export type ToastConfigColorName = z.output<typeof zToastConfigColorName>

export const zToastConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ToastConfigSizeProps = z.output<typeof zToastConfigSizeProps>

export const zToastConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ToastConfigAppearenceProps = z.output<typeof zToastConfigAppearenceProps>

export const zToastConfigFinalProps = zToastConfigSizeProps.merge(zToastConfigAppearenceProps)
export type ToastConfigFinalProps = z.output<typeof zToastConfigFinalProps>

export const zToastConfigGeneralProps = z.object({})
export type ToastConfigGeneralProps = z.output<typeof zToastConfigGeneralProps>

export const zToastConfigVariantProps = z.object({
  color: zToastConfigColorName.optional(),
})
export type ToastConfigVariantProps = z.output<typeof zToastConfigVariantProps>

export const zToastConfigInput = z.object({
  general: zToastConfigGeneralProps.optional(),
  variant: z.record(zToastConfigVariantName, zToastConfigVariantProps).optional(),
  color: z.record(zToastConfigColorName, zToastConfigAppearenceProps).optional(),
  size: z.record(zToastConfigSizeName, zToastConfigSizeProps).optional(),
})
export type ToastConfigInput = z.output<typeof zToastConfigInput>

export const defaultToastConfigInput: ToastConfigInput = {
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

export const normalizeToastConfig = (input: ToastConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultToastConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultToastConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultToastConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultToastConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultToastConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultToastConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultToastConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultToastConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultToastConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultToastConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ToastConfig = ReturnType<typeof normalizeToastConfig>

export const normalizeToastColorName = (
  uinityConfig: UinityConfig,
  color?: ToastConfigColorName | null | undefined
) => {
  if (color && uinityConfig.toast.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeToastSizeName = (uinityConfig: UinityConfig, size?: ToastConfigSizeName | null | undefined) => {
  if (size && uinityConfig.toast.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeToastVariantName = (
  uinityConfig: UinityConfig,
  variant?: ToastConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.toast.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getToastVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ToastConfigVariantName | undefined | null
) => {
  variant = normalizeToastVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.toast.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getToastConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ToastConfigVariantName | undefined | null,
  color?: ToastConfigColorName | undefined | null,
  size?: ToastConfigSizeName | undefined | null
) => {
  const { variantColor } = getToastVariantProps(uinityConfig, variant)
  color = normalizeToastColorName(uinityConfig, color || variantColor)
  size = normalizeToastSizeName(uinityConfig, size)
  return {
    ...uinityConfig.toast.color[color],
    ...uinityConfig.toast.size[size],
  }
}
