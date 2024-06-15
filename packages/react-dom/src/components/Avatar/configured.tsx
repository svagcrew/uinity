import type { AvatarDefaultAs, AvatarMainProps, AvatarStyleRoot } from './clear.js'
import { Avatar as AvatarClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getAvatarConfigFinalProps } from '@uinity/core/dist/components/avatar.js'

export type AvatarConfiguredSettingsProps = {
  variant?: keyof UinityConfig['avatar']['variant'] | undefined | null
  color?: keyof UinityConfig['avatar']['color'] | undefined | null
  size?: keyof UinityConfig['avatar']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type AvatarConfiguredSpecialProps = {}
export type AvatarConfiguredMainProps<TAs extends As = AvatarDefaultAs> = AvatarConfiguredSettingsProps &
  AvatarConfiguredSpecialProps &
  AvatarMainProps<TAs>
export type AvatarConfiguredPropsWithRef<TAs extends As = AvatarDefaultAs> = AvatarConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type AvatarConfiguredPropsWithoutRef<TAs extends As = AvatarDefaultAs> = WithoutRef<
  AvatarConfiguredPropsWithRef<TAs>
>
export type AvatarConfigured = <TAs extends As = AvatarDefaultAs>(
  props: AvatarConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createAvatar = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Avatar: AvatarConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: AvatarConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getAvatarConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: AvatarStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <AvatarClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Avatar,
  }
}
