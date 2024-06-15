import type { CheckboxDefaultAs, CheckboxMainProps, CheckboxStyleRoot } from './clear.js'
import { Checkbox as CheckboxClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getCheckboxConfigFinalProps } from '@uinity/core/dist/components/checkbox.js'

export type CheckboxConfiguredSettingsProps = {
  variant?: keyof UinityConfig['checkbox']['variant'] | undefined | null
  color?: keyof UinityConfig['checkbox']['color'] | undefined | null
  size?: keyof UinityConfig['checkbox']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type CheckboxConfiguredSpecialProps = {}
export type CheckboxConfiguredMainProps<TAs extends As = CheckboxDefaultAs> = CheckboxConfiguredSettingsProps &
  CheckboxConfiguredSpecialProps &
  CheckboxMainProps<TAs>
export type CheckboxConfiguredPropsWithRef<TAs extends As = CheckboxDefaultAs> = CheckboxConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type CheckboxConfiguredPropsWithoutRef<TAs extends As = CheckboxDefaultAs> = WithoutRef<
  CheckboxConfiguredPropsWithRef<TAs>
>
export type CheckboxConfigured = <TAs extends As = CheckboxDefaultAs>(
  props: CheckboxConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createCheckbox = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Checkbox: CheckboxConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: CheckboxConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getCheckboxConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: CheckboxStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <CheckboxClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Checkbox,
  }
}
