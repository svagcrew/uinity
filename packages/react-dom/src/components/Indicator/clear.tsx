import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type IndicatorStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type IndicatorStyleFinal = IndicatorStyleRoot
export type IndicatorDefaultAs = 'div'
export type IndicatorMainProps<TAs extends As = IndicatorDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: IndicatorStyleRoot
}
export type IndicatorPropsWithRef<TAs extends As = IndicatorDefaultAs> = IndicatorMainProps<TAs> & AsPropsWithRef<TAs>
export type IndicatorPropsWithoutRef<TAs extends As = IndicatorDefaultAs> = WithoutRef<IndicatorPropsWithRef<TAs>>
export type IndicatorType = <TAs extends As = IndicatorDefaultAs>(props: IndicatorPropsWithRef<TAs>) => React.ReactNode

const getIndicatorCoreCss = ($sf: IndicatorStyleFinal) => {
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
const getIndicatorFinalCss = ($sf: IndicatorStyleFinal) => {
  return css`
    ${getIndicatorCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const IndicatorS = styled.div.attrs(mark('IndicatorS'))<{ $sf: IndicatorStyleFinal }>`
  ${({ $sf }) => getIndicatorFinalCss($sf)}
`

export const Indicator: IndicatorType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: IndicatorPropsWithoutRef, ref: any) => {
    const $sf: IndicatorStyleFinal = {
      ...$style,
    }
    return (
      <IndicatorS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </IndicatorS>
    )
  }
)
