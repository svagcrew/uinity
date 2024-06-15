import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ToggleSwitchStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type ToggleSwitchStyleFinal = ToggleSwitchStyleRoot
export type ToggleSwitchDefaultAs = 'div'
export type ToggleSwitchMainProps<TAs extends As = ToggleSwitchDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: ToggleSwitchStyleRoot
}
export type ToggleSwitchPropsWithRef<TAs extends As = ToggleSwitchDefaultAs> = ToggleSwitchMainProps<TAs> & AsPropsWithRef<TAs>
export type ToggleSwitchPropsWithoutRef<TAs extends As = ToggleSwitchDefaultAs> = WithoutRef<ToggleSwitchPropsWithRef<TAs>>
export type ToggleSwitchType = <TAs extends As = ToggleSwitchDefaultAs>(props: ToggleSwitchPropsWithRef<TAs>) => React.ReactNode

const getToggleSwitchCoreCss = ($sf: ToggleSwitchStyleFinal) => {
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
const getToggleSwitchFinalCss = ($sf: ToggleSwitchStyleFinal) => {
  return css`
    ${getToggleSwitchCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const ToggleSwitchS = styled.div.attrs(mark('ToggleSwitchS'))<{ $sf: ToggleSwitchStyleFinal }>`
  ${({ $sf }) => getToggleSwitchFinalCss($sf)}
`

export const ToggleSwitch: ToggleSwitchType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: ToggleSwitchPropsWithoutRef, ref: any) => {
    const $sf: ToggleSwitchStyleFinal = {
      ...$style,
    }
    return (
      <ToggleSwitchS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </ToggleSwitchS>
    )
  }
)
