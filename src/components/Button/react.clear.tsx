import type {
  ButtonStyleCoreClear,
  ButtonStyleRootClearNormalized,
  ButtonStyleRootClearInput,
} from '@/components/Button/config.js'
import { Icon, type IconClearSrc } from '@/components/Icon/react.clear.js'
import { mark, syncRefs, toCss, type As, type AsPropsWithRef, type WithoutRef } from '@/lib/other.js'
import { forwardRef } from 'react'
import { css, styled } from 'styled-components'

// Props for real style generation
export type ButtonClearStyleFinal = ButtonStyleRootClearNormalized & {
  loading: boolean
}

// Component props
export type ButtonDefaultAs = 'button'
export type ButtonClearMainProps<TAs extends As = ButtonDefaultAs> = {
  as?: TAs
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  iconStart?: IconClearSrc
  $style?: ButtonStyleRootClearInput
  children?: React.ReactNode
}

// Rest types
export type ButtonClearPropsWithRef<TAs extends As = ButtonDefaultAs> = ButtonClearMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonClearPropsWithoutRef<TAs extends As = ButtonDefaultAs> = WithoutRef<ButtonClearPropsWithRef<TAs>>
export type ButtonClearType = <TAs extends As = ButtonDefaultAs>(props: ButtonClearPropsWithRef<TAs>) => React.ReactNode

// Css for one of states
const getButtonCoreCss = (sc: ButtonStyleCoreClear) => {
  return css`
    ${toCss({
      backgroundColor: sc.backgroundColor,
      color: sc.textColor,
      fontSize: sc.textSize,
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
const getButtonFinalCss = ($sf: ButtonClearStyleFinal) => {
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

// TODO: reuse Icon css parts
// TODO: Вынести основные типы функций мерджа
// TODO: Сеттинги варианта пусть просто парсятся в сеттинги, а оверрайд пусть просто оверрайдится в долларстайл
// TODO: add global classes to each styled component and remove mark
// TODO: make nice import per each component
// TODO: add stories for each component
// TODO: add text component
// TODO: create real style props and css for each component
// TODO: add configured compnents
// TODO: add colors and texts configs
// TODO: add textinput
// TODO: add textareac components
// TODO: add colors theme
// TODO: ws, wsr, cs, csr everywhere

// TODO: create docs static website
// TODO: generate docs website by components
// TODO: create zod schema and type for common uinity config

// Styled components
const IconS = styled(Icon)``
const ContentS = styled.span``
export const ButtonS = styled.button.attrs(mark('ButtonS'))<{ $sf: ButtonClearStyleFinal }>`
  ${({ $sf }) => getButtonFinalCss($sf)}
`

// Component
export const Button: ButtonClearType = forwardRef<any, ButtonClearPropsWithoutRef<any>>(
  ({ iconStart, children, disabled, loading, $style = {}, ...restProps }, ref) => {
    const $sf: ButtonClearStyleFinal = {
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
