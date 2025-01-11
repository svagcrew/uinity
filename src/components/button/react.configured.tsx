import {
  getButtonStyleRootClear,
  type ButtonConfiguredCommonProps,
  type ButtonUinityConfig,
} from '@/components/button/config.js'
import type { IconConfigured, IconConfiguredSpecialProps } from '@/components/icon/react.configured.js'
import { extractSettingsFromProps } from '@/lib/anyConfig.js'
import type { AsPropsWithRef, WithoutRef } from '@/lib/asRef.js'
import { getMainClassName } from '@/lib/classes.js'
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
  Icon: IconConfigured<any, TIconName>
}) => {
  const Button: ButtonConfigured<TButtonUinityConfig, TIconName> = forwardRef<any, any>(
    (
      {
        variant: variantName,
        $style: styleRootConfiguredOverrides,
        iconStart,
        iconStartSrc,
        className: providedClassName,
        ...restProps
      }: ButtonConfiguredPropsWithoutRef<ButtonUinityConfig, string>,
      ref: any
    ) => {
      const { restPropsWithoutSettings, settings } = extractSettingsFromProps({
        config: uinityConfig.button,
        restProps,
      })
      return (
        <ButtonClear
          {...restPropsWithoutSettings}
          className={getMainClassName({
            componentName: 'button',
            isConfigured: true,
            variantName,
            settings,
            providedClassName,
          })}
          $style={getButtonStyleRootClear({
            uinityConfig,
            variantName,
            settings,
            styleRootConfiguredOverrides,
          })}
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
