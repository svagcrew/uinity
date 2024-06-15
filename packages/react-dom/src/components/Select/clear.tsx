import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type SelectStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type SelectStyleFinal = SelectStyleRoot
export type SelectDefaultAs = 'div'
export type SelectMainProps<TAs extends As = SelectDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: SelectStyleRoot
}
export type SelectPropsWithRef<TAs extends As = SelectDefaultAs> = SelectMainProps<TAs> & AsPropsWithRef<TAs>
export type SelectPropsWithoutRef<TAs extends As = SelectDefaultAs> = WithoutRef<SelectPropsWithRef<TAs>>
export type SelectType = <TAs extends As = SelectDefaultAs>(props: SelectPropsWithRef<TAs>) => React.ReactNode

const getSelectCoreCss = ($sf: SelectStyleFinal) => {
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
const getSelectFinalCss = ($sf: SelectStyleFinal) => {
  return css`
    ${getSelectCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const SelectS = styled.div.attrs(mark('SelectS'))<{ $sf: SelectStyleFinal }>`
  ${({ $sf }) => getSelectFinalCss($sf)}
`

export const Select: SelectType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: SelectPropsWithoutRef, ref: any) => {
    const $sf: SelectStyleFinal = {
      ...$style,
    }
    return (
      <SelectS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </SelectS>
    )
  }
)
