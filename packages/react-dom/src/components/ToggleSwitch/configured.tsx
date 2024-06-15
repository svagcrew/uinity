import type { ToggleSwitchDefaultAs, ToggleSwitchMainProps, ToggleSwitchStyleRoot } from './clear.js'
import { ToggleSwitch as ToggleSwitchClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getToggleSwitchConfigFinalProps } from '@uinity/core/dist/components/toggleSwitch.js'

export type ToggleSwitchConfiguredSettingsProps = {
  variant?: keyof UinityConfig['toggleSwitch']['variant'] | undefined | null
  color?: keyof UinityConfig['toggleSwitch']['color'] | undefined | null
  size?: keyof UinityConfig['toggleSwitch']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ToggleSwitchConfiguredSpecialProps = {}
export type ToggleSwitchConfiguredMainProps<TAs extends As = ToggleSwitchDefaultAs> = ToggleSwitchConfiguredSettingsProps &
  ToggleSwitchConfiguredSpecialProps &
  ToggleSwitchMainProps<TAs>
export type ToggleSwitchConfiguredPropsWithRef<TAs extends As = ToggleSwitchDefaultAs> = ToggleSwitchConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ToggleSwitchConfiguredPropsWithoutRef<TAs extends As = ToggleSwitchDefaultAs> = WithoutRef<
  ToggleSwitchConfiguredPropsWithRef<TAs>
>
export type ToggleSwitchConfigured = <TAs extends As = ToggleSwitchDefaultAs>(
  props: ToggleSwitchConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createToggleSwitch = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const ToggleSwitch: ToggleSwitchConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: ToggleSwitchConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getToggleSwitchConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: ToggleSwitchStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <ToggleSwitchClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    ToggleSwitch,
  }
}
