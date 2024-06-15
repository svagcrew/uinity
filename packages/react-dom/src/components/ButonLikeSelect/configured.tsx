import type { ButonLikeSelectDefaultAs, ButonLikeSelectMainProps, ButonLikeSelectStyleRoot } from './clear.js'
import { ButonLikeSelect as ButonLikeSelectClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getSelectConfigFinalProps } from '@uinity/core/dist/components/select.js'

export type ButonLikeSelectConfiguredSettingsProps = {
  variant?: keyof UinityConfig['select']['variant'] | undefined | null
  color?: keyof UinityConfig['select']['color'] | undefined | null
  size?: keyof UinityConfig['select']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ButonLikeSelectConfiguredSpecialProps = {}
export type ButonLikeSelectConfiguredMainProps<TAs extends As = ButonLikeSelectDefaultAs> =
  ButonLikeSelectConfiguredSettingsProps & ButonLikeSelectConfiguredSpecialProps & ButonLikeSelectMainProps<TAs>
export type ButonLikeSelectConfiguredPropsWithRef<TAs extends As = ButonLikeSelectDefaultAs> =
  ButonLikeSelectConfiguredMainProps<TAs> & AsPropsWithRef<TAs>
export type ButonLikeSelectConfiguredPropsWithoutRef<TAs extends As = ButonLikeSelectDefaultAs> = WithoutRef<
  ButonLikeSelectConfiguredPropsWithRef<TAs>
>
export type ButonLikeSelectConfigured = <TAs extends As = ButonLikeSelectDefaultAs>(
  props: ButonLikeSelectConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createButonLikeSelect = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const ButonLikeSelect: ButonLikeSelectConfigured = forwardRefIgnoreTypes(
    (
      { variant, color, size, colorMode, $style = {}, ...restProps }: ButonLikeSelectConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getSelectConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: ButonLikeSelectStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <ButonLikeSelectClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    ButonLikeSelect,
  }
}
