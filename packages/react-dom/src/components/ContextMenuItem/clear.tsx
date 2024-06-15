import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type ContextMenuItemStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}
export type ContextMenuItemStyleStates = {
  rest?: ContextMenuItemStyleCore
  hover?: ContextMenuItemStyleCore
  active?: ContextMenuItemStyleCore
  focus?: ContextMenuItemStyleCore
  disabled?: ContextMenuItemStyleCore
  current?: ContextMenuItemStyleCore
}
export type ContextMenuItemStyleRoot = ContextMenuItemStyleStates
export type ContextMenuItemStyleFinal = Required<ContextMenuItemStyleStates> & {
  isCurrent?: boolean
  isDisabled?: boolean
}
export type ContextMenuItemDefaultAs = 'a'
export type ContextMenuItemMainProps<TAs extends As = ContextMenuItemDefaultAs> = {
  as?: TAs
  disabled?: boolean
  current?: boolean
  iconStart?: JSX.Element | null | false
  $style?: ContextMenuItemStyleRoot
  children?: React.ReactNode
}
export type ContextMenuItemPropsWithRef<TAs extends As = ContextMenuItemDefaultAs> = ContextMenuItemMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ContextMenuItemPropsWithoutRef<TAs extends As = ContextMenuItemDefaultAs> = WithoutRef<
  ContextMenuItemPropsWithRef<TAs>
>
export type ContextMenuItemType = <TAs extends As = ContextMenuItemDefaultAs>(
  props: ContextMenuItemPropsWithRef<TAs>
) => React.ReactNode

const getContextMenuItemCoreCss = (sc: ContextMenuItemStyleCore) => {
  return css`
    ${toCss({
      background: sc.background,
      color: sc.textColor,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: sc.gapHorizontalAccessoryText,
      padding: '4px 10px',
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
const getContextMenuItemFinalCss = ($sf: ContextMenuItemStyleFinal) => {
  return css`
    cursor: pointer;
    ${getContextMenuItemCoreCss($sf.rest)}

    ${$sf.isDisabled
      ? css`
          ${getContextMenuItemCoreCss($sf.disabled)}
          pointer-events: none;
        `
      : ''}
      
    ${$sf.isCurrent
      ? css`
          ${getContextMenuItemCoreCss($sf.current)}
          pointer-events: none;
        `
      : ''}

    &:hover {
      ${getContextMenuItemCoreCss($sf.hover)}
    }

    &:active {
      ${getContextMenuItemCoreCss($sf.active)}
    }

    &:focus {
      ${getContextMenuItemCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getContextMenuItemCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)<{ $sf: ContextMenuItemStyleFinal }>``
const ContentS = styled.span.attrs(mark('ContentS'))``
const ContextMenuItemS = styled.a.attrs(mark('ContextMenuItemS'))<{ $sf: ContextMenuItemStyleFinal }>`
  ${({ $sf }) => getContextMenuItemFinalCss($sf)}
`

export const ContextMenuItem: ContextMenuItemType = forwardRefIgnoreTypes(
  ({ iconStart, current, disabled, children, $style = {}, ...restProps }: ContextMenuItemPropsWithoutRef, ref: any) => {
    const $sf: ContextMenuItemStyleFinal = {
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
      <ContextMenuItemS {...(restProps as {})} ref={ref} $sf={$sf}>
        {iconStart && <IconS $sf={$sf} src={iconStart} />}
        <ContentS>{children}</ContentS>
      </ContextMenuItemS>
    )
  }
)
