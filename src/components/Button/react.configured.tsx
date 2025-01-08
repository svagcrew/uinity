import {
  getButtonStyleRootClearByConfigured,
  getButtonStyleRootConfigured,
  type ButtonConfiguredCommonProps,
  type ButtonUinityConfig,
} from '@/components/Button/config.js'
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
  TButtonUinityConfig extends ButtonUinityConfig,
  TIconName extends string,
> = ButtonConfiguredSpecialProps<TIconName> &
  ButtonConfiguredCommonProps<TButtonUinityConfig> &
  Omit<ButtonClearMainProps, 'iconStart' | '$style'>
export type ButtonConfiguredPropsWithRef<
  TButtonUinityConfig extends ButtonUinityConfig,
  TIconName extends string,
> = ButtonConfiguredMainProps<TButtonUinityConfig, TIconName> & AsPropsWithRef<undefined>
export type ButtonConfiguredPropsWithoutRef<
  TButtonUinityConfig extends ButtonUinityConfig,
  TIconName extends string,
> = WithoutRef<ButtonConfiguredPropsWithRef<TButtonUinityConfig, TIconName>>
export type ButtonConfigured<TButtonUinityConfig extends ButtonUinityConfig, TIconName extends string> = (
  props: ButtonConfiguredPropsWithRef<TButtonUinityConfig, TIconName>
) => React.ReactNode

export const createButton = <TButtonUinityConfig extends ButtonUinityConfig, TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: TButtonUinityConfig
  Icon: IconConfigured<TButtonUinityConfig, TIconName>
}) => {
  const Button: ButtonConfigured<TButtonUinityConfig, TIconName> = forwardRef<any, any>(
    (
      {
        variant,
        $style,
        iconStart,
        iconStartSrc,
        ...restProps
      }: ButtonConfiguredPropsWithoutRef<ButtonUinityConfig, string>,
      ref: any
    ) => {
      const styleRootConfigured = getButtonStyleRootConfigured({
        uinityConfig,
        variantName: variant,
        settings: restProps,
        $style,
      })
      const styleRootClear = getButtonStyleRootClearByConfigured({
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
