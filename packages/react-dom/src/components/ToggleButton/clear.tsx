import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ToggleButtonStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type ToggleButtonStyleFinal = ToggleButtonStyleRoot
export type ToggleButtonDefaultAs = 'div'
export type ToggleButtonMainProps<TAs extends As = ToggleButtonDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: ToggleButtonStyleRoot
}
export type ToggleButtonPropsWithRef<TAs extends As = ToggleButtonDefaultAs> = ToggleButtonMainProps<TAs> & AsPropsWithRef<TAs>
export type ToggleButtonPropsWithoutRef<TAs extends As = ToggleButtonDefaultAs> = WithoutRef<ToggleButtonPropsWithRef<TAs>>
export type ToggleButtonType = <TAs extends As = ToggleButtonDefaultAs>(props: ToggleButtonPropsWithRef<TAs>) => React.ReactNode

const getToggleButtonCoreCss = ($sf: ToggleButtonStyleFinal) => {
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
const getToggleButtonFinalCss = ($sf: ToggleButtonStyleFinal) => {
  return css`
    ${getToggleButtonCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const ToggleButtonS = styled.div.attrs(mark('ToggleButtonS'))<{ $sf: ToggleButtonStyleFinal }>`
  ${({ $sf }) => getToggleButtonFinalCss($sf)}
`

export const ToggleButton: ToggleButtonType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: ToggleButtonPropsWithoutRef, ref: any) => {
    const $sf: ToggleButtonStyleFinal = {
      ...$style,
    }
    return (
      <ToggleButtonS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </ToggleButtonS>
    )
  }
)
