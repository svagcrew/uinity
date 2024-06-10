import { mark, type RC } from '@/utils.js'
import type { HTMLAttributes } from 'react'
import { styled } from 'styled-components'
import type { UinityConfig } from '@uinity/core'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'

type DisablerStyledProps = {
  $disabled: boolean
}
export type DisablerProps = {
  disabled: boolean
} & HTMLAttributes<HTMLDivElement>
export type DisablerType = RC<DisablerProps>

// TODO:ASAP extend from Block

export const createUinityDisabler = <TUinityConfig extends UinityConfig>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uinityConfig,
}: {
  uinityConfig: TUinityConfig
}): {
  Disabler: DisablerType
} => {
  const DisablerS = styled.div.attrs(mark('DisablerS'))<DisablerStyledProps>`
    transition: none;
    opacity: 1;
    ${(sp) =>
      sp.$disabled &&
      camelCaseObjectToCss({
        pointerEvents: 'none',
        opacity: 0.3,
        transition: 'opacity 300ms',
      })}
  `
  const Disabler: DisablerType = ({ disabled, children, ...restProps }) => {
    const sp = { $disabled: disabled }
    return (
      <DisablerS {...sp} {...restProps}>
        {children}
      </DisablerS>
    )
  }
  return {
    Disabler,
  }
}
