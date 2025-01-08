import {
  getIconStyleRootClear,
  type IconConfiguredCommonProps,
  type IconUinityConfig,
} from '@/components/Icon/config.js'
import { extractSettingsFromProps } from '@/lib/anyConfig.js'
import type { AsPropsWithRef, WithoutRef } from '@/lib/asRef.js'
import { forwardRef } from 'react'
import type { IconClearMainProps, IconClearSrc } from './react.clear.js'
import { Icon as IconClear } from './react.clear.js'
import { getMainClassName } from '@/lib/classes.js'

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
        className: providedClassName,
        ...restProps
      }: IconConfiguredPropsWithoutRef<IconUinityConfig, string>,
      ref: any
    ) => {
      const { restPropsWithoutSettings, settings } = extractSettingsFromProps({
        config: uinityConfig.icon,
        restProps,
      })
      return (
        <IconClear
          {...restPropsWithoutSettings}
          className={getMainClassName({
            componentName: 'icon',
            isConfigured: true,
            variantName,
            settings,
            providedClassName,
          })}
          src={iconsSources && name && name in iconsSources ? (iconsSources as any)[name] : src}
          $style={getIconStyleRootClear({
            uinityConfig,
            variantName,
            settings,
            styleRootConfiguredOverrides,
          })}
          ref={ref}
        />
      )
    }
  )
  return {
    Icon,
  }
}
