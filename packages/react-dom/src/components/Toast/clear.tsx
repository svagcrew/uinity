import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ToastStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type ToastStyleFinal = ToastStyleRoot
export type ToastDefaultAs = 'div'
export type ToastMainProps<TAs extends As = ToastDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: ToastStyleRoot
}
export type ToastPropsWithRef<TAs extends As = ToastDefaultAs> = ToastMainProps<TAs> & AsPropsWithRef<TAs>
export type ToastPropsWithoutRef<TAs extends As = ToastDefaultAs> = WithoutRef<ToastPropsWithRef<TAs>>
export type ToastType = <TAs extends As = ToastDefaultAs>(props: ToastPropsWithRef<TAs>) => React.ReactNode

const getToastCoreCss = ($sf: ToastStyleFinal) => {
  return css`
    padding: 10px;
    ${toCss({
      width: $sf?.width,
      height: $sf?.height,
      background: $sf?.background,
    })}

    & ${ChildrenS} {
      ${toCss({
        width: $sf?.width,
        height: $sf?.height,
        background: $sf?.childrenBackground,
      })}
    }
  `
}
const getToastFinalCss = ($sf: ToastStyleFinal) => {
  return css`
    ${getToastCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const ToastS = styled.div.attrs(mark('ToastS'))<{ $sf: ToastStyleFinal }>`
  ${({ $sf }) => getToastFinalCss($sf)}
`

export const Toast: ToastType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: ToastPropsWithoutRef, ref: any) => {
    const $sf: ToastStyleFinal = {
      ...$style,
    }
    return (
      <ToastS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </ToastS>
    )
  }
)
