import type { TextareaDefaultAs, TextareaMainProps, TextareaStyleRoot } from './clear.js'
import { Textarea as TextareaClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getTextareaConfigFinalProps } from '@uinity/core/dist/components/textarea.js'

export type TextareaConfiguredSettingsProps = {
  variant?: keyof UinityConfig['textarea']['variant'] | undefined | null
  color?: keyof UinityConfig['textarea']['color'] | undefined | null
  size?: keyof UinityConfig['textarea']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type TextareaConfiguredSpecialProps = {}
export type TextareaConfiguredMainProps<TAs extends As = TextareaDefaultAs> = TextareaConfiguredSettingsProps &
  TextareaConfiguredSpecialProps &
  TextareaMainProps<TAs>
export type TextareaConfiguredPropsWithRef<TAs extends As = TextareaDefaultAs> = TextareaConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type TextareaConfiguredPropsWithoutRef<TAs extends As = TextareaDefaultAs> = WithoutRef<
  TextareaConfiguredPropsWithRef<TAs>
>
export type TextareaConfigured = <TAs extends As = TextareaDefaultAs>(
  props: TextareaConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createTextarea = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Textarea: TextareaConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: TextareaConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getTextareaConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: TextareaStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <TextareaClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Textarea,
  }
}
