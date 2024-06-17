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
  font?: keyof UinityConfig['link']['font'] | undefined | null
  weight?: keyof UinityConfig['link']['weight'] | undefined | null
  size?: keyof UinityConfig['link']['size'] | undefined | null
  lineHeight?: keyof UinityConfig['link']['lineHeight'] | undefined | null
  color?: keyof UinityConfig['link']['color'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type LinkConfiguredSpecialProps<TIconName extends string = string> = {
  iconStart?: ConfiguredIconSrc<TIconName>
  iconEnd?: ConfiguredIconSrc<TIconName>
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
    color: getColorByMode(cm, sc.color ?? cfp.color),
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
      {
        variant,
        font,
        weight,
        size,
        lineHeight,
        color,
        iconStart,
        iconEnd,
        colorMode,
        $style = {},
        ...restProps
      }: LinkConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const $styleConfigured: LinkStyleRoot = {
        rest: makeLinkStyleCore({
          cm,
          sc: $style.rest,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, font, weight, size, lineHeight, color, 'rest'),
        }),
        hover: makeLinkStyleCore({
          cm,
          sc: $style.hover,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, font, weight, size, lineHeight, color, 'hover'),
        }),
        current: makeLinkStyleCore({
          cm,
          sc: $style.hover,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, font, weight, size, lineHeight, color, 'current'),
        }),
        disabled: makeLinkStyleCore({
          cm,
          sc: $style.hover,
          cfp: getLinkConfigFinalProps(uinityConfig, variant, font, weight, size, lineHeight, color, 'disabled'),
        }),
      }
      return (
        <LinkClear
          {...(restProps as {})}
          iconStart={<Icon name={iconStart as any} />}
          iconEnd={<Icon name={iconEnd as any} />}
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
