import type { TextfieldDefaultAs, TextfieldMainProps, TextfieldStyleRoot } from './clear.js'
import { Textfield as TextfieldClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getTextfieldConfigFinalProps } from '@uinity/core/dist/components/textfield.js'

export type TextfieldConfiguredSettingsProps = {
  variant?: keyof UinityConfig['textfield']['variant'] | undefined | null
  color?: keyof UinityConfig['textfield']['color'] | undefined | null
  size?: keyof UinityConfig['textfield']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type TextfieldConfiguredSpecialProps = {}
export type TextfieldConfiguredMainProps<TAs extends As = TextfieldDefaultAs> = TextfieldConfiguredSettingsProps &
  TextfieldConfiguredSpecialProps &
  TextfieldMainProps<TAs>
export type TextfieldConfiguredPropsWithRef<TAs extends As = TextfieldDefaultAs> = TextfieldConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type TextfieldConfiguredPropsWithoutRef<TAs extends As = TextfieldDefaultAs> = WithoutRef<
  TextfieldConfiguredPropsWithRef<TAs>
>
export type TextfieldConfigured = <TAs extends As = TextfieldDefaultAs>(
  props: TextfieldConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createTextfield = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Textfield: TextfieldConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: TextfieldConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getTextfieldConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: TextfieldStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <TextfieldClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Textfield,
  }
}
