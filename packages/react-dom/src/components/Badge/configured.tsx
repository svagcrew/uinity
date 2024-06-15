import type { BadgeDefaultAs, BadgeMainProps, BadgeStyleRoot } from './clear.js'
import { Badge as BadgeClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getBadgeConfigFinalProps } from '@uinity/core/dist/components/badge.js'

export type BadgeConfiguredSettingsProps = {
  variant?: keyof UinityConfig['badge']['variant'] | undefined | null
  color?: keyof UinityConfig['badge']['color'] | undefined | null
  size?: keyof UinityConfig['badge']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type BadgeConfiguredSpecialProps = {}
export type BadgeConfiguredMainProps<TAs extends As = BadgeDefaultAs> = BadgeConfiguredSettingsProps &
  BadgeConfiguredSpecialProps &
  BadgeMainProps<TAs>
export type BadgeConfiguredPropsWithRef<TAs extends As = BadgeDefaultAs> = BadgeConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type BadgeConfiguredPropsWithoutRef<TAs extends As = BadgeDefaultAs> = WithoutRef<
  BadgeConfiguredPropsWithRef<TAs>
>
export type BadgeConfigured = <TAs extends As = BadgeDefaultAs>(
  props: BadgeConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createBadge = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Badge: BadgeConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: BadgeConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getBadgeConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: BadgeStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <BadgeClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Badge,
  }
}
