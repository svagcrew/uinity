import type { LabeledValuesDefaultAs, LabeledValuesMainProps, LabeledValueStyleRoot } from './clear.js'
import { LabeledValues as LabeledValuesClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getLabeledValueConfigFinalProps } from '@uinity/core/dist/components/labeledValue.js'

export type LabeledValuesConfiguredSettingsProps = {
  variant?: keyof UinityConfig['labeledValue']['variant'] | undefined | null
  color?: keyof UinityConfig['labeledValue']['color'] | undefined | null
  size?: keyof UinityConfig['labeledValue']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type LabeledValuesConfiguredSpecialProps = {}
export type LabeledValuesConfiguredMainProps<TAs extends As = LabeledValuesDefaultAs> =
  LabeledValuesConfiguredSettingsProps & LabeledValuesConfiguredSpecialProps & LabeledValuesMainProps<TAs>
export type LabeledValuesConfiguredPropsWithRef<TAs extends As = LabeledValuesDefaultAs> =
  LabeledValuesConfiguredMainProps<TAs> & AsPropsWithRef<TAs>
export type LabeledValuesConfiguredPropsWithoutRef<TAs extends As = LabeledValuesDefaultAs> = WithoutRef<
  LabeledValuesConfiguredPropsWithRef<TAs>
>
export type LabeledValuesConfigured = <TAs extends As = LabeledValuesDefaultAs>(
  props: LabeledValuesConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createLabeledValue = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const LabeledValues: LabeledValuesConfigured = forwardRefIgnoreTypes(
    (
      { variant, color, size, colorMode, $style = {}, ...restProps }: LabeledValuesConfiguredPropsWithoutRef,
      ref: any
    ) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getLabeledValueConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: LabeledValueStyleRoot = {
        ...cfp,
        ...$style,
        labelColor: getColorByMode(cm, $style.labelColor ?? cfp.labelColor),
        valueColor: getColorByMode(cm, $style.hintColor ?? cfp.valueColor),
        hintColor: getColorByMode(cm, $style.hintColor ?? cfp.hintColor),
      }
      return <LabeledValuesClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    LabeledValues,
  }
}
