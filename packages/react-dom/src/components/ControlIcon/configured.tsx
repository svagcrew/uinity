import type { ControlIconDefaultAs, ControlIconStyleCore, ControlIconStyleRoot } from './clear.js'
import { ControlIcon as ControlIconClear } from './clear.js'
import type { ControlIconMainProps } from '@/components/ControlIcon/clear.js'
import type { IconSrc } from '@/components/Icon/clear.js'
import type { IconConfigured } from '@/components/Icon/configured.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { ControlIconConfigFinalProps } from '@uinity/core/dist/components/controlIcon.js'
import { getControlIconConfigFinalProps } from '@uinity/core/dist/components/controlIcon.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type ControlIconConfiguredSettingsProps = {
  variant?: keyof UinityConfig['controlIcon']['variant'] | undefined | null
  color?: keyof UinityConfig['controlIcon']['color'] | undefined | null
  size?: keyof UinityConfig['controlIcon']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ControlIconConfiguredSpecialProps<TIconName extends string = string> = {
  src?: IconSrc
  name?: TIconName
}
export type ControlIconConfiguredMainProps<
  TAs extends As = ControlIconDefaultAs,
  TIconName extends string = string,
> = ControlIconConfiguredSettingsProps &
  ControlIconConfiguredSpecialProps<TIconName> &
  Omit<ControlIconMainProps<TAs>, 'src'>
export type ControlIconConfiguredPropsWithRef<
  TAs extends As = ControlIconDefaultAs,
  TIconName extends string = string,
> = ControlIconConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type ControlIconConfiguredPropsWithoutRef<
  TAs extends As = ControlIconDefaultAs,
  TIconName extends string = string,
> = WithoutRef<ControlIconConfiguredPropsWithRef<TAs, TIconName>>
export type ControlIconConfigured<TIconName extends string = string> = <TAs extends As = ControlIconDefaultAs>(
  props: ControlIconConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactNode

const makeControlIconStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: ControlIconStyleCore
  cfp: ControlIconConfigFinalProps
}): ControlIconStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
  }
}

export const createControlIcon = <TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
}) => {
  const ControlIcon: ControlIconConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      { variant, color, size, src, name, colorMode, $style = {}, ...restProps }: ControlIconConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: ControlIconStyleRoot = {
        rest: makeControlIconStyleCore({
          cm,
          sc: $style.rest,
          cfp: getControlIconConfigFinalProps(uinityConfig, variant, color, size, 'rest'),
        }),
        hover: makeControlIconStyleCore({
          cm,
          sc: $style.hover,
          cfp: getControlIconConfigFinalProps(uinityConfig, variant, color, size, 'hover'),
        }),
        current: makeControlIconStyleCore({
          cm,
          sc: $style.hover,
          cfp: getControlIconConfigFinalProps(uinityConfig, variant, color, size, 'current'),
        }),
        disabled: makeControlIconStyleCore({
          cm,
          sc: $style.hover,
          cfp: getControlIconConfigFinalProps(uinityConfig, variant, color, size, 'disabled'),
        }),
      }
      return (
        <ControlIconClear
          {...(restProps as {})}
          src={<Icon src={src} name={name as any} />}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    ControlIcon,
  }
}
