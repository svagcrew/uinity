import type { IndicatorDefaultAs, IndicatorMainProps, IndicatorStyleRoot } from './clear.js'
import { Indicator as IndicatorClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getIndicatorConfigFinalProps } from '@uinity/core/dist/components/indicator.js'

export type IndicatorConfiguredSettingsProps = {
  variant?: keyof UinityConfig['indicator']['variant'] | undefined | null
  color?: keyof UinityConfig['indicator']['color'] | undefined | null
  size?: keyof UinityConfig['indicator']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type IndicatorConfiguredSpecialProps = {}
export type IndicatorConfiguredMainProps<TAs extends As = IndicatorDefaultAs> = IndicatorConfiguredSettingsProps &
  IndicatorConfiguredSpecialProps &
  IndicatorMainProps<TAs>
export type IndicatorConfiguredPropsWithRef<TAs extends As = IndicatorDefaultAs> = IndicatorConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type IndicatorConfiguredPropsWithoutRef<TAs extends As = IndicatorDefaultAs> = WithoutRef<
  IndicatorConfiguredPropsWithRef<TAs>
>
export type IndicatorConfigured = <TAs extends As = IndicatorDefaultAs>(
  props: IndicatorConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createIndicator = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Indicator: IndicatorConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: IndicatorConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getIndicatorConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: IndicatorStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <IndicatorClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Indicator,
  }
}
