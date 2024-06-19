import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { toCss, zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import camelCasify from 'lodash/camelCase.js'
import { omit } from 'svag-utils'
import { z } from 'zod'

export const textFonts = ['common', 'special', 'alternate'] as const
export const zTextFontName = z.enum(textFonts)
export type TextFontName = z.output<typeof zTextFontName>

export const textWeights = ['regular', 'medium', 'bold'] as const
export const zTextWeightName = z.enum(textWeights)
export type TextWeightName = z.output<typeof zTextWeightName>

export const textSizes = [20, 30, 40, 50, 60, 70, 80, 90, 100] as const
// eslint-disable-next-line zod/prefer-enum
export const zTextSizeName = z.union([
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
export type TextSizeName = z.output<typeof zTextSizeName>

export const textLineHeights = ['xs', 's', 'm', 'l'] as const
export const zTextLineHeightName = z.enum(textLineHeights)
export type TextLineHeightName = z.output<typeof zTextLineHeightName>

export const textColorNames = ['brand', 'primary', 'secondary', 'tertiary', 'quaternary', 'quinary'] as const
export const zTextColorName = z.enum(textColorNames)
export type TextColorName = z.output<typeof zTextColorName>

export const zTextConfigFinalProps = z.object({
  fontFamily: zOptionalString,
  fontWeight: zOptionalString,
  fontSize: zOptionalNumberOrString,
  lineHeight: zOptionalNumberOrString,
  color: zColorValue.optional(),
})
export type TextConfigFinalProps = z.output<typeof zTextConfigFinalProps>

export const textVariantsNames = [
  'body-xs',
  'body-s',
  'body-m',
  'body-l',
  'heading-xs',
  'heading-s',
  'heading-m',
  'heading-l',
] as const
export const zTextVariantName = z.enum(textVariantsNames)
export type TextVariantName = z.output<typeof zTextVariantName>
export const zTextVariantProps = z.object({
  font: zTextFontName.optional(),
  weight: zTextWeightName.optional(),
  size: zTextSizeName.optional(),
  lineHeight: zTextLineHeightName.optional(),
  color: zTextColorName.optional(),
})
export type TextVariantProps = z.output<typeof zTextVariantProps>

export const zTextGetterProps = zTextVariantProps.extend({
  variant: zTextVariantName.optional(),
})
export type TextGetterProps = z.output<typeof zTextGetterProps>

export const zTextConfigInput = z.object({
  variant: z.record(zTextVariantName, zTextVariantProps).optional(),
  font: z.record(zTextFontName, zTextConfigFinalProps).optional(),
  weight: z.record(zTextWeightName, zTextConfigFinalProps).optional(),
  size: z.record(zTextSizeName, zTextConfigFinalProps).optional(),
  lineHeight: z.record(zTextLineHeightName, zTextConfigFinalProps).optional(),
  color: z.record(zTextColorName, zTextConfigFinalProps).optional(),
})
type TextConfigInput = z.output<typeof zTextConfigInput>

export const defaultTextConfigInput: TextConfigInput = {
  variant: {
    'body-xs': {
      font: 'common',
      weight: 'regular',
      size: 20,
      lineHeight: 'xs',
    },
    'body-s': {
      font: 'common',
      weight: 'regular',
      size: 30,
      lineHeight: 's',
    },
    'body-m': {
      font: 'common',
      weight: 'regular',
      size: 40,
      lineHeight: 'm',
    },
    'body-l': {
      font: 'common',
      weight: 'regular',
      size: 50,
      lineHeight: 'l',
    },
    'heading-xs': {
      font: 'common',
      weight: 'bold',
      size: 60,
      lineHeight: 'm',
    },
    'heading-s': {
      font: 'common',
      weight: 'bold',
      size: 70,
      lineHeight: 'm',
    },
    'heading-m': {
      font: 'common',
      weight: 'bold',
      size: 80,
      lineHeight: 'm',
    },
    'heading-l': {
      font: 'common',
      weight: 'bold',
      size: 90,
      lineHeight: 'm',
    },
  },
  font: {
    common: {
      fontFamily: 'Arial',
    },
    special: $.text.font.common,
    alternate: $.text.font.special,
  },
  weight: {
    regular: {
      fontWeight: 'normal',
    },
    medium: {
      fontWeight: '500',
    },
    bold: {
      fontWeight: 'bold',
    },
  },
  size: {
    20: {
      fontSize: 12,
    },
    30: {
      fontSize: 14,
    },
    40: {
      fontSize: 16,
    },
    50: {
      fontSize: 20,
    },
    60: {
      fontSize: 24,
    },
    70: {
      fontSize: 28,
    },
    80: {
      fontSize: 32,
    },
    90: {
      fontSize: 40,
    },
    100: {
      fontSize: 48,
    },
  },
  lineHeight: {
    xs: {
      lineHeight: 1.1,
    },
    s: {
      lineHeight: 1.2,
    },
    m: {
      lineHeight: 1.4,
    },
    l: {
      lineHeight: 1.6,
    },
  },
  color: {
    brand: { color: $.color.core.brand[50] },
    primary: { color: $.color.semantic.symbol.primary },
    secondary: { color: $.color.semantic.symbol.secondary },
    tertiary: { color: $.color.semantic.symbol.tertiary },
    quaternary: { color: $.color.semantic.symbol.quaternary },
    quinary: { color: $.color.semantic.symbol.quinary },
  },
}

export const normalizeTextUinityConfig = (input: TextConfigInput | undefined) => {
  return {
    variant: {
      ...defaultTextConfigInput.variant,
      ...input?.variant,
    },
    font: input?.font ?? defaultTextConfigInput.font,
    weight: {
      ...defaultTextConfigInput.weight,
      ...input?.weight,
    },
    size: {
      ...defaultTextConfigInput.size,
      ...input?.size,
    },
    lineHeight: {
      ...defaultTextConfigInput.lineHeight,
      ...input?.lineHeight,
    },
    color: {
      ...defaultTextConfigInput.color,
      ...input?.color,
    },
  }
}
export type TextUinityConfig = ReturnType<typeof normalizeTextUinityConfig>

export const getTextConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant: TextVariantName | undefined | null,
  font: TextFontName | undefined | null,
  weight: TextWeightName | undefined | null,
  size: TextSizeName | undefined | null,
  lineHeight: TextLineHeightName | undefined | null,
  color: TextColorName | undefined | null
) => {
  const textConfig = uinityConfig.text
  const variantProps = variant && textConfig.variant?.[variant]
  font = variantProps?.font || font
  weight = variantProps?.weight || weight
  size = variantProps?.size || size
  lineHeight = variantProps?.lineHeight || lineHeight
  color = variantProps?.color || color
  return {
    ...(font && textConfig.font?.[font]),
    ...(weight && textConfig.weight?.[weight]),
    ...(size && textConfig.size?.[size]),
    ...(lineHeight && textConfig.lineHeight?.[lineHeight]),
    ...(color && textConfig.color?.[color]),
  }
}
export const getTextStyleCss = (
  uinityConfig: UinityConfig,
  font?: TextFontName | undefined | null,
  weight?: TextWeightName | undefined | null,
  size?: TextSizeName | undefined | null,
  lineHeight?: TextLineHeightName | undefined | null
) => {
  return toCss(
    omit(getTextConfigFinalProps(uinityConfig, undefined, font, weight, size, lineHeight, undefined), ['color'])
  )
}

export const getTextScssMixins = (uinityConfig: UinityConfig) => {
  const mixins = [] as string[]
  for (const font of ['default', ...textFonts]) {
    for (const weight of ['default', ...textWeights]) {
      for (const size of ['default', ...textSizes]) {
        for (const lineHeight of ['default', ...textLineHeights]) {
          const fontHere = font === 'default' ? undefined : font
          const weightHere = weight === 'default' ? undefined : weight
          const sizeHere = size === 'default' ? undefined : size
          const lineHeightHere = lineHeight === 'default' ? undefined : lineHeight
          const props = getTextConfigFinalProps(
            uinityConfig,
            undefined,
            fontHere as any,
            weightHere as any,
            sizeHere as any,
            lineHeightHere as any,
            undefined
          )
          const mixinProps = toCss(omit(props, ['color']))
          const mixinName = (() => {
            const mixinNameParts = ['text']
            if (font !== 'default') {
              mixinNameParts.push(font)
            }
            if (weight !== 'default') {
              mixinNameParts.push(weight)
            }
            if (size !== 'default') {
              mixinNameParts.push(size.toString())
            }
            if (lineHeight !== 'default') {
              mixinNameParts.push(lineHeight)
            }
            return camelCasify(mixinNameParts.join('-'))
          })()
          const mixin = `@mixin ${mixinName} {
${mixinProps}
}`
          mixins.push(mixin)
        }
      }
    }
  }
  const mixinsString = mixins.join('\n\n') + '\n'
  return mixinsString
}
