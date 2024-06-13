import NProgressOriginal from 'nprogress'
import { createGlobalStyle } from 'styled-components'

NProgressOriginal.configure({ showSpinner: false })

export type ProgressLineStyleRootProps = {
  color?: string
}
export type ProgressLineMainProps = {
  $style?: ProgressLineStyleRootProps
}
export type ProgressLineType = (props: ProgressLineMainProps) => React.ReactElement | null
export type NProgressType = typeof NProgressOriginal

const ProgressLineS = createGlobalStyle<{ $style: ProgressLineStyleRootProps }>`
    /* Make clicks pass-through */
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${({ $style }) => $style.color};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${({ $style }) => $style.color}, 0 0 5px ${({ $style }) => $style.color};
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${({ $style }) => $style.color};
      border-left-color: ${({ $style }) => $style.color};
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
export const ProgressLine: ProgressLineType = ({ $style = {} }) => {
  return <ProgressLineS $style={$style} />
}
export const NProgress: NProgressType = NProgressOriginal
