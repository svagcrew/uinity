import type { TableDefaultAs, TableMainProps, TableStyleRoot } from './clear.js'
import { Table as TableClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getTableConfigFinalProps } from '@uinity/core/dist/components/table.js'

export type TableConfiguredSettingsProps = {
  variant?: keyof UinityConfig['table']['variant'] | undefined | null
  color?: keyof UinityConfig['table']['color'] | undefined | null
  size?: keyof UinityConfig['table']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type TableConfiguredSpecialProps = {}
export type TableConfiguredMainProps<TAs extends As = TableDefaultAs> = TableConfiguredSettingsProps &
  TableConfiguredSpecialProps &
  TableMainProps<TAs>
export type TableConfiguredPropsWithRef<TAs extends As = TableDefaultAs> = TableConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type TableConfiguredPropsWithoutRef<TAs extends As = TableDefaultAs> = WithoutRef<
  TableConfiguredPropsWithRef<TAs>
>
export type TableConfigured = <TAs extends As = TableDefaultAs>(
  props: TableConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createTable = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Table: TableConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: TableConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getTableConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: TableStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <TableClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Table,
  }
}
