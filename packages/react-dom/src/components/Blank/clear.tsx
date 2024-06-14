import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type BlankStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type BlankStyleFinal = BlankStyleRoot
export type BlankDefaultAs = 'div'
export type BlankMainProps<TAs extends As = BlankDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: BlankStyleRoot
}
export type BlankPropsWithRef<TAs extends As = BlankDefaultAs> = BlankMainProps<TAs> & AsPropsWithRef<TAs>
export type BlankPropsWithoutRef<TAs extends As = BlankDefaultAs> = WithoutRef<BlankPropsWithRef<TAs>>
export type BlankType = <TAs extends As = BlankDefaultAs>(props: BlankPropsWithRef<TAs>) => React.ReactNode

const getBlankCoreCss = ($sf: BlankStyleFinal) => {
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
const getBlankRootCss = ($sf: BlankStyleFinal) => {
  return css`
    ${getBlankCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const BlankS = styled.div.attrs(mark('BlankS'))<{ $sf: BlankStyleFinal }>`
  ${({ $sf }) => getBlankRootCss($sf)}
`

const makeBlankStyleFinal = ({ $style }: { $style: BlankStyleRoot }): BlankStyleFinal => {
  return {
    ...$style,
  }
}

export const Blank: BlankType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: BlankPropsWithoutRef, ref: any) => {
    const $sf = makeBlankStyleFinal({ $style })
    return (
      <BlankS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </BlankS>
    )
  }
)
