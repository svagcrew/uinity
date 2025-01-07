/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */

import { type AsPropsWithRef, getGlobalClassName, syncRefs, toCss, type WithoutRef } from '@/lib/other.js'
import cn from 'classnames'
import type { JSX } from 'react'
import React, { forwardRef } from 'react'
import { createGlobalStyle, css } from 'styled-components'

// Specific types
export type IconSrc =
  | string
  | JSX.Element
  | React.ReactElement
  | React.ComponentType
  | React.ForwardRefExoticComponent<Record<string, any>>
  | null
  | false
  | undefined

// Type for $style prop
export type IconStyleRoot = {
  color?: string | null
  size?: number | string | null
}

// Props for real style generation
export type IconStyleFinal = IconStyleRoot

// Component props
export type IconMainProps = {
  $style?: IconStyleRoot
  className?: string
  src: IconSrc
}

// Rest types
export type IconPropsWithRef = IconMainProps & AsPropsWithRef<undefined>
export type IconPropsWithoutRef = WithoutRef<IconPropsWithRef>
export type IconType = (props: IconPropsWithRef) => React.ReactNode

// Css for one of states
const getIconCoreCss = ($sf: IconStyleFinal) => {
  return css`
    ${toCss({
      width: $sf.size,
      height: $sf.size,
    })}

    path {
      ${toCss({
        fill: $sf.color,
      })}
    }
  `
}

// Final css
export const getIconFinalCss = ($sf: IconStyleFinal) => {
  return css`
    .${getGlobalClassName($sf)} {
      ${getIconCoreCss($sf)}
    }
  `
}

// Global style
const IconGlobalS = createGlobalStyle<{ $sf: IconStyleFinal }>`
  ${({ $sf }) => getIconFinalCss($sf)}
`

// Component
export const Icon: IconType = forwardRef<any, IconPropsWithoutRef>(
  ({ $style = {}, className, src, ...restProps }, ref) => {
    const gcn = getGlobalClassName($style)
    const $sf: IconStyleFinal = {
      ...$style,
    }
    if (typeof src === 'string') {
      return (
        <>
          <IconGlobalS $sf={$sf} />
          <img className={cn(className, gcn)} src={src} ref={syncRefs(ref)} {...(restProps as {})} />
        </>
      )
    } else if (React.isValidElement(src)) {
      const element = src as React.ReactElement<Record<string, any>>
      return (
        <>
          <IconGlobalS $sf={$sf} />
          {React.cloneElement(element, {
            ...element.props,
            ...restProps,
            className: cn(className, gcn, element.props.className),
            ref: syncRefs(ref),
            width: $sf.size,
            height: $sf.size,
          })}
        </>
      )
    } else if (typeof src === 'function' || (typeof src === 'object' && src !== null)) {
      const component = src as React.ComponentType<{
        className?: string
        width?: number | string
        height?: number | string
        ref?: any
      }>
      return (
        <>
          <IconGlobalS $sf={$sf} />
          {React.createElement(component, {
            ...restProps,
            ...($sf.size
              ? {
                  width: $sf.size,
                  height: $sf.size,
                }
              : {}),
            className: cn(className, gcn),
            ref: syncRefs(ref),
          })}
        </>
      )
    } else {
      return null
    }
  }
)
