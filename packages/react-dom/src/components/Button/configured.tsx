import { Button as ButtonClear } from './clear.js'
import type { ButtonMainProps, ButtonStyleRootProps } from '@/components/Button/clear.js'
import type { IconConfiguredType } from '@/components/Icon/configured.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { AsRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefWithTypes, type RC } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { getButtonStyleRootProps } from '@uinity/core/dist/components/button.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type ButtonConfiguredSettingsProps = {
  variant?: keyof UinityConfig['button']['variant'] | undefined | null
  color?: keyof UinityConfig['button']['color'] | undefined | null
  size?: keyof UinityConfig['button']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ButtonConfiguredSpecialProps<TIconName extends string> = {
  iconStart?: TIconName
}
export type ButtonConfiguredMainProps<TAs extends As, TIconName extends string> = ButtonConfiguredSettingsProps &
  ButtonConfiguredSpecialProps<TIconName> &
  ButtonMainProps<TAs>
export type ButtonConfiguredPropsWithRef<TAs extends As, TIconName extends string> = ButtonConfiguredMainProps<
  TAs,
  TIconName
> &
  AsPropsWithRef<TAs>
export type ButtonConfiguredType<TAs extends As, TIconName extends string> = RC<
  ButtonConfiguredPropsWithRef<TAs, TIconName>
>

export const createUinityButton = <TAs extends As, TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfiguredType<TIconName>
}) => {
  const { colorMode: colorModeGlobal } = useColorMode()
  const Button = forwardRefWithTypes(
    (
      {
        variant,
        color,
        size,
        iconStart,
        colorMode,
        $style = {},
        ...restProps
      }: ButtonConfiguredPropsWithRef<TAs, TIconName>,
      ref: AsRef<TAs>
    ) => {
      const cm = colorMode || colorModeGlobal
      const $styleConfiguredRest = getButtonStyleRootProps(uinityConfig, variant, color, size, 'rest')
      const $styleConfiguredHover = getButtonStyleRootProps(uinityConfig, variant, color, size, 'hover')
      const $styleNormalized: ButtonStyleRootProps = {
        rest: {
          ...$styleConfiguredRest,
          ...$style.rest,
          background: getColorByMode(cm, $styleConfiguredRest.background || $style.rest?.background),
          iconColor: getColorByMode(cm, $styleConfiguredRest.iconColor || $style.rest?.iconColor),
          textColor: getColorByMode(cm, $styleConfiguredRest.textColor || $style.rest?.textColor),
        },
        hover: {
          ...$styleConfiguredHover,
          ...$style.hover,
          background: getColorByMode(cm, $styleConfiguredHover.background || $style.hover?.background),
          iconColor: getColorByMode(cm, $styleConfiguredHover.iconColor || $style.hover?.iconColor),
          textColor: getColorByMode(cm, $styleConfiguredHover.textColor || $style.hover?.textColor),
        },
      }
      return (
        <ButtonClear
          iconStart={<Icon name={iconStart as any} />}
          $style={$styleNormalized}
          ref={ref as any}
          {...(restProps as {})}
        />
      )
    }
  )
  return {
    Button,
  }
}
