import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type DividerStyleRoot = {
  direction?: 'horizontal' | 'vertical'
}
export type DividerStyleFinal = Required<DividerStyleRoot>
export type DividerDefaultAs = 'div'
export type DividerMainProps<TAs extends As = DividerDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  $style?: DividerStyleRoot
}
export type DividerPropsWithRef<TAs extends As = DividerDefaultAs> = DividerMainProps<TAs> & AsPropsWithRef<TAs>
export type DividerPropsWithoutRef<TAs extends As = DividerDefaultAs> = WithoutRef<DividerPropsWithRef<TAs>>
export type DividerType = <TAs extends As = DividerDefaultAs>(props: DividerPropsWithRef<TAs>) => React.ReactNode

const getDividerCoreCss = ($sf: DividerStyleFinal) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: stretch;
    ${$sf.direction === 'horizontal'
      ? toCss({
          flexFlow: 'row nowrap',
        })
      : toCss({
          flexFlow: 'column nowrap',
        })}

    ${LineS} {
      flex: 1 1 auto;
      border: 1px solid #999;
    }

    ${ChildrenS} {
      margin: 0 10px;
      flex: 0 0 auto;
    }
  `
}
const getDividerFinalCss = ($sf: DividerStyleFinal) => {
  return css`
    ${getDividerCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const LineS = styled.div.attrs(mark('LineS'))``
const DividerS = styled.div.attrs(mark('DividerS'))<{ $sf: DividerStyleFinal }>`
  ${({ $sf }) => getDividerFinalCss($sf)}
`

export const Divider: DividerType = forwardRefIgnoreTypes(
  ({ $style = {}, children, ...restProps }: DividerPropsWithoutRef, ref: any) => {
    const $sf: DividerStyleFinal = {
      direction: $style.direction || 'horizontal',
    }
    return (
      <DividerS {...restProps} ref={ref} $sf={$sf}>
        {children ? (
          <>
            <LineS />
            <ChildrenS>{children}</ChildrenS>
            <LineS />
          </>
        ) : (
          <LineS />
        )}
      </DividerS>
    )
  }
)
