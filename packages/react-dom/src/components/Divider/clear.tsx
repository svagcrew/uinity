import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type DividerStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type DividerStyleFinal = DividerStyleRoot
export type DividerDefaultAs = 'div'
export type DividerMainProps<TAs extends As = DividerDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: DividerStyleRoot
}
export type DividerPropsWithRef<TAs extends As = DividerDefaultAs> = DividerMainProps<TAs> & AsPropsWithRef<TAs>
export type DividerPropsWithoutRef<TAs extends As = DividerDefaultAs> = WithoutRef<DividerPropsWithRef<TAs>>
export type DividerType = <TAs extends As = DividerDefaultAs>(props: DividerPropsWithRef<TAs>) => React.ReactNode

const getDividerCoreCss = ($sf: DividerStyleFinal) => {
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
const getDividerFinalCss = ($sf: DividerStyleFinal) => {
  return css`
    ${getDividerCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const DividerS = styled.div.attrs(mark('DividerS'))<{ $sf: DividerStyleFinal }>`
  ${({ $sf }) => getDividerFinalCss($sf)}
`

export const Divider: DividerType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: DividerPropsWithoutRef, ref: any) => {
    const $sf: DividerStyleFinal = {
      ...$style,
    }
    return (
      <DividerS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </DividerS>
    )
  }
)
