import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const checkboxConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zCheckboxConfigSizeName = z.enum(checkboxConfigSizesNames)
export type CheckboxConfigSizeName = z.output<typeof zCheckboxConfigSizeName>

export const checkboxConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zCheckboxConfigVariantName = z.enum(checkboxConfigVariantNames)
export type CheckboxConfigVariantName = z.output<typeof zCheckboxConfigVariantName>

export const checkboxConfigColorNames = ['brand', 'green', 'red'] as const
export const zCheckboxConfigColorName = z.enum(checkboxConfigColorNames)
export type CheckboxConfigColorName = z.output<typeof zCheckboxConfigColorName>

export const zCheckboxConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type CheckboxConfigSizeProps = z.output<typeof zCheckboxConfigSizeProps>

export const zCheckboxConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type CheckboxConfigAppearenceProps = z.output<typeof zCheckboxConfigAppearenceProps>

export const zCheckboxConfigFinalProps = zCheckboxConfigSizeProps.merge(zCheckboxConfigAppearenceProps)
export type CheckboxConfigFinalProps = z.output<typeof zCheckboxConfigFinalProps>

export const zCheckboxConfigGeneralProps = z.object({})
export type CheckboxConfigGeneralProps = z.output<typeof zCheckboxConfigGeneralProps>

export const zCheckboxConfigVariantProps = z.object({
  color: zCheckboxConfigColorName.optional(),
})
export type CheckboxConfigVariantProps = z.output<typeof zCheckboxConfigVariantProps>

export const zCheckboxConfigInput = z.object({
  general: zCheckboxConfigGeneralProps.optional(),
  variant: z.record(zCheckboxConfigVariantName, zCheckboxConfigVariantProps).optional(),
  color: z.record(zCheckboxConfigColorName, zCheckboxConfigAppearenceProps).optional(),
  size: z.record(zCheckboxConfigSizeName, zCheckboxConfigSizeProps).optional(),
})
export type CheckboxConfigInput = z.output<typeof zCheckboxConfigInput>

export const defaultCheckboxConfigInput: CheckboxConfigInput = {
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

export const normalizeCheckboxConfig = (input: CheckboxConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultCheckboxConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultCheckboxConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultCheckboxConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultCheckboxConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultCheckboxConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultCheckboxConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultCheckboxConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultCheckboxConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultCheckboxConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultCheckboxConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type CheckboxConfig = ReturnType<typeof normalizeCheckboxConfig>

export const normalizeCheckboxColorName = (
  uinityConfig: UinityConfig,
  color?: CheckboxConfigColorName | null | undefined
) => {
  if (color && uinityConfig.checkbox.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeCheckboxSizeName = (
  uinityConfig: UinityConfig,
  size?: CheckboxConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.checkbox.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeCheckboxVariantName = (
  uinityConfig: UinityConfig,
  variant?: CheckboxConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.checkbox.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getCheckboxVariantProps = (
  uinityConfig: UinityConfig,
  variant?: CheckboxConfigVariantName | undefined | null
) => {
  variant = normalizeCheckboxVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.checkbox.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getCheckboxConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: CheckboxConfigVariantName | undefined | null,
  color?: CheckboxConfigColorName | undefined | null,
  size?: CheckboxConfigSizeName | undefined | null
) => {
  const { variantColor } = getCheckboxVariantProps(uinityConfig, variant)
  color = normalizeCheckboxColorName(uinityConfig, color || variantColor)
  size = normalizeCheckboxSizeName(uinityConfig, size)
  return {
    ...uinityConfig.checkbox.color[color],
    ...uinityConfig.checkbox.size[size],
  }
}
