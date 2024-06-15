import type { ToggleButtonDefaultAs, ToggleButtonMainProps, ToggleButtonStyleRoot } from './clear.js'
import { ToggleButton as ToggleButtonClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getToggleButtonConfigFinalProps } from '@uinity/core/dist/components/toggleButton.js'

export type ToggleButtonConfiguredSettingsProps = {
  variant?: keyof UinityConfig['toggleButton']['variant'] | undefined | null
  color?: keyof UinityConfig['toggleButton']['color'] | undefined | null
  size?: keyof UinityConfig['toggleButton']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ToggleButtonConfiguredSpecialProps = {}
export type ToggleButtonConfiguredMainProps<TAs extends As = ToggleButtonDefaultAs> = ToggleButtonConfiguredSettingsProps &
  ToggleButtonConfiguredSpecialProps &
  ToggleButtonMainProps<TAs>
export type ToggleButtonConfiguredPropsWithRef<TAs extends As = ToggleButtonDefaultAs> = ToggleButtonConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ToggleButtonConfiguredPropsWithoutRef<TAs extends As = ToggleButtonDefaultAs> = WithoutRef<
  ToggleButtonConfiguredPropsWithRef<TAs>
>
export type ToggleButtonConfigured = <TAs extends As = ToggleButtonDefaultAs>(
  props: ToggleButtonConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createToggleButton = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const ToggleButton: ToggleButtonConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: ToggleButtonConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getToggleButtonConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: ToggleButtonStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <ToggleButtonClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    ToggleButton,
  }
}
