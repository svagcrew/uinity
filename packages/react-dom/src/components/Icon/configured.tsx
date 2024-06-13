import { Icon as IconClear } from './clear.js'
import type { IconMainProps, IconSrc } from '@/components/Icon/clear.js'
import { type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { getIconConfigFinalProps } from '@uinity/core/dist/components/icon.js'

export type IconConfiguredSettingsProps = {
  size?: keyof UinityConfig['icon']['size'] | undefined | null
}
export type IconConfiguredSpecialProps<TIconName extends string = string> = {
  name: TIconName
}
export type IconConfiguredMainProps<TIconName extends string = string> = IconConfiguredSettingsProps &
  IconConfiguredSpecialProps<TIconName> &
  Omit<IconMainProps, 'src'>
export type IconConfiguredPropsWithRef<TIconName extends string = string> = IconConfiguredMainProps<TIconName> &
  AsPropsWithRef<undefined>
export type IconConfigured<TIconName extends string = string> = (
  props: IconConfiguredPropsWithRef<TIconName>
) => React.ReactElement | null

export type IconsSources<TIconName extends string = string> = Record<TIconName, IconSrc>

export const createIcon = <TIconName extends string = string>({
  uinityConfig,
  iconsSources,
}: {
  uinityConfig: UinityConfig
  iconsSources?: IconsSources<TIconName>
}) => {
  const Icon: IconConfigured<TIconName> = forwardRefIgnoreTypes(
    ({ size, name, $style = {}, ...restProps }: IconConfiguredPropsWithRef<TIconName>, ref: any) => {
      const $styleConfigured = getIconConfigFinalProps(uinityConfig, size)
      const $styleNormalized = {
        ...$styleConfigured,
        ...$style,
      }
      const src = iconsSources && name in iconsSources ? iconsSources[name] : null
      return <IconClear src={src} $style={$styleNormalized} ref={ref} {...(restProps as {})} />
    }
  )
  return {
    Icon,
  }
}
