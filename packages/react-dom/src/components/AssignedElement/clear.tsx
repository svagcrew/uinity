import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type AssignedElementStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type AssignedElementStyleFinal = AssignedElementStyleRoot
export type AssignedElementDefaultAs = 'div'
export type AssignedElementMainProps<TAs extends As = AssignedElementDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: AssignedElementStyleRoot
}
export type AssignedElementPropsWithRef<TAs extends As = AssignedElementDefaultAs> = AssignedElementMainProps<TAs> & AsPropsWithRef<TAs>
export type AssignedElementPropsWithoutRef<TAs extends As = AssignedElementDefaultAs> = WithoutRef<AssignedElementPropsWithRef<TAs>>
export type AssignedElementType = <TAs extends As = AssignedElementDefaultAs>(props: AssignedElementPropsWithRef<TAs>) => React.ReactNode

const getAssignedElementCoreCss = ($sf: AssignedElementStyleFinal) => {
  return css`
    padding: 10px;
    ${toCss({
      width: $sf?.width,
      height: $sf?.height,
      background: $sf?.background,
    })}

    & ${ChildrenS} {
      ${toCss({
        width: $sf?.width,
        height: $sf?.height,
        background: $sf?.childrenBackground,
      })}
    }
  `
}
const getAssignedElementFinalCss = ($sf: AssignedElementStyleFinal) => {
  return css`
    ${getAssignedElementCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const AssignedElementS = styled.div.attrs(mark('AssignedElementS'))<{ $sf: AssignedElementStyleFinal }>`
  ${({ $sf }) => getAssignedElementFinalCss($sf)}
`

export const AssignedElement: AssignedElementType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: AssignedElementPropsWithoutRef, ref: any) => {
    const $sf: AssignedElementStyleFinal = {
      ...$style,
    }
    return (
      <AssignedElementS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </AssignedElementS>
    )
  }
)
