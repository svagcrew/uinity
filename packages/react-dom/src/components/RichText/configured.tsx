import type { RichTextDefaultAs, RichTextMainProps, RichTextStyleRoot } from './clear.js'
import { RichText as RichTextClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getRichTextConfigFinalProps } from '@uinity/core/dist/components/richText.js'

export type RichTextConfiguredSettingsProps = {
  variant?: keyof UinityConfig['richText']['variant'] | undefined | null
  color?: keyof UinityConfig['richText']['color'] | undefined | null
  size?: keyof UinityConfig['richText']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type RichTextConfiguredSpecialProps = {}
export type RichTextConfiguredMainProps<TAs extends As = RichTextDefaultAs> = RichTextConfiguredSettingsProps &
  RichTextConfiguredSpecialProps &
  RichTextMainProps<TAs>
export type RichTextConfiguredPropsWithRef<TAs extends As = RichTextDefaultAs> = RichTextConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type RichTextConfiguredPropsWithoutRef<TAs extends As = RichTextDefaultAs> = WithoutRef<
  RichTextConfiguredPropsWithRef<TAs>
>
export type RichTextConfigured = <TAs extends As = RichTextDefaultAs>(
  props: RichTextConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createRichText = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const RichText: RichTextConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: RichTextConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getRichTextConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: RichTextStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <RichTextClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    RichText,
  }
}
