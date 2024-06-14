import { Icon as IconClear } from './clear.js'
import type { IconMainProps, IconSrc } from '@/components/Icon/clear.js'
import type { WithoutRef } from '@/utils.js'
import { type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { getIconConfigFinalProps } from '@uinity/core/dist/components/icon.js'

export type ConfiguredIconSrc<TIconName extends string = string> = TIconName | Exclude<IconSrc, string>
export type IconConfiguredSettingsProps = {
  size?: keyof UinityConfig['icon']['size'] | undefined | null
}
export type IconConfiguredSpecialProps<TIconName extends string = string> = {
  name?: TIconName
  src?: IconSrc
}
export type IconConfiguredMainProps<TIconName extends string = string> = IconConfiguredSettingsProps &
  IconConfiguredSpecialProps<TIconName> &
  Omit<IconMainProps, 'src'>
export type IconConfiguredPropsWithRef<TIconName extends string = string> = IconConfiguredMainProps<TIconName> &
  AsPropsWithRef<undefined>
export type IconConfiguredPropsWithoutRef<TIconName extends string = string> = WithoutRef<
  IconConfiguredPropsWithRef<TIconName>
>
export type IconConfigured<TIconName extends string = string> = (
  props: IconConfiguredPropsWithRef<TIconName>
) => React.ReactNode

export type IconsSources<TIconName extends string = string> = Record<TIconName, IconSrc>

export const createIcon = <TIconName extends string = string>({
  uinityConfig,
  iconsSources,
}: {
  uinityConfig: UinityConfig
  iconsSources?: IconsSources<TIconName>
}) => {
  const Icon: IconConfigured<TIconName> = forwardRefIgnoreTypes(
    ({ size, name, src, $style = {}, ...restProps }: IconConfiguredPropsWithoutRef<TIconName>, ref: any) => {
      const cfp = getIconConfigFinalProps(uinityConfig, size)
      const $styleConfigured = {
        ...cfp,
        ...$style,
      }
      src = iconsSources && name && name in iconsSources ? iconsSources[name] : src
      return <IconClear {...(restProps as {})} src={src} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Icon,
  }
}
