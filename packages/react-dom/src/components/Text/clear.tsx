import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TextStyleRoot = {
  fontFamily?: string | null | undefined
  fontWeight?: string | null | undefined
  fontSize?: number | string | null | undefined
  lineHeight?: number | string | null | undefined
  color?: string | null | undefined
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
    ${toCss({
      fontFamily: $sf.fontFamily,
      fontWeight: $sf.fontWeight,
      fontSize: $sf.fontSize,
      lineHeight: $sf.lineHeight,
      color: $sf.color,
    })}
  `
}
const getTextFinalCss = ($sf: TextStyleFinal) => {
  return css`
    ${getTextCoreCss($sf)}
  `
}

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
        {children}
      </TextS>
    )
  }
)
