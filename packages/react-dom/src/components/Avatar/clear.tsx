import type { IconSrc } from '@/components/Icon/clear.js'
import { Icon } from '@/components/Icon/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type AvatarStyleCore = {
  gapHorizontalAccessoryText?: number | string | null
  background?: string
  textColor?: string
  iconColor?: string
  iconSize?: number | string | null
  src?: IconSrc
}
export type AvatarStyleStates = {
  rest?: AvatarStyleCore
  hover?: AvatarStyleCore
  active?: AvatarStyleCore
  focus?: AvatarStyleCore
  disabled?: AvatarStyleCore
  current?: AvatarStyleCore
}
export type AvatarStyleRoot = AvatarStyleStates
export type AvatarStyleFinal = Required<AvatarStyleStates> & {
  isCurrent?: boolean
  isDisabled?: boolean
}
export type AvatarDefaultAs = 'a'
export type AvatarMainProps<TAs extends As = AvatarDefaultAs> = {
  as?: TAs
  disabled?: boolean
  current?: boolean
  src: JSX.Element | null | false
  $style?: AvatarStyleRoot
}
export type AvatarPropsWithRef<TAs extends As = AvatarDefaultAs> = AvatarMainProps<TAs> & AsPropsWithRef<TAs>
export type AvatarPropsWithoutRef<TAs extends As = AvatarDefaultAs> = WithoutRef<AvatarPropsWithRef<TAs>>
export type AvatarType = <TAs extends As = AvatarDefaultAs>(props: AvatarPropsWithRef<TAs>) => React.ReactNode

const getAvatarCoreCss = (sc: AvatarStyleCore) => {
  return css`
    background-color: #ddd;
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
const getAvatarFinalCss = ($sf: AvatarStyleFinal) => {
  return css`
    cursor: pointer;
    ${getAvatarCoreCss($sf.rest)}
    overflow: hidden;
    border-radius: 50%;

    ${$sf.isDisabled
      ? css`
          ${getAvatarCoreCss($sf.disabled)}
          pointer-events: none;
        `
      : ''}

    ${$sf.isCurrent
      ? css`
          ${getAvatarCoreCss($sf.current)}
          pointer-events: none;
        `
      : ''}

    &:hover {
      ${getAvatarCoreCss($sf.hover)}
    }

    &:active {
      ${getAvatarCoreCss($sf.active)}
    }

    &:focus {
      ${getAvatarCoreCss($sf.focus)}
    }

    &:disabled,
    &[disabled] {
      ${getAvatarCoreCss($sf.disabled)}
      pointer-events: none;
    }
  `
}

const IconS = styled(Icon)<{ $sf: AvatarStyleFinal }>``
const ContentS = styled.span.attrs(mark('ContentS'))``
const AvatarS = styled.a.attrs(mark('AvatarS'))<{ $sf: AvatarStyleFinal }>`
  ${({ $sf }) => getAvatarFinalCss($sf)}
`

export const Avatar: AvatarType = forwardRefIgnoreTypes(
  ({ src, current, disabled, $style = {}, ...restProps }: AvatarPropsWithoutRef, ref: any) => {
    const $sf: AvatarStyleFinal = {
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
      <AvatarS {...(restProps as {})} ref={ref} $sf={$sf}>
        <IconS $sf={$sf} src={src} />
      </AvatarS>
    )
  }
)
