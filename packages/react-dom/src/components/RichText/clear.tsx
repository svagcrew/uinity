import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type RichTextStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type RichTextStyleFinal = RichTextStyleRoot
export type RichTextDefaultAs = 'div'
export type RichTextMainProps<TAs extends As = RichTextDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: RichTextStyleRoot
}
export type RichTextPropsWithRef<TAs extends As = RichTextDefaultAs> = RichTextMainProps<TAs> & AsPropsWithRef<TAs>
export type RichTextPropsWithoutRef<TAs extends As = RichTextDefaultAs> = WithoutRef<RichTextPropsWithRef<TAs>>
export type RichTextType = <TAs extends As = RichTextDefaultAs>(props: RichTextPropsWithRef<TAs>) => React.ReactNode

const getRichTextCoreCss = ($sf: RichTextStyleFinal) => {
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
const getRichTextFinalCss = ($sf: RichTextStyleFinal) => {
  return css`
    ${getRichTextCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const RichTextS = styled.div.attrs(mark('RichTextS'))<{ $sf: RichTextStyleFinal }>`
  ${({ $sf }) => getRichTextFinalCss($sf)}
`

export const RichText: RichTextType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: RichTextPropsWithoutRef, ref: any) => {
    const $sf: RichTextStyleFinal = {
      ...$style,
    }
    return (
      <RichTextS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </RichTextS>
    )
  }
)
