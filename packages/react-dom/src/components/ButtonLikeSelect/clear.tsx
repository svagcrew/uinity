import type { IconSrc } from '@/components/Icon/clear.js'
import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ButtonLikeSelectStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}
export type ButtonLikeSelectStyleStates = {
  rest?: ButtonLikeSelectStyleCore
  hover?: ButtonLikeSelectStyleCore
  active?: ButtonLikeSelectStyleCore
  focus?: ButtonLikeSelectStyleCore
  disabled?: ButtonLikeSelectStyleCore
}
export type ButtonLikeSelectStyleRoot = ButtonLikeSelectStyleStates
export type ButtonLikeSelectStyleFinal = Required<ButtonLikeSelectStyleStates>
export type ButtonLikeSelectDefaultAs = 'button'
export type ButtonLikeSelectMainProps<TAs extends As = ButtonLikeSelectDefaultAs> = {
  as?: TAs
  disabled?: boolean
  iconStart?: IconSrc
  dropdownIconSrc?: IconSrc
  $style?: ButtonLikeSelectStyleRoot
  children?: React.ReactNode
}
export type ButtonLikeSelectPropsWithRef<TAs extends As = ButtonLikeSelectDefaultAs> = ButtonLikeSelectMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ButtonLikeSelectPropsWithoutRef<TAs extends As = ButtonLikeSelectDefaultAs> = WithoutRef<
  ButtonLikeSelectPropsWithRef<TAs>
>
export type ButtonLikeSelectType = <TAs extends As = ButtonLikeSelectDefaultAs>(
  props: ButtonLikeSelectPropsWithRef<TAs>
) => React.ReactNode

const getButtonLikeSelectCoreCss = (sc: ButtonLikeSelectStyleCore) => {
  return css`
    ${toCss({
      // background: sc.background,
      // color: sc.textColor,
      minHeight: sc.minHeight,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      // gap: sc.gapHorizontalAccessoryText,
      gap: 6,
      padding: '3px 10px',
      // border: 'none',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
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
          // fill: sc.iconColor,
          fill: '#888',
        })}
      }
    }
  `
}
const getButtonLikeSelectFinalCss = ($sf: ButtonLikeSelectStyleFinal) => {
  return css`
    cursor: pointer;
    ${getButtonLikeSelectCoreCss($sf.rest)}

    &:hover {
      ${getButtonLikeSelectCoreCss($sf.hover)}
    }

    &:active {
      ${getButtonLikeSelectCoreCss($sf.active)}
    }

    &:focus {
      ${getButtonLikeSelectCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getButtonLikeSelectCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)``
const ContentS = styled.span``
const ButtonLikeSelectS = styled.button.attrs(mark('ButtonLikeSelectS'))<{ $sf: ButtonLikeSelectStyleFinal }>`
  ${({ $sf }) => getButtonLikeSelectFinalCss($sf)}
`

export const ButtonLikeSelect: ButtonLikeSelectType = forwardRefIgnoreTypes(
  ({ iconStart, dropdownIconSrc, children, $style = {}, ...restProps }: ButtonLikeSelectPropsWithoutRef, ref: any) => {
    const $sf: ButtonLikeSelectStyleFinal = {
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
      <ButtonLikeSelectS {...(restProps as {})} ref={ref} $sf={$sf}>
        {iconStart && <IconS src={iconStart} />}
        <ContentS>{children}</ContentS>
        <IconS src={dropdownIconSrc} />
      </ButtonLikeSelectS>
    )
  }
)
