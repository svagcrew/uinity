import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextTypeName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const linkConfigSizesNames = controlSizeNames
export const zLinkConfigSizeName = z.enum(linkConfigSizesNames)
export type LinkConfigSizeName = z.output<typeof zLinkConfigSizeName>

export const linkConfigVariantNames = [
  'primary',
  'secondary',
  'trietary',
  'dangerPrimary',
  'dangerSecondary',
  'dangerTrietary',
] as const
export const zLinkConfigVariantName = z.enum(linkConfigVariantNames)
export type LinkConfigVariantName = z.output<typeof zLinkConfigVariantName>

export const linkConfigColorNames = ['brand', 'gray'] as const
export const zLinkConfigColorName = z.enum(linkConfigColorNames)
export type LinkConfigColorName = z.output<typeof zLinkConfigColorName>

export const linkConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled', 'current'] as const
export const zLinkConfigStateName = z.enum(linkConfigStatesNames)
export type LinkConfigStateName = z.output<typeof zLinkConfigStateName>

export const zLinkConfigSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type LinkConfigSizeProps = z.output<typeof zLinkConfigSizeProps>

export const zLinkConfigAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type LinkConfigAppearenceProps = z.output<typeof zLinkConfigAppearenceProps>

export const zLinkConfigFinalProps = zLinkConfigSizeProps.merge(zLinkConfigAppearenceProps)
export type LinkConfigFinalProps = z.output<typeof zLinkConfigFinalProps>

export const zLinkConfigGeneralProps = z.object({})
export type LinkConfigGeneralProps = z.output<typeof zLinkConfigGeneralProps>

export const zLinkConfigComplexProps = z.record(
  z.union([zLinkConfigColorName, z.literal('any')]),
  z
    .record(
      z.union([zLinkConfigSizeName, z.literal('any')]),
      z.record(z.union([zLinkConfigStateName, z.literal('any')]), zLinkConfigFinalProps).optional()
    )
    .optional()
)
export type LinkConfigComplexProps = z.output<typeof zLinkConfigComplexProps>

export const zLinkConfigVariantProps = z.object({
  color: zLinkConfigColorName.optional(),
})
export type LinkConfigVariantProps = z.output<typeof zLinkConfigVariantProps>

export const zLinkConfigInput = z.object({
  general: zLinkConfigGeneralProps.optional(),
  variant: z.record(zLinkConfigVariantName, zLinkConfigVariantProps).optional(),
  color: z.record(zLinkConfigColorName, zLinkConfigAppearenceProps).optional(),
  size: z.record(zLinkConfigSizeName, zLinkConfigSizeProps).optional(),
  state: z.record(zLinkConfigStateName, zLinkConfigAppearenceProps).optional(),
  complex: zLinkConfigComplexProps.optional(),
})
export type LinkConfigInput = z.output<typeof zLinkConfigInput>

const getDefaultSpecificSizeProps = (size: LinkConfigSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultLinkConfigInput: LinkConfigInput = {
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
  size: Object.fromEntries(linkConfigSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
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

export const normalizeLinkConfig = (input: LinkConfigInput | undefined) => {
  const complex = {} as LinkConfigComplexProps
  for (const type of [...linkConfigColorNames, 'any'] as const) {
    for (const size of [...linkConfigSizesNames, 'any'] as const) {
      for (const state of [...linkConfigStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultLinkConfigInput.complex?.[type]?.[size]?.[state]
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
        ...defaultLinkConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultLinkConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultLinkConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
      dangerPrimary: {
        ...defaultLinkConfigInput.variant?.dangerPrimary,
        ...input?.variant?.dangerPrimary,
      },
      dangerSecondary: {
        ...defaultLinkConfigInput.variant?.dangerSecondary,
        ...input?.variant?.dangerSecondary,
      },
      dangerTrietary: {
        ...defaultLinkConfigInput.variant?.dangerTrietary,
        ...input?.variant?.dangerTrietary,
      },
    },
    size: {
      xs: {
        ...defaultLinkConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultLinkConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultLinkConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultLinkConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultLinkConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      gray: {
        ...defaultLinkConfigInput.color?.gray,
        ...input?.color?.gray,
      },
    },
    state: {
      rest: {
        ...defaultLinkConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultLinkConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultLinkConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultLinkConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultLinkConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
      current: {
        ...defaultLinkConfigInput.state?.current,
        ...input?.state?.current,
      },
    },
    complex,
  }
}
export type LinkConfig = ReturnType<typeof normalizeLinkConfig>

export const normalizeLinkColorName = (uinityConfig: UinityConfig, color?: LinkConfigColorName | null | undefined) => {
  if (color && uinityConfig.link.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeLinkSizeName = (uinityConfig: UinityConfig, size?: LinkConfigSizeName | null | undefined) => {
  if (size && uinityConfig.link.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeLinkStateName = (uinityConfig: UinityConfig, state?: LinkConfigStateName | null | undefined) => {
  if (state && uinityConfig.link.state[state]) {
    return state
  }
  return 'rest'
}

export const normalizeLinkVariantName = (
  uinityConfig: UinityConfig,
  variant?: LinkConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.link.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getLinkVariantProps = (uinityConfig: UinityConfig, variant?: LinkConfigVariantName | undefined | null) => {
  variant = normalizeLinkVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.link.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getLinkConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: LinkConfigVariantName | undefined | null,
  color?: LinkConfigColorName | undefined | null,
  size?: LinkConfigSizeName | undefined | null,
  state?: LinkConfigStateName | undefined | null
) => {
  const c = uinityConfig.link
  const { variantColor } = getLinkVariantProps(uinityConfig, variant)
  color = normalizeLinkColorName(uinityConfig, color || variantColor)
  size = normalizeLinkSizeName(uinityConfig, size)
  state = normalizeLinkStateName(uinityConfig, state)
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
