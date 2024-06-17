import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextWeightName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const contextMenuItemConfigSizesNames = controlSizeNames
export const zContextMenuItemConfigSizeName = z.enum(contextMenuItemConfigSizesNames)
export type ContextMenuItemConfigSizeName = z.output<typeof zContextMenuItemConfigSizeName>

export const contextMenuItemConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zContextMenuItemConfigVariantName = z.enum(contextMenuItemConfigVariantNames)
export type ContextMenuItemConfigVariantName = z.output<typeof zContextMenuItemConfigVariantName>

export const contextMenuItemConfigColorNames = ['brand', 'gray'] as const
export const zContextMenuItemConfigColorName = z.enum(contextMenuItemConfigColorNames)
export type ContextMenuItemConfigColorName = z.output<typeof zContextMenuItemConfigColorName>

export const contextMenuItemConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled', 'current'] as const
export const zContextMenuItemConfigStateName = z.enum(contextMenuItemConfigStatesNames)
export type ContextMenuItemConfigStateName = z.output<typeof zContextMenuItemConfigStateName>

export const zContextMenuItemConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textWeight: zTextWeightName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type ContextMenuItemConfigSizeProps = z.output<typeof zContextMenuItemConfigSizeProps>

export const zContextMenuItemConfigAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textWeight: zTextWeightName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type ContextMenuItemConfigAppearenceProps = z.output<typeof zContextMenuItemConfigAppearenceProps>

export const zContextMenuItemConfigFinalProps = zContextMenuItemConfigSizeProps.merge(
  zContextMenuItemConfigAppearenceProps
)
export type ContextMenuItemConfigFinalProps = z.output<typeof zContextMenuItemConfigFinalProps>

export const zContextMenuItemConfigGeneralProps = z.object({})
export type ContextMenuItemConfigGeneralProps = z.output<typeof zContextMenuItemConfigGeneralProps>

export const zContextMenuItemConfigComplexProps = z.record(
  z.union([zContextMenuItemConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zContextMenuItemConfigSizeName, z.literal('any')]),
      z
        .record(z.union([zContextMenuItemConfigStateName, z.literal('any')]), zContextMenuItemConfigFinalProps)
        .optional()
    )
    .optional()
)
export type ContextMenuItemConfigComplexProps = z.output<typeof zContextMenuItemConfigComplexProps>

export const zContextMenuItemConfigVariantProps = z.object({
  color: zContextMenuItemConfigColorName.optional(),
})
export type ContextMenuItemConfigVariantProps = z.output<typeof zContextMenuItemConfigVariantProps>

export const zContextMenuItemConfigInput = z.object({
  general: zContextMenuItemConfigGeneralProps.optional(),
  variant: z.record(zContextMenuItemConfigVariantName, zContextMenuItemConfigVariantProps).optional(),
  color: z.record(zContextMenuItemConfigColorName, zContextMenuItemConfigAppearenceProps).optional(),
  size: z.record(zContextMenuItemConfigSizeName, zContextMenuItemConfigSizeProps).optional(),
  state: z.record(zContextMenuItemConfigStateName, zContextMenuItemConfigAppearenceProps).optional(),
  complex: zContextMenuItemConfigComplexProps.optional(),
})
export type ContextMenuItemConfigInput = z.output<typeof zContextMenuItemConfigInput>

