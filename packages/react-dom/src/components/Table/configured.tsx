import type { TableDefaultAs, TableMainProps, TableStyleRoot } from './clear.js'
import { Table as TableClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, type UinityConfig } from '@uinity/core'
import { getTableConfigFinalProps } from '@uinity/core/dist/components/table.js'

type AnyRecord = Record<string, any>
export type TableConfiguredSettingsProps = {
  variant?: keyof UinityConfig['table']['variant'] | undefined | null
  color?: keyof UinityConfig['table']['color'] | undefined | null
  size?: keyof UinityConfig['table']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type TableConfiguredSpecialProps = {}
export type TableConfiguredMainProps<
  TAs extends As = TableDefaultAs,
  TRecord extends AnyRecord = AnyRecord,
> = TableConfiguredSettingsProps & TableConfiguredSpecialProps & TableMainProps<TAs, TRecord>
export type TableConfiguredPropsWithRef<
  TAs extends As = TableDefaultAs,
  TRecord extends AnyRecord = AnyRecord,
> = TableConfiguredMainProps<TAs, TRecord> & Omit<AsPropsWithRef<TAs>, 'onClick' | 'href'>
export type TableConfiguredPropsWithoutRef<
  TAs extends As = TableDefaultAs,
  TRecord extends AnyRecord = AnyRecord,
> = WithoutRef<TableConfiguredPropsWithRef<TAs, TRecord>>
export type TableConfigured = <TAs extends As = TableDefaultAs, TRecord extends AnyRecord = AnyRecord>(
  props: TableConfiguredPropsWithRef<TAs, TRecord>
) => React.ReactNode

export const createTable = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Table: TableConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: TableConfiguredPropsWithoutRef, ref: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { cm } = useColorMode(colorMode)
      const cfp = getTableConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: TableStyleRoot = {
        ...cfp,
        ...$style,
        // background: getColorByMode(cm, $style.background ?? cfp.background),
        // childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <TableClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Table,
  }
}
