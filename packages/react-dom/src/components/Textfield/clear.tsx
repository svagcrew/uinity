import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TextfieldStyleRoot = {
  width?: number | string | null | undefined
  maxWidth?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type TextfieldStyleFinal = TextfieldStyleRoot
export type TextfieldDefaultAs = 'input'
export type TextfieldMainProps<TAs extends As = TextfieldDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  placeholder?: string
  labelOuter?: string
  labelInner?: string
  labelPlaceholder?: string
  $style?: TextfieldStyleRoot
}
export type TextfieldPropsWithRef<TAs extends As = TextfieldDefaultAs> = TextfieldMainProps<TAs> & AsPropsWithRef<TAs>
export type TextfieldPropsWithoutRef<TAs extends As = TextfieldDefaultAs> = WithoutRef<TextfieldPropsWithRef<TAs>>
export type TextfieldType = <TAs extends As = TextfieldDefaultAs>(props: TextfieldPropsWithRef<TAs>) => React.ReactNode

const getTextfieldCoreCss = ($sf: TextfieldStyleFinal) => {
  return css`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    ${toCss({
      width: $sf.width,
      maxWidth: $sf.maxWidth,
    })}

    & ${ChildrenS} {
      ${toCss({})}
    }
  `
}
const getTextfieldFinalCss = ($sf: TextfieldStyleFinal) => {
  return css`
    ${getTextfieldCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TextfieldS = styled.input.attrs(mark('TextfieldS'))<{ $sf: TextfieldStyleFinal }>`
  ${({ $sf }) => getTextfieldFinalCss($sf)}
`

export const Textfield: TextfieldType = forwardRefIgnoreTypes(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ $style = {}, placeholder, children, ...restProps }: TextfieldPropsWithoutRef, ref: any) => {
    const $sf: TextfieldStyleFinal = {
      ...$style,
    }
    return <TextfieldS {...restProps} ref={ref} $sf={$sf} placeholder={placeholder} />
  }
)
