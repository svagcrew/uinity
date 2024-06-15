import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextTypeName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const controlIconConfigSizesNames = controlSizeNames
export const zControlIconConfigSizeName = z.enum(controlIconConfigSizesNames)
export type ControlIconConfigSizeName = z.output<typeof zControlIconConfigSizeName>

export const controlIconConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zControlIconConfigVariantName = z.enum(controlIconConfigVariantNames)
export type ControlIconConfigVariantName = z.output<typeof zControlIconConfigVariantName>

export const controlIconConfigColorNames = ['brand', 'gray'] as const
export const zControlIconConfigColorName = z.enum(controlIconConfigColorNames)
export type ControlIconConfigColorName = z.output<typeof zControlIconConfigColorName>

export const controlIconConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled', 'current'] as const
export const zControlIconConfigStateName = z.enum(controlIconConfigStatesNames)
export type ControlIconConfigStateName = z.output<typeof zControlIconConfigStateName>

export const zControlIconConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type ControlIconConfigSizeProps = z.output<typeof zControlIconConfigSizeProps>

export const zControlIconConfigAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type ControlIconConfigAppearenceProps = z.output<typeof zControlIconConfigAppearenceProps>

export const zControlIconConfigFinalProps = zControlIconConfigSizeProps.merge(zControlIconConfigAppearenceProps)
export type ControlIconConfigFinalProps = z.output<typeof zControlIconConfigFinalProps>

export const zControlIconConfigGeneralProps = z.object({})
export type ControlIconConfigGeneralProps = z.output<typeof zControlIconConfigGeneralProps>

export const zControlIconConfigComplexProps = z.record(
  z.union([zControlIconConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zControlIconConfigSizeName, z.literal('any')]),
      z.record(z.union([zControlIconConfigStateName, z.literal('any')]), zControlIconConfigFinalProps).optional()
    )
    .optional()
)
export type ControlIconConfigComplexProps = z.output<typeof zControlIconConfigComplexProps>

export const zControlIconConfigVariantProps = z.object({
  color: zControlIconConfigColorName.optional(),
})
export type ControlIconConfigVariantProps = z.output<typeof zControlIconConfigVariantProps>

export const zControlIconConfigInput = z.object({
  general: zControlIconConfigGeneralProps.optional(),
  variant: z.record(zControlIconConfigVariantName, zControlIconConfigVariantProps).optional(),
  color: z.record(zControlIconConfigColorName, zControlIconConfigAppearenceProps).optional(),
  size: z.record(zControlIconConfigSizeName, zControlIconConfigSizeProps).optional(),
  state: z.record(zControlIconConfigStateName, zControlIconConfigAppearenceProps).optional(),
  complex: zControlIconConfigComplexProps.optional(),
})
export type ControlIconConfigInput = z.output<typeof zControlIconConfigInput>

const getDefaultSpecificSizeProps = (size: ControlIconConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultControlIconConfigInput: ControlIconConfigInput = {
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
  size: Object.fromEntries(controlIconConfigSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
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

export const normalizeControlIconConfig = (input: ControlIconConfigInput | undefined) => {
  const complex = {} as ControlIconConfigComplexProps
  for (const type of [...controlIconConfigColorNames, 'any'] as const) {
    for (const size of [...controlIconConfigSizesNames, 'any'] as const) {
      for (const state of [...controlIconConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultControlIconConfigInput.complex?.[type]?.[size]?.[state]
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
        ...defaultControlIconConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultControlIconConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultControlIconConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultControlIconConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultControlIconConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultControlIconConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultControlIconConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultControlIconConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultControlIconConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultControlIconConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultControlIconConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultControlIconConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultControlIconConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultControlIconConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultControlIconConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultControlIconConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultControlIconConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
      current: {
        ...defaultControlIconConfigInput.state?.current,
        ...input?.state?.current,
      },
    },
    complex,
  }
}
export type ControlIconConfig = ReturnType<typeof normalizeControlIconConfig>

export const normalizeControlIconColorName = (uinityConfig: UinityConfig, color?: ControlIconConfigColorName | null | undefined) => {
  if (color && uinityConfig.controlIcon.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeControlIconSizeName = (uinityConfig: UinityConfig, size?: ControlIconConfigSizeName | null | undefined) => {
  if (size && uinityConfig.controlIcon.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeControlIconStateName = (uinityConfig: UinityConfig, state?: ControlIconConfigStateName | null | undefined) => {
  if (state && uinityConfig.controlIcon.state[state]) {
    return state
  }
  return 'rest'
}

export const normalizeControlIconVariantName = (
  uinityConfig: UinityConfig,
  variant?: ControlIconConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.controlIcon.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getControlIconVariantProps = (uinityConfig: UinityConfig, variant?: ControlIconConfigVariantName | undefined | null) => {
  variant = normalizeControlIconVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.controlIcon.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getControlIconConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: ControlIconConfigVariantName | undefined | null,
  color?: ControlIconConfigColorName | undefined | null,
  size?: ControlIconConfigSizeName | undefined | null,
  state?: ControlIconConfigStateName | undefined | null
) => {
  const c = uinityConfig.controlIcon
  const { variantColor } = getControlIconVariantProps(uinityConfig, variant)
  color = normalizeControlIconColorName(uinityConfig, color || variantColor)
  size = normalizeControlIconSizeName(uinityConfig, size)
  state = normalizeControlIconStateName(uinityConfig, state)
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
