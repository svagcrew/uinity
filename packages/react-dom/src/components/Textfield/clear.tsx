import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TextfieldStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type TextfieldStyleFinal = TextfieldStyleRoot
export type TextfieldDefaultAs = 'div'
export type TextfieldMainProps<TAs extends As = TextfieldDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: TextfieldStyleRoot
}
export type TextfieldPropsWithRef<TAs extends As = TextfieldDefaultAs> = TextfieldMainProps<TAs> & AsPropsWithRef<TAs>
export type TextfieldPropsWithoutRef<TAs extends As = TextfieldDefaultAs> = WithoutRef<TextfieldPropsWithRef<TAs>>
export type TextfieldType = <TAs extends As = TextfieldDefaultAs>(props: TextfieldPropsWithRef<TAs>) => React.ReactNode

const getTextfieldCoreCss = ($sf: TextfieldStyleFinal) => {
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
const getTextfieldFinalCss = ($sf: TextfieldStyleFinal) => {
  return css`
    ${getTextfieldCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TextfieldS = styled.div.attrs(mark('TextfieldS'))<{ $sf: TextfieldStyleFinal }>`
  ${({ $sf }) => getTextfieldFinalCss($sf)}
`

export const Textfield: TextfieldType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: TextfieldPropsWithoutRef, ref: any) => {
    const $sf: TextfieldStyleFinal = {
      ...$style,
    }
    return (
      <TextfieldS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </TextfieldS>
    )
  }
)
