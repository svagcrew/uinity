import { Icon, type IconSrc } from '@/components/Icon/react.clear.js'
import { forwardRefIgnoreTypes, mark, toCss, type As, type AsPropsWithRef, type WithoutRef } from '@/lib/other.js'
import { css, styled } from 'styled-components'

export type ButtonStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}
export type ButtonStyleStates = {
  rest?: ButtonStyleCore
  hover?: ButtonStyleCore
  active?: ButtonStyleCore
  focus?: ButtonStyleCore
  disabled?: ButtonStyleCore
}
export type ButtonStyleRoot = ButtonStyleStates
export type ButtonStyleFinal = Required<ButtonStyleStates> & {
  loading: boolean
}
export type ButtonDefaultAs = 'button'
export type ButtonMainProps<TAs extends As = ButtonDefaultAs> = {
  as?: TAs
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  iconStart?: IconSrc
  $style?: ButtonStyleRoot
  children?: React.ReactNode
}
export type ButtonPropsWithRef<TAs extends As = ButtonDefaultAs> = ButtonMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonPropsWithoutRef<TAs extends As = ButtonDefaultAs> = WithoutRef<ButtonPropsWithRef<TAs>>
export type ButtonType = <TAs extends As = ButtonDefaultAs>(props: ButtonPropsWithRef<TAs>) => React.ReactNode

const getButtonCoreCss = (sc: ButtonStyleCore) => {
  return css`
    ${toCss({
      background: sc.background,
      color: sc.textColor,
      minHeight: sc.minHeight,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sc.gapHorizontalAccessoryText,
      padding: '3px 10px',
      border: 'none',
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
const getButtonFinalCss = ($sf: ButtonStyleFinal) => {
  return css`
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    user-select: none;
    font-weight: bold;
    font-size: 16px;
    ${getButtonCoreCss($sf.rest)}

    ${$sf.loading
      ? css`
          color: transparent;
          &::before {
            content: 'Loading';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.5);
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
          }
        `
      : ''}

    &:hover {
      ${getButtonCoreCss($sf.hover)}
    }

    &:active {
      ${getButtonCoreCss($sf.active)}
    }

    &:focus {
      ${getButtonCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getButtonCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)``
const ContentS = styled.span``
const ButtonS = styled.button.attrs(mark('ButtonS'))<{ $sf: ButtonStyleFinal }>`
  ${({ $sf }) => getButtonFinalCss($sf)}
`

export const Button: ButtonType = forwardRefIgnoreTypes(
  ({ iconStart, children, disabled, loading, $style = {}, ...restProps }: ButtonPropsWithoutRef, ref: any) => {
    const $sf: ButtonStyleFinal = {
      loading: !!loading,
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
    }
    return (
      <ButtonS {...(restProps as {})} disabled={disabled || loading} ref={ref} $sf={$sf}>
        {iconStart && <IconS src={iconStart} />}
        <ContentS>{children}</ContentS>
      </ButtonS>
    )
  }
)

const ButtonsS = styled.div.attrs(mark('ButtonsS'))<{ $sf: ButtonsStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: '10px',
    })}

    ${$sf.disabled && toCss({ opacity: 0.5, pointerEvents: 'none' })}

    & > ${ButtonS} {
    }
  `}
`
export type ButtonsStyleFinal = {
  direction: 'row' | 'column'
  disabled: boolean
}
export type ButtonsDefaultAs = 'div'
export type ButtonsMainProps<TAs extends As = ButtonsDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  disabled?: boolean
  children?: React.ReactNode
}
export type ButtonsPropsWithRef<TAs extends As = ButtonsDefaultAs> = ButtonsMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonsPropsWithoutRef<TAs extends As = ButtonsDefaultAs> = WithoutRef<ButtonsPropsWithRef<TAs>>
export type ButtonsType = <TAs extends As = ButtonsDefaultAs>(props: ButtonsPropsWithRef<TAs>) => React.ReactNode
export const Buttons: ButtonsType = forwardRefIgnoreTypes(
  ({ direction, children, disabled, ...restProps }: ButtonsPropsWithoutRef, ref: any) => {
    const $sf: ButtonsStyleFinal = {
      direction: direction ?? 'row',
      disabled: !!disabled,
    }
    return (
      <ButtonsS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </ButtonsS>
    )
  }
)
