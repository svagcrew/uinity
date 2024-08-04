/* eslint-disable lodash/prefer-is-nil */
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import isNil from 'lodash/isNil.js'
import { css, styled } from 'styled-components'

export type LabeledValueStyleRoot = {
  labelFontFamily?: string | null | undefined
  labelFontWeight?: string | null | undefined
  labelFontSize?: number | string | null | undefined
  labelLineHeight?: number | string | null | undefined
  labelColor?: string | null | undefined
  gapLabelValue?: number | string | null | undefined
  gapValueHint?: number | string | null | undefined
  siblingsGapHorizontal?: number | string | null | undefined
  siblingsGapVertical?: number | string | null | undefined
  valueFontFamily?: string | null | undefined
  valueFontWeight?: string | null | undefined
  valueFontSize?: number | string | null | undefined
  valueLineHeight?: number | string | null | undefined
  valueColor?: string | null | undefined
  hintFontFamily?: string | null | undefined
  hintFontWeight?: string | null | undefined
  hintFontSize?: number | string | null | undefined
  hintLineHeight?: number | string | null | undefined
  hintColor?: string | null | undefined
}
export type LabeledValueStyleFinal = LabeledValueStyleRoot
export type LabeledValueDefaultAs = 'div'
export type LabeledValueMainProps<TAs extends As = LabeledValueDefaultAs> = {
  as?: TAs
  label?: React.ReactNode
  value?: React.ReactNode
  hint?: React.ReactNode
  $style?: LabeledValueStyleRoot
}
export type LabeledValuePropsWithRef<TAs extends As = LabeledValueDefaultAs> = LabeledValueMainProps<TAs> &
  AsPropsWithRef<TAs>
export type LabeledValuePropsWithoutRef<TAs extends As = LabeledValueDefaultAs> = WithoutRef<
  LabeledValuePropsWithRef<TAs>
>
export type LabeledValueType = <TAs extends As = LabeledValueDefaultAs>(
  props: LabeledValuePropsWithRef<TAs>
) => React.ReactNode

const getLabeledValueFinalCss = ($sf: LabeledValueStyleFinal) => {
  return css`
    display: flex;
    flex-flow: column nowrap;

    & > ${LabelS} {
      ${toCss({
        fontFamily: $sf.labelFontFamily,
        fontWeight: $sf.labelFontWeight,
        fontSize: $sf.labelFontSize,
        lineHeight: $sf.labelLineHeight,
        color: $sf.labelColor,
        marginBottom: $sf.gapLabelValue,
      })}
    }

    & > ${ValueS} {
      ${toCss({
        fontFamily: $sf.valueFontFamily,
        fontWeight: $sf.valueFontWeight,
        fontSize: $sf.valueFontSize,
        lineHeight: $sf.valueLineHeight,
        color: $sf.valueColor,
      })}
    }

    & > ${HintS} {
      ${toCss({
        marginTop: $sf.gapValueHint,
        fontFamily: $sf.hintFontFamily,
        fontWeight: $sf.hintFontWeight,
        fontSize: $sf.hintFontSize,
        lineHeight: $sf.hintLineHeight,
        color: $sf.hintColor,
      })}
    }
  `
}

const LabelS = styled.div.attrs(mark('LabelS'))``
const ValueS = styled.div.attrs(mark('ValueS'))``
const HintS = styled.div.attrs(mark('HintS'))``
const LabeledValueS = styled.div.attrs(mark('LabeledValueS'))<{ $sf: LabeledValueStyleFinal }>`
  ${({ $sf }) => getLabeledValueFinalCss($sf)}
`

export const LabeledValue: LabeledValueType = forwardRefIgnoreTypes(
  ({ $style = {}, label, value, hint, ...restProps }: LabeledValuePropsWithoutRef, ref: any) => {
    const $sf: LabeledValueStyleFinal = {
      ...$style,
    }
    return (
      <LabeledValueS {...restProps} ref={ref} $sf={$sf}>
        {!isNil(label) && <LabelS>{label}</LabelS>}
        {!isNil(value) && <ValueS>{value}</ValueS>}
        {!isNil(hint) && <HintS>{hint}</HintS>}
      </LabeledValueS>
    )
  }
)

const LabeledValuesS = styled.div.attrs(mark('LabeledValuesS'))<{ $sf: LabeledValuesStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: $sf.direction === 'row' ? 'row wrap' : 'column nowrap',
      gap: '20px',
    })}

    & > ${LabeledValueS} {
    }
  `}
`
type ItemFull = {
  label: React.ReactNode
  value: React.ReactNode
  hint?: React.ReactNode
}
type ItemShort = [React.ReactNode, React.ReactNode, React.ReactNode?]
type ItemAny = ItemFull | ItemShort
export type LabeledValuesItem = ItemAny | null | false | undefined
type ValuesEmptyPolicy = 'replace' | 'hide'
export type LabeledValuesStyleFinal = {
  direction: 'row' | 'column'
}
export type LabeledValuesDefaultAs = 'div'
export type LabeledValuesMainProps<TAs extends As = LabeledValuesDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  children?: React.ReactNode
  items?: LabeledValuesItem[]
  valuesEmptyPolicy?: ValuesEmptyPolicy
  valuesEmptyReplacer?: React.ReactNode
  valuesTrueReplacer?: React.ReactNode
  valuesFalseReplacer?: React.ReactNode
  $style?: LabeledValueStyleRoot
}
export type LabeledValuesPropsWithRef<TAs extends As = LabeledValuesDefaultAs> = LabeledValuesMainProps<TAs> &
  AsPropsWithRef<TAs>
export type LabeledValuesPropsWithoutRef<TAs extends As = LabeledValuesDefaultAs> = WithoutRef<
  LabeledValuesPropsWithRef<TAs>
>
export type LabeledValuesType = <TAs extends As = LabeledValuesDefaultAs>(
  props: LabeledValuesPropsWithRef<TAs>
) => React.ReactNode
export const LabeledValues: LabeledValuesType = forwardRefIgnoreTypes(
  (
    {
      direction = 'row',
      children,
      valuesEmptyPolicy = 'replace',
      valuesEmptyReplacer = '—',
      valuesFalseReplacer = '❌',
      valuesTrueReplacer = '✅',
      items,
      ...restProps
    }: LabeledValuesPropsWithoutRef,
    ref: any
  ) => {
    const $sf: LabeledValuesStyleFinal = {
      direction,
    }
    children = !items
      ? children || null
      : items
          .map((item, i) => {
            if (!item) {
              return null
            }
            const { label, value, hint } = (() => {
              if (Array.isArray(item)) {
                return { label: item[0], value: item[1], hint: item[2] }
              } else {
                return {
                  label: item.label,
                  value: item.value,
                  hint: item.hint,
                }
              }
            })()
            const isValueEmpty = value === null || value === undefined || value === ''
            if (isValueEmpty && valuesEmptyPolicy === 'hide') {
              return null
            }
            const nonEmptyValue = isValueEmpty ? valuesEmptyReplacer : value
            const nonBooleanValue =
              typeof nonEmptyValue === 'boolean'
                ? nonEmptyValue
                  ? valuesTrueReplacer
                  : valuesFalseReplacer
                : nonEmptyValue
            return <LabeledValue key={i} label={label} value={nonBooleanValue} hint={hint} {...(restProps as {})} />
          })
          .filter(Boolean)
    return (
      <LabeledValuesS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </LabeledValuesS>
    )
  }
)
