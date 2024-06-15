import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type LoaderStyleRoot = {
  width?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
}
export type LoaderStyleFinal = LoaderStyleRoot
export type LoaderDefaultAs = 'div'
export type LoaderMainProps<TAs extends As = LoaderDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: LoaderStyleRoot
}
export type LoaderPropsWithRef<TAs extends As = LoaderDefaultAs> = LoaderMainProps<TAs> & AsPropsWithRef<TAs>
export type LoaderPropsWithoutRef<TAs extends As = LoaderDefaultAs> = WithoutRef<LoaderPropsWithRef<TAs>>
export type LoaderType = <TAs extends As = LoaderDefaultAs>(props: LoaderPropsWithRef<TAs>) => React.ReactNode

const getLoaderCoreCss = ($sf: LoaderStyleFinal) => {
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
const getLoaderFinalCss = ($sf: LoaderStyleFinal) => {
  return css`
    ${getLoaderCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const LoaderS = styled.div.attrs(mark('LoaderS'))<{ $sf: LoaderStyleFinal }>`
  ${({ $sf }) => getLoaderFinalCss($sf)}
`

export const Loader: LoaderType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: LoaderPropsWithoutRef, ref: any) => {
    const $sf: LoaderStyleFinal = {
      ...$style,
    }
    return (
      <LoaderS {...restProps} ref={ref} $sf={$sf}>
        <ChildrenS>{children}</ChildrenS>
      </LoaderS>
    )
  }
)
