import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TextStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type TextStyleFinal = TextStyleRoot
export type TextDefaultAs = 'div'
export type TextMainProps<TAs extends As = TextDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: TextStyleRoot
}
export type TextPropsWithRef<TAs extends As = TextDefaultAs> = TextMainProps<TAs> & AsPropsWithRef<TAs>
export type TextPropsWithoutRef<TAs extends As = TextDefaultAs> = WithoutRef<TextPropsWithRef<TAs>>
export type TextType = <TAs extends As = TextDefaultAs>(props: TextPropsWithRef<TAs>) => React.ReactNode

const getTextCoreCss = ($sf: TextStyleFinal) => {
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
const getTextFinalCss = ($sf: TextStyleFinal) => {
  return css`
    ${getTextCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TextS = styled.div.attrs(mark('TextS'))<{ $sf: TextStyleFinal }>`
  ${({ $sf }) => getTextFinalCss($sf)}
`

export const Text: TextType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: TextPropsWithoutRef, ref: any) => {
    const $sf: TextStyleFinal = {
      ...$style,
    }
    return (
      <TextS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </TextS>
    )
  }
)
