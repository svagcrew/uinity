import type { LinkDefaultAs, LinkStyleCore, LinkStyleRoot } from './clear.js'
import { Link as LinkClear } from './clear.js'
import type { ConfiguredIconSrc, IconConfigured } from '@/components/Icon/configured.js'
import type { LinkMainProps } from '@/components/Link/clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { WithoutRef } from '@/utils.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { LinkConfigFinalProps } from '@uinity/core/dist/components/link.js'
import { getLinkConfigFinalProps } from '@uinity/core/dist/components/link.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type LinkConfiguredSettingsProps = {
  variant?: keyof UinityConfig['link']['variant'] | undefined | null
  color?: keyof UinityConfig['link']['color'] | undefined | null
  size?: keyof UinityConfig['link']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type LinkConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: ConfiguredIconSrc<TIconName>
}
export type LinkConfiguredMainProps<
  TAs extends As = LinkDefaultAs,
  TIconName extends string = string,
> = LinkConfiguredSettingsProps & LinkConfiguredSpecialProps<TIconName> & Omit<LinkMainProps<TAs>, 'iconStart'>
export type LinkConfiguredPropsWithRef<
  TAs extends As = LinkDefaultAs,
  TIconName extends string = string,
> = LinkConfiguredMainProps<TAs, TIconName> & AsPropsWithRef<TAs>
export type LinkConfiguredPropsWithoutRef<
  TAs extends As = LinkDefaultAs,
  TIconName extends string = string,
> = WithoutRef<LinkConfiguredPropsWithRef<TAs, TIconName>>
export type LinkConfigured<TIconName extends string = string> = <TAs extends As = LinkDefaultAs>(
  props: LinkConfiguredPropsWithRef<TAs, TIconName>
) => React.ReactNode

const makeLinkStyleCore = ({
  cm,
  sc = {},
  cfp,
}: {
  cm: ColorModeName
  sc?: LinkStyleCore
  cfp: LinkConfigFinalProps
}): LinkStyleCore => {
  return {
    ...cfp,
    ...sc,
    background: getColorByMode(cm, sc.background ?? cfp.background),
    iconColor: getColorByMode(cm, sc.iconColor ?? cfp.iconColor),
    textColor: getColorByMode(cm, sc.textColor ?? cfp.textColor),
  }
}

export const createLink = <TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: UinityConfig
  Icon: IconConfigured<TIconName>
}) => {
  const Link: LinkConfigured<TIconName> = forwardRefIgnoreTypes(
    (
      { variant, color, size, iconStart, colorMode, $style = {}, ...restProps }: LinkConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: LinkStyleRoot = {
        rest: makeLinkStyleCore({
          cm,
          sc: $style.rest,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, color, size, 'rest'),
        }),
        hover: makeLinkStyleCore({
          cm,
          sc: $style.hover,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, color, size, 'hover'),
        }),
        current: makeLinkStyleCore({
          cm,
          sc: $style.hover,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, color, size, 'current'),
        }),
        disabled: makeLinkStyleCore({
          cm,
          sc: $style.hover,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, color, size, 'disabled'),
        }),
      }
      return (
        <LinkClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          $style={$styleConfigured}
          ref={ref}
        />
      )
    }
  )
  return {
    Link,
  }
}
