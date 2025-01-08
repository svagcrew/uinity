/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getButtonStyleRootClear,
  getButtonStyleRootConfigured,
  type ButtonConfig,
  type ButtonConfiguredCommonProps,
  type ButtonUinityConfig,
} from '@/components/Button/config.js'
import type { IconConfig } from '@/components/Icon/config.js'
import type { IconConfigured, IconConfiguredSpecialProps } from '@/components/Icon/react.configured.js'
import { omit, type AsPropsWithRef, type WithoutRef } from '@/lib/other.js'
import { forwardRef } from 'react'
import type { ButtonClearMainProps } from './react.clear.js'
import { Button as ButtonClear } from './react.clear.js'

// Special props for configured component
export type ButtonConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: IconConfiguredSpecialProps<TIconName>['name']
  iconStartSrc?: IconConfiguredSpecialProps<TIconName>['src']
}

// Rest types
export type ButtonConfiguredMainProps<
  TButtonConfig extends ButtonConfig,
  TIconConfig extends IconConfig,
  TIconName extends string,
> = ButtonConfiguredSpecialProps<TIconName> &
  ButtonConfiguredCommonProps<TButtonConfig> &
  Omit<ButtonClearMainProps, 'iconStart' | '$style'>
export type ButtonConfiguredPropsWithRef<
  TButtonConfig extends ButtonConfig,
  TIconConfig extends IconConfig,
  TIconName extends string,
> = ButtonConfiguredMainProps<TButtonConfig, TIconConfig, TIconName> & AsPropsWithRef<undefined>
export type ButtonConfiguredPropsWithoutRef<
  TButtonConfig extends ButtonConfig,
  TIconConfig extends IconConfig,
  TIconName extends string,
> = WithoutRef<ButtonConfiguredPropsWithRef<TButtonConfig, TIconConfig, TIconName>>
export type ButtonConfigured<
  TButtonConfig extends ButtonConfig,
  TIconConfig extends IconConfig,
  TIconName extends string,
> = (props: ButtonConfiguredPropsWithRef<TButtonConfig, TIconConfig, TIconName>) => React.ReactNode

export const createButton = <
  TButtonConfig extends ButtonConfig,
  TIconConfig extends IconConfig,
  TIconName extends string,
>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: ButtonUinityConfig<TButtonConfig, TIconConfig>
  Icon: IconConfigured<TIconConfig, TIconName>
}) => {
  const Button: ButtonConfigured<TButtonConfig, TIconConfig, TIconName> = forwardRef<any, any>(
    (
      {
        variant,
        $style,
        iconStart,
        iconStartSrc,
        ...restProps
      }: ButtonConfiguredPropsWithoutRef<ButtonConfig, IconConfig, string>,
      ref: any
    ) => {
      const styleRootConfigured = getButtonStyleRootConfigured({
        uinityConfig,
        variantName: variant,
        settings: restProps,
        $style,
      })
      const styleRootClear = getButtonStyleRootClear({
        uinityConfig,
        styleRootConfigured,
      })
      const restPropsWithoutSettings = omit(restProps, Object.keys(uinityConfig.button.settings || ({} as any)) as any)
      return (
        <ButtonClear
          {...restPropsWithoutSettings}
          $style={styleRootClear}
          ref={ref}
          iconStart={<Icon name={iconStart as any} src={iconStartSrc as any} />}
        />
      )
    }
  )
  return {
    Button,
  }
}
