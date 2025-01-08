import isNil from 'lodash/isNil.js'
import kebabify from 'lodash/kebabCase.js'
import type { CSSProperties } from 'react'

export const parseSpacing = (
  spacing?: string | number | undefined | null,
  spacingTop?: string | number | undefined | null,
  spacingEnd?: string | number | undefined | null,
  spacingBottom?: string | number | undefined | null,
  spacingStart?: string | number | undefined | null
) => {
  if (!isNil(spacing)) {
    if (typeof spacing === 'number') {
      return {
        top: spacing,
        end: spacing,
        bottom: spacing,
        start: spacing,
      }
    }
    const spacingParts = spacing.split(' ')
    if (spacingParts.length === 1) {
      return {
        top: spacingParts[0],
        end: spacingParts[0],
        bottom: spacingParts[0],
        start: spacingParts[0],
      }
    }
    if (spacingParts.length === 2) {
      return {
        top: spacingParts[0],
        end: spacingParts[1],
        bottom: spacingParts[0],
        start: spacingParts[1],
      }
    }
    if (spacingParts.length === 3) {
      return {
        top: spacingParts[0],
        end: spacingParts[1],
        bottom: spacingParts[2],
        start: spacingParts[1],
      }
    }
    if (spacingParts.length === 4) {
      return {
        top: spacingParts[0],
        end: spacingParts[1],
        bottom: spacingParts[2],
        start: spacingParts[3],
      }
    }
  }
  return {
    top: spacingTop,
    end: spacingEnd,
    bottom: spacingBottom,
    start: spacingStart,
  }
}

export const getFirst = <TProp extends string, TObj extends Partial<Record<TProp, TObj[TProp]>>>(
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

export const getFirstOrThrow = <TProp extends string, TObj extends Partial<Record<TProp, TObj[TProp]>>>(
  objs: TObj[],
  prop: TProp,
  message: string
): NonNullable<TObj[TProp]> => {
  const result = getFirst(objs, prop)
  if (result === null || result === undefined) {
    throw new Error(message)
  }
  return result as NonNullable<TObj[TProp]>
}

type CssPropertiesNullable = {
  [K in keyof CSSProperties]: CSSProperties[K] | null | undefined
}

export const toCss = (
  // obj: Record<string, string | number | null | undefined>,
  obj: CssPropertiesNullable,
  indent: number = 2
): string => {
  return Object.entries(obj)
    .map(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
        'flexBasis',
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
      return '0px'
    } else {
      return `${value}px`
    }
  }
  return `${value}`
}

export const borderPropsToCssValue = (
  borderWidth: string | number | undefined | null,
  borderColor: string | undefined | null,
  borderStyle: 'solid' | 'dashed' | 'dotted' = 'solid'
): string | null => {
  if (!borderWidth || !borderColor) {
    return null
  }
  return `${borderWidth}px ${borderStyle} ${borderColor}`
}
