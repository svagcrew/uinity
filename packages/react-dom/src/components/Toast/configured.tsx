import type { ToastDefaultAs, ToastMainProps, ToastStyleRoot } from './clear.js'
import { Toast as ToastClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getToastConfigFinalProps } from '@uinity/core/dist/components/toast.js'

export type ToastConfiguredSettingsProps = {
  variant?: keyof UinityConfig['toast']['variant'] | undefined | null
  color?: keyof UinityConfig['toast']['color'] | undefined | null
  size?: keyof UinityConfig['toast']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ToastConfiguredSpecialProps = {}
export type ToastConfiguredMainProps<TAs extends As = ToastDefaultAs> = ToastConfiguredSettingsProps &
  ToastConfiguredSpecialProps &
  ToastMainProps<TAs>
export type ToastConfiguredPropsWithRef<TAs extends As = ToastDefaultAs> = ToastConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ToastConfiguredPropsWithoutRef<TAs extends As = ToastDefaultAs> = WithoutRef<
  ToastConfiguredPropsWithRef<TAs>
>
export type ToastConfigured = <TAs extends As = ToastDefaultAs>(
  props: ToastConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createToast = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Toast: ToastConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: ToastConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getToastConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: ToastStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <ToastClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Toast,
  }
}
