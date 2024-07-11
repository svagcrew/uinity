import { Layout as LayoutClear } from './clear.js'
import type { LayoutMainProps, LayoutStyleCore } from '@/components/Layout/clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { LayoutConfigFinalProps } from '@uinity/core/dist/components/layout.js'
import { getLayoutConfigFinalProps } from '@uinity/core/dist/components/layout.js'
import { type ColorModeName, getColorByMode } from '@uinity/core/dist/utils/color.js'

export type LayoutConfiguredSettingsProps = {
  colorMode?: ColorModeName | undefined | null
}
export type LayoutConfiguredMainProps<TAs extends As> = LayoutConfiguredSettingsProps & LayoutMainProps<TAs>
export type LayoutConfiguredPropsWithRef<TAs extends As> = LayoutConfiguredMainProps<TAs> & AsPropsWithRef<TAs>
export type LayoutConfiguredPropsWithoutRef<TAs extends As> = WithoutRef<LayoutConfiguredPropsWithRef<TAs>>
export type LayoutConfigured = <TAs extends As>(props: LayoutConfiguredPropsWithRef<TAs>) => React.ReactNode

const makeLayoutStyleCore = ({
  cm,
  sc,
  cfp,
}: {
  cm: ColorModeName
  sc: LayoutStyleCore
  cfp: LayoutConfigFinalProps
}): LayoutStyleCore => {
  return {
    ...cfp,
    ...sc,
    bodyBackground: getColorByMode(cm, sc.bodyBackground ?? cfp.bodyBackground),
    headerBackground: getColorByMode(cm, sc.headerBackground ?? cfp.headerBackground),
    footerBackground: getColorByMode(cm, sc.footerBackground ?? cfp.footerBackground),
    modalBackground: getColorByMode(cm, sc.modalBackground ?? cfp.modalBackground),
    headerBorderColor: getColorByMode(cm, sc.headerBorderColor ?? cfp.headerBorderColor),
    footerBorderColor: getColorByMode(cm, sc.footerBorderColor ?? cfp.footerBorderColor),
    sidebarBorderColor: getColorByMode(cm, sc.sidebarBorderColor ?? cfp.sidebarBorderColor),
    sidebarBackgroundColor: getColorByMode(cm, sc.sidebarBackgroundColor ?? cfp.sidebarBackgroundColor),
    modalBorderColor: getColorByMode(cm, sc.modalBorderColor ?? cfp.modalBorderColor),
  }
}

export const createLayout = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Layout: LayoutConfigured = forwardRefIgnoreTypes(
    ({ colorMode, $style = {}, ...restProps }: LayoutConfiguredPropsWithoutRef<'div'>, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const byWindowSizeReverseConfigured = [
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
                uinityConfig.layout.general.hideSidebarOnScreenWidth,
                {
                  sidebarHidden: false,
                },
              ],
            ]
          : []),
      ] as Array<[number, LayoutConfigFinalProps]>
      const byWindowSizeReverseNormalized =
        $style.byWindowSizeReverse ||
        $style.ws ||
        byWindowSizeReverseConfigured.map(([size, cfp]) => [size, makeLayoutStyleCore({ cm, sc: {}, cfp })])
      const $styleConfigured = {
        ...$style,
        byWindowSizeReverse: byWindowSizeReverseNormalized,
      }
      return <LayoutClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Layout,
  }
}
