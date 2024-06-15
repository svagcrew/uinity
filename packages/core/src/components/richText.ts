import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const richTextConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zRichTextConfigSizeName = z.enum(richTextConfigSizesNames)
export type RichTextConfigSizeName = z.output<typeof zRichTextConfigSizeName>

export const richTextConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zRichTextConfigVariantName = z.enum(richTextConfigVariantNames)
export type RichTextConfigVariantName = z.output<typeof zRichTextConfigVariantName>

export const richTextConfigColorNames = ['brand', 'green', 'red'] as const
export const zRichTextConfigColorName = z.enum(richTextConfigColorNames)
export type RichTextConfigColorName = z.output<typeof zRichTextConfigColorName>

export const zRichTextConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type RichTextConfigSizeProps = z.output<typeof zRichTextConfigSizeProps>

export const zRichTextConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type RichTextConfigAppearenceProps = z.output<typeof zRichTextConfigAppearenceProps>

export const zRichTextConfigFinalProps = zRichTextConfigSizeProps.merge(zRichTextConfigAppearenceProps)
export type RichTextConfigFinalProps = z.output<typeof zRichTextConfigFinalProps>

export const zRichTextConfigGeneralProps = z.object({})
export type RichTextConfigGeneralProps = z.output<typeof zRichTextConfigGeneralProps>

export const zRichTextConfigVariantProps = z.object({
  color: zRichTextConfigColorName.optional(),
})
export type RichTextConfigVariantProps = z.output<typeof zRichTextConfigVariantProps>

export const zRichTextConfigInput = z.object({
  general: zRichTextConfigGeneralProps.optional(),
  variant: z.record(zRichTextConfigVariantName, zRichTextConfigVariantProps).optional(),
  color: z.record(zRichTextConfigColorName, zRichTextConfigAppearenceProps).optional(),
  size: z.record(zRichTextConfigSizeName, zRichTextConfigSizeProps).optional(),
})
export type RichTextConfigInput = z.output<typeof zRichTextConfigInput>

export const defaultRichTextConfigInput: RichTextConfigInput = {
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

export const normalizeRichTextConfig = (input: RichTextConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultRichTextConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultRichTextConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultRichTextConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultRichTextConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultRichTextConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultRichTextConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultRichTextConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultRichTextConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultRichTextConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultRichTextConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type RichTextConfig = ReturnType<typeof normalizeRichTextConfig>

export const normalizeRichTextColorName = (
  uinityConfig: UinityConfig,
  color?: RichTextConfigColorName | null | undefined
) => {
  if (color && uinityConfig.richText.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeRichTextSizeName = (uinityConfig: UinityConfig, size?: RichTextConfigSizeName | null | undefined) => {
  if (size && uinityConfig.richText.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeRichTextVariantName = (
  uinityConfig: UinityConfig,
  variant?: RichTextConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.richText.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getRichTextVariantProps = (
  uinityConfig: UinityConfig,
  variant?: RichTextConfigVariantName | undefined | null
) => {
  variant = normalizeRichTextVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.richText.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getRichTextConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: RichTextConfigVariantName | undefined | null,
  color?: RichTextConfigColorName | undefined | null,
  size?: RichTextConfigSizeName | undefined | null
) => {
  const { variantColor } = getRichTextVariantProps(uinityConfig, variant)
  color = normalizeRichTextColorName(uinityConfig, color || variantColor)
  size = normalizeRichTextSizeName(uinityConfig, size)
  return {
    ...uinityConfig.richText.color[color],
    ...uinityConfig.richText.size[size],
  }
}
