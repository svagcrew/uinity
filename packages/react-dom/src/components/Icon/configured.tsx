import { Icon as IconClear } from './clear.js'
import type { IconMainProps } from '@/components/Icon/clear.js'
import type { AsComponent, AsRef, RC } from '@/utils.js'
import { type AsPropsWithRef, forwardRefWithTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { getIconStyleRootProps } from '@uinity/core/dist/components/icon.js'

export type IconConfiguredSettingsProps = {
  size?: keyof UinityConfig['icon']['size'] | undefined | null
}
export type IconConfiguredSpecialProps<TIconName extends string> = {
  name: TIconName
}
export type IconConfiguredMainProps<TIconName extends string> = IconConfiguredSettingsProps &
  IconConfiguredSpecialProps<TIconName> &
  Omit<IconMainProps, 'src'>
export type IconConfiguredPropsWithRef<TIconName extends string> = IconConfiguredMainProps<TIconName> &
  AsPropsWithRef<undefined>
export type IconConfiguredType<TIconName extends string = string> = RC<IconConfiguredMainProps<TIconName>>

export type IconComponentType = AsComponent<undefined>
export type IconsComponents<TIconName extends string> = Record<TIconName, IconComponentType>

export const createUinityIcon = <TIconName extends string>({
  uinityConfig,
  iconsComponents,
}: {
  uinityConfig: UinityConfig
  iconsComponents?: IconsComponents<TIconName>
}) => {
  const Icon = forwardRefWithTypes(
    ({ size, name, $style = {}, ...restProps }: IconConfiguredPropsWithRef<TIconName>, ref: AsRef<undefined>) => {
      const $styleConfigured = getIconStyleRootProps(uinityConfig, size)
      const $styleNormalized = {
        ...$styleConfigured,
        ...$style,
      }
      const src = iconsComponents && name in iconsComponents ? iconsComponents[name] : null
      return <IconClear src={src as any} $style={$styleNormalized} ref={ref} {...(restProps as {})} />
    }
  )
  return {
    Icon,
  }
}
