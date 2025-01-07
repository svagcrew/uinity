/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
import { getHash } from '@/lib/getHash.js'
import isNil from 'lodash/isNil.js'
import kebabify from 'lodash/kebabCase.js'
import type { CSSProperties, JSX } from 'react'
import React from 'react'
import { z } from 'zod'

export type As = keyof JSX.IntrinsicElements
// export type AsProps<T extends As | undefined> = T extends As ? JSX.IntrinsicElements[T] : { [key: string]: any }
export type AsProps<T extends As | undefined> = T extends undefined
  ? {}
  : {
      onClick?: React.MouseEventHandler<any>
      className?: string
      style?: React.CSSProperties
    } & (T extends 'a'
      ? {
          href?: string
          target?: string
          rel?: string
        }
      : {})
export type AsElement<T extends As | undefined> = React.ReactElement<AsProps<T>>
export type AsComponent<T extends As | undefined> = React.FC<AsProps<T>>
// export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = T extends keyof JSX.IntrinsicElements
//   ? React.RefObject<
//       JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<React.HTMLAttributes<infer E>, any> ? E : never
//     >
//   : React.RefObject<any>
export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = React.RefObject<T>
export type AsPropsRefOnly<T extends As | undefined> = { ref?: AsRef<T> }
export type AsPropsWithoutRef<T extends As | undefined> = Omit<AsProps<T> & AsPropsRefOnly<T>, 'ref'>
export type AsPropsWithRef<T extends As | undefined> = AsProps<T> & AsPropsRefOnly<T>
export type WithoutRef<T extends { ref?: any }> = Omit<T, 'ref'>
export const setRef = <T>(ref: React.Ref<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value) // Call ref function
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    ;(ref as any).current = value // Assign to current
  }
}
export const syncRefs = <T>(...refs: Array<React.Ref<T>>) => {
  return (node: T) => {
    refs.forEach((ref) => {
      setRef(ref, node)
    })
  }
}

export const forwardRefIgnoreTypes = (Component: any): any => {
  return React.forwardRef(Component as any) as any
}

export const mark = (componentName: string): {} => {
  // eslint-disable-next-line n/no-process-env
  return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development'
    ? {
        'data-x': componentName,
      }
    : {}
}

export const getGlobalClassName = (src: any) => {
  return 'c' + getHash(src)
}

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

export const zOptionalString = z.string().min(1).optional().nullable()
export const zRequiredString = z.string().min(1)
export const zOptionalNumber = z.number().optional().nullable()
export const zRequiredNumber = z.number().min(1)
export const zOptionalNumberOrString = z
  .union([z.number(), z.string().min(1)])
  .optional()
  .nullable()
export const zRequiredNumberOrString = z.union([z.number(), z.string().min(1)])

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
