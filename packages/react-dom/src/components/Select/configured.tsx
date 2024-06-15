import type { SelectDefaultAs, SelectMainProps, SelectStyleRoot } from './clear.js'
import { Select as SelectClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getSelectConfigFinalProps } from '@uinity/core/dist/components/select.js'

export type SelectConfiguredSettingsProps = {
  variant?: keyof UinityConfig['select']['variant'] | undefined | null
  color?: keyof UinityConfig['select']['color'] | undefined | null
  size?: keyof UinityConfig['select']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type SelectConfiguredSpecialProps = {}
export type SelectConfiguredMainProps<TAs extends As = SelectDefaultAs> = SelectConfiguredSettingsProps &
  SelectConfiguredSpecialProps &
  SelectMainProps<TAs>
export type SelectConfiguredPropsWithRef<TAs extends As = SelectDefaultAs> = SelectConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type SelectConfiguredPropsWithoutRef<TAs extends As = SelectDefaultAs> = WithoutRef<
  SelectConfiguredPropsWithRef<TAs>
>
export type SelectConfigured = <TAs extends As = SelectDefaultAs>(
  props: SelectConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createSelect = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Select: SelectConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: SelectConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getSelectConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: SelectStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <SelectClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Select,
  }
}
