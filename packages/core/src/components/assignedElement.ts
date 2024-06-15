import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const assignedElementConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zAssignedElementConfigSizeName = z.enum(assignedElementConfigSizesNames)
export type AssignedElementConfigSizeName = z.output<typeof zAssignedElementConfigSizeName>

export const assignedElementConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zAssignedElementConfigVariantName = z.enum(assignedElementConfigVariantNames)
export type AssignedElementConfigVariantName = z.output<typeof zAssignedElementConfigVariantName>

export const assignedElementConfigColorNames = ['brand', 'green', 'red'] as const
export const zAssignedElementConfigColorName = z.enum(assignedElementConfigColorNames)
export type AssignedElementConfigColorName = z.output<typeof zAssignedElementConfigColorName>

export const zAssignedElementConfigSizeProps = z.object({
  width: zOptionalNumberOrString,
  height: zOptionalNumberOrString,
})
export type AssignedElementConfigSizeProps = z.output<typeof zAssignedElementConfigSizeProps>

export const zAssignedElementConfigAppearenceProps = z.object({
  background: zColorValue.optional(),
  childrenBackground: zColorValue.optional(),
})
export type AssignedElementConfigAppearenceProps = z.output<typeof zAssignedElementConfigAppearenceProps>

export const zAssignedElementConfigFinalProps = zAssignedElementConfigSizeProps.merge(zAssignedElementConfigAppearenceProps)
export type AssignedElementConfigFinalProps = z.output<typeof zAssignedElementConfigFinalProps>

export const zAssignedElementConfigGeneralProps = z.object({})
export type AssignedElementConfigGeneralProps = z.output<typeof zAssignedElementConfigGeneralProps>

export const zAssignedElementConfigVariantProps = z.object({
  color: zAssignedElementConfigColorName.optional(),
})
export type AssignedElementConfigVariantProps = z.output<typeof zAssignedElementConfigVariantProps>

export const zAssignedElementConfigInput = z.object({
  general: zAssignedElementConfigGeneralProps.optional(),
  variant: z.record(zAssignedElementConfigVariantName, zAssignedElementConfigVariantProps).optional(),
  color: z.record(zAssignedElementConfigColorName, zAssignedElementConfigAppearenceProps).optional(),
  size: z.record(zAssignedElementConfigSizeName, zAssignedElementConfigSizeProps).optional(),
})
export type AssignedElementConfigInput = z.output<typeof zAssignedElementConfigInput>

export const defaultAssignedElementConfigInput: AssignedElementConfigInput = {
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

export const normalizeAssignedElementConfig = (input: AssignedElementConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultAssignedElementConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultAssignedElementConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultAssignedElementConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultAssignedElementConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultAssignedElementConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultAssignedElementConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultAssignedElementConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultAssignedElementConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultAssignedElementConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultAssignedElementConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type AssignedElementConfig = ReturnType<typeof normalizeAssignedElementConfig>

export const normalizeAssignedElementColorName = (
  uinityConfig: UinityConfig,
  color?: AssignedElementConfigColorName | null | undefined
) => {
  if (color && uinityConfig.assignedElement.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeAssignedElementSizeName = (uinityConfig: UinityConfig, size?: AssignedElementConfigSizeName | null | undefined) => {
  if (size && uinityConfig.assignedElement.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeAssignedElementVariantName = (
  uinityConfig: UinityConfig,
  variant?: AssignedElementConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.assignedElement.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getAssignedElementVariantProps = (
  uinityConfig: UinityConfig,
  variant?: AssignedElementConfigVariantName | undefined | null
) => {
  variant = normalizeAssignedElementVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.assignedElement.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getAssignedElementConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: AssignedElementConfigVariantName | undefined | null,
  color?: AssignedElementConfigColorName | undefined | null,
  size?: AssignedElementConfigSizeName | undefined | null
) => {
  const { variantColor } = getAssignedElementVariantProps(uinityConfig, variant)
  color = normalizeAssignedElementColorName(uinityConfig, color || variantColor)
  size = normalizeAssignedElementSizeName(uinityConfig, size)
  return {
    ...uinityConfig.assignedElement.color[color],
    ...uinityConfig.assignedElement.size[size],
  }
}
