import type { AsPropsWithRef, RCWithForwardedRef } from '@/utils.js'
import { forwardRefWithTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { styled } from 'styled-components'

type DisablerStyleRootProps = {
  disabled: boolean
}
export type DisablerMainProps = {
  disabled: boolean
}
export type DisablerPropsWithRef = DisablerMainProps & AsPropsWithRef<'div'>
export type DisablerType = RCWithForwardedRef<DisablerPropsWithRef, 'div'>

const DisablerS = styled.div.attrs(mark('DisablerS'))<{ $style: DisablerStyleRootProps }>`
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
export const Disabler = forwardRefWithTypes(({ disabled, children, ...restProps }: DisablerPropsWithRef, ref: any) => {
  const $style = { disabled }
  return (
    <DisablerS ref={ref} $style={$style} {...restProps}>
      {children}
    </DisablerS>
  )
})
