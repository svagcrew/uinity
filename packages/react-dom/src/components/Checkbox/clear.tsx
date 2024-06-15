import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type CheckboxStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type CheckboxStyleFinal = CheckboxStyleRoot
export type CheckboxDefaultAs = 'div'
export type CheckboxMainProps<TAs extends As = CheckboxDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: CheckboxStyleRoot
}
export type CheckboxPropsWithRef<TAs extends As = CheckboxDefaultAs> = CheckboxMainProps<TAs> & AsPropsWithRef<TAs>
export type CheckboxPropsWithoutRef<TAs extends As = CheckboxDefaultAs> = WithoutRef<CheckboxPropsWithRef<TAs>>
export type CheckboxType = <TAs extends As = CheckboxDefaultAs>(props: CheckboxPropsWithRef<TAs>) => React.ReactNode

const getCheckboxCoreCss = ($sf: CheckboxStyleFinal) => {
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
const getCheckboxFinalCss = ($sf: CheckboxStyleFinal) => {
  return css`
    ${getCheckboxCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const CheckboxS = styled.div.attrs(mark('CheckboxS'))<{ $sf: CheckboxStyleFinal }>`
  ${({ $sf }) => getCheckboxFinalCss($sf)}
`

export const Checkbox: CheckboxType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: CheckboxPropsWithoutRef, ref: any) => {
    const $sf: CheckboxStyleFinal = {
      ...$style,
    }
    return (
      <CheckboxS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </CheckboxS>
    )
  }
)
