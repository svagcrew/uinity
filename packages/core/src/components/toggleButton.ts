import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextWeightName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const toggleButtonConfigSizesNames = controlSizeNames
export const zToggleButtonConfigSizeName = z.enum(toggleButtonConfigSizesNames)
export type ToggleButtonConfigSizeName = z.output<typeof zToggleButtonConfigSizeName>

export const toggleButtonConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zToggleButtonConfigVariantName = z.enum(toggleButtonConfigVariantNames)
export type ToggleButtonConfigVariantName = z.output<typeof zToggleButtonConfigVariantName>

export const toggleButtonConfigColorNames = ['brand', 'gray'] as const
export const zToggleButtonConfigColorName = z.enum(toggleButtonConfigColorNames)
export type ToggleButtonConfigColorName = z.output<typeof zToggleButtonConfigColorName>

export const toggleButtonConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled', 'checked'] as const
export const zToggleButtonConfigStateName = z.enum(toggleButtonConfigStatesNames)
export type ToggleButtonConfigStateName = z.output<typeof zToggleButtonConfigStateName>

export const zToggleButtonConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textWeight: zTextWeightName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type ToggleButtonConfigSizeProps = z.output<typeof zToggleButtonConfigSizeProps>

export const zToggleButtonConfigAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textWeight: zTextWeightName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type ToggleButtonConfigAppearenceProps = z.output<typeof zToggleButtonConfigAppearenceProps>

export const zToggleButtonConfigFinalProps = zToggleButtonConfigSizeProps.merge(zToggleButtonConfigAppearenceProps)
export type ToggleButtonConfigFinalProps = z.output<typeof zToggleButtonConfigFinalProps>

export const zToggleButtonConfigGeneralProps = z.object({})
export type ToggleButtonConfigGeneralProps = z.output<typeof zToggleButtonConfigGeneralProps>

export const zToggleButtonConfigComplexProps = z.record(
  z.union([zToggleButtonConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zToggleButtonConfigSizeName, z.literal('any')]),
      z.record(z.union([zToggleButtonConfigStateName, z.literal('any')]), zToggleButtonConfigFinalProps).optional()
    )
    .optional()
)
export type ToggleButtonConfigComplexProps = z.output<typeof zToggleButtonConfigComplexProps>

export const zToggleButtonConfigVariantProps = z.object({
  color: zToggleButtonConfigColorName.optional(),
})
export type ToggleButtonConfigVariantProps = z.output<typeof zToggleButtonConfigVariantProps>

export const zToggleButtonConfigInput = z.object({
  general: zToggleButtonConfigGeneralProps.optional(),
  variant: z.record(zToggleButtonConfigVariantName, zToggleButtonConfigVariantProps).optional(),
  color: z.record(zToggleButtonConfigColorName, zToggleButtonConfigAppearenceProps).optional(),
  size: z.record(zToggleButtonConfigSizeName, zToggleButtonConfigSizeProps).optional(),
  state: z.record(zToggleButtonConfigStateName, zToggleButtonConfigAppearenceProps).optional(),
  complex: zToggleButtonConfigComplexProps.optional(),
})
export type ToggleButtonConfigInput = z.output<typeof zToggleButtonConfigInput>

const getDefaultSpecificSizeProps = (size: ToggleButtonConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultToggleButtonConfigInput: ToggleButtonConfigInput = {
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
      textColor: $.color.core.neutral[250],
      background: {
        light: $.color.core.brand[0],
        dark: $.color.core.brand[0],
      },
      iconColor: {
        dark: $.color.core.neutral[250],
        light: $.color.core.neutral[250],
      },
      borderColor: {
        light: $.color.core.brand[50],
        dark: $.color.core.brand[50],
      },
    },
    gray: {
      background: $.color.semantic.symbol.secondary,
    },
  },
  size: Object.fromEntries(toggleButtonConfigSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
  state: {
    rest: {},
    hover: {},
    active: {},
    focus: {},
    disabled: {},
    checked: {
      borderColor: $.color.core.brand[150],
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

export const normalizeToggleButtonConfig = (input: ToggleButtonConfigInput | undefined) => {
  const complex = {} as ToggleButtonConfigComplexProps
  for (const type of [...toggleButtonConfigColorNames, 'any'] as const) {
    for (const size of [...toggleButtonConfigSizesNames, 'any'] as const) {
      for (const state of [...toggleButtonConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultToggleButtonConfigInput.complex?.[type]?.[size]?.[state]
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
        ...defaultToggleButtonConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultToggleButtonConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultToggleButtonConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultToggleButtonConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultToggleButtonConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultToggleButtonConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultToggleButtonConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultToggleButtonConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultToggleButtonConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultToggleButtonConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultToggleButtonConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultToggleButtonConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultToggleButtonConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultToggleButtonConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultToggleButtonConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultToggleButtonConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultToggleButtonConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
      checked: {
        ...defaultToggleButtonConfigInput.state?.checked,
        ...input?.state?.checked,
      },
    },
    complex,
  }
}
export type ToggleButtonConfig = ReturnType<typeof normalizeToggleButtonConfig>

export const normalizeToggleButtonColorName = (
  uinityConfig: UinityConfig,
  color?: ToggleButtonConfigColorName | null | undefined
) => {
  if (color && uinityConfig.toggleButton.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeToggleButtonSizeName = (
  uinityConfig: UinityConfig,
  size?: ToggleButtonConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.toggleButton.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeToggleButtonStateName = (
  uinityConfig: UinityConfig,
  state?: ToggleButtonConfigStateName | null | undefined
) => {
  if (state && uinityConfig.toggleButton.state[state]) {
    return state
  }
  return 'rest'
}

export const normalizeToggleButtonVariantName = (
  uinityConfig: UinityConfig,
  variant?: ToggleButtonConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.toggleButton.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getToggleButtonVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ToggleButtonConfigVariantName | undefined | null
) => {
  variant = normalizeToggleButtonVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.toggleButton.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getToggleButtonConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ToggleButtonConfigVariantName | undefined | null,
  color?: ToggleButtonConfigColorName | undefined | null,
  size?: ToggleButtonConfigSizeName | undefined | null,
  state?: ToggleButtonConfigStateName | undefined | null
) => {
  const c = uinityConfig.toggleButton
  const { variantColor } = getToggleButtonVariantProps(uinityConfig, variant)
  color = normalizeToggleButtonColorName(uinityConfig, color || variantColor)
  size = normalizeToggleButtonSizeName(uinityConfig, size)
  state = normalizeToggleButtonStateName(uinityConfig, state)
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
