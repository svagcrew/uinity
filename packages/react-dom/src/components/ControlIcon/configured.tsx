import type { ControlIconDefaultAs, ControlIconMainProps, ControlIconStyleRoot } from './clear.js'
import { ControlIcon as ControlIconClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getControlIconConfigFinalProps } from '@uinity/core/dist/components/controlIcon.js'

export type ControlIconConfiguredSettingsProps = {
  variant?: keyof UinityConfig['controlIcon']['variant'] | undefined | null
  color?: keyof UinityConfig['controlIcon']['color'] | undefined | null
  size?: keyof UinityConfig['controlIcon']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ControlIconConfiguredSpecialProps = {}
export type ControlIconConfiguredMainProps<TAs extends As = ControlIconDefaultAs> = ControlIconConfiguredSettingsProps &
  ControlIconConfiguredSpecialProps &
  ControlIconMainProps<TAs>
export type ControlIconConfiguredPropsWithRef<TAs extends As = ControlIconDefaultAs> = ControlIconConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ControlIconConfiguredPropsWithoutRef<TAs extends As = ControlIconDefaultAs> = WithoutRef<
  ControlIconConfiguredPropsWithRef<TAs>
>
export type ControlIconConfigured = <TAs extends As = ControlIconDefaultAs>(
  props: ControlIconConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createControlIcon = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const ControlIcon: ControlIconConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: ControlIconConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getControlIconConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: ControlIconStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <ControlIconClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    ControlIcon,
  }
}
