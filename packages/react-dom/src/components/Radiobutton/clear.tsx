import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type RadiobuttonStyleRoot = {
  disabled?: boolean
}
export type RadiobuttonStyleFinal = RadiobuttonStyleRoot
export type RadiobuttonDefaultAs = 'div'
export type RadiobuttonMainProps<TAs extends As = RadiobuttonDefaultAs> = {
  as?: TAs
  label?: React.ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  $style?: RadiobuttonStyleRoot
}
export type RadiobuttonPropsWithRef<TAs extends As = RadiobuttonDefaultAs> = RadiobuttonMainProps<TAs> &
  AsPropsWithRef<TAs>
export type RadiobuttonPropsWithoutRef<TAs extends As = RadiobuttonDefaultAs> = WithoutRef<RadiobuttonPropsWithRef<TAs>>
export type RadiobuttonType = <TAs extends As = RadiobuttonDefaultAs>(
  props: RadiobuttonPropsWithRef<TAs>
) => React.ReactNode

// const getRadiobuttonCoreCss = ($sf: RadiobuttonStyleFinal) => {
const getRadiobuttonCoreCss = ($sf: RadiobuttonStyleFinal) => {
  return css`
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-flow: row nowrap;
    gap: 6px;
    ${toCss({
      // width: $sf?.width,
      // height: $sf?.height,
      // background: $sf?.background,
    })}

    ${$sf.disabled && toCss({ opacity: 0.5, pointerEvents: 'none' })}

    & ${RadiobuttonInputS} {
      ${toCss({
        // width: $sf?.width,
        // height: $sf?.height,
        // background: $sf?.childrenBackground,
      })}
    }

    & ${RadiobuttonLabelS} {
      ${toCss({
        // width: $sf?.width,
        // height: $sf?.height,
        // background: $sf?.childrenBackground,
      })}
    }
  `
}
const getRadiobuttonFinalCss = ($sf: RadiobuttonStyleFinal) => {
  return css`
    ${getRadiobuttonCoreCss($sf)}
  `
}

const RadiobuttonInputS = styled.input.attrs(mark('RadiobuttonInputS'))``
const RadiobuttonLabelS = styled.div.attrs(mark('RadiobuttonLabelS'))``
const RadiobuttonS = styled.label.attrs(mark('RadiobuttonS'))<{ $sf: RadiobuttonStyleFinal }>`
  ${({ $sf }) => getRadiobuttonFinalCss($sf)}
`

export const Radiobutton: RadiobuttonType = forwardRefIgnoreTypes(
  ({ $style = {}, label, checked, disabled, onChange, ...restProps }: RadiobuttonPropsWithoutRef, ref: any) => {
    const $sf: RadiobuttonStyleFinal = {
      ...$style,
      disabled: !!disabled,
    }
    return (
      <RadiobuttonS {...restProps} ref={ref} $sf={$sf}>
        <RadiobuttonInputS disabled={disabled} checked={checked} type="radio" onChange={onChange} />
        <RadiobuttonLabelS>{label}</RadiobuttonLabelS>
      </RadiobuttonS>
    )
  }
)

const RadiobuttonsS = styled.div.attrs(mark('RadiobuttonsS'))<{ $sf: RadiobuttonsStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: '10px',
    })}

    ${$sf.disabled && toCss({ opacity: 0.5, pointerEvents: 'none' })}

    & > ${RadiobuttonS} {
    }
  `}
`
export type RadiobuttonsStyleFinal = {
  direction: 'row' | 'column'
  disabled: boolean
}
export type RadiobuttonsDefaultAs = 'div'
export type RadiobuttonsMainProps<TAs extends As = RadiobuttonsDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  disabled?: boolean
  children?: React.ReactNode
}
export type RadiobuttonsPropsWithRef<TAs extends As = RadiobuttonsDefaultAs> = RadiobuttonsMainProps<TAs> &
  AsPropsWithRef<TAs>
export type RadiobuttonsPropsWithoutRef<TAs extends As = RadiobuttonsDefaultAs> = WithoutRef<
  RadiobuttonsPropsWithRef<TAs>
>
export type RadiobuttonsType = <TAs extends As = RadiobuttonsDefaultAs>(
  props: RadiobuttonsPropsWithRef<TAs>
) => React.ReactNode
export const Radiobuttons: RadiobuttonsType = forwardRefIgnoreTypes(
  ({ direction, children, disabled, ...restProps }: RadiobuttonsPropsWithoutRef, ref: any) => {
    const $sf: RadiobuttonsStyleFinal = {
      direction: direction ?? 'column',
      disabled: !!disabled,
    }
    return (
      <RadiobuttonsS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </RadiobuttonsS>
    )
  }
)