const getDefaultSpecificSizeProps = (size: ContextMenuItemConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultContextMenuItemConfigInput: ContextMenuItemConfigInput = {
  general: {},
  variant: {
    primary: {
      color: 'brand',
    },
    secondary: {
      color: 'gray',
    },
    trietary: {},
    dangerPrimary: {},
    dangerSecondary: {},
    dangerTrietary: {},
  },
  color: {
    brand: {
      textColor: {
        light: $.color.core.brand[60],
        dark: $.color.core.brand[60],
      },
    },
    gray: {
      background: $.color.semantic.symbol.secondary,
    },
  },
  size: Object.fromEntries(contextMenuItemConfigSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
  state: {
    rest: {},
    hover: {},
    active: {},
    focus: {},
    disabled: {},
    current: {
      textColor: {
        light: $.color.core.brand[140],
        dark: $.color.core.brand[240],
      },
    },
  },
  complex: {
    brand: {
      xs: {
        hover: {
          textColor: '$.color.core.green.60',
          iconColor: '$.color.core.green.60',
        },
      },
    },
  },
}

export const normalizeContextMenuItemConfig = (input: ContextMenuItemConfigInput | undefined) => {
  const complex = {} as ContextMenuItemConfigComplexProps
  for (const type of [...contextMenuItemConfigColorNames, 'any'] as const) {
    for (const size of [...contextMenuItemConfigSizesNames, 'any'] as const) {
      for (const state of [...contextMenuItemConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultContextMenuItemConfigInput.complex?.[type]?.[size]?.[state]
        const inputComplexItem = input?.complex?.[type]?.[size]?.[state]
        const complexItem =
          !defaultComplexItem && !inputComplexItem ? undefined : { ...defaultComplexItem, ...inputComplexItem }
        if (complexItem) {
          complex[type] = {
            ...complex[type],
            [size]: {
              ...complex[type]?.[size],
              [state]: complexItem,
            },
          }
        }
      }
    }
  }

  return {
    general: {},
    variant: {
      primary: {
        ...defaultContextMenuItemConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultContextMenuItemConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultContextMenuItemConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultContextMenuItemConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultContextMenuItemConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultContextMenuItemConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultContextMenuItemConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultContextMenuItemConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultContextMenuItemConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultContextMenuItemConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultContextMenuItemConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultContextMenuItemConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultContextMenuItemConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultContextMenuItemConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultContextMenuItemConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultContextMenuItemConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultContextMenuItemConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
      current: {
        ...defaultContextMenuItemConfigInput.state?.current,
        ...input?.state?.current,
      },
    },
    complex,
  }
}
export type ContextMenuItemConfig = ReturnType<typeof normalizeContextMenuItemConfig>

export const normalizeContextMenuItemColorName = (
  uinityConfig: UinityConfig,
  color?: ContextMenuItemConfigColorName | null | undefined
) => {
  if (color && uinityConfig.contextMenuItem.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeContextMenuItemSizeName = (
  uinityConfig: UinityConfig,
  size?: ContextMenuItemConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.contextMenuItem.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeContextMenuItemStateName = (
  uinityConfig: UinityConfig,
  state?: ContextMenuItemConfigStateName | null | undefined
) => {
  if (state && uinityConfig.contextMenuItem.state[state]) {
    return state
  }
  return 'rest'
}

export const normalizeContextMenuItemVariantName = (
  uinityConfig: UinityConfig,
  variant?: ContextMenuItemConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.contextMenuItem.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getContextMenuItemVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ContextMenuItemConfigVariantName | undefined | null
) => {
  variant = normalizeContextMenuItemVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.contextMenuItem.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getContextMenuItemConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ContextMenuItemConfigVariantName | undefined | null,
  color?: ContextMenuItemConfigColorName | undefined | null,
  size?: ContextMenuItemConfigSizeName | undefined | null,
  state?: ContextMenuItemConfigStateName | undefined | null
) => {
  const c = uinityConfig.contextMenuItem
  const { variantColor } = getContextMenuItemVariantProps(uinityConfig, variant)
  color = normalizeContextMenuItemColorName(uinityConfig, color || variantColor)
  size = normalizeContextMenuItemSizeName(uinityConfig, size)
  state = normalizeContextMenuItemStateName(uinityConfig, state)
  return {
    ...(color && c.color?.[color]),
    ...(size && c.size?.[size]),
    ...c.state?.[state],
    ...c.complex?.any?.any?.any,
    ...c.complex?.any?.any?.[state],
    ...(size && c.complex?.any?.[size]?.any),
    ...(size && c.complex?.any?.[size]?.[state]),
    ...(color && c.complex?.[color]?.any?.any),
    ...(color && c.complex?.[color]?.any?.[state]),
    ...(size && color && c.complex?.[color]?.[size]?.any),
    ...(size && color && c.complex?.[color]?.[size]?.[state]),
  }
}
