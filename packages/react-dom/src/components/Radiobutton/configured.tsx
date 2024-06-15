import type { RadiobuttonDefaultAs, RadiobuttonMainProps, RadiobuttonStyleRoot } from './clear.js'
import { Radiobutton as RadiobuttonClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getRadiobuttonConfigFinalProps } from '@uinity/core/dist/components/radiobutton.js'

export type RadiobuttonConfiguredSettingsProps = {
  variant?: keyof UinityConfig['radiobutton']['variant'] | undefined | null
  color?: keyof UinityConfig['radiobutton']['color'] | undefined | null
  size?: keyof UinityConfig['radiobutton']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type RadiobuttonConfiguredSpecialProps = {}
export type RadiobuttonConfiguredMainProps<TAs extends As = RadiobuttonDefaultAs> = RadiobuttonConfiguredSettingsProps &
  RadiobuttonConfiguredSpecialProps &
  RadiobuttonMainProps<TAs>
export type RadiobuttonConfiguredPropsWithRef<TAs extends As = RadiobuttonDefaultAs> = RadiobuttonConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type RadiobuttonConfiguredPropsWithoutRef<TAs extends As = RadiobuttonDefaultAs> = WithoutRef<
  RadiobuttonConfiguredPropsWithRef<TAs>
>
export type RadiobuttonConfigured = <TAs extends As = RadiobuttonDefaultAs>(
  props: RadiobuttonConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createRadiobutton = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Radiobutton: RadiobuttonConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: RadiobuttonConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getRadiobuttonConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: RadiobuttonStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <RadiobuttonClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Radiobutton,
  }
}
