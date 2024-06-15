import type { LabeledValueDefaultAs, LabeledValueMainProps, LabeledValueStyleRoot } from './clear.js'
import { LabeledValue as LabeledValueClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getLabeledValueConfigFinalProps } from '@uinity/core/dist/components/labeledValue.js'

export type LabeledValueConfiguredSettingsProps = {
  variant?: keyof UinityConfig['labeledValue']['variant'] | undefined | null
  color?: keyof UinityConfig['labeledValue']['color'] | undefined | null
  size?: keyof UinityConfig['labeledValue']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type LabeledValueConfiguredSpecialProps = {}
export type LabeledValueConfiguredMainProps<TAs extends As = LabeledValueDefaultAs> = LabeledValueConfiguredSettingsProps &
  LabeledValueConfiguredSpecialProps &
  LabeledValueMainProps<TAs>
export type LabeledValueConfiguredPropsWithRef<TAs extends As = LabeledValueDefaultAs> = LabeledValueConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type LabeledValueConfiguredPropsWithoutRef<TAs extends As = LabeledValueDefaultAs> = WithoutRef<
  LabeledValueConfiguredPropsWithRef<TAs>
>
export type LabeledValueConfigured = <TAs extends As = LabeledValueDefaultAs>(
  props: LabeledValueConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createLabeledValue = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const LabeledValue: LabeledValueConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: LabeledValueConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getLabeledValueConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: LabeledValueStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <LabeledValueClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    LabeledValue,
  }
}
