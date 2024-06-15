import type { DividerDefaultAs, DividerMainProps, DividerStyleRoot } from './clear.js'
import { Divider as DividerClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, type UinityConfig } from '@uinity/core'
import { getDividerConfigFinalProps } from '@uinity/core/dist/components/divider.js'

export type DividerConfiguredSettingsProps = {
  variant?: keyof UinityConfig['divider']['variant'] | undefined | null
  color?: keyof UinityConfig['divider']['color'] | undefined | null
  size?: keyof UinityConfig['divider']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type DividerConfiguredSpecialProps = {}
export type DividerConfiguredMainProps<TAs extends As = DividerDefaultAs> = DividerConfiguredSettingsProps &
  DividerConfiguredSpecialProps &
  DividerMainProps<TAs>
export type DividerConfiguredPropsWithRef<TAs extends As = DividerDefaultAs> = DividerConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type DividerConfiguredPropsWithoutRef<TAs extends As = DividerDefaultAs> = WithoutRef<
  DividerConfiguredPropsWithRef<TAs>
>
export type DividerConfigured = <TAs extends As = DividerDefaultAs>(
  props: DividerConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createDivider = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Divider: DividerConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: DividerConfiguredPropsWithoutRef, ref: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { cm } = useColorMode(colorMode)
      const cfp = getDividerConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: DividerStyleRoot = {
        ...cfp,
        ...$style,
        // background: getColorByMode(cm, $style.background ?? cfp.background),
        // childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <DividerClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Divider,
  }
}
