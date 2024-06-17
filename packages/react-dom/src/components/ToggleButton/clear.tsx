import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ToggleButtonStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  borderColor?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
  isChecked?: boolean
}
export type ToggleButtonStyleStates = {
  rest?: ToggleButtonStyleCore
  hover?: ToggleButtonStyleCore
  active?: ToggleButtonStyleCore
  focus?: ToggleButtonStyleCore
  disabled?: ToggleButtonStyleCore
  checked?: ToggleButtonStyleCore
}
export type ToggleButtonStyleRoot = ToggleButtonStyleStates & {
  isChecked?: boolean
}
export type ToggleButtonStyleFinal = Required<ToggleButtonStyleStates> & {
  isChecked: boolean
}
export type ToggleButtonDefaultAs = 'button'
export type ToggleButtonMainProps<TAs extends As = ToggleButtonDefaultAs> = {
  as?: TAs
  checked?: boolean
  disabled?: boolean
  iconStart?: JSX.Element | null | false
  $style?: ToggleButtonStyleRoot
  children?: React.ReactNode
}
export type ToggleButtonPropsWithRef<TAs extends As = ToggleButtonDefaultAs> = ToggleButtonMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ToggleButtonPropsWithoutRef<TAs extends As = ToggleButtonDefaultAs> = WithoutRef<
  ToggleButtonPropsWithRef<TAs>
>
export type ToggleButtonType = <TAs extends As = ToggleButtonDefaultAs>(
  props: ToggleButtonPropsWithRef<TAs>
) => React.ReactNode

const getToggleButtonCoreCss = (sc: ToggleButtonStyleCore) => {
  return css`
    ${toCss({
      background: sc.background,
      color: sc.textColor,
      minHeight: sc.minHeight,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      // gap: sc.gapHorizontalAccessoryText,
      gap: 6,
      padding: '3px 10px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: sc.borderColor,
      borderRadius: '5px',
    })}

    & ${ContentS} {
      margin-bottom: -3px;
    }

    & ${IconS} {
      ${toCss({
        width: sc.iconSize,
        height: sc.iconSize,
      })}

      path {
        ${toCss({
          fill: sc.iconColor,
        })}
      }
    }
  `
}
const getToggleButtonFinalCss = ($sf: ToggleButtonStyleFinal) => {
  return css`
    cursor: pointer;
    ${getToggleButtonCoreCss($sf.rest)}
    ${$sf.isChecked
      ? css`
          ${getToggleButtonCoreCss($sf.checked)}
          z-index: 1;
          pointer-events: none;
          position: relative;
        `
      : ''}

    &:hover {
      ${getToggleButtonCoreCss($sf.hover)}
    }

    &:active {
      ${getToggleButtonCoreCss($sf.active)}
    }

    &:focus {
      ${getToggleButtonCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getToggleButtonCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)``
const ContentS = styled.span``
const ToggleButtonS = styled.button.attrs(mark('ToggleButtonS'))<{ $sf: ToggleButtonStyleFinal }>`
  ${({ $sf }) => getToggleButtonFinalCss($sf)}
`

export const ToggleButton: ToggleButtonType = forwardRefIgnoreTypes(
  ({ iconStart, children, checked, $style = {}, ...restProps }: ToggleButtonPropsWithoutRef, ref: any) => {
    const $sf: ToggleButtonStyleFinal = {
      rest: {
        ...$style.rest,
      },
      hover: {
        ...$style.hover,
      },
      active: {
        ...$style.active,
      },
      focus: {
        ...$style.focus,
      },
      disabled: {
        ...$style.disabled,
      },
      checked: {
        ...$style.checked,
      },
      isChecked: !!checked,
    }
    return (
      <ToggleButtonS {...(restProps as {})} ref={ref} $sf={$sf}>
        {iconStart && <IconS src={iconStart} />}
        <ContentS>{children}</ContentS>
      </ToggleButtonS>
    )
  }
)

const ToggleButtonsS = styled.div.attrs(mark('ToggleButtonsS'))<{ $sf: ToggleButtonsStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: $sf.condensed ? '0' : '10px',
    })}

    & > ${ToggleButtonS} {
      ${$sf.condensed
        ? css`
            &:not(:first-child) {
              ${$sf.direction === 'row' ? toCss({ marginLeft: '-1px' }) : toCss({ marginTop: '-1px' })}
            }
            &:not(:last-child) {
              border-bottom-right-radius: 0;
              border-top-right-radius: 0;
            }
            &:not(:first-child) {
              border-bottom-left-radius: 0;
              border-top-left-radius: 0;
            }
          `
        : css``}
    }
  `}
`
export type ToggleButtonsStyleFinal = {
  direction: 'row' | 'column'
  condensed: boolean
}
export type ToggleButtonsDefaultAs = 'div'
export type ToggleButtonsMainProps<TAs extends As = ToggleButtonsDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  condensed?: boolean
  children?: React.ReactNode
}
export type ToggleButtonsPropsWithRef<TAs extends As = ToggleButtonsDefaultAs> = ToggleButtonsMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ToggleButtonsPropsWithoutRef<TAs extends As = ToggleButtonsDefaultAs> = WithoutRef<
  ToggleButtonsPropsWithRef<TAs>
>
export type ToggleButtonsType = <TAs extends As = ToggleButtonsDefaultAs>(
  props: ToggleButtonsPropsWithRef<TAs>
) => React.ReactNode
export const ToggleButtons: ToggleButtonsType = forwardRefIgnoreTypes(
  ({ direction, children, condensed, ...restProps }: ToggleButtonsPropsWithoutRef, ref: any) => {
    const $sf: ToggleButtonsStyleFinal = {
      direction: direction ?? 'row',
      condensed: !!condensed,
    }
    return (
      <ToggleButtonsS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </ToggleButtonsS>
    )
  }
)
