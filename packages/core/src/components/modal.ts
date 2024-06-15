import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const modalConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zModalConfigSizeName = z.enum(modalConfigSizesNames)
export type ModalConfigSizeName = z.output<typeof zModalConfigSizeName>

export const modalConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zModalConfigVariantName = z.enum(modalConfigVariantNames)
export type ModalConfigVariantName = z.output<typeof zModalConfigVariantName>

export const modalConfigColorNames = ['brand', 'green', 'red'] as const
export const zModalConfigColorName = z.enum(modalConfigColorNames)
export type ModalConfigColorName = z.output<typeof zModalConfigColorName>

export const zModalConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type ModalConfigSizeProps = z.output<typeof zModalConfigSizeProps>

export const zModalConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type ModalConfigAppearenceProps = z.output<typeof zModalConfigAppearenceProps>

export const zModalConfigFinalProps = zModalConfigSizeProps.merge(zModalConfigAppearenceProps)
export type ModalConfigFinalProps = z.output<typeof zModalConfigFinalProps>

export const zModalConfigGeneralProps = z.object({})
export type ModalConfigGeneralProps = z.output<typeof zModalConfigGeneralProps>

export const zModalConfigVariantProps = z.object({
  color: zModalConfigColorName.optional(),
})
export type ModalConfigVariantProps = z.output<typeof zModalConfigVariantProps>

export const zModalConfigInput = z.object({
  general: zModalConfigGeneralProps.optional(),
  variant: z.record(zModalConfigVariantName, zModalConfigVariantProps).optional(),
  color: z.record(zModalConfigColorName, zModalConfigAppearenceProps).optional(),
  size: z.record(zModalConfigSizeName, zModalConfigSizeProps).optional(),
})
export type ModalConfigInput = z.output<typeof zModalConfigInput>

export const defaultModalConfigInput: ModalConfigInput = {
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

export const normalizeModalConfig = (input: ModalConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultModalConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultModalConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultModalConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultModalConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultModalConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultModalConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultModalConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultModalConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultModalConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultModalConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type ModalConfig = ReturnType<typeof normalizeModalConfig>

export const normalizeModalColorName = (
  uinityConfig: UinityConfig,
  color?: ModalConfigColorName | null | undefined
) => {
  if (color && uinityConfig.modal.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeModalSizeName = (uinityConfig: UinityConfig, size?: ModalConfigSizeName | null | undefined) => {
  if (size && uinityConfig.modal.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeModalVariantName = (
  uinityConfig: UinityConfig,
  variant?: ModalConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.modal.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getModalVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ModalConfigVariantName | undefined | null
) => {
  variant = normalizeModalVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.modal.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getModalConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ModalConfigVariantName | undefined | null,
  color?: ModalConfigColorName | undefined | null,
  size?: ModalConfigSizeName | undefined | null
) => {
  const { variantColor } = getModalVariantProps(uinityConfig, variant)
  color = normalizeModalColorName(uinityConfig, color || variantColor)
  size = normalizeModalSizeName(uinityConfig, size)
  return {
    ...uinityConfig.modal.color[color],
    ...uinityConfig.modal.size[size],
  }
}
