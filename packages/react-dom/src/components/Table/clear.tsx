/* eslint-disable react/forbid-component-props */
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import InfiniteScroll from 'react-infinite-scroller'
import { css, styled } from 'styled-components'

type AnyRecord = Record<string, any>
type ColumnDefinition<T extends AnyRecord = AnyRecord> = {
  key?: string
  width: number | string
  heading: React.ReactNode
  body: (record: T) => React.ReactNode
}

export type TableStyleRoot = {}
export type TableStyleFinal = TableStyleRoot
export type TableDefaultAs = 'div'
export type TableMainProps<TAs extends As = TableDefaultAs, TRecord extends AnyRecord = AnyRecord> = {
  as?: TAs
  children?: React.ReactNode
  records?: TRecord[]
  columns?: Array<ColumnDefinition<TRecord>>
  href?: (record: TRecord) => string | undefined | null | false
  onClick?: (record: TRecord) => void
  $style?: TableStyleRoot
  threshold?: number
  loadMore?: () => void
  hasMore?: boolean
}
export type TablePropsWithRef<TAs extends As = TableDefaultAs, TRecord extends AnyRecord = AnyRecord> = TableMainProps<
  TAs,
  TRecord
> &
  Omit<AsPropsWithRef<TAs>, 'onClick' | 'href'>
export type TablePropsWithoutRef<TAs extends As = TableDefaultAs, TRecord extends AnyRecord = AnyRecord> = WithoutRef<
  TablePropsWithRef<TAs, TRecord>
>
export type TableType = <TAs extends As = TableDefaultAs, TRecord extends AnyRecord = AnyRecord>(
  props: TablePropsWithRef<TAs, TRecord>
) => React.ReactNode

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTableCoreCss = ($sf: TableStyleFinal) => {
  return css`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-x: auto;
    ${toCss({})}

    ${RowS} {
      display: flex;
      flex-flow: row nowrap;
      align-items: stretch;
      justify-content: flex-start;
      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }

      ${CellS} {
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 5px;
        padding-left: 5px;
        color: #000;
        text-decoration: none;
        &:not(:last-child) {
          border-right: 1px solid #ddd;
          /* padding-right: 5px; */
        }
        &:not(:first-child) {
          /* padding-left: 5px; */
        }

        ${toCss({})}
      }
    }

    & > ${HeaderS} {
      ${toCss({})}

      & > ${RowS} {
        border-bottom: 1px solid #ddd;
        ${toCss({})}

        & > ${CellS} {
          font-weight: bold;
          ${toCss({})}
        }
      }
    }

    & > ${BodyS} {
      ${toCss({})}

      & > ${RowS} {
        ${toCss({})}

        &:hover {
          background-color: #f9f9f9;
        }

        & > ${CellS} {
          ${toCss({})}
        }
      }
    }
  `
}
const getTableFinalCss = ($sf: TableStyleFinal) => {
  return css`
    ${getTableCoreCss($sf)}
  `
}

const HeaderS = styled.div.attrs(mark('HeaderS'))``
const BodyS = styled.div.attrs(mark('BodyS'))``
const RowS = styled.div.attrs(mark('RowS'))``
const CellS = styled.div.attrs(mark('CellS'))``
const TableS = styled.div.attrs(mark('TableS'))<{ $sf: TableStyleFinal }>`
  ${({ $sf }) => getTableFinalCss($sf)}
`

export const Table: TableType = forwardRefIgnoreTypes(
  (
    {
      $style = {},
      children,
      records,
      columns,
      onClick,
      href,
      hasMore,
      threshold = 250,
      loadMore,
      ...restProps
    }: TablePropsWithoutRef,
    ref: any
  ) => {
    const $sf: TableStyleFinal = {
      ...$style,
    }
    const recordRender =
      (records &&
        columns &&
        records.map((record, i) => (
          <RowS
            key={i}
            as={href ? 'a' : 'div'}
            href={href?.(record) || undefined}
            onClick={onClick && (() => onClick?.(record))}
          >
            {columns.map((column, j) => (
              <CellS key={j} style={{ width: column.width }}>
                {column.body(record)}
              </CellS>
            ))}
          </RowS>
        ))) ||
      null
    const totalWidth = columns?.reduce((acc, column) => acc + Number(column.width), 0) || 0
    children =
      !records || !columns ? (
        children
      ) : (
        <>
          <HeaderS>
            <RowS>
              {columns.map((column, i) => (
                <CellS key={i} style={{ width: column.width }}>
                  {column.heading}
                </CellS>
              ))}
            </RowS>
          </HeaderS>
          {loadMore ? (
            <InfiniteScroll
              threshold={threshold}
              loadMore={loadMore}
              className={BodyS.styledComponentId}
              hasMore={hasMore}
              loader={
                hasMore ? (
                  <RowS key="loader" as="div">
                    <CellS style={{ width: totalWidth }}>Loading...</CellS>
                  </RowS>
                ) : undefined
              }
            >
              {recordRender}
            </InfiniteScroll>
          ) : (
            <BodyS>{recordRender}</BodyS>
          )}
        </>
      )
    return (
      <TableS {...restProps} ref={ref} $sf={$sf}>
        {children}
      </TableS>
    )
  }
)
