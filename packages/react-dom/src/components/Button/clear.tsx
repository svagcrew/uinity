import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ButtonStyleCoreProps = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}
export type ButtonStyleStatesProps = {
  rest?: ButtonStyleCoreProps
  hover?: ButtonStyleCoreProps
  active?: ButtonStyleCoreProps
  focus?: ButtonStyleCoreProps
  disabled?: ButtonStyleCoreProps
}
export type ButtonStyleModificatorsProps = {
  isDisabled?: boolean
}
export type ButtonStyleRootProps = ButtonStyleStatesProps & ButtonStyleModificatorsProps
export type ButtonDefaultAs = 'button'
export type ButtonMainProps<TAs extends As = ButtonDefaultAs> = {
  as?: TAs
  disabled?: boolean
  iconStart?: JSX.Element | null | false
  $style?: ButtonStyleRootProps
  children?: React.ReactNode
}
export type ButtonPropsWithRef<TAs extends As = ButtonDefaultAs> = ButtonMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonPropsWithoutRef<TAs extends As = ButtonDefaultAs> = WithoutRef<ButtonPropsWithRef<TAs>>
export type ButtonType = <TAs extends As = ButtonDefaultAs>(props: ButtonPropsWithRef<TAs>) => React.ReactNode

const getButtonCoreCss = (scp?: ButtonStyleCoreProps) => {
  return css`
    ${toCss({
      background: scp?.background,
      color: scp?.textColor,
      minHeight: scp?.minHeight,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: scp?.gapHorizontalAccessoryText,
    })}

    & ${IconS} {
      ${toCss({
        width: scp?.iconSize,
        height: scp?.iconSize,
      })}

      path {
        ${toCss({
          fill: scp?.iconColor,
        })}
      }
    }
  `
}

const IconS = styled(Icon)``
const ButtonS = styled.button.attrs(mark('ButtonS'))<{ $style: ButtonStyleRootProps }>`
  ${({ $style }) => {
    if ($style.isDisabled) {
      return css`
        ${getButtonCoreCss({ ...$style, ...$style.rest, ...$style.disabled })}
        pointer-events: none;
      `
    } else {
      return css`
        ${getButtonCoreCss($style.rest)}
        cursor: pointer;

        &:hover {
          ${getButtonCoreCss($style.hover)}
        }

        &:active {
          ${getButtonCoreCss($style.active)}
        }

        &:focus {
          ${getButtonCoreCss($style.focus)}
        }

        &:disabled {
          ${getButtonCoreCss($style.disabled)}
          pointer-events: none;
        }
      `
    }
  }}
`

export const Button: ButtonType = forwardRefIgnoreTypes(
  ({ iconStart, children, $style = {}, disabled, ...restProps }: ButtonPropsWithoutRef, ref: any) => {
    return (
      <ButtonS
        {...(restProps as {})}
        $style={{ ...$style, isDisabled: disabled ?? $style.isDisabled }}
        ref={ref}
        disabled={disabled}
      >
        {iconStart && <IconS src={iconStart} />}
        {children}
      </ButtonS>
    )
  }
)
