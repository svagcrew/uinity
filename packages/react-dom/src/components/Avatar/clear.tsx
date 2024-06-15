import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type AvatarStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type AvatarStyleFinal = AvatarStyleRoot
export type AvatarDefaultAs = 'div'
export type AvatarMainProps<TAs extends As = AvatarDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: AvatarStyleRoot
}
export type AvatarPropsWithRef<TAs extends As = AvatarDefaultAs> = AvatarMainProps<TAs> & AsPropsWithRef<TAs>
export type AvatarPropsWithoutRef<TAs extends As = AvatarDefaultAs> = WithoutRef<AvatarPropsWithRef<TAs>>
export type AvatarType = <TAs extends As = AvatarDefaultAs>(props: AvatarPropsWithRef<TAs>) => React.ReactNode

const getAvatarCoreCss = ($sf: AvatarStyleFinal) => {
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
const getAvatarFinalCss = ($sf: AvatarStyleFinal) => {
  return css`
    ${getAvatarCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const AvatarS = styled.div.attrs(mark('AvatarS'))<{ $sf: AvatarStyleFinal }>`
  ${({ $sf }) => getAvatarFinalCss($sf)}
`

export const Avatar: AvatarType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: AvatarPropsWithoutRef, ref: any) => {
    const $sf: AvatarStyleFinal = {
      ...$style,
    }
    return (
      <AvatarS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </AvatarS>
    )
  }
)
