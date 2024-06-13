import type { UinityConfig } from '@/config/index.js'
import type { ColorModeName, ColorValueModed } from '@/utils/color.js'
import { zColorValue } from '@/utils/color.js'
import { $ } from '@/utils/variables.js'
import camelCasify from 'lodash/camelCase.js'
import { z } from 'zod'

const colorSemanticTypes = ['symbol', 'border', 'surfaceLayout'] as const
export const zColorSemanticTypeName = z.enum(colorSemanticTypes)
export type ColorSemanticTypeName = z.output<typeof zColorSemanticTypeName>

export const colorSemanticSymbols = ['primary', 'secondary', 'tertiary', 'quaternary', 'quinary'] as const
export const zColorSemanticSymbolName = z.enum(colorSemanticSymbols)
export type ColorSemanticSymbolName = z.output<typeof zColorSemanticSymbolName>

export const colorSemanticBorders = ['xHard', 'hard', 'medium', 'light'] as const
export const zColorSemanticBorderName = z.enum(colorSemanticBorders)
export type ColorSemanticBorderName = z.output<typeof zColorSemanticBorderName>

export const colorSemanticSurfaceLayouts = ['accent'] as const
export const zColorSemanticSurfaceLayoutName = z.enum(colorSemanticSurfaceLayouts)
export type ColorSemanticSurfaceLayoutName = z.output<typeof zColorSemanticSurfaceLayoutName>

export const zColorSemanticUinityConfigInput = z.object({
  symbol: z.record(zColorSemanticSymbolName, zColorValue.optional()),
  border: z.record(zColorSemanticBorderName, zColorValue.optional()),
  surfaceLayout: z.record(zColorSemanticSurfaceLayoutName, zColorValue.optional()),
})
type ColorSemanticUinityConfigInput = z.output<typeof zColorSemanticUinityConfigInput>

export const defaultColorSemanticUinityConfigInput: ColorSemanticUinityConfigInput = {
  symbol: {
    primary: {
      light: $.color.core.neutral[230],
      dark: $.color.core.neutral[20],
    },
    secondary: {
      light: $.color.core.neutral[160],
      dark: $.color.core.neutral[90],
    },
    tertiary: {
      light: $.color.core.neutral[130],
      dark: $.color.core.neutral[100],
    },
    quaternary: {
      light: $.color.core.neutral[100],
      dark: $.color.core.neutral[110],
    },
    quinary: {
      light: $.color.core.neutral[90],
      dark: $.color.core.neutral[130],
    },
  },
  border: {
    xHard: {
      light: $.color.core.neutral[70],
      dark: $.color.core.neutral[160],
    },
    hard: {
      light: $.color.core.neutral[60],
      dark: $.color.core.neutral[170],
    },
    medium: {
      light: $.color.core.neutral[40],
      dark: $.color.core.neutral[190],
    },
    light: {
      light: $.color.core.neutral[30],
      dark: $.color.core.neutral[200],
    },
  },
  surfaceLayout: {
    accent: {
      light: $.color.core.neutral[10],
      dark: $.color.core.neutral[240],
    },
  },
}

export const normalizeColorSemanticUinityConfig = (input: ColorSemanticUinityConfigInput | undefined) => {
  const normalizeColorValue = (value: string | ColorValueModed | undefined): ColorValueModed => {
    if (typeof value === 'string') {
      if (value.startsWith('$.color.semantic')) {
        return value as ColorValueModed // it will be normalized in config/index.ts by applying variables
      } else if (value.startsWith('$.color.core')) {
        return {
          light: value,
          dark: value,
        }
      } else {
        return {
          light: value,
          dark: value,
        }
      }
    } else {
      return {
        light: value?.light || value?.dark || '#000001',
        dark: value?.dark || value?.light || '#000001',
      }
    }
  }

  return {
    symbol: {
      primary: normalizeColorValue(input?.symbol?.primary ?? defaultColorSemanticUinityConfigInput.symbol.primary),
      secondary: normalizeColorValue(
        input?.symbol?.secondary ?? defaultColorSemanticUinityConfigInput.symbol.secondary
      ),
      tertiary: normalizeColorValue(input?.symbol?.tertiary ?? defaultColorSemanticUinityConfigInput.symbol.tertiary),
      quaternary: normalizeColorValue(
        input?.symbol?.quaternary ?? defaultColorSemanticUinityConfigInput.symbol.quaternary
      ),
      quinary: normalizeColorValue(input?.symbol?.quinary ?? defaultColorSemanticUinityConfigInput.symbol.quinary),
    },
    border: {
      xHard: normalizeColorValue(input?.border?.xHard ?? defaultColorSemanticUinityConfigInput.border.xHard),
      hard: normalizeColorValue(input?.border?.hard ?? defaultColorSemanticUinityConfigInput.border.hard),
      medium: normalizeColorValue(input?.border?.medium ?? defaultColorSemanticUinityConfigInput.border.medium),
      light: normalizeColorValue(input?.border?.light ?? defaultColorSemanticUinityConfigInput.border.light),
    },
    surfaceLayout: {
      accent: normalizeColorValue(
        input?.surfaceLayout?.accent ?? defaultColorSemanticUinityConfigInput.surfaceLayout.accent
      ),
    },
  }
}
export type ColorSemanticUinityConfig = ReturnType<typeof normalizeColorSemanticUinityConfig>

export const getColorSemanticValue = <TColorSemanticTypeName extends ColorSemanticTypeName>(
  uinityConfig: UinityConfig,
  colorType: TColorSemanticTypeName,
  colorName: TColorSemanticTypeName extends 'symbol'
    ? ColorSemanticSymbolName
    : TColorSemanticTypeName extends 'border'
      ? ColorSemanticBorderName
      : TColorSemanticTypeName extends 'surfaceLayout'
        ? ColorSemanticSurfaceLayoutName
        : never,
  colorMode: ColorModeName
) => {
  return (uinityConfig.color.semantic[colorType] as any)[colorName][colorMode]
}

export const getColorSemanticScssVariables = (uinityConfig: UinityConfig) => {
  const variables: Record<string, string> = {}
  for (const colorType of Object.keys(uinityConfig.color.semantic)) {
    for (const [colorName, colorValueModed] of Object.entries((uinityConfig.color.semantic as any)[colorType])) {
      for (const [colorMode, value] of Object.entries(colorValueModed as ColorValueModed)) {
        const variableName = camelCasify(`$color-semantic-${colorType}-${colorName}-${colorMode}`)
        variables[variableName] = value as string
      }
    }
  }
  const variablesString =
    Object.entries(variables)
      .map(([key, value]) => `$${key}: ${value};`)
      .join('\n') + '\n'
  return variablesString
}
