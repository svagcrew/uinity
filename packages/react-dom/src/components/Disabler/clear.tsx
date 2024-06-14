import type { AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { styled } from 'styled-components'

type DisablerStyleRoot = {
  disabled?: boolean
}
export type DisablerMainProps = {
  disabled?: boolean
  children?: React.ReactNode
}
export type DisablerDefaultAs = 'div'
export type DisablerPropsWithRef = DisablerMainProps & AsPropsWithRef<DisablerDefaultAs>
export type DisablerPropsWithoutRef = WithoutRef<DisablerPropsWithRef>
export type DisablerType = (props: DisablerPropsWithRef) => React.ReactNode

const DisablerS = styled.div.attrs(mark('DisablerS'))<{ $style: DisablerStyleRoot }>`
  transition: none;
  opacity: 1;
  ${({ $style }) =>
    $style.disabled &&
    toCss({
      pointerEvents: 'none',
      opacity: 0.3,
      transition: 'opacity 300ms',
    })}
`
export const Disabler: DisablerType = forwardRefIgnoreTypes(
  ({ disabled, children, ...restProps }: DisablerPropsWithoutRef, ref: any) => {
    const $style = { disabled }
    return (
      <DisablerS {...restProps} ref={ref} $style={$style}>
        {children}
      </DisablerS>
    )
  }
)
