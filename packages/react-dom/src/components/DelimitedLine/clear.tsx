import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type DelimitedLineStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type DelimitedLineStyleFinal = DelimitedLineStyleRoot
export type DelimitedLineDefaultAs = 'div'
export type DelimitedLineMainProps<TAs extends As = DelimitedLineDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: DelimitedLineStyleRoot
}
export type DelimitedLinePropsWithRef<TAs extends As = DelimitedLineDefaultAs> = DelimitedLineMainProps<TAs> & AsPropsWithRef<TAs>
export type DelimitedLinePropsWithoutRef<TAs extends As = DelimitedLineDefaultAs> = WithoutRef<DelimitedLinePropsWithRef<TAs>>
export type DelimitedLineType = <TAs extends As = DelimitedLineDefaultAs>(props: DelimitedLinePropsWithRef<TAs>) => React.ReactNode

const getDelimitedLineCoreCss = ($sf: DelimitedLineStyleFinal) => {
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
const getDelimitedLineFinalCss = ($sf: DelimitedLineStyleFinal) => {
  return css`
    ${getDelimitedLineCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const DelimitedLineS = styled.div.attrs(mark('DelimitedLineS'))<{ $sf: DelimitedLineStyleFinal }>`
  ${({ $sf }) => getDelimitedLineFinalCss($sf)}
`

export const DelimitedLine: DelimitedLineType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: DelimitedLinePropsWithoutRef, ref: any) => {
    const $sf: DelimitedLineStyleFinal = {
      ...$style,
    }
    return (
      <DelimitedLineS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </DelimitedLineS>
    )
  }
)
