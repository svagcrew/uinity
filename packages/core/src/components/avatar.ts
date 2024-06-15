import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextTypeName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const avatarConfigSizesNames = controlSizeNames
export const zAvatarConfigSizeName = z.enum(avatarConfigSizesNames)
export type AvatarConfigSizeName = z.output<typeof zAvatarConfigSizeName>

export const avatarConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zAvatarConfigVariantName = z.enum(avatarConfigVariantNames)
export type AvatarConfigVariantName = z.output<typeof zAvatarConfigVariantName>

export const avatarConfigColorNames = ['brand', 'gray'] as const
export const zAvatarConfigColorName = z.enum(avatarConfigColorNames)
export type AvatarConfigColorName = z.output<typeof zAvatarConfigColorName>

export const avatarConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled', 'current'] as const
export const zAvatarConfigStateName = z.enum(avatarConfigStatesNames)
export type AvatarConfigStateName = z.output<typeof zAvatarConfigStateName>

export const zAvatarConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type AvatarConfigSizeProps = z.output<typeof zAvatarConfigSizeProps>

export const zAvatarConfigAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type AvatarConfigAppearenceProps = z.output<typeof zAvatarConfigAppearenceProps>

export const zAvatarConfigFinalProps = zAvatarConfigSizeProps.merge(zAvatarConfigAppearenceProps)
export type AvatarConfigFinalProps = z.output<typeof zAvatarConfigFinalProps>

export const zAvatarConfigGeneralProps = z.object({})
export type AvatarConfigGeneralProps = z.output<typeof zAvatarConfigGeneralProps>

export const zAvatarConfigComplexProps = z.record(
  z.union([zAvatarConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zAvatarConfigSizeName, z.literal('any')]),
      z.record(z.union([zAvatarConfigStateName, z.literal('any')]), zAvatarConfigFinalProps).optional()
    )
    .optional()
)
export type AvatarConfigComplexProps = z.output<typeof zAvatarConfigComplexProps>

export const zAvatarConfigVariantProps = z.object({
  color: zAvatarConfigColorName.optional(),
})
export type AvatarConfigVariantProps = z.output<typeof zAvatarConfigVariantProps>

export const zAvatarConfigInput = z.object({
  general: zAvatarConfigGeneralProps.optional(),
  variant: z.record(zAvatarConfigVariantName, zAvatarConfigVariantProps).optional(),
  color: z.record(zAvatarConfigColorName, zAvatarConfigAppearenceProps).optional(),
  size: z.record(zAvatarConfigSizeName, zAvatarConfigSizeProps).optional(),
  state: z.record(zAvatarConfigStateName, zAvatarConfigAppearenceProps).optional(),
  complex: zAvatarConfigComplexProps.optional(),
})
export type AvatarConfigInput = z.output<typeof zAvatarConfigInput>

const getDefaultSpecificSizeProps = (size: AvatarConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultAvatarConfigInput: AvatarConfigInput = {
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
  size: Object.fromEntries(avatarConfigSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
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

export const normalizeAvatarConfig = (input: AvatarConfigInput | undefined) => {
  const complex = {} as AvatarConfigComplexProps
  for (const type of [...avatarConfigColorNames, 'any'] as const) {
    for (const size of [...avatarConfigSizesNames, 'any'] as const) {
      for (const state of [...avatarConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultAvatarConfigInput.complex?.[type]?.[size]?.[state]
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
        ...defaultAvatarConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultAvatarConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultAvatarConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultAvatarConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultAvatarConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultAvatarConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultAvatarConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultAvatarConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultAvatarConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultAvatarConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultAvatarConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultAvatarConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultAvatarConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultAvatarConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultAvatarConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultAvatarConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultAvatarConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
      current: {
        ...defaultAvatarConfigInput.state?.current,
        ...input?.state?.current,
      },
    },
    complex,
  }
}
export type AvatarConfig = ReturnType<typeof normalizeAvatarConfig>

export const normalizeAvatarColorName = (uinityConfig: UinityConfig, color?: AvatarConfigColorName | null | undefined) => {
  if (color && uinityConfig.avatar.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeAvatarSizeName = (uinityConfig: UinityConfig, size?: AvatarConfigSizeName | null | undefined) => {
  if (size && uinityConfig.avatar.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeAvatarStateName = (uinityConfig: UinityConfig, state?: AvatarConfigStateName | null | undefined) => {
  if (state && uinityConfig.avatar.state[state]) {
    return state
  }
  return 'rest'
}

export const normalizeAvatarVariantName = (
  uinityConfig: UinityConfig,
  variant?: AvatarConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.avatar.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getAvatarVariantProps = (uinityConfig: UinityConfig, variant?: AvatarConfigVariantName | undefined | null) => {
  variant = normalizeAvatarVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.avatar.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getAvatarConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: AvatarConfigVariantName | undefined | null,
  color?: AvatarConfigColorName | undefined | null,
  size?: AvatarConfigSizeName | undefined | null,
  state?: AvatarConfigStateName | undefined | null
) => {
  const c = uinityConfig.avatar
  const { variantColor } = getAvatarVariantProps(uinityConfig, variant)
  color = normalizeAvatarColorName(uinityConfig, color || variantColor)
  size = normalizeAvatarSizeName(uinityConfig, size)
  state = normalizeAvatarStateName(uinityConfig, state)
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
