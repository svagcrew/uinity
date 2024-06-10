import { mark, type RC } from '@/utils.js'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'
import { styled } from 'styled-components'

type SplashScreenStyledProps = {
  $visible: boolean
}
type SplashScreenProps = {
  visible: boolean
  children?: React.ReactNode
}
export type SplashScreenType = RC<SplashScreenProps>

export const createUinitySplashScreen = (): {
  SplashScreen: SplashScreenType
} => {
  const ContentS = styled.div.attrs(mark('ContentS'))``
  const SplashScreenS = styled.div.attrs(mark('SplashScreenS'))<SplashScreenStyledProps>`
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
    ${(sp) =>
      sp.$visible
        ? camelCaseObjectToCss({
            opacity: 1,
            transition: 'opacity 200s',
          })
        : camelCaseObjectToCss({
            opacity: 0,
            marginTop: '-200000px',
            transition: 'opacity 200ms, margin-top 0ms ease 200ms',
          })}

    ${ContentS} {
    }
  `
  const SplashScreen: SplashScreenType = ({ visible, children }) => {
    const sp = { $visible: visible }

    return (
      <SplashScreenS {...sp}>
        <ContentS>{children}</ContentS>
      </SplashScreenS>
    )
  }
  return {
    SplashScreen: SplashScreen as SplashScreenType,
  }
}
