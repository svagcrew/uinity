import type { ButtonLikeSelectDefaultAs, ButtonLikeSelectStyleCore, ButtonLikeSelectStyleRoot } from './clear.js'
import { ButtonLikeSelect as ButtonLikeSelectClear } from './clear.js'
import type { ButtonLikeSelectMainProps } from '@/components/ButtonLikeSelect/clear.js'
import type { IconSrc } from '@/components/Icon/clear.js'
import type { ConfiguredIconSrc, IconConfigured } from '@/components/Icon/configured.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { SelectConfigFinalProps } from '@uinity/core/dist/components/select.js'
import { getSelectConfigFinalProps } from '@uinity/core/dist/components/select.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type ButtonLikeSelectConfiguredSettingsProps = {
  variant?: keyof UinityConfig['select']['variant'] | undefined | null
  color?: keyof UinityConfig['select']['color'] | undefined | null
  size?: keyof UinityConfig['select']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ButtonLikeSelectConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: ConfiguredIconSrc<TIconName>
}
export type ButtonLikeSelectConfiguredMainProps<
  TAs extends As = ButtonLikeSelectDefaultAs,
  TIconName extends string = string,
> = ButtonLikeSelectConfiguredSettingsProps &
  ButtonLikeSelectConfiguredSpecialProps<TIconName> &
  Omit<ButtonLikeSelectMainProps<TAs>, 'iconStart'>
export type ButtonLikeSelectConfiguredPropsWithRef<
  TAs extends As = ButtonLikeSelectDefaultAs,
  TIconName extends string = string,
> = ButtonLikeSelectConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type ButtonLikeSelectConfiguredPropsWithoutRef<
  TAs extends As = ButtonLikeSelectDefaultAs,
  TIconName extends string = string,
> = WithoutRef<ButtonLikeSelectConfiguredPropsWithRef<TAs, TIconName>>
export type ButtonLikeSelectConfigured<TIconName extends string = string> = <
  TAs extends As = ButtonLikeSelectDefaultAs,
>(
  props: ButtonLikeSelectConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactNode

const makeButtonLikeSelectStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: ButtonLikeSelectStyleCore
  cfp: SelectConfigFinalProps
}): ButtonLikeSelectStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    // iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    // textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
  }
}

export const createButtonLikeSelect = <TIconName extends string>({
  uinityConfig,
  Icon,
  dropdownIconSrc,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
  dropdownIconSrc: IconSrc
}) => {
  const ButtonLikeSelect: ButtonLikeSelectConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      {
        variant,
        color,
        size,
        iconStart,
        colorMode,
        $style = {},
        ...restProps
      }: ButtonLikeSelectConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: ButtonLikeSelectStyleRoot = {
        rest: makeButtonLikeSelectStyleCore({
          cm,
          sc: $style.rest,
          cfp: getSelectConfigFinalProps(uinityConfig, variant, color, size),
        }),
        hover: makeButtonLikeSelectStyleCore({
          cm,
          sc: $style.hover,
          cfp: getSelectConfigFinalProps(uinityConfig, variant, color, size),
        }),
      }
      return (
        <ButtonLikeSelectClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          dropdownIconSrc={dropdownIconSrc}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    ButtonLikeSelect,
  }
}
