import type { LoaderDefaultAs, LoaderMainProps, LoaderStyleRoot } from './clear.js'
import { Loader as LoaderClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getLoaderConfigFinalProps } from '@uinity/core/dist/components/loader.js'

export type LoaderConfiguredSettingsProps = {
  variant?: keyof UinityConfig['loader']['variant'] | undefined | null
  color?: keyof UinityConfig['loader']['color'] | undefined | null
  size?: keyof UinityConfig['loader']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type LoaderConfiguredSpecialProps = {}
export type LoaderConfiguredMainProps<TAs extends As = LoaderDefaultAs> = LoaderConfiguredSettingsProps &
  LoaderConfiguredSpecialProps &
  LoaderMainProps<TAs>
export type LoaderConfiguredPropsWithRef<TAs extends As = LoaderDefaultAs> = LoaderConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type LoaderConfiguredPropsWithoutRef<TAs extends As = LoaderDefaultAs> = WithoutRef<
  LoaderConfiguredPropsWithRef<TAs>
>
export type LoaderConfigured = <TAs extends As = LoaderDefaultAs>(
  props: LoaderConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createLoader = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Loader: LoaderConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: LoaderConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getLoaderConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: LoaderStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <LoaderClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Loader,
  }
}
