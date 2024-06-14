import type { BlankDefaultAs, BlankMainProps, BlankStyleRoot } from './clear.js'
import { Blank as BlankClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getBlankConfigFinalProps } from '@uinity/core/dist/components/blank.js'

export type BlankConfiguredSettingsProps = {
  variant?: keyof UinityConfig['blank']['variant'] | undefined | null
  color?: keyof UinityConfig['blank']['color'] | undefined | null
  size?: keyof UinityConfig['blank']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type BlankConfiguredSpecialProps = {}
export type BlankConfiguredMainProps<TAs extends As = BlankDefaultAs> = BlankConfiguredSettingsProps &
  BlankConfiguredSpecialProps &
  BlankMainProps<TAs>
export type BlankConfiguredPropsWithRef<TAs extends As = BlankDefaultAs> = BlankConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type BlankConfiguredPropsWithoutRef<TAs extends As = BlankDefaultAs> = WithoutRef<
  BlankConfiguredPropsWithRef<TAs>
>
export type BlankConfigured = <TAs extends As = BlankDefaultAs>(
  props: BlankConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createBlank = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Blank: BlankConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: BlankConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getBlankConfigFinalProps(uinityConfig, variant, color, size)
      const $styleNormalized: BlankStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <BlankClear {...(restProps as {})} $style={$styleNormalized} ref={ref} />
    }
  )
  return {
    Blank,
  }
}
