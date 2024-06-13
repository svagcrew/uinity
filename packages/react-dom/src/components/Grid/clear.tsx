import '@/lib/cssGridPolyfill.js'
import type { As, AsPropsWithRef } from '@/utils.js'
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
type GridStyleRootProps = {
  itemsInRow?: number
  columnGap?: number | string
  rowGap?: number | string
  byContainerSize?: Array<[number, GridCoreProps]>
  byWindowSize?: Array<[number, GridCoreProps]>
  byContainerSizeReverse?: Array<[number, GridCoreProps]>
  byWindowSizeReverse?: Array<[number, GridCoreProps]>
}
export type GridMainProps<TAs extends As> = { as?: TAs; children?: React.ReactNode } & GridCoreProps
export type GridPropsWithRef<TAs extends As> = GridMainProps<TAs> & AsPropsWithRef<TAs>
export type GridType = <TAs extends As = 'div'>(props: GridPropsWithRef<TAs>) => React.ReactElement | null

const getGridCoreCss = ($style: GridStyleRootProps): RuleSet => {
  return css`
    display: grid;
    ${toCss({
      columnGap: $style.columnGap,
      rowGap: $style.rowGap,
      gridTemplateColumns: $style.itemsInRow && `repeat(${$style.itemsInRow}, 1fr)`,
    })}
    ${$style.byContainerSize?.map(([, gridProps], index) => {
      const prevContainerSize = $style.byContainerSize?.[index - 1]?.[0] ?? 0
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (prevContainerSize === 0) {
        return gridPropsCss
      }
      return css`
        @container (min-width: ${prevContainerSize + 1}px) {
          & {
            ${gridPropsCss}
          }
        }
      `
    })}
    ${$style.byWindowSize?.map(([, gridProps], index) => {
      const prevWindowSize = $style.byWindowSize?.[index - 1]?.[0] ?? 0
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (prevWindowSize === 0) {
        return gridPropsCss
      }
      return css`
        @media (min-width: ${prevWindowSize + 1}px) {
          ${gridPropsCss}
        }
      `
    })}
    ${$style.byContainerSizeReverse?.map(([containerSize, gridProps]) => {
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (containerSize === Infinity) {
        return gridPropsCss
      }
      return css`
        @container (max-width: ${containerSize}px) {
          & {
            ${gridPropsCss}
          }
        }
      `
    })}
    ${$style.byWindowSizeReverse?.map(([windowSize, gridProps]) => {
      const gridPropsCss = toCss({
        columnGap: gridProps.columnGap ?? gridProps.gap,
        rowGap: gridProps.rowGap ?? gridProps.gap,
        gridTemplateColumns: gridProps.itemsInRow && `repeat(${gridProps.itemsInRow}, 1fr)`,
      })
      if (windowSize === Infinity) {
        return gridPropsCss
      }
      return css`
        @media (max-width: ${windowSize}px) {
          ${gridPropsCss}
        }
      `
    })}
  `
}

const GridS = styled.div.attrs(mark('GridS'))<{ $style: GridStyleRootProps }>`
  ${({ $style }) => getGridCoreCss($style)}
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
    }: GridPropsWithRef<'div'>,
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
    const $style = {
      $itemsInRow: itemsInRow,
      $columnGap: columnGap ?? gap,
      $rowGap: rowGap ?? gap,
    } as GridStyleRootProps

    const normalizedByContainerSize = (byContainerSize || [])
      .sort(([a], [b]) => a - b)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>
    $style.byContainerSize = normalizedByContainerSize

    const normalizedByWindowSize = (byWindowSize || [])
      .sort(([a], [b]) => a - b)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>
    $style.byWindowSize = normalizedByWindowSize

    const normalizedByContainerSizeReverse = (byContainerSizeReverse || [])
      .sort(([a], [b]) => b - a)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>
    $style.byContainerSizeReverse = normalizedByContainerSizeReverse

    const normalizedByWindowSizeReverse = (byWindowSizeReverse || [])
      .sort(([a], [b]) => b - a)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridCoreProps]>
    $style.byWindowSizeReverse = normalizedByWindowSizeReverse

    return (
      <GridS {...(restProps as any)} as={restProps.as} ref={ref} $style={$style}>
        {children}
      </GridS>
    )
  }
)
