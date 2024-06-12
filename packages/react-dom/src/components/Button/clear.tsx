import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, AsRef, RCWithAsAndForwardedRef } from '@/utils.js'
import { forwardRefWithTypes, mark } from '@/utils.js'
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
export type ButtonStyleRootProps = {
  rest?: ButtonStyleCoreProps
  hover?: ButtonStyleCoreProps
  active?: ButtonStyleCoreProps
  focus?: ButtonStyleCoreProps
  disabled?: ButtonStyleCoreProps
}
export type ButtonStyleSpecialProps = {
  isDisabled?: boolean
}
export type ButtonStyleProps = ButtonStyleRootProps & ButtonStyleSpecialProps
export type ButtonMainProps<TAs extends As> = {
  as?: TAs
  disabled?: boolean
  iconStart?: JSX.Element | null | false
  $style?: ButtonStyleProps
}
export type ButtonPropsWithRef<TAs extends As> = ButtonMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonType<TAs extends As = 'button'> = RCWithAsAndForwardedRef<ButtonPropsWithRef<TAs>>

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
const ButtonS = styled.button.attrs(mark('ButtonS'))<{ $style: ButtonStyleProps }>`
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

export const Button = forwardRefWithTypes(
  <TAs extends As>(
    { iconStart, children, $style = {}, as, disabled, ...restProps }: ButtonPropsWithRef<TAs>,
    ref: AsRef<TAs>
  ) => {
    return (
      <ButtonS
        $style={{ ...$style, isDisabled: disabled ?? $style.isDisabled }}
        as={as}
        ref={ref as any}
        disabled={disabled}
        {...(restProps as any)}
      >
        {iconStart && <IconS src={iconStart} />}
        {children}
      </ButtonS>
    )
  }
)
