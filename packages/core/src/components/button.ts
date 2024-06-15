import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextTypeName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const buttonConfigSizesNames = controlSizeNames
export const zButtonConfigSizeName = z.enum(buttonConfigSizesNames)
export type ButtonConfigSizeName = z.output<typeof zButtonConfigSizeName>

export const buttonConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zButtonConfigVariantName = z.enum(buttonConfigVariantNames)
export type ButtonConfigVariantName = z.output<typeof zButtonConfigVariantName>

export const buttonConfigColorNames = ['brand', 'gray'] as const
export const zButtonConfigColorName = z.enum(buttonConfigColorNames)
export type ButtonConfigColorName = z.output<typeof zButtonConfigColorName>

export const buttonConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled'] as const
export const zButtonConfigStateName = z.enum(buttonConfigStatesNames)
export type ButtonConfigStateName = z.output<typeof zButtonConfigStateName>

export const zButtonConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type ButtonConfigSizeProps = z.output<typeof zButtonConfigSizeProps>

export const zButtonConfigAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type ButtonConfigAppearenceProps = z.output<typeof zButtonConfigAppearenceProps>

export const zButtonConfigFinalProps = zButtonConfigSizeProps.merge(zButtonConfigAppearenceProps)
export type ButtonConfigFinalProps = z.output<typeof zButtonConfigFinalProps>

export const zButtonConfigGeneralProps = z.object({})
export type ButtonConfigGeneralProps = z.output<typeof zButtonConfigGeneralProps>

export const zButtonConfigComplexProps = z.record(
  z.union([zButtonConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zButtonConfigSizeName, z.literal('any')]),
      z.record(z.union([zButtonConfigStateName, z.literal('any')]), zButtonConfigFinalProps).optional()
    )
    .optional()
)
export type ButtonConfigComplexProps = z.output<typeof zButtonConfigComplexProps>

export const zButtonConfigVariantProps = z.object({
  color: zButtonConfigColorName.optional(),
})
export type ButtonConfigVariantProps = z.output<typeof zButtonConfigVariantProps>

export const zButtonConfigInput = z.object({
  general: zButtonConfigGeneralProps.optional(),
  variant: z.record(zButtonConfigVariantName, zButtonConfigVariantProps).optional(),
  color: z.record(zButtonConfigColorName, zButtonConfigAppearenceProps).optional(),
  size: z.record(zButtonConfigSizeName, zButtonConfigSizeProps).optional(),
  state: z.record(zButtonConfigStateName, zButtonConfigAppearenceProps).optional(),
  complex: zButtonConfigComplexProps.optional(),
})
export type ButtonConfigInput = z.output<typeof zButtonConfigInput>

const getDefaultSpecificSizeProps = (size: ButtonConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultButtonConfigInput: ButtonConfigInput = {
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
      textColor: $.color.core.neutral[0],
      background: {
        light: $.color.core.brand[60],
        dark: $.color.core.brand[60],
      },
      iconColor: {
        dark: $.color.core.neutral[250],
        light: $.color.core.neutral[0],
      },
    },
    gray: {
      background: $.color.semantic.symbol.secondary,
    },
  },
  size: Object.fromEntries(buttonConfigSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
  state: {
    rest: {},
    hover: {},
    active: {},
    focus: {},
    disabled: {},
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

export const normalizeButtonConfig = (input: ButtonConfigInput | undefined) => {
  const complex = {} as ButtonConfigComplexProps
  for (const type of [...buttonConfigColorNames, 'any'] as const) {
    for (const size of [...buttonConfigSizesNames, 'any'] as const) {
      for (const state of [...buttonConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultButtonConfigInput.complex?.[type]?.[size]?.[state]
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
        ...defaultButtonConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultButtonConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultButtonConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultButtonConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultButtonConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultButtonConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultButtonConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultButtonConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultButtonConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultButtonConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultButtonConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultButtonConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultButtonConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultButtonConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultButtonConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultButtonConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultButtonConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
    },
    complex,
  }
}
export type ButtonConfig = ReturnType<typeof normalizeButtonConfig>

export const normalizeButtonColorName = (
  uinityConfig: UinityConfig,
  color?: ButtonConfigColorName | null | undefined
) => {
  if (color && uinityConfig.button.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeButtonSizeName = (uinityConfig: UinityConfig, size?: ButtonConfigSizeName | null | undefined) => {
  if (size && uinityConfig.button.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeButtonStateName = (
  uinityConfig: UinityConfig,
  state?: ButtonConfigStateName | null | undefined
) => {
  if (state && uinityConfig.button.state[state]) {
    return state
  }
  return 'rest'
}

export const normalizeButtonVariantName = (
  uinityConfig: UinityConfig,
  variant?: ButtonConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.button.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getButtonVariantProps = (
  uinityConfig: UinityConfig,
  variant?: ButtonConfigVariantName | undefined | null
) => {
  variant = normalizeButtonVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.button.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getButtonConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ButtonConfigVariantName | undefined | null,
  color?: ButtonConfigColorName | undefined | null,
  size?: ButtonConfigSizeName | undefined | null,
  state?: ButtonConfigStateName | undefined | null
) => {
  const c = uinityConfig.button
  const { variantColor } = getButtonVariantProps(uinityConfig, variant)
  color = normalizeButtonColorName(uinityConfig, color || variantColor)
  size = normalizeButtonSizeName(uinityConfig, size)
  state = normalizeButtonStateName(uinityConfig, state)
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
