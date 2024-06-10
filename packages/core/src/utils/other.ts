import kebabify from 'lodash/kebabCase.js'
import type { CSSProperties } from 'react'
import { z } from 'zod'

export const zOptionalString = z.string().min(1).optional().nullable()
export const zRequiredString = z.string().min(1)
export const zOptionalNumber = z.number().optional().nullable()
export const zRequiredNumber = z.number().min(1)
export const zOptionalNumberOrString = z
  .union([z.number(), z.string().min(1)])
  .optional()
  .nullable()
export const zRequiredNumberOrString = z.union([z.number(), z.string().min(1)])
export const colorModes = ['light', 'dark'] as const
export const zColorModeName = z.enum(colorModes)
export type ColorModeName = z.infer<typeof zColorModeName>
export const zColorValueModed = z.record(zColorModeName, zRequiredString)
export type ColorValueModed = z.infer<typeof zColorValueModed>
export const zColorValue = z.union([zRequiredString, zColorValueModed])
export type ColorValue = z.infer<typeof zColorValue>

export const getFirst = <
  TProp extends string,
  TObj extends {
    [key in TProp]?: TObj[TProp]
  },
>(
  objs: TObj[],
  prop: TProp
): TObj[TProp] | null => {
  for (const obj of objs) {
    if (obj[prop] !== undefined) {
      return obj[prop]
    }
  }
  return null
}

export const getFirstOrThrow = <
  TProp extends string,
  TObj extends {
    [key in TProp]?: TObj[TProp]
  },
>(
  objs: TObj[],
  prop: TProp,
  message: string
): NonNullable<TObj[TProp]> => {
  const result = getFirst(objs, prop)
  // eslint-disable-next-line lodash/prefer-is-nil
  if (result === null || result === undefined) {
    throw new Error(message)
  }
  return result as NonNullable<TObj[TProp]>
}

type CssPropertiesNullable = {
  [K in keyof CSSProperties]: CSSProperties[K] | null | undefined
}

export const camelCaseObjectToCss = (
  // obj: Record<string, string | number | null | undefined>,
  obj: CssPropertiesNullable,
  indent: number = 2
): string => {
  return Object.entries(obj)
    .map(([key, value]) => {
      // eslint-disable-next-line lodash/prefer-is-nil
      if (value === null || value === undefined) {
        return null
      }
      if (key === 'fontFamily' && typeof value === 'string') {
        value = `'${value}'`
      }
      const keysWhereNumberIsReal = ['lineHeight']
      const keysWhereNumberIsPixel = [
        'fontSize',
        'padding',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'margin',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
        'borderRadius',
        'minHeight',
        'maxHeight',
        'minWidth',
        'maxWidth',
        'width',
        'height',
        'top',
        'right',
        'bottom',
        'left',
        'borderWidth',
        'gap',
        'columnGap',
        'rowGap',
      ]
      if (typeof value === 'number') {
        if (value === 0) {
          value = `${value}`
        } else if (keysWhereNumberIsReal.includes(key)) {
          value = `${value}`
        } else if (keysWhereNumberIsPixel.includes(key)) {
          value = `${value}px`
        } else {
          value = `${value}`
        }
      }
      const kebab = kebabify(key)
      const indentString = ' '.repeat(indent)
      return `${indentString}${kebab}: ${value};`
    })
    .filter(Boolean)
    .join('\n')
}

export const maybeNumberToPx = (value: string | number | undefined | null): string | null => {
  if (typeof value === 'number') {
    if (value === 0) {
      return '0'
    } else {
      return `${value}px`
    }
  }
  return `${value}`
}

export const borderPropsToCssValue = (
  borderWidth: string | number | undefined | null,
  borderColor: string | undefined | null
): string | null => {
  if (!borderWidth || !borderColor) {
    return null
  }
  const borderStyle = 'solid'
  return `${borderWidth}px ${borderStyle} ${borderColor}`
}
