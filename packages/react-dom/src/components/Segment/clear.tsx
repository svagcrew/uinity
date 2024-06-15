import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type SegmentStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type SegmentStyleFinal = SegmentStyleRoot
export type SegmentDefaultAs = 'div'
export type SegmentMainProps<TAs extends As = SegmentDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: SegmentStyleRoot
}
export type SegmentPropsWithRef<TAs extends As = SegmentDefaultAs> = SegmentMainProps<TAs> & AsPropsWithRef<TAs>
export type SegmentPropsWithoutRef<TAs extends As = SegmentDefaultAs> = WithoutRef<SegmentPropsWithRef<TAs>>
export type SegmentType = <TAs extends As = SegmentDefaultAs>(props: SegmentPropsWithRef<TAs>) => React.ReactNode

const getSegmentCoreCss = ($sf: SegmentStyleFinal) => {
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
const getSegmentFinalCss = ($sf: SegmentStyleFinal) => {
  return css`
    ${getSegmentCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const SegmentS = styled.div.attrs(mark('SegmentS'))<{ $sf: SegmentStyleFinal }>`
  ${({ $sf }) => getSegmentFinalCss($sf)}
`

export const Segment: SegmentType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: SegmentPropsWithoutRef, ref: any) => {
    const $sf: SegmentStyleFinal = {
      ...$style,
    }
    return (
      <SegmentS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </SegmentS>
    )
  }
)
