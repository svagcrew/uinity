import type { IconSrc } from '@/components/Icon/clear.js'
import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type LinkStyleCore = {
  fontFamily?: string | null | undefined
  fontWeight?: string | null | undefined
  fontSize?: number | string | null | undefined
  lineHeight?: number | string | null | undefined
  color?: string | null | undefined
  iconSize?: number | string | null | undefined
  gapAccessoryText?: number | string | null | undefined
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
  iconStart?: IconSrc
  iconEnd?: IconSrc
  $style?: LinkStyleRoot
  children?: React.ReactNode
}
export type LinkPropsWithRef<TAs extends As = LinkDefaultAs> = LinkMainProps<TAs> & AsPropsWithRef<TAs>
export type LinkPropsWithoutRef<TAs extends As = LinkDefaultAs> = WithoutRef<LinkPropsWithRef<TAs>>
export type LinkType = <TAs extends As = LinkDefaultAs>(props: LinkPropsWithRef<TAs>) => React.ReactNode

const getLinkCoreCss = (sc: LinkStyleCore) => {
  return css`
    ${toCss({
      fontFamily: sc.fontFamily,
      fontWeight: sc.fontWeight,
      fontSize: sc.fontSize,
      lineHeight: sc.lineHeight,
      color: sc.color,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: sc.gapAccessoryText,
    })}

    & ${ContentS} {
      /* margin-bottom: -3px; */
    }

    & ${IconS} {
      ${toCss({
        width: sc.iconSize,
        height: sc.iconSize,
      })}

      path {
        ${toCss({
          fill: sc.color,
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
const ContentS = styled.span.attrs(mark('ContentS'))``
const LinkS = styled.a.attrs(mark('LinkS'))<{ $sf: LinkStyleFinal }>`
  ${({ $sf }) => getLinkFinalCss($sf)}
`

export const Link: LinkType = forwardRefIgnoreTypes(
  ({ iconStart, iconEnd, current, disabled, children, $style = {}, ...restProps }: LinkPropsWithoutRef, ref: any) => {
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
        <ContentS>{children}</ContentS>
        {iconEnd && <IconS $sf={$sf} src={iconEnd} />}
      </LinkS>
    )
  }
)
