import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextTypeName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const buttonConfigSizesNames = controlSizeNames
export const zButtonConfigSizeName = z.enum(buttonConfigSizesNames)
export type ButtonConfigSizeName = z.infer<typeof zButtonConfigSizeName>

export const buttonConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zButtonConfigVariantName = z.enum(buttonConfigVariantNames)
export type ButtonConfigVariantName = z.infer<typeof zButtonConfigVariantName>

export const buttonConfigColorNames = ['brand', 'gray'] as const
export const zButtonConfigColorName = z.enum(buttonConfigColorNames)
export type ButtonConfigColorName = z.infer<typeof zButtonConfigColorName>

export const buttonConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled'] as const
export const zButtonConfigStateName = z.enum(buttonConfigStatesNames)
export type ButtonConfigStateName = z.infer<typeof zButtonConfigStateName>

export const zButtonConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type ButtonConfigSizeProps = z.infer<typeof zButtonConfigSizeProps>

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
export type ButtonConfigAppearenceProps = z.infer<typeof zButtonConfigStyleRootProps>

export const zButtonConfigStyleRootProps = zButtonConfigSizeProps.merge(zButtonConfigAppearenceProps)
export type ButtonConfigStyleRootProps = z.infer<typeof zButtonConfigStyleRootProps>

export const zButtonGeneralProps = z.object({})
export type ButtonGeneralProps = z.infer<typeof zButtonGeneralProps>

export const zButtonComplexProps = z.record(
  z.union([zButtonConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zButtonConfigSizeName, z.literal('any')]),
      z.record(z.union([zButtonConfigStateName, z.literal('any')]), zButtonConfigStyleRootProps).optional()
    )
    .optional()
)
export type ButtonComplexProps = z.infer<typeof zButtonComplexProps>

export const zButtonConfigVariantProps = z.object({
  color: zButtonConfigColorName.optional(),
})
export type ButtonConfigVariantProps = z.infer<typeof zButtonConfigVariantProps>

export const zButtonUinityConfigInput = z.object({
  general: zButtonGeneralProps.optional(),
  variant: z.record(zButtonConfigVariantName, zButtonConfigVariantProps).optional(),
  color: z.record(zButtonConfigColorName, zButtonConfigAppearenceProps).optional(),
  size: z.record(zButtonConfigSizeName, zButtonConfigSizeProps).optional(),
  state: z.record(zButtonConfigStateName, zButtonConfigAppearenceProps).optional(),
  complex: zButtonComplexProps.optional(),
})
export type ButtonUinityConfigInput = z.infer<typeof zButtonUinityConfigInput>

const getDefaultSpecificSizeProps = (size: ButtonConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultButtonUinityConfigInput: ButtonUinityConfigInput = {
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
      background: {
        light: $.color.core.brand[60],
        dark: $.color.core.brand[60],
      },
      iconColor: {
        dark: $.color.core.neutral[0],
        light: $.color.core.neutral[250],
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

export const normalizeButtonUinityConfig = (input: ButtonUinityConfigInput | undefined) => {
  const complex = {} as ButtonComplexProps
  for (const type of [...buttonConfigColorNames, 'any'] as const) {
    for (const size of [...buttonConfigSizesNames, 'any'] as const) {
      for (const state of [...buttonConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultButtonUinityConfigInput.complex?.[type]?.[size]?.[state]
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
        ...defaultButtonUinityConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultButtonUinityConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultButtonUinityConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultButtonUinityConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultButtonUinityConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultButtonUinityConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultButtonUinityConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultButtonUinityConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultButtonUinityConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultButtonUinityConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultButtonUinityConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultButtonUinityConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultButtonUinityConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultButtonUinityConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultButtonUinityConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultButtonUinityConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultButtonUinityConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
    },
    complex,
  }
}
export type ButtonUinityConfig = ReturnType<typeof normalizeButtonUinityConfig>

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

export const getButtonStyleRootProps = (
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
