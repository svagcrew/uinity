import type { TabDefaultAs, TabMainProps, TabStyleRoot } from './clear.js'
import { Tab as TabClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getTabConfigFinalProps } from '@uinity/core/dist/components/tab.js'

export type TabConfiguredSettingsProps = {
  variant?: keyof UinityConfig['tab']['variant'] | undefined | null
  color?: keyof UinityConfig['tab']['color'] | undefined | null
  size?: keyof UinityConfig['tab']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type TabConfiguredSpecialProps = {}
export type TabConfiguredMainProps<TAs extends As = TabDefaultAs> = TabConfiguredSettingsProps &
  TabConfiguredSpecialProps &
  TabMainProps<TAs>
export type TabConfiguredPropsWithRef<TAs extends As = TabDefaultAs> = TabConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type TabConfiguredPropsWithoutRef<TAs extends As = TabDefaultAs> = WithoutRef<
  TabConfiguredPropsWithRef<TAs>
>
export type TabConfigured = <TAs extends As = TabDefaultAs>(
  props: TabConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createTab = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Tab: TabConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: TabConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getTabConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: TabStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <TabClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Tab,
  }
}
