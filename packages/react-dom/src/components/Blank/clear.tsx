import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type BlankStyleRootProps = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type BlankDefaultAs = 'div'
export type BlankMainProps<TAs extends As = BlankDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: BlankStyleRootProps
}
export type BlankPropsWithRef<TAs extends As = BlankDefaultAs> = BlankMainProps<TAs> & AsPropsWithRef<TAs>
export type BlankPropsWithoutRef<TAs extends As = BlankDefaultAs> = WithoutRef<BlankPropsWithRef<TAs>>
export type BlankType = <TAs extends As = BlankDefaultAs>(props: BlankPropsWithRef<TAs>) => React.ReactNode

const getBlankCoreCss = ($style: BlankStyleRootProps) => {
  return css`
    padding: 10px;
    ${toCss({
      width: $style?.width,
      height: $style?.height,
      background: $style?.background,
    })}

    & ${ChildrenS} {
      ${toCss({
        width: $style?.width,
        height: $style?.height,
        background: $style?.childrenBackground,
      })}
    }
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const BlankS = styled.div.attrs(mark('BlankS'))<{ $style: BlankStyleRootProps }>`
  ${({ $style }) => {
    return css`
      ${getBlankCoreCss($style)}
    `
  }}
`
export const Blank: BlankType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: BlankPropsWithRef, ref: any) => {
    const $styleNormalized = { ...$style }
    return (
      <BlankS {...restProps} ref={ref} $style={$styleNormalized}>
        <ChildrenS>{children}</ChildrenS>
      </BlankS>
    )
  }
)
