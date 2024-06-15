import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type InformerStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type InformerStyleFinal = InformerStyleRoot
export type InformerDefaultAs = 'div'
export type InformerMainProps<TAs extends As = InformerDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: InformerStyleRoot
}
export type InformerPropsWithRef<TAs extends As = InformerDefaultAs> = InformerMainProps<TAs> & AsPropsWithRef<TAs>
export type InformerPropsWithoutRef<TAs extends As = InformerDefaultAs> = WithoutRef<InformerPropsWithRef<TAs>>
export type InformerType = <TAs extends As = InformerDefaultAs>(props: InformerPropsWithRef<TAs>) => React.ReactNode

const getInformerCoreCss = ($sf: InformerStyleFinal) => {
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
const getInformerFinalCss = ($sf: InformerStyleFinal) => {
  return css`
    ${getInformerCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const InformerS = styled.div.attrs(mark('InformerS'))<{ $sf: InformerStyleFinal }>`
  ${({ $sf }) => getInformerFinalCss($sf)}
`

export const Informer: InformerType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: InformerPropsWithoutRef, ref: any) => {
    const $sf: InformerStyleFinal = {
      ...$style,
    }
    return (
      <InformerS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </InformerS>
    )
  }
)
