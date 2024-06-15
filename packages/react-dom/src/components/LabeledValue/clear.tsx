import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type LabeledValueStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type LabeledValueStyleFinal = LabeledValueStyleRoot
export type LabeledValueDefaultAs = 'div'
export type LabeledValueMainProps<TAs extends As = LabeledValueDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: LabeledValueStyleRoot
}
export type LabeledValuePropsWithRef<TAs extends As = LabeledValueDefaultAs> = LabeledValueMainProps<TAs> & AsPropsWithRef<TAs>
export type LabeledValuePropsWithoutRef<TAs extends As = LabeledValueDefaultAs> = WithoutRef<LabeledValuePropsWithRef<TAs>>
export type LabeledValueType = <TAs extends As = LabeledValueDefaultAs>(props: LabeledValuePropsWithRef<TAs>) => React.ReactNode

const getLabeledValueCoreCss = ($sf: LabeledValueStyleFinal) => {
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
const getLabeledValueFinalCss = ($sf: LabeledValueStyleFinal) => {
  return css`
    ${getLabeledValueCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const LabeledValueS = styled.div.attrs(mark('LabeledValueS'))<{ $sf: LabeledValueStyleFinal }>`
  ${({ $sf }) => getLabeledValueFinalCss($sf)}
`

export const LabeledValue: LabeledValueType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: LabeledValuePropsWithoutRef, ref: any) => {
    const $sf: LabeledValueStyleFinal = {
      ...$style,
    }
    return (
      <LabeledValueS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </LabeledValueS>
    )
  }
)
