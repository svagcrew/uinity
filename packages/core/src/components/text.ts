import type { UinityConfig } from '@/config/index.js'
import { toCss, zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import camelCasify from 'lodash/camelCase.js'
import { z } from 'zod'

export const textFonts = ['display', 'common', 'alternate'] as const
export const zTextFontName = z.enum(textFonts)
export type TextFontName = z.output<typeof zTextFontName>
export const zTextFontProps = z.object({
  fontFamily: zOptionalString,
})
export type TextFontProps = z.output<typeof zTextFontProps>

export const textTypes = ['regular', 'medium', 'bold'] as const
export const zTextTypeName = z.enum(textTypes)
export type TextTypeName = z.output<typeof zTextTypeName>
export const zTextTypeProps = z.object({
  fontWeight: zOptionalString,
})
export type TextTypeProps = z.output<typeof zTextTypeProps>

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
export const zTextSizeProps = z.object({
  fontSize: zOptionalNumberOrString,
})
export type TextSizeProps = z.output<typeof zTextSizeProps>

export const textLineHeights = ['xs', 's', 'm', 'l'] as const
export const zTextLineHeightName = z.enum(textLineHeights)
export type TextLineHeightName = z.output<typeof zTextLineHeightName>
export const zTextLineHeightProps = z.object({
  lineHeight: zOptionalNumberOrString,
})
export type TextLineHeightProps = z.output<typeof zTextLineHeightProps>

export const zTextFinalProps = zTextFontProps.merge(zTextTypeProps).merge(zTextSizeProps).merge(zTextLineHeightProps)
export type TextFinalProps = z.output<typeof zTextFinalProps>

export const zTextGeneralProps = z.object({
  defaultFont: zTextFontName.optional(),
  defaultType: zTextTypeName.optional(),
  defaultSize: zTextSizeName.optional(),
  defaultLineHeight: zTextLineHeightName.optional(),
})
export type TextGeneralProps = z.output<typeof zTextGeneralProps>

export const zTextUinityConfigInput = z.object({
  general: zTextGeneralProps.optional(),
  font: z.record(zTextFontName, zTextFontProps).optional(),
  type: z.record(zTextTypeName, zTextTypeProps).optional(),
  size: z.record(zTextSizeName, zTextSizeProps).optional(),
  lineHeight: z.record(zTextLineHeightName, zTextLineHeightProps).optional(),
})
type TextUinityConfigInput = z.output<typeof zTextUinityConfigInput>

export const defaultTextUinityConfigInput: TextUinityConfigInput = {
  general: {
    defaultFont: 'common',
    defaultType: 'regular',
    defaultSize: 40,
    defaultLineHeight: 'm',
  },
  font: {
    common: {
      fontFamily: 'Arial',
    },
    display: $.text.font.common,
    alternate: $.text.font.display,
  },
  type: {
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
}

export const normalizeTextUinityConfig = (input: TextUinityConfigInput | undefined) => {
  return {
    general: {
      defaultFont: input?.general?.defaultFont ?? defaultTextUinityConfigInput.general?.defaultFont,
      defaultType: input?.general?.defaultType ?? defaultTextUinityConfigInput.general?.defaultType,
      defaultSize: input?.general?.defaultSize ?? defaultTextUinityConfigInput.general?.defaultSize,
      defaultLineHeight: input?.general?.defaultLineHeight ?? defaultTextUinityConfigInput.general?.defaultLineHeight,
    },
    font: input?.font ?? defaultTextUinityConfigInput.font,
    type: {
      ...defaultTextUinityConfigInput.type,
      ...input?.type,
    },
    size: {
      ...defaultTextUinityConfigInput.size,
      ...input?.size,
    },
    lineHeight: {
      ...defaultTextUinityConfigInput.lineHeight,
      ...input?.lineHeight,
    },
  }
}
export type TextUinityConfig = ReturnType<typeof normalizeTextUinityConfig>

export const normalizeTextFontName = (uinityConfig: UinityConfig, font?: TextFontName | null | undefined) => {
  if (font && uinityConfig.text.font?.[font]) {
    return font
  }
  return uinityConfig.text.general.defaultFont
}

export const normalizeTextTypeName = (uinityConfig: UinityConfig, type?: TextTypeName | null | undefined) => {
  if (type && uinityConfig.text.type[type]) {
    return type
  }
  return uinityConfig.text.general.defaultType
}

export const normalizeTextSizeName = (uinityConfig: UinityConfig, size?: TextSizeName | null | undefined) => {
  if (size && uinityConfig.text.size[size]) {
    return size
  }
  return uinityConfig.text.general.defaultSize
}

export const normalizeTextLineHeightName = (
  uinityConfig: UinityConfig,
  lineHeight?: TextLineHeightName | null | undefined
) => {
  if (lineHeight && uinityConfig.text.lineHeight[lineHeight]) {
    return lineHeight
  }
  return uinityConfig.text.general.defaultLineHeight
}

export const getTextFinalProps = (
  uinityConfig: UinityConfig,
  font: TextFontName | undefined | null,
  type: TextTypeName | undefined | null,
  size: TextSizeName | undefined | null,
  lineHeight: TextLineHeightName | undefined | null
) => {
  const textConfig = uinityConfig.text
  font = normalizeTextFontName(uinityConfig, font)
  type = normalizeTextTypeName(uinityConfig, type)
  size = normalizeTextSizeName(uinityConfig, size)
  lineHeight = normalizeTextLineHeightName(uinityConfig, lineHeight)
  return {
    ...(font && textConfig.font?.[font]),
    ...(type && textConfig.type?.[type]),
    ...(size && textConfig.size?.[size]),
    ...(lineHeight && textConfig.lineHeight?.[lineHeight]),
    // ...textConfig.complex?.[fontHere]?.[typeHere]?.[sizeHere]?.[lineHeightHere],
  }
}
export const getTextStyleCss = (
  uinityConfig: UinityConfig,
  font?: TextFontName | undefined | null,
  type?: TextTypeName | undefined | null,
  size?: TextSizeName | undefined | null,
  lineHeight?: TextLineHeightName | undefined | null
) => {
  return toCss(getTextFinalProps(uinityConfig, font, type, size, lineHeight))
}

export const getTextScssMixins = (uinityConfig: UinityConfig) => {
  const mixins = [] as string[]
  for (const font of ['default', ...textFonts]) {
    for (const type of ['default', ...textTypes]) {
      for (const size of ['default', ...textSizes]) {
        for (const lineHeight of ['default', ...textLineHeights]) {
          const fontHere = font === 'default' ? uinityConfig.text.general.defaultFont : font
          const typeHere = type === 'default' ? uinityConfig.text.general.defaultType : type
          const sizeHere = size === 'default' ? uinityConfig.text.general.defaultSize : size
          const lineHeightHere = lineHeight === 'default' ? uinityConfig.text.general.defaultLineHeight : lineHeight
          const props = getTextFinalProps(
            uinityConfig,
            fontHere as any,
            typeHere as any,
            sizeHere as any,
            lineHeightHere as any
          )
          const mixinProps = toCss(props)
          const mixinName = (() => {
            const mixinNameParts = ['text']
            if (font !== 'default') {
              mixinNameParts.push(font)
            }
            if (type !== 'default') {
              mixinNameParts.push(type)
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
