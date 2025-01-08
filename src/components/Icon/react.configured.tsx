import {
  getIconStyleRootClear,
  type IconConfiguredCommonProps,
  type IconUinityConfig,
} from '@/components/Icon/config.js'
import { extractSettingsFromProps, type AsPropsWithRef, type WithoutRef } from '@/lib/other.js'
import { forwardRef } from 'react'
import type { IconClearMainProps, IconClearSrc } from './react.clear.js'
import { Icon as IconClear } from './react.clear.js'

// Special props for configured component
export type IconConfiguredSpecialProps<TIconName extends string = string> = {
  name?: TIconName
  src?: IconClearSrc
}

// Rest types
export type IconConfiguredMainProps<
  TIconUinityConfig extends IconUinityConfig,
  TIconName extends string,
> = IconConfiguredSpecialProps<TIconName> &
  IconConfiguredCommonProps<TIconUinityConfig> &
  Omit<IconClearMainProps, 'src'>
export type IconConfiguredPropsWithRef<
  TIconUinityConfig extends IconUinityConfig,
  TIconName extends string,
> = IconConfiguredMainProps<TIconUinityConfig, TIconName> & AsPropsWithRef<undefined>
export type IconConfiguredPropsWithoutRef<
  TIconUinityConfig extends IconUinityConfig,
  TIconName extends string,
> = WithoutRef<IconConfiguredPropsWithRef<TIconUinityConfig, TIconName>>
export type IconConfigured<TIconUinityConfig extends IconUinityConfig, TIconName extends string> = (
  props: IconConfiguredPropsWithRef<TIconUinityConfig, TIconName>
) => React.ReactNode

export type IconsSources<TIconName extends string> = Record<TIconName, IconClearSrc>

export const createIcon = <TIconUinityConfig extends IconUinityConfig, TIconName extends string>({
  uinityConfig,
  iconsSources,
}: {
  uinityConfig: TIconUinityConfig
  iconsSources?: IconsSources<TIconName>
}) => {
  const Icon: IconConfigured<TIconUinityConfig, TIconName> = forwardRef<any, any>(
    (
      {
        variant: variantName,
        $style: styleRootConfiguredOverrides,
        name,
        src,
        ...restProps
      }: IconConfiguredPropsWithoutRef<IconUinityConfig, string>,
      ref: any
    ) => {
      const { restPropsWithoutSettings, settings } = extractSettingsFromProps({
        config: uinityConfig.icon,
        restProps,
      })
      const styleRootClear = getIconStyleRootClear({
        uinityConfig,
        variantName,
        settings,
        styleRootConfiguredOverrides,
      })
      const srcNormalized = iconsSources && name && name in iconsSources ? (iconsSources as any)[name] : src
      return <IconClear {...restPropsWithoutSettings} src={srcNormalized} $style={styleRootClear} ref={ref} />
    }
  )
  return {
    Icon,
  }
}
