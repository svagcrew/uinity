import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const formItemConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zFormItemConfigSizeName = z.enum(formItemConfigSizesNames)
export type FormItemConfigSizeName = z.output<typeof zFormItemConfigSizeName>

export const formItemConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zFormItemConfigVariantName = z.enum(formItemConfigVariantNames)
export type FormItemConfigVariantName = z.output<typeof zFormItemConfigVariantName>

export const formItemConfigColorNames = ['brand', 'green', 'red'] as const
export const zFormItemConfigColorName = z.enum(formItemConfigColorNames)
export type FormItemConfigColorName = z.output<typeof zFormItemConfigColorName>

export const zFormItemConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type FormItemConfigSizeProps = z.output<typeof zFormItemConfigSizeProps>

export const zFormItemConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type FormItemConfigAppearenceProps = z.output<typeof zFormItemConfigAppearenceProps>

export const zFormItemConfigFinalProps = zFormItemConfigSizeProps.merge(zFormItemConfigAppearenceProps)
export type FormItemConfigFinalProps = z.output<typeof zFormItemConfigFinalProps>

export const zFormItemConfigGeneralProps = z.object({})
export type FormItemConfigGeneralProps = z.output<typeof zFormItemConfigGeneralProps>

export const zFormItemConfigVariantProps = z.object({
  color: zFormItemConfigColorName.optional(),
})
export type FormItemConfigVariantProps = z.output<typeof zFormItemConfigVariantProps>

export const zFormItemConfigInput = z.object({
  general: zFormItemConfigGeneralProps.optional(),
  variant: z.record(zFormItemConfigVariantName, zFormItemConfigVariantProps).optional(),
  color: z.record(zFormItemConfigColorName, zFormItemConfigAppearenceProps).optional(),
  size: z.record(zFormItemConfigSizeName, zFormItemConfigSizeProps).optional(),
})
export type FormItemConfigInput = z.output<typeof zFormItemConfigInput>

export const defaultFormItemConfigInput: FormItemConfigInput = {
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

export const normalizeFormItemConfig = (input: FormItemConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultFormItemConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultFormItemConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultFormItemConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultFormItemConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultFormItemConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultFormItemConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultFormItemConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultFormItemConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultFormItemConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultFormItemConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type FormItemConfig = ReturnType<typeof normalizeFormItemConfig>

export const normalizeFormItemColorName = (
  uinityConfig: UinityConfig,
  color?: FormItemConfigColorName | null | undefined
) => {
  if (color && uinityConfig.formItem.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeFormItemSizeName = (uinityConfig: UinityConfig, size?: FormItemConfigSizeName | null | undefined) => {
  if (size && uinityConfig.formItem.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeFormItemVariantName = (
  uinityConfig: UinityConfig,
  variant?: FormItemConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.formItem.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getFormItemVariantProps = (
  uinityConfig: UinityConfig,
  variant?: FormItemConfigVariantName | undefined | null
) => {
  variant = normalizeFormItemVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.formItem.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getFormItemConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: FormItemConfigVariantName | undefined | null,
  color?: FormItemConfigColorName | undefined | null,
  size?: FormItemConfigSizeName | undefined | null
) => {
  const { variantColor } = getFormItemVariantProps(uinityConfig, variant)
  color = normalizeFormItemColorName(uinityConfig, color || variantColor)
  size = normalizeFormItemSizeName(uinityConfig, size)
  return {
    ...uinityConfig.formItem.color[color],
    ...uinityConfig.formItem.size[size],
  }
}
