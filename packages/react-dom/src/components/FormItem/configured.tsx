import type { FormItemDefaultAs, FormItemMainProps, FormItemStyleRoot } from './clear.js'
import { FormItem as FormItemClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getFormItemConfigFinalProps } from '@uinity/core/dist/components/formItem.js'

export type FormItemConfiguredSettingsProps = {
  variant?: keyof UinityConfig['formItem']['variant'] | undefined | null
  color?: keyof UinityConfig['formItem']['color'] | undefined | null
  size?: keyof UinityConfig['formItem']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type FormItemConfiguredSpecialProps = {}
export type FormItemConfiguredMainProps<TAs extends As = FormItemDefaultAs> = FormItemConfiguredSettingsProps &
  FormItemConfiguredSpecialProps &
  FormItemMainProps<TAs>
export type FormItemConfiguredPropsWithRef<TAs extends As = FormItemDefaultAs> = FormItemConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type FormItemConfiguredPropsWithoutRef<TAs extends As = FormItemDefaultAs> = WithoutRef<
  FormItemConfiguredPropsWithRef<TAs>
>
export type FormItemConfigured = <TAs extends As = FormItemDefaultAs>(
  props: FormItemConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createFormItem = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const FormItem: FormItemConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: FormItemConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getFormItemConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: FormItemStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <FormItemClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    FormItem,
  }
}
