import { type ColorValueModed, zColorValueModed } from '@/lib/color.js'
import { cssCamelCaseProperties } from '@/lib/cssProperties.js'
import isNil from 'lodash/isNil.js'
import kebabify from 'lodash/kebabCase.js'
import { z } from 'zod'

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

export type CssCamelCaseProperty = (typeof cssCamelCaseProperties)[number]
export type CssCamelCasePropertyColorBased = (typeof cssCamelCasePropertiesColorBased)[number]
export type CssCamelCasePropertySided = (typeof cssCamelCasePropertiesSided)[number]
export type CssCamelCasePropertyNotColorBased = Exclude<CssCamelCaseProperty, CssCamelCasePropertyColorBased>
export type CssCamelCase = {
  [K in CssCamelCaseProperty]?: string | number | null | undefined
}
export type CssCamelCaseExtended = {
  [K in CssCamelCasePropertyColorBased]?: ColorValueModed
} & {
  [K in CssCamelCasePropertyNotColorBased]?: string | number | null | undefined
} & {
  [K in CssCamelCasePropertySided]?: string | number | null | undefined
}
export const cssCamelCasePropertiesColorBased = [
  'accentColor',
  'backgroundColor',
  'borderColor',
  'borderBlockColor',
  'borderBlockEndColor',
  'borderBlockStartColor',
  'borderBottomColor',
  'borderInlineColor',
  'borderInlineEndColor',
  'borderInlineStartColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'caretColor',
  'color',
  'columnRuleColor',
  'fill',
  'floodColor',
  'lightingColor',
  'outlineColor',
  'stopColor',
  'stroke',
  'strokeColor',
  'textDecorationColor',
  'textEmphasisColor',
] as const
export const cssCamelCasePropertiesNotColorBased: Exclude<CssCamelCaseProperty, CssCamelCasePropertyColorBased>[] = []
export const cssCamelCasePropertiesWhereNumberIsReal = ['lineHeight']
export const cssCamelCasePropertiesSided = [
  'paddingStart',
  'paddingEnd',
  'marginStart',
  'marginEnd',
  'start',
  'end',
] as const
export const cssCamelCasePropertiesWhereNumberIsPixel = [
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

export const toCss = (
  // obj: Record<string, string | number | null | undefined>,
  obj: CssCamelCase,
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
      if (typeof value === 'number') {
        if (value === 0) {
          value = `${value}`
        } else if (cssCamelCasePropertiesWhereNumberIsReal.includes(key)) {
          value = `${value}`
        } else if (cssCamelCasePropertiesWhereNumberIsPixel.includes(key)) {
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

export const zCssValue = z.union([z.string(), z.number(), z.null(), z.undefined()])
export const zCssCamelCaseProperty = z.enum(cssCamelCaseProperties)
export const zCssCamelCasePropertyColorBased = z.enum(cssCamelCasePropertiesColorBased)
export const zCssCamelCase = z
  .object(
    cssCamelCaseProperties.reduce(
      (acc, property) => {
        acc[property] = zCssValue
        return acc
      },
      {} as Record<CssCamelCaseProperty, typeof zCssValue>
    )
  )
  .strict()
export const zCssCamelCaseExtended = z
  .object(
    cssCamelCasePropertiesNotColorBased.reduce(
      (acc, property) => {
        acc[property] = zCssValue
        return acc
      },
      {} as Record<CssCamelCasePropertyNotColorBased, typeof zCssValue>
    )
  )
  .merge(
    z.object(
      cssCamelCasePropertiesColorBased.reduce(
        (acc, property) => {
          acc[property] = zColorValueModed
          return acc
        },
        {} as Record<CssCamelCasePropertyColorBased, typeof zColorValueModed>
      )
    )
  )
  .merge(
    z.object(
      cssCamelCasePropertiesSided.reduce(
        (acc, property) => {
          acc[property] = zCssValue
          return acc
        },
        {} as Record<CssCamelCasePropertySided, typeof zCssValue>
      )
    )
  )
  .strict()
export const zCssCamelCaseObjectVerbose = <T extends z.ZodRawShape>(properties: T) =>
  z.object(properties).merge(zCssCamelCase).optional().nullable()
export const zCssCamelCaseObjectExtendedVerbose = <T extends z.ZodRawShape>(properties: T) =>
  z.object(properties).merge(zCssCamelCaseExtended).optional().nullable()
export const zCssCamelCaseObjectSilent = <T extends z.ZodRawShape>(properties: T) =>
  z.object(properties).merge(zCssCamelCase).optional().nullable() as never as z.ZodNullable<
    z.ZodOptional<z.ZodObject<T>>
  >
export const zCssCamelCaseObjectExtendedSilent = <T extends z.ZodRawShape>(properties: T) =>
  z.object(properties).merge(zCssCamelCaseExtended).optional().nullable() as never as z.ZodNullable<
    z.ZodOptional<z.ZodObject<T>>
  >

// const x = z
//   .object({
//     y: z.number(),
//   })
//   .merge(zCssCamelCase)
// type X = z.output<typeof x>
// const y: X = {
//   background: 2,
// }

// const x = zCssCamelCaseObject({
//   y: z.number(),
// })
// type X = z.output<typeof x>
// const y: X = {
// background: 2,
// start: 2,
// }

// const x = zCssCamelCaseObjectExtended({
//   y: z.number(),
// })
// type X = z.output<typeof x>
// const y: X = {
//   background: 2,
//   start: 2,
// }

// const x = zCssCamelCaseObjectSilent({
//   y: z.number(),
// })
// type X = z.output<typeof x>
// const y: X = {
//   background: 2,
// }
