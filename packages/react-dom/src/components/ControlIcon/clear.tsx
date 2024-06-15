import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ControlIconStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}
export type ControlIconStyleStates = {
  rest?: ControlIconStyleCore
  hover?: ControlIconStyleCore
  active?: ControlIconStyleCore
  focus?: ControlIconStyleCore
  disabled?: ControlIconStyleCore
  current?: ControlIconStyleCore
}
export type ControlIconStyleRoot = ControlIconStyleStates
export type ControlIconStyleFinal = Required<ControlIconStyleStates> & {
  isCurrent?: boolean
  isDisabled?: boolean
}
export type ControlIconDefaultAs = 'a'
export type ControlIconMainProps<TAs extends As = ControlIconDefaultAs> = {
  as?: TAs
  disabled?: boolean
  current?: boolean
  src: JSX.Element | null | false
  $style?: ControlIconStyleRoot
}
export type ControlIconPropsWithRef<TAs extends As = ControlIconDefaultAs> = ControlIconMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ControlIconPropsWithoutRef<TAs extends As = ControlIconDefaultAs> = WithoutRef<ControlIconPropsWithRef<TAs>>
export type ControlIconType = <TAs extends As = ControlIconDefaultAs>(
  props: ControlIconPropsWithRef<TAs>
) => React.ReactNode

const getControlIconCoreCss = (sc: ControlIconStyleCore) => {
  return css`
    ${toCss({
      background: sc.background,
      color: sc.textColor,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: sc.gapHorizontalAccessoryText,
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
const getControlIconFinalCss = ($sf: ControlIconStyleFinal) => {
  return css`
    cursor: pointer;
    ${getControlIconCoreCss($sf.rest)}

    ${$sf.isDisabled
      ? css`
          ${getControlIconCoreCss($sf.disabled)}
          pointer-events: none;
        `
      : ''}
      
    ${$sf.isCurrent
      ? css`
          ${getControlIconCoreCss($sf.current)}
          pointer-events: none;
        `
      : ''}

    &:hover {
      ${getControlIconCoreCss($sf.hover)}
    }

    &:active {
      ${getControlIconCoreCss($sf.active)}
    }

    &:focus {
      ${getControlIconCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getControlIconCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)<{ $sf: ControlIconStyleFinal }>``
const ContentS = styled.span.attrs(mark('ContentS'))``
const ControlIconS = styled.a.attrs(mark('ControlIconS'))<{ $sf: ControlIconStyleFinal }>`
  ${({ $sf }) => getControlIconFinalCss($sf)}
`

export const ControlIcon: ControlIconType = forwardRefIgnoreTypes(
  ({ src, current, disabled, $style = {}, ...restProps }: ControlIconPropsWithoutRef, ref: any) => {
    const $sf: ControlIconStyleFinal = {
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
      current: {
        ...$style.current,
      },
      isCurrent: current,
      isDisabled: disabled,
    }
    return (
      <ControlIconS {...(restProps as {})} ref={ref} $sf={$sf}>
        <IconS $sf={$sf} src={src} />
      </ControlIconS>
    )
  }
)
