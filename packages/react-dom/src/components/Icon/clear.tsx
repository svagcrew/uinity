/* eslint-disable jsx-a11y/alt-text */

import type { AsPropsWithRef, AsRef, RC } from '@/utils.js'
import { forwardRefWithTypes, getGlobalClassName } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import cn from 'classnames'
import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

// TODO: fix types IconSrc
export type IconSrc = string | React.ReactElement | React.ComponentType | null
export type IconStyleRootProps = {
  color?: string | null
  size?: number | string | null
}
export type IconStyleAdditionalProps = {}
export type IconStyleSpecialProps = {}
export type IconStyleProps = IconStyleRootProps & IconStyleAdditionalProps & IconStyleSpecialProps
export type IconMainProps = {
  $style?: IconStyleProps
  src: IconSrc
}
export type IconPropsWithRef = IconMainProps & AsPropsWithRef<undefined>
export type IconType = RC<IconPropsWithRef>

const getIconCoreCss = (srp?: IconStyleRootProps) => {
  return css`
    ${toCss({
      width: srp?.size,
      height: srp?.size,
    })}

    path {
      ${toCss({
        fill: srp?.color,
      })}
    }
  `
}

const IconGlobalS = createGlobalStyle<{ $style: IconStyleProps }>`
  ${({ $style }) => {
    return css`
      .${getGlobalClassName($style)} {
        ${getIconCoreCss($style)}
      }
    `
  }}
`

export const Icon = forwardRefWithTypes(
  ({ $style = {}, className, src, ...restProps }: IconPropsWithRef, ref: AsRef<undefined>) => {
    const gcn = getGlobalClassName($style)
    if (typeof src === 'string') {
      return (
        <>
          <IconGlobalS $style={$style} />
          <img className={cn(className, gcn)} src={src} ref={ref as any} {...(restProps as {})} />
        </>
      )
    } else if (React.isValidElement(src)) {
      const element = src as React.ReactElement
      return (
        <>
          <IconGlobalS $style={$style} />
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
          <IconGlobalS $style={$style} />
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