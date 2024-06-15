import type { ContextMenuItemDefaultAs, ContextMenuItemStyleCore, ContextMenuItemStyleRoot } from './clear.js'
import { ContextMenuItem as ContextMenuItemClear } from './clear.js'
import type { ContextMenuItemMainProps } from '@/components/ContextMenuItem/clear.js'
import type { ConfiguredIconSrc, IconConfigured } from '@/components/Icon/configured.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { ContextMenuItemConfigFinalProps } from '@uinity/core/dist/components/contextMenuItem.js'
import { getContextMenuItemConfigFinalProps } from '@uinity/core/dist/components/contextMenuItem.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type ContextMenuItemConfiguredSettingsProps = {
  variant?: keyof UinityConfig['contextMenuItem']['variant'] | undefined | null
  color?: keyof UinityConfig['contextMenuItem']['color'] | undefined | null
  size?: keyof UinityConfig['contextMenuItem']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ContextMenuItemConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: ConfiguredIconSrc<TIconName>
}
export type ContextMenuItemConfiguredMainProps<
  TAs extends As = ContextMenuItemDefaultAs,
  TIconName extends string = string,
> = ContextMenuItemConfiguredSettingsProps &
  ContextMenuItemConfiguredSpecialProps<TIconName> &
  Omit<ContextMenuItemMainProps<TAs>, 'iconStart'>
export type ContextMenuItemConfiguredPropsWithRef<
  TAs extends As = ContextMenuItemDefaultAs,
  TIconName extends string = string,
> = ContextMenuItemConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type ContextMenuItemConfiguredPropsWithoutRef<
  TAs extends As = ContextMenuItemDefaultAs,
  TIconName extends string = string,
> = WithoutRef<ContextMenuItemConfiguredPropsWithRef<TAs, TIconName>>
export type ContextMenuItemConfigured<TIconName extends string = string> = <TAs extends As = ContextMenuItemDefaultAs>(
  props: ContextMenuItemConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactNode

const makeContextMenuItemStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: ContextMenuItemStyleCore
  cfp: ContextMenuItemConfigFinalProps
}): ContextMenuItemStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
  }
}

export const createContextMenuItem = <TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
}) => {
  const ContextMenuItem: ContextMenuItemConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      {
        variant,
        color,
        size,
        iconStart,
        colorMode,
        $style = {},
        ...restProps
      }: ContextMenuItemConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: ContextMenuItemStyleRoot = {
        rest: makeContextMenuItemStyleCore({
          cm,
          sc: $style.rest,
          cfp: getContextMenuItemConfigFinalProps(uinityConfig, variant, color, size, 'rest'),
        }),
        hover: makeContextMenuItemStyleCore({
          cm,
          sc: $style.hover,
          cfp: getContextMenuItemConfigFinalProps(uinityConfig, variant, color, size, 'hover'),
        }),
        current: makeContextMenuItemStyleCore({
          cm,
          sc: $style.hover,
          cfp: getContextMenuItemConfigFinalProps(uinityConfig, variant, color, size, 'current'),
        }),
        disabled: makeContextMenuItemStyleCore({
          cm,
          sc: $style.hover,
          cfp: getContextMenuItemConfigFinalProps(uinityConfig, variant, color, size, 'disabled'),
        }),
      }
      return (
        <ContextMenuItemClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    ContextMenuItem,
  }
}
