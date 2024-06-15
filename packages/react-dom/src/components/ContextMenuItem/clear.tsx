import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ContextMenuItemStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type ContextMenuItemStyleFinal = ContextMenuItemStyleRoot
export type ContextMenuItemDefaultAs = 'div'
export type ContextMenuItemMainProps<TAs extends As = ContextMenuItemDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: ContextMenuItemStyleRoot
}
export type ContextMenuItemPropsWithRef<TAs extends As = ContextMenuItemDefaultAs> = ContextMenuItemMainProps<TAs> & AsPropsWithRef<TAs>
export type ContextMenuItemPropsWithoutRef<TAs extends As = ContextMenuItemDefaultAs> = WithoutRef<ContextMenuItemPropsWithRef<TAs>>
export type ContextMenuItemType = <TAs extends As = ContextMenuItemDefaultAs>(props: ContextMenuItemPropsWithRef<TAs>) => React.ReactNode

const getContextMenuItemCoreCss = ($sf: ContextMenuItemStyleFinal) => {
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
const getContextMenuItemFinalCss = ($sf: ContextMenuItemStyleFinal) => {
  return css`
    ${getContextMenuItemCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const ContextMenuItemS = styled.div.attrs(mark('ContextMenuItemS'))<{ $sf: ContextMenuItemStyleFinal }>`
  ${({ $sf }) => getContextMenuItemFinalCss($sf)}
`

export const ContextMenuItem: ContextMenuItemType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: ContextMenuItemPropsWithoutRef, ref: any) => {
    const $sf: ContextMenuItemStyleFinal = {
      ...$style,
    }
    return (
      <ContextMenuItemS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </ContextMenuItemS>
    )
  }
)
