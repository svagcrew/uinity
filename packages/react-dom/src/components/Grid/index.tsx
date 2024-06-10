import '@/lib/cssGridPolyfill.js'
import { mark } from '@/utils.js'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'

type GridGeneralProps = {
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
  cs?: Array<[number, GridGeneralProps | number]>
  byContainerSize?: Array<[number, GridGeneralProps | number]>
  /** byWindowSize */
  ws?: Array<[number, GridGeneralProps | number]>
  byWindowSize?: Array<[number, GridGeneralProps | number]>
  /** byContainerSizeReverse */
  csr?: Array<[number, GridGeneralProps | number]>
  byContainerSizeReverse?: Array<[number, GridGeneralProps | number]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, GridGeneralProps | number]>
  byWindowSizeReverse?: Array<[number, GridGeneralProps | number]>
}
type GridStyledProps = {
  $itemsInRow?: number
  $columnGap?: number | string
  $rowGap?: number | string
  $byContainerSize?: Array<[number, GridGeneralProps]>
  $byWindowSize?: Array<[number, GridGeneralProps]>
  $byContainerSizeReverse?: Array<[number, GridGeneralProps]>
  $byWindowSizeReverse?: Array<[number, GridGeneralProps]>
}
type As = keyof JSX.IntrinsicElements
type HtmlElementProps<T extends As> = JSX.IntrinsicElements[T]
type GridProps<TAs extends As> = GridGeneralProps & HtmlElementProps<TAs>
export type GridType = <TAs extends As>(props: GridProps<TAs>) => JSX.Element

const createCssByStyledProps = (sp: GridStyledProps): RuleSet => {
  return css`
    display: grid;
    ${camelCaseObjectToCss({
      columnGap: sp.$columnGap,
      rowGap: sp.$rowGap,
      gridTemplateColumns: sp.$itemsInRow && `repeat(${sp.$itemsInRow}, 1fr)`,
    })}
    ${sp.$byContainerSize?.map(([, gridProps], index) => {
      const prevContainerSize = sp.$byContainerSize?.[index - 1]?.[0] ?? 0
      const gridPropsCss = camelCaseObjectToCss({
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
    ${sp.$byWindowSize?.map(([, gridProps], index) => {
      const prevWindowSize = sp.$byWindowSize?.[index - 1]?.[0] ?? 0
      const gridPropsCss = camelCaseObjectToCss({
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
    ${sp.$byContainerSizeReverse?.map(([containerSize, gridProps]) => {
      const gridPropsCss = camelCaseObjectToCss({
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
    ${sp.$byWindowSizeReverse?.map(([windowSize, gridProps]) => {
      const gridPropsCss = camelCaseObjectToCss({
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

export const createUinityGrid = (): {
  Grid: GridType
} => {
  const GridS = styled.div.attrs(mark('GridS'))<GridStyledProps>`
    ${(sp) => createCssByStyledProps(sp)}
  `
  const Grid: GridType = ({
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
  }) => {
    itemsInRow = itemsInRow ?? i
    columnGap = columnGap ?? cg
    rowGap = rowGap ?? rg
    gap = gap ?? g
    byContainerSize = byContainerSize ?? cs
    byWindowSize = byWindowSize ?? ws
    byContainerSizeReverse = byContainerSizeReverse ?? csr
    byWindowSizeReverse = byWindowSizeReverse ?? wsr
    const sp = {
      $itemsInRow: itemsInRow,
      $columnGap: columnGap ?? gap,
      $rowGap: rowGap ?? gap,
    } as GridStyledProps

    const htmlElementProps = restProps as HtmlElementProps<As>

    const normalizedByContainerSize = (byContainerSize || [])
      .sort(([a], [b]) => a - b)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridGeneralProps]>
    sp.$byContainerSize = normalizedByContainerSize

    const normalizedByWindowSize = (byWindowSize || [])
      .sort(([a], [b]) => a - b)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridGeneralProps]>
    sp.$byWindowSize = normalizedByWindowSize

    const normalizedByContainerSizeReverse = (byContainerSizeReverse || [])
      .sort(([a], [b]) => b - a)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridGeneralProps]>
    sp.$byContainerSizeReverse = normalizedByContainerSizeReverse

    const normalizedByWindowSizeReverse = (byWindowSizeReverse || [])
      .sort(([a], [b]) => b - a)
      .map(([a, b]) => [a, typeof b === 'number' ? { itemsInRow: b } : b]) as Array<[number, GridGeneralProps]>
    sp.$byWindowSizeReverse = normalizedByWindowSizeReverse

    return (
      <GridS as={restProps.as || 'div'} {...sp} {...(htmlElementProps as any)}>
        {children}
      </GridS>
    )
  }
  return {
    Grid: Grid as GridType,
  }
}
