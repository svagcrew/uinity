import type { AvatarDefaultAs, AvatarStyleCore, AvatarStyleRoot } from './clear.js'
import { Avatar as AvatarClear } from './clear.js'
import type { AvatarMainProps } from '@/components/Avatar/clear.js'
import { Icon, type IconSrc } from '@/components/Icon/clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { type AvatarConfigFinalProps, getAvatarConfigFinalProps } from '@uinity/core/dist/components/avatar.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type AvatarConfiguredSettingsProps = {
  variant?: keyof UinityConfig['avatar']['variant'] | undefined | null
  color?: keyof UinityConfig['avatar']['color'] | undefined | null
  size?: keyof UinityConfig['avatar']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type AvatarConfiguredSpecialProps = {
  src?: IconSrc
  blankAvatarSrc?: IconSrc
}
export type AvatarConfiguredMainProps<TAs extends As = AvatarDefaultAs> = AvatarConfiguredSettingsProps &
  AvatarConfiguredSpecialProps &
  Omit<AvatarMainProps<TAs>, 'src'>
export type AvatarConfiguredPropsWithRef<TAs extends As = AvatarDefaultAs> = AvatarConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type AvatarConfiguredPropsWithoutRef<TAs extends As = AvatarDefaultAs> = WithoutRef<
  AvatarConfiguredPropsWithRef<TAs>
>
export type AvatarConfigured = <TAs extends As = AvatarDefaultAs>(
  props: AvatarConfiguredPropsWithRef<TAs>
) => React.ReactNode

const makeAvatarStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: AvatarStyleCore
  cfp: AvatarConfigFinalProps
}): AvatarStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
  }
}

export const createAvatar = ({
  uinityConfig,
  blankAvatarSrc,
}: {
  uinityConfig: UinityConfig
  blankAvatarSrc?: IconSrc
}) => {
  const Avatar: AvatarConfigured = forwardRefIgnoreTypes(
    (
      { src, $style = {}, variant, color, size, colorMode, ...restProps }: AvatarConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: AvatarStyleRoot = {
        rest: makeAvatarStyleCore({
          cm,
          sc: $style.rest,
          cfp: getAvatarConfigFinalProps(uinityConfig, variant, color, size, 'rest'),
        }),
        hover: makeAvatarStyleCore({
          cm,
          sc: $style.hover,
          cfp: getAvatarConfigFinalProps(uinityConfig, variant, color, size, 'hover'),
        }),
        current: makeAvatarStyleCore({
          cm,
          sc: $style.hover,
          cfp: getAvatarConfigFinalProps(uinityConfig, variant, color, size, 'current'),
        }),
        disabled: makeAvatarStyleCore({
          cm,
          sc: $style.hover,
          cfp: getAvatarConfigFinalProps(uinityConfig, variant, color, size, 'disabled'),
        }),
      }
      return (
        <AvatarClear
          {...(restProps as {})}
          src={<Icon src={src || blankAvatarSrc} />}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    Avatar,
  }
}
