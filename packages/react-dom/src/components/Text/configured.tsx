import type { TextDefaultAs, TextMainProps, TextStyleRoot } from './clear.js'
import { Text as TextClear } from './clear.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type UinityConfig } from '@uinity/core'
// import { getTextConfigFinalProps } from '@uinity/core/dist/components/text.js'

export type TextConfiguredSettingsProps = {
  // variant?: keyof UinityConfig['text']['variant'] | undefined | null
  // color?: keyof UinityConfig['text']['color'] | undefined | null
  // size?: keyof UinityConfig['text']['size'] | undefined | null
  // colorMode?: ColorModeName | undefined | null
  variant?: any
  color?: any
  size?: any
  colorMode?: any
}
export type TextConfiguredSpecialProps = {}
export type TextConfiguredMainProps<TAs extends As = TextDefaultAs> = TextConfiguredSettingsProps &
  TextConfiguredSpecialProps &
  TextMainProps<TAs>
export type TextConfiguredPropsWithRef<TAs extends As = TextDefaultAs> = TextConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type TextConfiguredPropsWithoutRef<TAs extends As = TextDefaultAs> = WithoutRef<TextConfiguredPropsWithRef<TAs>>
export type TextConfigured = <TAs extends As = TextDefaultAs>(props: TextConfiguredPropsWithRef<TAs>) => React.ReactNode

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createText = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Text: TextConfigured = forwardRefIgnoreTypes(
    // ({ variant, color, size, colorMode, $style = {}, ...restProps }: TextConfiguredPropsWithoutRef, ref: any) => {
    ({ $style = {}, ...restProps }: TextConfiguredPropsWithoutRef, ref: any) => {
      // const { cm } = useColorMode(colorMode)
      const cfp = {} // getTextConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: TextStyleRoot = {
        ...cfp,
        ...$style,
        // background: getColorByMode(cm, $style.background ?? cfp.background),
        // childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <TextClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Text,
  }
}
