import type { ButtonDefaultAs, ButtonStyleCore, ButtonStyleRoot } from './clear.js'
import { Button as ButtonClear } from './clear.js'
import type { ButtonMainProps } from '@/components/Button/clear.js'
import type { ConfiguredIconSrc, IconConfigured } from '@/components/Icon/configured.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { ButtonConfigFinalProps } from '@uinity/core/dist/components/button.js'
import { getButtonConfigFinalProps } from '@uinity/core/dist/components/button.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type ButtonConfiguredSettingsProps = {
  variant?: keyof UinityConfig['button']['variant'] | undefined | null
  color?: keyof UinityConfig['button']['color'] | undefined | null
  size?: keyof UinityConfig['button']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ButtonConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: ConfiguredIconSrc<TIconName>
}
export type ButtonConfiguredMainProps<
  TAs extends As = ButtonDefaultAs,
  TIconName extends string = string,
> = ButtonConfiguredSettingsProps & ButtonConfiguredSpecialProps<TIconName> & Omit<ButtonMainProps<TAs>, 'iconStart'>
export type ButtonConfiguredPropsWithRef<
  TAs extends As = ButtonDefaultAs,
  TIconName extends string = string,
> = ButtonConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type ButtonConfiguredPropsWithoutRef<
  TAs extends As = ButtonDefaultAs,
  TIconName extends string = string,
> = WithoutRef<ButtonConfiguredPropsWithRef<TAs, TIconName>>
export type ButtonConfigured<TIconName extends string = string> = <TAs extends As = ButtonDefaultAs>(
  props: ButtonConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactNode

const makeButtonStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: ButtonStyleCore
  cfp: ButtonConfigFinalProps
}): ButtonStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
  }
}

export const createButton = <TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
}) => {
  const Button: ButtonConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      { variant, color, size, iconStart, colorMode, $style = {}, ...restProps }: ButtonConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: ButtonStyleRoot = {
        rest: makeButtonStyleCore({
          cm,
          sc: $style.rest,
          cfp: getButtonConfigFinalProps(uinityConfig, variant, color, size, 'rest'),
        }),
        hover: makeButtonStyleCore({
          cm,
          sc: $style.hover,
          cfp: getButtonConfigFinalProps(uinityConfig, variant, color, size, 'hover'),
        }),
      }
      return (
        <ButtonClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    Button,
  }
}
