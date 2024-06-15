import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const textareaConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zTextareaConfigSizeName = z.enum(textareaConfigSizesNames)
export type TextareaConfigSizeName = z.output<typeof zTextareaConfigSizeName>

export const textareaConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zTextareaConfigVariantName = z.enum(textareaConfigVariantNames)
export type TextareaConfigVariantName = z.output<typeof zTextareaConfigVariantName>

export const textareaConfigColorNames = ['brand', 'green', 'red'] as const
export const zTextareaConfigColorName = z.enum(textareaConfigColorNames)
export type TextareaConfigColorName = z.output<typeof zTextareaConfigColorName>

export const zTextareaConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type TextareaConfigSizeProps = z.output<typeof zTextareaConfigSizeProps>

export const zTextareaConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type TextareaConfigAppearenceProps = z.output<typeof zTextareaConfigAppearenceProps>

export const zTextareaConfigFinalProps = zTextareaConfigSizeProps.merge(zTextareaConfigAppearenceProps)
export type TextareaConfigFinalProps = z.output<typeof zTextareaConfigFinalProps>

export const zTextareaConfigGeneralProps = z.object({})
export type TextareaConfigGeneralProps = z.output<typeof zTextareaConfigGeneralProps>

export const zTextareaConfigVariantProps = z.object({
  color: zTextareaConfigColorName.optional(),
})
export type TextareaConfigVariantProps = z.output<typeof zTextareaConfigVariantProps>

export const zTextareaConfigInput = z.object({
  general: zTextareaConfigGeneralProps.optional(),
  variant: z.record(zTextareaConfigVariantName, zTextareaConfigVariantProps).optional(),
  color: z.record(zTextareaConfigColorName, zTextareaConfigAppearenceProps).optional(),
  size: z.record(zTextareaConfigSizeName, zTextareaConfigSizeProps).optional(),
})
export type TextareaConfigInput = z.output<typeof zTextareaConfigInput>

export const defaultTextareaConfigInput: TextareaConfigInput = {
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

export const normalizeTextareaConfig = (input: TextareaConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultTextareaConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultTextareaConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultTextareaConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultTextareaConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultTextareaConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultTextareaConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultTextareaConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultTextareaConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultTextareaConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultTextareaConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type TextareaConfig = ReturnType<typeof normalizeTextareaConfig>

export const normalizeTextareaColorName = (
  uinityConfig: UinityConfig,
  color?: TextareaConfigColorName | null | undefined
) => {
  if (color && uinityConfig.textarea.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeTextareaSizeName = (uinityConfig: UinityConfig, size?: TextareaConfigSizeName | null | undefined) => {
  if (size && uinityConfig.textarea.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeTextareaVariantName = (
  uinityConfig: UinityConfig,
  variant?: TextareaConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.textarea.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getTextareaVariantProps = (
  uinityConfig: UinityConfig,
  variant?: TextareaConfigVariantName | undefined | null
) => {
  variant = normalizeTextareaVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.textarea.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getTextareaConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: TextareaConfigVariantName | undefined | null,
  color?: TextareaConfigColorName | undefined | null,
  size?: TextareaConfigSizeName | undefined | null
) => {
  const { variantColor } = getTextareaVariantProps(uinityConfig, variant)
  color = normalizeTextareaColorName(uinityConfig, color || variantColor)
  size = normalizeTextareaSizeName(uinityConfig, size)
  return {
    ...uinityConfig.textarea.color[color],
    ...uinityConfig.textarea.size[size],
  }
}
