import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TextareaStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type TextareaStyleFinal = TextareaStyleRoot
export type TextareaDefaultAs = 'div'
export type TextareaMainProps<TAs extends As = TextareaDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: TextareaStyleRoot
}
export type TextareaPropsWithRef<TAs extends As = TextareaDefaultAs> = TextareaMainProps<TAs> & AsPropsWithRef<TAs>
export type TextareaPropsWithoutRef<TAs extends As = TextareaDefaultAs> = WithoutRef<TextareaPropsWithRef<TAs>>
export type TextareaType = <TAs extends As = TextareaDefaultAs>(props: TextareaPropsWithRef<TAs>) => React.ReactNode

const getTextareaCoreCss = ($sf: TextareaStyleFinal) => {
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
const getTextareaFinalCss = ($sf: TextareaStyleFinal) => {
  return css`
    ${getTextareaCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TextareaS = styled.div.attrs(mark('TextareaS'))<{ $sf: TextareaStyleFinal }>`
  ${({ $sf }) => getTextareaFinalCss($sf)}
`

export const Textarea: TextareaType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: TextareaPropsWithoutRef, ref: any) => {
    const $sf: TextareaStyleFinal = {
      ...$style,
    }
    return (
      <TextareaS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </TextareaS>
    )
  }
)
