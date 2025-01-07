import { ButtonS } from '@/components/Button/react.clear.js'
import { mark, syncRefs, toCss, type As, type AsPropsWithRef, type WithoutRef } from '@/lib/other.js'
import { forwardRef } from 'react'
import { css, styled } from 'styled-components'

// Type for $style prop
export type ButtonsStyleRoot = {
  direction?: 'row' | 'column'
  disabled?: boolean
}

// Props for real style generation
export type ButtonsStyleFinal = Required<ButtonsStyleRoot>

// Shared $style prop attrs with main component
export type ButtonsStyleRootShared = ButtonsStyleRoot

// Component props
export type ButtonsDefaultAs = 'div'
export type ButtonsMainProps<TAs extends As = ButtonsDefaultAs> = ButtonsStyleRootShared & {
  as?: TAs
  $style?: ButtonsStyleRoot
  children?: React.ReactNode
}

// Rest types
export type ButtonsPropsWithRef<TAs extends As = ButtonsDefaultAs> = ButtonsMainProps<TAs> & AsPropsWithRef<TAs>
export type ButtonsPropsWithoutRef<TAs extends As = ButtonsDefaultAs> = WithoutRef<ButtonsPropsWithRef<TAs>>
export type ButtonsType = <TAs extends As = ButtonsDefaultAs>(props: ButtonsPropsWithRef<TAs>) => React.ReactNode

// Styled components
const ButtonsS = styled.div.attrs(mark('ButtonsS'))<{ $sf: ButtonsStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: '10px',
    })}

    ${$sf.disabled && toCss({ opacity: 0.5, pointerEvents: 'none' })}

    & > ${ButtonS} {
    }
  `}
`

// Component
export const Buttons: ButtonsType = forwardRef<any, ButtonsPropsWithoutRef<any>>(
  ({ direction, children, disabled, $style, ...restProps }: ButtonsPropsWithoutRef, ref: any) => {
    const $sf: ButtonsStyleFinal = {
      direction: direction ?? $style?.direction ?? 'row',
      disabled: !!disabled,
    }
    return (
      <ButtonsS {...restProps} ref={syncRefs(ref)} $sf={$sf}>
        {children}
      </ButtonsS>
    )
  }
)
