import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type FormItemStyleRoot = {
  labelFontFamily?: string | null | undefined
  labelFontWeight?: string | null | undefined
  labelFontSize?: number | string | null | undefined
  labelLineHeight?: number | string | null | undefined
  labelColor?: string | null | undefined
  gapLabelContent?: number | string | null | undefined
  gapContentFooter?: number | string | null | undefined
  gapErrorHint?: number | string | null | undefined
  siblingsGapHorizontal?: number | string | null | undefined
  siblingsGapVertical?: number | string | null | undefined
  errorFontFamily?: string | null | undefined
  errorFontWeight?: string | null | undefined
  errorFontSize?: number | string | null | undefined
  errorLineHeight?: number | string | null | undefined
  errorColor?: string | null | undefined
  hintFontFamily?: string | null | undefined
  hintFontWeight?: string | null | undefined
  hintFontSize?: number | string | null | undefined
  hintLineHeight?: number | string | null | undefined
  hintColor?: string | null | undefined
}
export type FormItemStyleFinal = FormItemStyleRoot
export type FormItemDefaultAs = 'div'
export type FormItemMainProps<TAs extends As = FormItemDefaultAs> = {
  as?: TAs
  label?: React.ReactNode
  error?: React.ReactNode
  hint?: React.ReactNode
  children?: React.ReactNode
  $style?: FormItemStyleRoot
}
export type FormItemPropsWithRef<TAs extends As = FormItemDefaultAs> = FormItemMainProps<TAs> & AsPropsWithRef<TAs>
export type FormItemPropsWithoutRef<TAs extends As = FormItemDefaultAs> = WithoutRef<FormItemPropsWithRef<TAs>>
export type FormItemType = <TAs extends As = FormItemDefaultAs>(props: FormItemPropsWithRef<TAs>) => React.ReactNode

const getFormItemFinalCss = ($sf: FormItemStyleFinal) => {
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
        marginBottom: $sf.gapLabelContent,
      })}
    }

    & > ${ContentS} {
      display: flex;
      flex-flow: column nowrap;
    }

    & > ${FooterS} {
      ${toCss({
        marginTop: $sf.gapContentFooter,
      })}

      & > ${ErrorS} {
        ${toCss({
          fontFamily: $sf.errorFontFamily,
          fontWeight: $sf.errorFontWeight,
          fontSize: $sf.errorFontSize,
          lineHeight: $sf.errorLineHeight,
          color: $sf.errorColor,
        })}
      }

      & > ${HintS} {
        ${toCss({
          fontFamily: $sf.hintFontFamily,
          fontWeight: $sf.hintFontWeight,
          fontSize: $sf.hintFontSize,
          lineHeight: $sf.hintLineHeight,
          color: $sf.hintColor,
        })}
      }
    }
  `
}

const LabelS = styled.div.attrs(mark('LabelS'))``
const ContentS = styled.div.attrs(mark('ContentS'))``
const FooterS = styled.div.attrs(mark('FooterS'))``
const HintS = styled.h1.attrs(mark('HintS'))``
const ErrorS = styled.h1.attrs(mark('ErrorS'))``
const FormItemS = styled.div.attrs(mark('FormItemS'))<{ $sf: FormItemStyleFinal }>`
  ${({ $sf }) => getFormItemFinalCss($sf)}
`

export const FormItem: FormItemType = forwardRefIgnoreTypes(
  ({ $style = {}, label, error, hint, children, ...restProps }: FormItemPropsWithoutRef, ref: any) => {
    const $sf: FormItemStyleFinal = {
      ...$style,
    }
    return (
      <FormItemS {...restProps} ref={ref} $sf={$sf}>
        {label && <LabelS>{label}</LabelS>}
        {children && <ContentS>{children}</ContentS>}
        {(error || hint) && (
          <FooterS>
            {error && <ErrorS>{error}</ErrorS>}
            {hint && <HintS>{hint}</HintS>}
          </FooterS>
        )}
      </FormItemS>
    )
  }
)

const FormItemsS = styled.div.attrs(mark('FormItemsS'))<{ $sf: FormItemsStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'stretch',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: '10px',
    })}

    & > ${FormItemS} {
    }
  `}
`
export type FormItemsStyleFinal = {
  direction: 'row' | 'column'
}
export type FormItemsDefaultAs = 'div'
export type FormItemsMainProps<TAs extends As = FormItemsDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  children?: React.ReactNode
}
export type FormItemsPropsWithRef<TAs extends As = FormItemsDefaultAs> = FormItemsMainProps<TAs> & AsPropsWithRef<TAs>
export type FormItemsPropsWithoutRef<TAs extends As = FormItemsDefaultAs> = WithoutRef<FormItemsPropsWithRef<TAs>>
export type FormItemsType = <TAs extends As = FormItemsDefaultAs>(props: FormItemsPropsWithRef<TAs>) => React.ReactNode
export const FormItems: FormItemsType = forwardRefIgnoreTypes(
  ({ direction, children, ...restProps }: FormItemsPropsWithoutRef, ref: any) => {
    const $sf: FormItemsStyleFinal = {
      direction: direction ?? 'column',
    }
    return (
      <FormItemsS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </FormItemsS>
    )
  }
)
