import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TableStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type TableStyleFinal = TableStyleRoot
export type TableDefaultAs = 'div'
export type TableMainProps<TAs extends As = TableDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: TableStyleRoot
}
export type TablePropsWithRef<TAs extends As = TableDefaultAs> = TableMainProps<TAs> & AsPropsWithRef<TAs>
export type TablePropsWithoutRef<TAs extends As = TableDefaultAs> = WithoutRef<TablePropsWithRef<TAs>>
export type TableType = <TAs extends As = TableDefaultAs>(props: TablePropsWithRef<TAs>) => React.ReactNode

const getTableCoreCss = ($sf: TableStyleFinal) => {
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
const getTableFinalCss = ($sf: TableStyleFinal) => {
  return css`
    ${getTableCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TableS = styled.div.attrs(mark('TableS'))<{ $sf: TableStyleFinal }>`
  ${({ $sf }) => getTableFinalCss($sf)}
`

export const Table: TableType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: TablePropsWithoutRef, ref: any) => {
    const $sf: TableStyleFinal = {
      ...$style,
    }
    return (
      <TableS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </TableS>
    )
  }
)
