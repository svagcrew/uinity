import type { ButtonStyleCoreClear, ButtonStyleRootClear } from '@/components/button/config.js'
import { getIconCoreCss, Icon, type IconClearSrc } from '@/components/icon/react.clear.js'
import { syncRefs, type As, type AsPropsWithRef, type WithoutRef } from '@/lib/asRef.js'
import { getBySizeCss } from '@/lib/bySize.js'
import { getGetClassName, mark } from '@/lib/classes.js'
import { toCss } from '@/lib/css.js'
import { forwardRef } from 'react'
import { css, styled } from 'styled-components'

// Props for real style generation
export type ButtonClearStyleFinal = ButtonStyleRootClear & {
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
  $style?: ButtonStyleRootClear
  children?: React.ReactNode
}

// Rest types
export type ButtonClearPropsWithRef<TAs extends As = ButtonDefaultAs> = ButtonClearMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonClearPropsWithoutRef<TAs extends As = ButtonDefaultAs> = WithoutRef<ButtonClearPropsWithRef<TAs>>
export type ButtonClearType = <TAs extends As = ButtonDefaultAs>(props: ButtonClearPropsWithRef<TAs>) => React.ReactNode

// Css for one of states
const getButtonCoreCss = (sc: ButtonStyleCoreClear | undefined | null) => {
  sc ||= {}
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
      ${getIconCoreCss({
        color: sc.iconColor,
        size: sc.iconSize,
      })}
    }
  `
}

// Final css
const getButtonFinalCssBase = ($sf: ButtonClearStyleFinal) => {
  return css`
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
    }
  `
}
const getButtonFinalCss = ($sf: ButtonClearStyleFinal) => {
  return css`
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    user-select: none;
    font-weight: bold;
    font-size: 16px;

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

    &:disabled,
    &[disabled] {
      pointer-events: none;
    }

    ${getButtonFinalCssBase($sf)}
    ${getBySizeCss({ $sf, getCssBase: getButtonFinalCssBase })}
  `
}

// TODO: Выпилить не нужные генерики из конфига, раз валидацией конфига занимается расширение
// TODO: Разделить конфиг с переменными и готовый конфиг. Собирать конфиг по команде из скрипта
// TODO: add uinity config foxy validator

// TODO: В юнити сделать комплекс поле конфига
// TODO: К иконке добавить вср и передавать вариант иконки из кнопки в иконку
// TODO: add colors modes

// TODO: uinity config provider
// TODO: color mode provider

// TODO: buttons

// TODO: add text component
// TODO: use text component in button

// TODO: create real style props and css button, text, icon

// TODO: add textinput
// TODO: add textarea components

// TODO: make nice import per each component
// TODO: Вынести основные типы функций мерджа

// TODO: create perfect story for clear
// TODO: create perfect story for configured

// TODO: create docs static website
// TODO: generate docs website by components

// TODO: create all difficult components
// TODO: (D) create all simple components
// TODO: (D) add stories for each component

// TODO: standard uinity config: create zod schema, validator and type for

// TODO: vscode ext
// TODO: figma ext
// TODO: ai generator

// TODO: подписка одна на все опенсорсы на сайте свага

// TODO: передавать стили или прямо css для каждого отдельного компонента
// TODO: react-native

// Styled components
const IconS = styled(Icon)``
const ContentS = styled.span.attrs(mark('ContentS'))``
export const ButtonS = styled.button.attrs(mark('ButtonS'))<{ $sf: ButtonClearStyleFinal }>`
  ${({ $sf }) => getButtonFinalCss($sf)}
`

// Component
const { getMainClassName, getSubClassName } = getGetClassName({ componentName: 'button' })
export const Button: ButtonClearType = forwardRef<any, ButtonClearPropsWithoutRef<any>>(
  ({ iconStart, children, disabled, loading, className: providedClassName, $style = {}, ...restProps }, ref) => {
    const $sf: ButtonClearStyleFinal = {
      loading: !!loading,
      ...$style,
    }
    return (
      <ButtonS
        {...restProps}
        className={getMainClassName({ providedClassName })}
        disabled={disabled || loading}
        ref={syncRefs(ref)}
        $sf={$sf}
      >
        {iconStart && (
          <IconS src={iconStart} className={getSubClassName({ subComponentName: 'icon', modKey: 'start' })} />
        )}
        <ContentS className={getSubClassName({ subComponentName: 'content' })}>{children}</ContentS>
      </ButtonS>
    )
  }
)
