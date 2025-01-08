import type { IconStyleRootClearInput, IconStyleRootClearNormalized } from '@/components/Icon/config.js'
import { type AsPropsWithRef, syncRefs, type WithoutRef } from '@/lib/asRef.js'
import { getGlobalClassName } from '@/lib/classes.js'
import { toCss } from '@/lib/css.js'
import cn from 'classnames'
import type { JSX } from 'react'
import React, { forwardRef } from 'react'
import { createGlobalStyle, css } from 'styled-components'

// Specific types
export type IconClearSrc =
  | string
  | JSX.Element
  | React.ReactElement
  | React.ComponentType
  | React.ForwardRefExoticComponent<Record<string, any>>
  | null
  | false
  | undefined

// Props for real style generation
export type IconClearStyleFinal = IconStyleRootClearNormalized

// Component props
export type IconClearMainProps = {
  $style?: IconStyleRootClearInput
  className?: string
  src: IconClearSrc
}

// Rest types
export type IconClearPropsWithRef = IconClearMainProps & AsPropsWithRef<undefined>
export type IconClearPropsWithoutRef = WithoutRef<IconClearPropsWithRef>
export type IconClearType = (props: IconClearPropsWithRef) => React.ReactNode

// Css for one of states
const getIconCoreCss = ($sf: IconClearStyleFinal) => {
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
export const getIconFinalCss = ($sf: IconClearStyleFinal) => {
  return css`
    .${getGlobalClassName($sf)} {
      ${getIconCoreCss($sf)}
    }
  `
}

// Global style
const IconGlobalS = createGlobalStyle<{ $sf: IconClearStyleFinal }>`
  ${({ $sf }) => getIconFinalCss($sf)}
`

// Component
export const Icon: IconClearType = forwardRef<any, IconClearPropsWithoutRef>(
  ({ $style = {}, className, src, ...restProps }, ref) => {
    const gcn = getGlobalClassName($style)
    const $sf: IconClearStyleFinal = {
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
      const isForwardRef =
        typeof element.type === 'object' &&
        '$$typeof' in element.type &&
        (element.type as any).$$typeof === Symbol.for('react.forward_ref')
      return (
        <>
          <IconGlobalS $sf={$sf} />
          {React.cloneElement(element, {
            ...element.props,
            ...restProps,
            className: cn(className, gcn, element.props.className),
            ...(isForwardRef ? { ref: syncRefs(ref) } : {}),
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
      const isForwardRef =
        typeof src === 'object' && '$$typeof' in src && src.$$typeof === Symbol.for('react.forward_ref')
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
            ...(isForwardRef ? { ref: syncRefs(ref) } : {}),
          })}
        </>
      )
    } else {
      return null
    }
  }
)
