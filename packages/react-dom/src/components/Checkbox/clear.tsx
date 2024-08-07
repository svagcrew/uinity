import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type CheckboxStyleRoot = {
  disabled?: boolean
}
export type CheckboxStyleFinal = CheckboxStyleRoot
export type CheckboxDefaultAs = 'div'
export type CheckboxMainProps<TAs extends As = CheckboxDefaultAs> = {
  as?: TAs
  label?: React.ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  $style?: CheckboxStyleRoot
}
export type CheckboxPropsWithRef<TAs extends As = CheckboxDefaultAs> = CheckboxMainProps<TAs> & AsPropsWithRef<TAs>
export type CheckboxPropsWithoutRef<TAs extends As = CheckboxDefaultAs> = WithoutRef<CheckboxPropsWithRef<TAs>>
export type CheckboxType = <TAs extends As = CheckboxDefaultAs>(props: CheckboxPropsWithRef<TAs>) => React.ReactNode

const getCheckboxCoreCss = ($sf: CheckboxStyleFinal) => {
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

    & ${CheckboxInputS} {
      ${toCss({
        // width: $sf?.width,
        // height: $sf?.height,
        // background: $sf?.childrenBackground,
      })}
    }

    & ${CheckboxLabelS} {
      ${toCss({
        // width: $sf?.width,
        // height: $sf?.height,
        // background: $sf?.childrenBackground,
      })}
    }
  `
}
const getCheckboxFinalCss = ($sf: CheckboxStyleFinal) => {
  return css`
    ${getCheckboxCoreCss($sf)}
  `
}

const CheckboxInputS = styled.input.attrs(mark('CheckboxInputS'))``
const CheckboxLabelS = styled.div.attrs(mark('CheckboxLabelS'))``
const CheckboxS = styled.label.attrs(mark('CheckboxS'))<{ $sf: CheckboxStyleFinal }>`
  ${({ $sf }) => getCheckboxFinalCss($sf)}
`

export const Checkbox: CheckboxType = forwardRefIgnoreTypes(
  ({ $style = {}, disabled, label, checked, onChange, ...restProps }: CheckboxPropsWithoutRef, ref: any) => {
    const $sf: CheckboxStyleFinal = {
      ...$style,
      disabled: !!disabled,
    }
    return (
      <CheckboxS {...restProps} ref={ref} $sf={$sf}>
        <CheckboxInputS checked={checked} type="checkbox" disabled={disabled} onChange={onChange} />
        <CheckboxLabelS>{label}</CheckboxLabelS>
      </CheckboxS>
    )
  }
)

const CheckboxesS = styled.div.attrs(mark('CheckboxesS'))<{ $sf: CheckboxesStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: '10px',
    })}

    & > ${CheckboxS} {
    }
  `}
`
export type CheckboxesStyleFinal = {
  direction: 'row' | 'column'
  disabled: boolean
}
export type CheckboxesDefaultAs = 'div'
export type CheckboxesMainProps<TAs extends As = CheckboxesDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  disabled?: boolean
  children?: React.ReactNode
}
export type CheckboxesPropsWithRef<TAs extends As = CheckboxesDefaultAs> = CheckboxesMainProps<TAs> &
  AsPropsWithRef<TAs>
export type CheckboxesPropsWithoutRef<TAs extends As = CheckboxesDefaultAs> = WithoutRef<CheckboxesPropsWithRef<TAs>>
export type CheckboxesType = <TAs extends As = CheckboxesDefaultAs>(
  props: CheckboxesPropsWithRef<TAs>
) => React.ReactNode
export const Checkboxes: CheckboxesType = forwardRefIgnoreTypes(
  ({ direction, disabled, children, ...restProps }: CheckboxesPropsWithoutRef, ref: any) => {
    const $sf: CheckboxesStyleFinal = {
      direction: direction ?? 'column',
      disabled: !!disabled,
    }
    return (
      <CheckboxesS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </CheckboxesS>
    )
  }
)
