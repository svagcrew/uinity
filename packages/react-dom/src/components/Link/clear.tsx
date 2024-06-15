import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type LinkStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  minHeight?: number | string | null
}
export type LinkStyleStates = {
  rest?: LinkStyleCore
  hover?: LinkStyleCore
  active?: LinkStyleCore
  focus?: LinkStyleCore
  disabled?: LinkStyleCore
  current?: LinkStyleCore
}
export type LinkStyleRoot = LinkStyleStates
export type LinkStyleFinal = Required<LinkStyleStates> & {
  isCurrent?: boolean
  isDisabled?: boolean
}
export type LinkDefaultAs = 'a'
export type LinkMainProps<TAs extends As = LinkDefaultAs> = {
  as?: TAs
  disabled?: boolean
  current?: boolean
  iconStart?: JSX.Element | null | false
  $style?: LinkStyleRoot
  children?: React.ReactNode
}
export type LinkPropsWithRef<TAs extends As = LinkDefaultAs> = LinkMainProps<TAs> & AsPropsWithRef<TAs>
export type LinkPropsWithoutRef<TAs extends As = LinkDefaultAs> = WithoutRef<LinkPropsWithRef<TAs>>
export type LinkType = <TAs extends As = LinkDefaultAs>(props: LinkPropsWithRef<TAs>) => React.ReactNode

const getLinkCoreCss = (sc: LinkStyleCore) => {
  return css`
    ${toCss({
      background: sc.background,
      color: sc.textColor,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: sc.gapHorizontalAccessoryText,
    })}

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
const getLinkFinalCss = ($sf: LinkStyleFinal) => {
  return css`
    cursor: pointer;
    ${getLinkCoreCss($sf.rest)}

    ${$sf.isDisabled
      ? css`
          ${getLinkCoreCss($sf.disabled)}
          pointer-events: none;
        `
      : ''}
      
    ${$sf.isCurrent
      ? css`
          ${getLinkCoreCss($sf.current)}
          pointer-events: none;
        `
      : ''}

    &:hover {
      ${getLinkCoreCss($sf.hover)}
    }

    &:active {
      ${getLinkCoreCss($sf.active)}
    }

    &:focus {
      ${getLinkCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getLinkCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)<{ $sf: LinkStyleFinal }>``
const LinkS = styled.a.attrs(mark('LinkS'))<{ $sf: LinkStyleFinal }>`
  ${({ $sf }) => getLinkFinalCss($sf)}
`

export const Link: LinkType = forwardRefIgnoreTypes(
  ({ iconStart, current, disabled, children, $style = {}, ...restProps }: LinkPropsWithoutRef, ref: any) => {
    const $sf: LinkStyleFinal = {
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
      <LinkS {...(restProps as {})} ref={ref} $sf={$sf}>
        {iconStart && <IconS $sf={$sf} src={iconStart} />}
        {children}
      </LinkS>
    )
  }
)
