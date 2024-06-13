import { Layout as LayoutClear } from './clear.js'
import type { LayoutMainProps, LayoutStyleCoreProps } from '@/components/Layout/clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { As, AsPropsWithRef, RC } from '@/utils.js'
import { forwardRefWithTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { LayoutConfigFinalProps } from '@uinity/core/dist/components/layout.js'
import { getLayoutConfigFinalProps } from '@uinity/core/dist/components/layout.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type LayoutConfiguredSettingsProps = {
  colorMode?: ColorModeName | undefined | null
}
export type LayoutConfiguredSpecialProps<TAs extends As> = {
  as?: TAs
}
export type LayoutConfiguredMainProps<TAs extends As> = LayoutConfiguredSettingsProps &
  LayoutConfiguredSpecialProps<TAs> &
  LayoutMainProps<TAs>
export type LayoutConfiguredPropsWithRef<TAs extends As> = LayoutConfiguredMainProps<TAs> & AsPropsWithRef<TAs>
export type LayoutConfigured<TAs extends As> = RC<LayoutConfiguredPropsWithRef<TAs>>

const normalizeLayoutStyleCoreProps = (
  cm: ColorModeName,
  passedScp: LayoutStyleCoreProps,
  configuredCfp: LayoutConfigFinalProps
) => {
  return {
    ...configuredCfp,
    ...passedScp,
    bodyBackground: getColorByMode(cm, passedScp.bodyBackground || configuredCfp.bodyBackground),
    headerBackground: getColorByMode(cm, passedScp.headerBackground || configuredCfp.headerBackground),
    footerBackground: getColorByMode(cm, passedScp.footerBackground || configuredCfp.footerBackground),
    modalBackground: getColorByMode(cm, passedScp.modalBackground || configuredCfp.modalBackground),
    headerBorderColor: getColorByMode(cm, passedScp.headerBorderColor || configuredCfp.headerBorderColor),
    footerBorderColor: getColorByMode(cm, passedScp.footerBorderColor || configuredCfp.footerBorderColor),
    sidebarBorderColor: getColorByMode(cm, passedScp.sidebarBorderColor || configuredCfp.sidebarBorderColor),
    modalBorderColor: getColorByMode(cm, passedScp.modalBorderColor || configuredCfp.modalBorderColor),
  }
}

export const createLayout = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const { colorMode: colorModeGlobal } = useColorMode()
  const Layout = forwardRefWithTypes(
    <TAs extends As>({ colorMode, $style = {}, ...restProps }: LayoutConfiguredPropsWithRef<TAs>, ref: any) => {
      const cm = colorMode || colorModeGlobal
      const configuredByWindowSize = [
        ...(uinityConfig.layout.general.sizeByScreenWidth?.mobile
          ? [[uinityConfig.layout.general.sizeByScreenWidth.mobile, getLayoutConfigFinalProps(uinityConfig, 'mobile')]]
          : []),
        ...(uinityConfig.layout.general.sizeByScreenWidth?.tablet
          ? [[uinityConfig.layout.general.sizeByScreenWidth.tablet, getLayoutConfigFinalProps(uinityConfig, 'tablet')]]
          : []),
        ...(uinityConfig.layout.general.sizeByScreenWidth?.desktop
          ? [
              [
                uinityConfig.layout.general.sizeByScreenWidth.desktop,
                getLayoutConfigFinalProps(uinityConfig, 'desktop'),
              ],
            ]
          : []),
        ...(uinityConfig.layout.general.hideSidebarOnScreenWidth
          ? [
              [
                0,
                {
                  sidebarHidden: true,
                },
              ],
              [
                uinityConfig.layout.general.hideSidebarOnScreenWidth,
                {
                  sidebarHidden: false,
                },
              ],
            ]
          : []),
      ] as Array<[number, LayoutConfigFinalProps]>
      const byWindowSizeNormalized =
        $style.byWindowSize ||
        $style.ws ||
        configuredByWindowSize.map(([size, cfp]) => [size, normalizeLayoutStyleCoreProps(cm, {}, cfp)])
      const $styleNormalized = {
        ...$style,
        byWindowSize: byWindowSizeNormalized,
      }
      return <LayoutClear {...(restProps as {})} $style={$styleNormalized} ref={ref} />
    }
  )
  return {
    Layout,
  }
}
