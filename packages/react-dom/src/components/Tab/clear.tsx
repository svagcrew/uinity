import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TabStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type TabStyleFinal = TabStyleRoot
export type TabDefaultAs = 'div'
export type TabMainProps<TAs extends As = TabDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: TabStyleRoot
}
export type TabPropsWithRef<TAs extends As = TabDefaultAs> = TabMainProps<TAs> & AsPropsWithRef<TAs>
export type TabPropsWithoutRef<TAs extends As = TabDefaultAs> = WithoutRef<TabPropsWithRef<TAs>>
export type TabType = <TAs extends As = TabDefaultAs>(props: TabPropsWithRef<TAs>) => React.ReactNode

const getTabCoreCss = ($sf: TabStyleFinal) => {
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
const getTabFinalCss = ($sf: TabStyleFinal) => {
  return css`
    ${getTabCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TabS = styled.div.attrs(mark('TabS'))<{ $sf: TabStyleFinal }>`
  ${({ $sf }) => getTabFinalCss($sf)}
`

export const Tab: TabType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: TabPropsWithoutRef, ref: any) => {
    const $sf: TabStyleFinal = {
      ...$style,
    }
    return (
      <TabS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </TabS>
    )
  }
)
