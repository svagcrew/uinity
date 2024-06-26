import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
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
export type ButtonStyleFinal = Required<ButtonStyleStates>
export type ButtonDefaultAs = 'button'
export type ButtonMainProps<TAs extends As = ButtonDefaultAs> = {
  as?: TAs
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  iconStart?: JSX.Element | null | false
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
    ${getButtonCoreCss($sf.rest)}

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
  ({ iconStart, children, $style = {}, ...restProps }: ButtonPropsWithoutRef, ref: any) => {
    const $sf: ButtonStyleFinal = {
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
      <ButtonS {...(restProps as {})} ref={ref} $sf={$sf}>
        {iconStart && <IconS src={iconStart} />}
        <ContentS>{children}</ContentS>
      </ButtonS>
    )
  }
)
