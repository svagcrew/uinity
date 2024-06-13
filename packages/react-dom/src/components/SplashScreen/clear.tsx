import type { As, AsPropsWithRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { styled } from 'styled-components'

export type SplashScreenStyleRootProps = {
  visible?: boolean
}
export type SplashScreenMainProps<TAs extends As> = SplashScreenStyleRootProps & {
  as?: TAs
  children?: React.ReactNode
}
export type SplashScreenPropsWithRef<TAs extends As> = SplashScreenMainProps<TAs> & AsPropsWithRef<TAs>
export type SplashScreenType = <TAs extends As = 'div'>(
  props: SplashScreenPropsWithRef<TAs>
) => React.ReactElement | null

const ContentS = styled.div.attrs(mark('ContentS'))``
const SplashScreenS = styled.div.attrs(mark('SplashScreenS'))<{ $style: SplashScreenStyleRootProps }>`
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
  ${({ $style }) =>
    $style.visible
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
  ({ visible, children }: SplashScreenPropsWithRef<'div'>, ref: any) => {
    return (
      <SplashScreenS $style={{ visible }} ref={ref}>
        <ContentS>{children}</ContentS>
      </SplashScreenS>
    )
  }
)
