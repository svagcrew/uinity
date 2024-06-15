import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type FormItemStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type FormItemStyleFinal = FormItemStyleRoot
export type FormItemDefaultAs = 'div'
export type FormItemMainProps<TAs extends As = FormItemDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: FormItemStyleRoot
}
export type FormItemPropsWithRef<TAs extends As = FormItemDefaultAs> = FormItemMainProps<TAs> & AsPropsWithRef<TAs>
export type FormItemPropsWithoutRef<TAs extends As = FormItemDefaultAs> = WithoutRef<FormItemPropsWithRef<TAs>>
export type FormItemType = <TAs extends As = FormItemDefaultAs>(props: FormItemPropsWithRef<TAs>) => React.ReactNode

const getFormItemCoreCss = ($sf: FormItemStyleFinal) => {
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
const getFormItemFinalCss = ($sf: FormItemStyleFinal) => {
  return css`
    ${getFormItemCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const FormItemS = styled.div.attrs(mark('FormItemS'))<{ $sf: FormItemStyleFinal }>`
  ${({ $sf }) => getFormItemFinalCss($sf)}
`

export const FormItem: FormItemType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: FormItemPropsWithoutRef, ref: any) => {
    const $sf: FormItemStyleFinal = {
      ...$style,
    }
    return (
      <FormItemS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </FormItemS>
    )
  }
)
