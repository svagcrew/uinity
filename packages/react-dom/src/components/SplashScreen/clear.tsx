import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { styled } from 'styled-components'

export type SplashScreenStyleRoot = {
  visible?: boolean
}
export type SplashScreenStyleFinal = Required<SplashScreenStyleRoot>
export type SplashScreenDefaultAs = 'div'
export type SplashScreenMainProps<TAs extends As = SplashScreenDefaultAs> = SplashScreenStyleRoot & {
  as?: TAs
  children?: React.ReactNode
}
export type SplashScreenPropsWithRef<TAs extends As = SplashScreenDefaultAs> = SplashScreenMainProps<TAs> &
  AsPropsWithRef<TAs>
export type SplashScreenPropsWithoutRef<TAs extends As = SplashScreenDefaultAs> = WithoutRef<
  SplashScreenPropsWithRef<TAs>
>
export type SplashScreenType = <TAs extends As = SplashScreenDefaultAs>(
  props: SplashScreenPropsWithRef<TAs>
) => React.ReactNode

const ContentS = styled.div.attrs(mark('ContentS'))``
const SplashScreenS = styled.div.attrs(mark('SplashScreenS'))<{ $sf: SplashScreenStyleFinal }>`
  width: calc(100% + 100000px);
  height: calc(100% + 100000px);
  position: fixed;
  top: -50000px;
  left: -50000px;
  background: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  z-index: 90000;
  ${({ $sf }) =>
    $sf.visible
      ? toCss({
          opacity: 1,
          transition: 'opacity 200ms, margin-top 0ms ease 0ms',
        })
      : toCss({
          opacity: 0,
          marginTop: '-200000px',
          transition: 'opacity 200ms, margin-top 0ms ease 200ms',
        })}

  ${ContentS} {
  }
`
export const SplashScreen: SplashScreenType = forwardRefIgnoreTypes(
  ({ visible, children, ...restProps }: SplashScreenPropsWithoutRef, ref: any) => {
    const $sf = { visible: !!visible }
    return (
      <SplashScreenS {...(restProps as {})} $sf={$sf} ref={ref}>
        <ContentS>{children}</ContentS>
      </SplashScreenS>
    )
  }
)
