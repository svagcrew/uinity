import { Icon, type IconSrc } from '@/components/Icon/react.clear.js'
import { mark, syncRefs, toCss, type As, type AsPropsWithRef, type WithoutRef } from '@/lib/other.js'
import { forwardRef } from 'react'
import { css, styled } from 'styled-components'

// Type for each state in $style prop
export type ButtonStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}

// Type for part of $style prop based on states
export type ButtonStyleStates = {
  rest?: ButtonStyleCore
  hover?: ButtonStyleCore
  active?: ButtonStyleCore
  focus?: ButtonStyleCore
  disabled?: ButtonStyleCore
}

// Type for $style prop
export type ButtonStyleRoot = ButtonStyleStates

// Props for real style generation
export type ButtonStyleFinal = Required<ButtonStyleStates> & {
  loading: boolean
}

// Component props
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

// Rest types
export type ButtonPropsWithRef<TAs extends As = ButtonDefaultAs> = ButtonMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonPropsWithoutRef<TAs extends As = ButtonDefaultAs> = WithoutRef<ButtonPropsWithRef<TAs>>
export type ButtonType = <TAs extends As = ButtonDefaultAs>(props: ButtonPropsWithRef<TAs>) => React.ReactNode

// Css for one of states
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

// Final css
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

// TODO: add global classes to each styled component and remove mark
// TODO: make nice import per each component
// TODO: add stories for each component
// TODO: add text component
// TODO: create real style props and css for each component
// TODO: add configured compnents
// TODO: add colors and texts configs
// TODO: add textinput
// TODO: add textareac components
// TODO: ws, wsr, cs, csr everywhere

// TODO: create docs static website
// TODO: generate docs website by components
// TODO: create zod schema and type for common uinity config

// Styled components
const IconS = styled(Icon)``
const ContentS = styled.span``
export const ButtonS = styled.button.attrs(mark('ButtonS'))<{ $sf: ButtonStyleFinal }>`
  ${({ $sf }) => getButtonFinalCss($sf)}
`

// Component
export const Button: ButtonType = forwardRef<any, ButtonPropsWithoutRef<any>>(
  ({ iconStart, children, disabled, loading, $style = {}, ...restProps }, ref) => {
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
      <ButtonS {...restProps} disabled={disabled || loading} ref={syncRefs(ref)} $sf={$sf}>
        {iconStart && <IconS src={iconStart} />}
        <ContentS>{children}</ContentS>
      </ButtonS>
    )
  }
)
