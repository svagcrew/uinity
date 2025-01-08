import {
  getIconConfiguredStyleRoot,
  type IconConfig,
  type IconConfiguredCommonProps,
  type IconUinityConfig,
} from '@/components/Icon/config.js'
import type { AsPropsWithRef, WithoutRef } from '@/lib/other.js'
import { forwardRef } from 'react'
import type { IconMainProps, IconSrc } from './react.clear.js'
import { Icon as IconClear } from './react.clear.js'

// Special props for configured component
export type IconConfiguredSpecialProps<TIconName extends string = string> = {
  name?: TIconName
  src?: IconSrc
}

// Rest types
export type IconConfiguredMainProps<
  TIconConfig extends IconConfig,
  TIconName extends string,
> = IconConfiguredSpecialProps<TIconName> & IconConfiguredCommonProps<TIconConfig> & Omit<IconMainProps, 'src'>
export type IconConfiguredPropsWithRef<
  TIconConfig extends IconConfig,
  TIconName extends string,
> = IconConfiguredMainProps<TIconConfig, TIconName> & AsPropsWithRef<undefined>
export type IconConfiguredPropsWithoutRef<TIconConfig extends IconConfig, TIconName extends string> = WithoutRef<
  IconConfiguredPropsWithRef<TIconConfig, TIconName>
>
export type IconConfigured<TIconConfig extends IconConfig, TIconName extends string> = (
  props: IconConfiguredPropsWithRef<TIconConfig, TIconName>
) => React.ReactNode

export type IconsSources<TIconName extends string> = Record<TIconName, IconSrc>

export const createIcon = <TIconConfig extends IconConfig, TIconName extends string>({
  uinityConfig,
  iconsSources,
}: {
  uinityConfig: IconUinityConfig<TIconConfig>
  iconsSources?: IconsSources<TIconName>
}) => {
  const Icon: IconConfigured<TIconConfig, TIconName> = forwardRef<any, any>(
    ({ variant, $style, name, src, ...restProps }: IconConfiguredPropsWithoutRef<IconConfig, string>, ref: any) => {
      const $clearStyle = getIconConfiguredStyleRoot({
        uinityConfig,
        variantName: variant,
        settings: restProps,
        $style,
      })
      const srcNormalized = iconsSources && name && name in iconsSources ? (iconsSources as any)[name] : src
      return <IconClear {...restProps} src={srcNormalized} $style={$clearStyle} ref={ref} />
    }
  )
  return {
    Icon,
  }
}
