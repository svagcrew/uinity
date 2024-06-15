import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type CardStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type CardStyleFinal = CardStyleRoot
export type CardDefaultAs = 'div'
export type CardMainProps<TAs extends As = CardDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: CardStyleRoot
}
export type CardPropsWithRef<TAs extends As = CardDefaultAs> = CardMainProps<TAs> & AsPropsWithRef<TAs>
export type CardPropsWithoutRef<TAs extends As = CardDefaultAs> = WithoutRef<CardPropsWithRef<TAs>>
export type CardType = <TAs extends As = CardDefaultAs>(props: CardPropsWithRef<TAs>) => React.ReactNode

const getCardCoreCss = ($sf: CardStyleFinal) => {
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
const getCardFinalCss = ($sf: CardStyleFinal) => {
  return css`
    ${getCardCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const CardS = styled.div.attrs(mark('CardS'))<{ $sf: CardStyleFinal }>`
  ${({ $sf }) => getCardFinalCss($sf)}
`

export const Card: CardType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: CardPropsWithoutRef, ref: any) => {
    const $sf: CardStyleFinal = {
      ...$style,
    }
    return (
      <CardS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </CardS>
    )
  }
)
