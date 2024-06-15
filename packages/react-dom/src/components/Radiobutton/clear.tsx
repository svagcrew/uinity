import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type RadiobuttonStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type RadiobuttonStyleFinal = RadiobuttonStyleRoot
export type RadiobuttonDefaultAs = 'div'
export type RadiobuttonMainProps<TAs extends As = RadiobuttonDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: RadiobuttonStyleRoot
}
export type RadiobuttonPropsWithRef<TAs extends As = RadiobuttonDefaultAs> = RadiobuttonMainProps<TAs> & AsPropsWithRef<TAs>
export type RadiobuttonPropsWithoutRef<TAs extends As = RadiobuttonDefaultAs> = WithoutRef<RadiobuttonPropsWithRef<TAs>>
export type RadiobuttonType = <TAs extends As = RadiobuttonDefaultAs>(props: RadiobuttonPropsWithRef<TAs>) => React.ReactNode

const getRadiobuttonCoreCss = ($sf: RadiobuttonStyleFinal) => {
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
const getRadiobuttonFinalCss = ($sf: RadiobuttonStyleFinal) => {
  return css`
    ${getRadiobuttonCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const RadiobuttonS = styled.div.attrs(mark('RadiobuttonS'))<{ $sf: RadiobuttonStyleFinal }>`
  ${({ $sf }) => getRadiobuttonFinalCss($sf)}
`

export const Radiobutton: RadiobuttonType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: RadiobuttonPropsWithoutRef, ref: any) => {
    const $sf: RadiobuttonStyleFinal = {
      ...$style,
    }
    return (
      <RadiobuttonS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </RadiobuttonS>
    )
  }
)
