/* eslint-disable jsx-a11y/alt-text */

import type { AsPropsWithRef, AsRef } from '@/utils.js'
import { forwardRefIgnoreTypes, getGlobalClassName } from '@/utils.js'
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
export type IconMainProps = {
  $style?: IconStyleRootProps
  src: IconSrc
}
export type IconPropsWithRef = IconMainProps & AsPropsWithRef<undefined>
export type IconType = (props: IconPropsWithRef) => React.ReactElement | null

const getIconCoreCss = ($style?: IconStyleRootProps) => {
  return css`
    ${toCss({
      width: $style?.size,
      height: $style?.size,
    })}

    path {
      ${toCss({
        fill: $style?.color,
      })}
    }
  `
}

const IconGlobalS = createGlobalStyle<{ $style: IconStyleRootProps }>`
  ${({ $style }) => {
    return css`
      .${getGlobalClassName($style)} {
        ${getIconCoreCss($style)}
      }
    `
  }}
`

export const Icon: IconType = forwardRefIgnoreTypes(
  ({ $style = {}, className, src, ...restProps }: IconPropsWithRef, ref: any) => {
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
