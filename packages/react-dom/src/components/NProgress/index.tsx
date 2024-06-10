import { type RC } from '@/utils.js'
import NProgress from 'nprogress'
import { createGlobalStyle } from 'styled-components'
import type { UinityConfig } from '@uinity/core'

NProgress.configure({ showSpinner: false })

type NProgressStyledProps = {
  $color: string
}
export type NProgressStylesProps = {}
export type NProgressStylesType = RC<NProgressStylesProps>
export type NProgressType = typeof NProgress

export const createUinityNProgress = <TUinityConfig extends UinityConfig>({
  uinityConfig,
}: {
  uinityConfig: TUinityConfig
}): {
  NProgressStyles: NProgressStylesType
  NProgress: NProgressType
} => {
  const NProgressStylesS = createGlobalStyle<NProgressStyledProps>`
    /* Make clicks pass-through */
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${(sp) => sp.$color};

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
      box-shadow: 0 0 10px ${(sp) => sp.$color}, 0 0 5px ${(sp) => sp.$color};
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
      border-top-color: ${(sp) => sp.$color};
      border-left-color: ${(sp) => sp.$color};
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
  const NProgressStyles: NProgressStylesType = () => {
    const sp = { $color: uinityConfig.color.core.brand['100'] }
    return <NProgressStylesS {...sp} />
  }
  return {
    NProgressStyles: NProgressStyles as NProgressStylesType,
    NProgress,
  }
}
