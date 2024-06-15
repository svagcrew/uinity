import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ControlIconStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type ControlIconStyleFinal = ControlIconStyleRoot
export type ControlIconDefaultAs = 'div'
export type ControlIconMainProps<TAs extends As = ControlIconDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: ControlIconStyleRoot
}
export type ControlIconPropsWithRef<TAs extends As = ControlIconDefaultAs> = ControlIconMainProps<TAs> & AsPropsWithRef<TAs>
export type ControlIconPropsWithoutRef<TAs extends As = ControlIconDefaultAs> = WithoutRef<ControlIconPropsWithRef<TAs>>
export type ControlIconType = <TAs extends As = ControlIconDefaultAs>(props: ControlIconPropsWithRef<TAs>) => React.ReactNode

const getControlIconCoreCss = ($sf: ControlIconStyleFinal) => {
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
const getControlIconFinalCss = ($sf: ControlIconStyleFinal) => {
  return css`
    ${getControlIconCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const ControlIconS = styled.div.attrs(mark('ControlIconS'))<{ $sf: ControlIconStyleFinal }>`
  ${({ $sf }) => getControlIconFinalCss($sf)}
`

export const ControlIcon: ControlIconType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: ControlIconPropsWithoutRef, ref: any) => {
    const $sf: ControlIconStyleFinal = {
      ...$style,
    }
    return (
      <ControlIconS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </ControlIconS>
    )
  }
)
