/* eslint-disable @typescript-eslint/no-unused-vars */
import getHash from 'hash-it'
import isNil from 'lodash/isNil.js'
import React from 'react'

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
export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = React.RefObject<any>
export type AsRefAttributes<T extends As | undefined> = { ref?: AsRef<T> }
export type AsPropsWithoutRef<T extends As | undefined> = Omit<AsProps<T> & AsRefAttributes<T>, 'ref'>
export type AsPropsWithRef<T extends As | undefined> = AsProps<T> & AsRefAttributes<T>
export type WithoutRef<T extends { ref?: any }> = Omit<T, 'ref'>

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
