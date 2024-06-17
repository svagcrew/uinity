import type { TextDefaultAs, TextMainProps, TextStyleRoot } from './clear.js'
import { Text as TextClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import type { ColorModeName } from '@uinity/core'
import { getColorByMode, type UinityConfig } from '@uinity/core'
import { getTextConfigFinalProps } from '@uinity/core/dist/components/text.js'

export type TextConfiguredSettingsProps = {
  variant?: keyof UinityConfig['text']['variant'] | undefined | null
  font?: keyof UinityConfig['text']['font'] | undefined | null
  weight?: keyof UinityConfig['text']['weight'] | undefined | null
  size?: keyof UinityConfig['text']['size'] | undefined | null
  lineHeight?: keyof UinityConfig['text']['lineHeight'] | undefined | null
  color?: keyof UinityConfig['text']['color'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type TextConfiguredSpecialProps = {}
export type TextConfiguredMainProps<TAs extends As = TextDefaultAs> = TextConfiguredSettingsProps &
  TextConfiguredSpecialProps &
  TextMainProps<TAs>
export type TextConfiguredPropsWithRef<TAs extends As = TextDefaultAs> = TextConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type TextConfiguredPropsWithoutRef<TAs extends As = TextDefaultAs> = WithoutRef<TextConfiguredPropsWithRef<TAs>>
export type TextConfigured = <TAs extends As = TextDefaultAs>(props: TextConfiguredPropsWithRef<TAs>) => React.ReactNode

export const createText = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Text: TextConfigured = forwardRefIgnoreTypes(
    (
      {
        variant,
        font,
        weight,
        size,
        lineHeight,
        color,
        colorMode,
        $style = {},
        ...restProps
      }: TextConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getTextConfigFinalProps(uinityConfig, variant, font, weight, size, lineHeight, color)
      const $styleConfigured: TextStyleRoot = {
        ...cfp,
        ...$style,
        color: getColorByMode(cm, $style.color ?? cfp.color),
      }
      return <TextClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Text,
  }
}
