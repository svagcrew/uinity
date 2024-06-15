import '@/lib/cssGridPolyfill.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'

type GridCoreProps = {
  as?: As
  /** itemsInRow */
  i?: number
  itemsInRow?: number
  /** gap */
  g?: number | string
  gap?: number | string
  /** columnGap */
  cg?: number | string
  columnGap?: number | string
  /** rowGap */
  rg?: number | string
  rowGap?: number | string
  /** byContainerSize */
  cs?: Array<[number, GridCoreProps | number]>
  byContainerSize?: Array<[number, GridCoreProps | number]>
  /** byWindowSize */
  ws?: Array<[number, GridCoreProps | number]>
  byWindowSize?: Array<[number, GridCoreProps | number]>
  /** byContainerSizeReverse */
  csr?: Array<[number, GridCoreProps | number]>
  byContainerSizeReverse?: Array<[number, GridCoreProps | number]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, GridCoreProps | number]>
  byWindowSizeReverse?: Array<[number, GridCoreProps | number]>
}
type GridStyleFinal = {
  itemsInRow?: number
  columnGap?: number | string
  rowGap?: number | string
  byContainerSize: Array<[number, GridCoreProps]>
  byWindowSize: Array<[number, GridCoreProps]>
  byContainerSizeReverse: Array<[number, GridCoreProps]>
  byWindowSizeReverse: Array<[number, GridCoreProps]>
}
export type GridDefaultAs = 'div'
export type GridMainProps<TAs extends As = GridDefaultAs> = { as?: TAs; children?: React.ReactNode } & GridCoreProps
export type GridPropsWithRef<TAs extends As = GridDefaultAs> = GridMainProps<TAs> & AsPropsWithRef<TAs>
export type GridPropsWithoutRef<TAs extends As = GridDefaultAs> = WithoutRef<GridPropsWithRef<TAs>>
export type GridType = <TAs extends As = GridDefaultAs>(props: GridPropsWithRef<TAs>) => React.ReactNode

const getGridFinalCss = ($sf: GridStyleFinal): RuleSet => {
  return css`
    display: grid;
    ${toCss({
      columnGap: $sf.columnGap,
      rowGap: $sf.rowGap,
      gridTemplateColumns: $sf.itemsInRow && `repeat(${$sf.itemsInRow}, 1fr)`,
    })}
    ${$sf.byContainerSize?.map(([containerSize, gridProps]) => {
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (containerSize === 0) {
        return gridPropsCss
      }
      return css`
        @container (min-width: ${containerSize + 1}px) {
          & {
            ${gridPropsCss}
          }
        }
      `
    })}
    ${$sf.byWindowSize?.map(([windowSize, gridProps]) => {
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (windowSize === 0) {
        return gridPropsCss
      } else {
        return css`
          @media (min-width: ${windowSize + 1}px) {
            ${gridPropsCss}
          }
        `
      }
    })}
    ${$sf.byContainerSizeReverse?.map(([containerSize, gridProps]) => {
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (containerSize === Infinity) {
        return gridPropsCss
      } else {
        return css`
          @container (max-width: ${containerSize}px) {
            & {
              ${gridPropsCss}
            }
          }
        `
      }
    })}
    ${$sf.byWindowSizeReverse?.map(([windowSize, gridProps]) => {
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (windowSize === Infinity) {
        return gridPropsCss
      } else {
        return css`
          @media (max-width: ${windowSize}px) {
            ${gridPropsCss}
          }
        `
      }
    })}
  `
}

const GridS = styled.div.attrs(mark('GridS'))<{ $sf: GridStyleFinal }>`
  ${({ $sf }) => getGridFinalCss($sf)}
`
export const Grid: GridType = forwardRefIgnoreTypes(
  (
    {
      children,
      itemsInRow,
      i,
      columnGap,
      cg,
      rowGap,
      rg,
      gap,
      g,
      byContainerSize,
      cs,
      byWindowSize,
      ws,
      byContainerSizeReverse,
      csr,
      byWindowSizeReverse,
      wsr,
      ...restProps
    }: GridPropsWithoutRef,
    ref: any
  ) => {
    itemsInRow = itemsInRow ?? i
    columnGap = columnGap ?? cg
    rowGap = rowGap ?? rg
    gap = gap ?? g
    byContainerSize = byContainerSize ?? cs
    byWindowSize = byWindowSize ?? ws
    byContainerSizeReverse = byContainerSizeReverse ?? csr
    byWindowSizeReverse = byWindowSizeReverse ?? wsr

    const $sf: GridStyleFinal = {
      itemsInRow,
      columnGap: columnGap ?? gap,
      rowGap: rowGap ?? gap,
      byContainerSize: [], // will be assigned below
      byWindowSize: [], // will be assigned below
      byContainerSizeReverse: [], // will be assigned below
      byWindowSizeReverse: [], // will be assigned below
    }

    $sf.byContainerSize = (byContainerSize || [])
      .sort(([a], [b]) => a - b)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>

    $sf.byWindowSize = (byWindowSize || [])
      .sort(([a], [b]) => a - b)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>

    $sf.byContainerSizeReverse = (byContainerSizeReverse || [])
      .sort(([a], [b]) => b - a)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>

    $sf.byWindowSizeReverse = (byWindowSizeReverse || [])
      .sort(([a], [b]) => b - a)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>

    return (
      <GridS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </GridS>
    )
  }
)
