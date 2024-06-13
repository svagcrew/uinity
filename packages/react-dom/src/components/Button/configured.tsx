import type { ButtonDefaultAs, ButtonStyleCoreProps } from './clear.js'
import { Button as ButtonClear } from './clear.js'
import type { ButtonMainProps, ButtonStyleStatesProps } from '@/components/Button/clear.js'
import type { IconConfigured } from '@/components/Icon/configured.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { getButtonConfigFinalProps } from '@uinity/core/dist/components/button.js'
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
export type ButtonConfiguredMainProps<
  TAs extends As = ButtonDefaultAs,
  TIconName extends string = string,
> = ButtonConfiguredSettingsProps & ButtonConfiguredSpecialProps<TIconName> & Omit<ButtonMainProps<TAs>, 'iconStart'>
export type ButtonConfiguredPropsWithRef<
  TAs extends As = ButtonDefaultAs,
  TIconName extends string = string,
> = ButtonConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type ButtonConfigured<TIconName extends string = string> = <TAs extends As = ButtonDefaultAs>(
  props: ButtonConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactElement | null

const normalizeButtonStyleCoreProps = (
  cm: ColorModeName,
  passedScp: ButtonStyleCoreProps | undefined,
  configuredScp: any
) => {
  return {
    ...configuredScp,
    ...passedScp,
    background: getColorByMode(cm, passedScp?.background || configuredScp.background),
    iconColor: getColorByMode(cm, passedScp?.iconColor || configuredScp.iconColor),
    textColor: getColorByMode(cm, passedScp?.textColor || configuredScp.textColor),
  }
}

export const createButton = <TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
}) => {
  const { colorMode: colorModeGlobal } = useColorMode()
  const Button: ButtonConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      { variant, color, size, iconStart, colorMode, $style = {}, ...restProps }: ButtonConfiguredPropsWithRef,
      ref: any
    ) => {
      const cm = colorMode || colorModeGlobal
      const $styleConfiguredRest = getButtonConfigFinalProps(uinityConfig, variant, color, size, 'rest')
      const $styleConfiguredHover = getButtonConfigFinalProps(uinityConfig, variant, color, size, 'hover')
      const $styleNormalized: ButtonStyleStatesProps = {
        rest: {
          ...$styleConfiguredRest,
          ...$style.rest,
          ...normalizeButtonStyleCoreProps(cm, $style.rest, $styleConfiguredRest),
        },
        hover: {
          ...$styleConfiguredHover,
          ...$style.hover,
          ...normalizeButtonStyleCoreProps(cm, $style.hover, $styleConfiguredHover),
        },
      }
      return (
        <ButtonClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          $style={$styleNormalized}
          ref={ref}
        />
      )
    }
  )
  return {
    Button,
  }
}
