import type { ToggleButtonDefaultAs, ToggleButtonStyleCore, ToggleButtonStyleRoot } from './clear.js'
import { ToggleButton as ToggleButtonClear, ToggleButtons } from './clear.js'
import type { ConfiguredIconSrc, IconConfigured } from '@/components/Icon/configured.js'
import type { ToggleButtonMainProps } from '@/components/ToggleButton/clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { ToggleButtonConfigFinalProps } from '@uinity/core/dist/components/toggleButton.js'
import { getToggleButtonConfigFinalProps } from '@uinity/core/dist/components/toggleButton.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type ToggleButtonConfiguredSettingsProps = {
  variant?: keyof UinityConfig['toggleButton']['variant'] | undefined | null
  color?: keyof UinityConfig['toggleButton']['color'] | undefined | null
  size?: keyof UinityConfig['toggleButton']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ToggleButtonConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: ConfiguredIconSrc<TIconName>
}
export type ToggleButtonConfiguredMainProps<
  TAs extends As = ToggleButtonDefaultAs,
  TIconName extends string = string,
> = ToggleButtonConfiguredSettingsProps &
  ToggleButtonConfiguredSpecialProps<TIconName> &
  Omit<ToggleButtonMainProps<TAs>, 'iconStart'>
export type ToggleButtonConfiguredPropsWithRef<
  TAs extends As = ToggleButtonDefaultAs,
  TIconName extends string = string,
> = ToggleButtonConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type ToggleButtonConfiguredPropsWithoutRef<
  TAs extends As = ToggleButtonDefaultAs,
  TIconName extends string = string,
> = WithoutRef<ToggleButtonConfiguredPropsWithRef<TAs, TIconName>>
export type ToggleButtonConfigured<TIconName extends string = string> = <TAs extends As = ToggleButtonDefaultAs>(
  props: ToggleButtonConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactNode

const makeToggleButtonStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: ToggleButtonStyleCore
  cfp: ToggleButtonConfigFinalProps
}): ToggleButtonStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
    borderColor: getColorByMode(cm, sc.borderColor ?? cfp.borderColor),
  }
}

export const createToggleButton = <TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
}) => {
  const ToggleButton: ToggleButtonConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      { variant, color, size, iconStart, colorMode, $style = {}, ...restProps }: ToggleButtonConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: ToggleButtonStyleRoot = {
        rest: makeToggleButtonStyleCore({
          cm,
          sc: $style.rest,
          cfp: getToggleButtonConfigFinalProps(uinityConfig, variant, color, size, 'rest'),
        }),
        hover: makeToggleButtonStyleCore({
          cm,
          sc: $style.hover,
          cfp: getToggleButtonConfigFinalProps(uinityConfig, variant, color, size, 'hover'),
        }),
        checked: makeToggleButtonStyleCore({
          cm,
          sc: $style.checked,
          cfp: getToggleButtonConfigFinalProps(uinityConfig, variant, color, size, 'checked'),
        }),
      }
      return (
        <ToggleButtonClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    ToggleButton,
    ToggleButtons,
  }
}
