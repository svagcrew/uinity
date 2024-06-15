import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ButonLikeSelectStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type ButonLikeSelectStyleFinal = ButonLikeSelectStyleRoot
export type ButonLikeSelectDefaultAs = 'div'
export type ButonLikeSelectMainProps<TAs extends As = ButonLikeSelectDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: ButonLikeSelectStyleRoot
}
export type ButonLikeSelectPropsWithRef<TAs extends As = ButonLikeSelectDefaultAs> = ButonLikeSelectMainProps<TAs> & AsPropsWithRef<TAs>
export type ButonLikeSelectPropsWithoutRef<TAs extends As = ButonLikeSelectDefaultAs> = WithoutRef<ButonLikeSelectPropsWithRef<TAs>>
export type ButonLikeSelectType = <TAs extends As = ButonLikeSelectDefaultAs>(props: ButonLikeSelectPropsWithRef<TAs>) => React.ReactNode

const getButonLikeSelectCoreCss = ($sf: ButonLikeSelectStyleFinal) => {
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
const getButonLikeSelectFinalCss = ($sf: ButonLikeSelectStyleFinal) => {
  return css`
    ${getButonLikeSelectCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const ButonLikeSelectS = styled.div.attrs(mark('ButonLikeSelectS'))<{ $sf: ButonLikeSelectStyleFinal }>`
  ${({ $sf }) => getButonLikeSelectFinalCss($sf)}
`

export const ButonLikeSelect: ButonLikeSelectType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: ButonLikeSelectPropsWithoutRef, ref: any) => {
    const $sf: ButonLikeSelectStyleFinal = {
      ...$style,
    }
    return (
      <ButonLikeSelectS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </ButonLikeSelectS>
    )
  }
)
