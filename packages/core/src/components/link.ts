/* eslint-disable unicorn/prefer-default-parameters */
import { defaultTextConfigInput } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const linkFonts = ['common', 'special', 'alternate'] as const
export const zLinkFontName = z.enum(linkFonts)
export type LinkFontName = z.output<typeof zLinkFontName>

export const linkWeights = ['regular', 'medium', 'bold'] as const
export const zLinkWeightName = z.enum(linkWeights)
export type LinkWeightName = z.output<typeof zLinkWeightName>

export const linkSizes = [20, 30, 40, 50, 60, 70, 80, 90, 100] as const
// eslint-disable-next-line zod/prefer-enum
export const zLinkSizeName = z.union([
  z.literal(20),
  z.literal(30),
  z.literal(40),
  z.literal(50),
  z.literal(60),
  z.literal(70),
  z.literal(80),
  z.literal(90),
  z.literal(100),
])
export type LinkSizeName = z.output<typeof zLinkSizeName>

export const linkLineHeights = ['xs', 's', 'm', 'l'] as const
export const zLinkLineHeightName = z.enum(linkLineHeights)
export type LinkLineHeightName = z.output<typeof zLinkLineHeightName>

export const linkColorNames = ['brand', 'primary', 'secondary', 'tertiary', 'quaternary', 'quinary'] as const
export const zLinkColorName = z.enum(linkColorNames)
export type LinkColorName = z.output<typeof zLinkColorName>

export const linkConfigStatesNames = ['rest', 'hover', 'active', 'focus', 'current', 'disabled'] as const
export const zLinkConfigStateName = z.enum(linkConfigStatesNames)
export type LinkConfigStateName = z.output<typeof zLinkConfigStateName>

export const zLinkConfigFinalProps = z.object({
  fontFamily: zOptionalString,
  fontWeight: zOptionalString,
  fontSize: zOptionalNumberOrString,
  lineHeight: zOptionalNumberOrString,
  color: zColorValue.optional(),
  iconSize: zOptionalNumberOrString,
  gapAccessoryText: zOptionalNumberOrString,
})
export type LinkConfigFinalProps = z.output<typeof zLinkConfigFinalProps>

export const linkVariantsNames = [
  'body-xs',
  'body-s',
  'body-m',
  'body-l',
  'heading-xs',
  'heading-s',
  'heading-m',
  'heading-l',
] as const
export const zLinkVariantName = z.enum(linkVariantsNames)
export type LinkVariantName = z.output<typeof zLinkVariantName>
export const zLinkVariantProps = z.object({
  font: zLinkFontName.optional(),
  weight: zLinkWeightName.optional(),
  size: zLinkSizeName.optional(),
  lineHeight: zLinkLineHeightName.optional(),
  color: zLinkColorName.optional(),
})
export type LinkVariantProps = z.output<typeof zLinkVariantProps>

export const zLinkConfigInput = z.object({
  variant: z.record(zLinkVariantName, zLinkVariantProps).optional(),
  font: z.record(zLinkFontName, zLinkConfigFinalProps).optional(),
  weight: z.record(zLinkWeightName, zLinkConfigFinalProps).optional(),
  size: z.record(zLinkSizeName, zLinkConfigFinalProps).optional(),
  lineHeight: z.record(zLinkLineHeightName, zLinkConfigFinalProps).optional(),
  color: z.record(zLinkColorName, zLinkConfigFinalProps).optional(),
  state: z.record(zLinkConfigStateName, zLinkConfigFinalProps).optional(),
})
type LinkUinityConfigInput = z.output<typeof zLinkConfigInput>

export const defaultLinkConfigInput: LinkUinityConfigInput = {
  variant: defaultTextConfigInput.variant,
  font: defaultTextConfigInput.font,
  weight: defaultTextConfigInput.weight,
  size: Object.fromEntries(
    Object.entries(defaultTextConfigInput.size || {}).map(([key, value]) => [
      key,
      { ...value, iconSize: value.fontSize, gapAccessoryText: 4 },
    ])
  ),
  lineHeight: defaultTextConfigInput.lineHeight,
  color: defaultTextConfigInput.color,
  state: {
    rest: {},
    hover: {
      color: $.color.core.brand[180],
    },
    active: {},
    focus: {},
    disabled: {},
    current: {
      color: $.color.core.brand[250],
    },
  },
}

export const normalizeLinkConfig = (input: LinkUinityConfigInput | undefined) => {
  return {
    variant: {
      ...defaultLinkConfigInput.variant,
      ...input?.variant,
    },
    font: input?.font ?? defaultLinkConfigInput.font,
    weight: {
      ...defaultLinkConfigInput.weight,
      ...input?.weight,
    },
    size: {
      ...defaultLinkConfigInput.size,
      ...input?.size,
    },
    lineHeight: {
      ...defaultLinkConfigInput.lineHeight,
      ...input?.lineHeight,
    },
    color: {
      ...defaultLinkConfigInput.color,
      ...input?.color,
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
      current: {
        ...defaultLinkConfigInput.state?.current,
        ...input?.state?.current,
      },
      disabled: {
        ...defaultLinkConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
    },
  }
}
export type LinkUinityConfig = ReturnType<typeof normalizeLinkConfig>

export const getLinkConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant: LinkVariantName | undefined | null,
  font: LinkFontName | undefined | null,
  weight: LinkWeightName | undefined | null,
  size: LinkSizeName | undefined | null,
  lineHeight: LinkLineHeightName | undefined | null,
  color: LinkColorName | undefined | null,
  state: LinkConfigStateName | undefined | null
) => {
  const linkConfig = uinityConfig.link
  const variantProps = variant && linkConfig.variant?.[variant]
  font = variantProps?.font || font
  weight = variantProps?.weight || weight
  size = variantProps?.size || size
  lineHeight = variantProps?.lineHeight || lineHeight
  color = variantProps?.color || color
  state = state || 'rest'
  return {
    ...(font && linkConfig.font?.[font]),
    ...(weight && linkConfig.weight?.[weight]),
    ...(size && linkConfig.size?.[size]),
    ...(lineHeight && linkConfig.lineHeight?.[lineHeight]),
    ...(color && linkConfig.color?.[color]),
    ...(state && linkConfig.state?.[state]),
  }
}
