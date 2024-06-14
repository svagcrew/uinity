/* eslint-disable jsx-a11y/alt-text */

import type { AsPropsWithRef, AsRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, getGlobalClassName } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import cn from 'classnames'
import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

// TODO: fix types IconSrc
export type IconSrc = string | React.ReactElement | React.ComponentType | null | false | undefined
export type IconStyleRoot = {
  color?: string | null
  size?: number | string | null
}
export type IconStyleFinal = IconStyleRoot
export type IconMainProps = {
  $style?: IconStyleRoot
  className?: string
  src: IconSrc
}
export type IconPropsWithRef = IconMainProps & AsPropsWithRef<undefined>
export type IconPropsWithoutRef = WithoutRef<IconPropsWithRef>
export type IconType = (props: IconPropsWithRef) => React.ReactNode

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
export const getIconFinalCss = ($sf: IconStyleFinal) => {
  return css`
    .${getGlobalClassName($sf)} {
      ${getIconCoreCss($sf)}
    }
  `
}

const IconGlobalS = createGlobalStyle<{ $sf: IconStyleFinal }>`
  ${({ $sf }) => getIconFinalCss($sf)}
`

export const Icon: IconType = forwardRefIgnoreTypes(
  ({ $style = {}, className, src, ...restProps }: IconPropsWithoutRef, ref: any) => {
    const gcn = getGlobalClassName($style)
    const $sf: IconStyleFinal = {
      ...$style,
    }
    if (typeof src === 'string') {
      return (
        <>
          <IconGlobalS $sf={$sf} />
          <img className={cn(className, gcn)} src={src} ref={ref as any} {...(restProps as {})} />
        </>
      )
    } else if (React.isValidElement(src)) {
      const element = src as React.ReactElement
      return (
        <>
          <IconGlobalS $sf={$sf} />
          {React.cloneElement(element, {
            ...element.props,
            ...restProps,
            className: cn(className, gcn, element.props?.className),
            ref,
          })}
        </>
      )
    } else if (typeof src === 'function') {
      const component = src as React.ComponentType<{ className?: string; ref?: AsRef<any> }>
      return (
        <>
          <IconGlobalS $sf={$sf} />
          {React.createElement(component, {
            ...restProps,
            className: cn(className, gcn),
            ref,
          })}
        </>
      )
    } else {
      return null
    }
  }
)
