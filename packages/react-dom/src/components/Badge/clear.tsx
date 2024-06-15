import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type BadgeStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type BadgeStyleFinal = BadgeStyleRoot
export type BadgeDefaultAs = 'div'
export type BadgeMainProps<TAs extends As = BadgeDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: BadgeStyleRoot
}
export type BadgePropsWithRef<TAs extends As = BadgeDefaultAs> = BadgeMainProps<TAs> & AsPropsWithRef<TAs>
export type BadgePropsWithoutRef<TAs extends As = BadgeDefaultAs> = WithoutRef<BadgePropsWithRef<TAs>>
export type BadgeType = <TAs extends As = BadgeDefaultAs>(props: BadgePropsWithRef<TAs>) => React.ReactNode

const getBadgeCoreCss = ($sf: BadgeStyleFinal) => {
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
const getBadgeFinalCss = ($sf: BadgeStyleFinal) => {
  return css`
    ${getBadgeCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const BadgeS = styled.div.attrs(mark('BadgeS'))<{ $sf: BadgeStyleFinal }>`
  ${({ $sf }) => getBadgeFinalCss($sf)}
`

export const Badge: BadgeType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: BadgePropsWithoutRef, ref: any) => {
    const $sf: BadgeStyleFinal = {
      ...$style,
    }
    return (
      <BadgeS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </BadgeS>
    )
  }
)
