import '@/lib/cssContainerQueryPolyfill.js'
import { mark, type RC } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import type { LayoutFinalProps } from '@uinity/core/dist/components/layout.js'
import { getLayoutFinalProps } from '@uinity/core/dist/components/layout.js'
import { borderPropsToCssValue, maybeNumberToPx, toCss } from '@uinity/core/dist/utils/other.js'
import * as bodyScrollLock from 'body-scroll-lock'
import { useEffect } from 'react'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'
import { getKeys } from 'svag-utils'

type LayoutStyledProps<TUinityConfig extends UinityConfig = UinityConfig> = {
  $size?: keyof TUinityConfig['layout']['size']
  $modalOpened?: boolean
  $fullWidth?: boolean
  $headerFixed?: boolean
  $sidebarFixed?: boolean
  $headerExists: boolean
}
type LayoutSettingsProps<TUinityConfig extends UinityConfig = UinityConfig> = {
  size?: keyof TUinityConfig['layout']['size']
  headerFixed?: boolean
  sidebarFixed?: boolean
  fullWidth?: boolean
  modalOpened?: boolean
  headerRender?: React.ReactNode
  modalRender?: React.ReactNode
  sidebarRender?: React.ReactNode
  footerRender?: React.ReactNode
  children?: React.ReactNode
}
type LayoutProps<TUinityConfig extends UinityConfig = UinityConfig> = LayoutSettingsProps<TUinityConfig>
export type LayoutType<TUinityConfig extends UinityConfig> = RC<LayoutProps<TUinityConfig>>

export const createLayout = <TUinityConfig extends UinityConfig>({
  uinityConfig,
}: {
  uinityConfig: TUinityConfig
}): {
  Layout: LayoutType<TUinityConfig>
} => {
  // const withLayoutFinalProps = (cssGetter: (finalProp: LayoutFinalProps, styledProps: LayoutStyledProps) => string) => {
  //   return (sp: LayoutStyledProps) => {
  //     const fp = getLayoutFinalProps(uinityConfig, sp.$size)
  //     return cssGetter(fp, sp)
  //   }
  // }

  const withLayoutFinalProps = (
    cssGetter: (finalProp: LayoutFinalProps, styledProps: LayoutStyledProps) => string | RuleSet
  ) => {
    return (sp: LayoutStyledProps) => {
      if (sp.$size) {
        return (sp: LayoutStyledProps) => {
          const fp = getLayoutFinalProps(uinityConfig, sp.$size)
          return cssGetter(fp, sp)
        }
      }
      const sizes = getKeys(uinityConfig.layout.size)
      const strings: Array<string | RuleSet> = []
      for (const size of sizes) {
        const fp = getLayoutFinalProps(uinityConfig, size)
        const string = cssGetter(fp, sp)
        const minScreenWidth = uinityConfig.layout.general.sizeByScreenWidth[size]
        if (minScreenWidth === Infinity) {
          strings.push(string)
        } else {
          strings.push(`@media (max-width: ${minScreenWidth}px) { ${string} }`)
        }
      }
      return strings.join('\n')
    }
  }

  const LayoutSectionS = styled.div.attrs(mark('LayoutSectionS'))<LayoutStyledProps>``
  const ModalS = styled.div.attrs(mark('ModalS'))<LayoutStyledProps>``
  const HeaderS = styled.div.attrs(mark('HeaderS'))<LayoutStyledProps>``
  const HeaderPlaceS = styled.div.attrs(mark('HeaderPlaceS'))<LayoutStyledProps>``
  const SidebarPlaceS = styled.div.attrs(mark('SidebarPlaceS'))<LayoutStyledProps>``
  const SidebarS = styled.div.attrs(mark('SidebarS'))<LayoutStyledProps>``
  const ContentS = styled.div.attrs(mark('ContentS'))<LayoutStyledProps>``
  const SidebarAndContentS = styled.div.attrs(mark('SidebarAndContentS'))<LayoutStyledProps>``
  const FooterS = styled.div.attrs(mark('FooterS'))<LayoutStyledProps>``
  const LayoutS = styled.div.attrs(mark('LayoutS'))<LayoutStyledProps>`
    width: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;

    @supports not (container-type: inline-size) {
      /* TODO:ASAP replace with loader */
      display: none;
    }

    ${LayoutSectionS} {
      ${withLayoutFinalProps(
        (fp, sp) => `
          ${toCss({
            width: '100%',
            maxWidth: sp.$fullWidth ? null : fp.layoutMaxWidth,
            paddingLeft: fp.layoutPaddingHorizontal,
            paddingRight: fp.layoutPaddingHorizontal,
          })}
        `
      )}
    }

    ${HeaderPlaceS} {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      justify-content: stretch;
      ${withLayoutFinalProps((fp) =>
        toCss({
          height: fp.headerHeight,
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: fp.headerHeight,
        })
      )}

      ${HeaderS} {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        ${(sp) =>
          !sp.$headerFixed
            ? ''
            : toCss({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1_000,
              })}
        ${withLayoutFinalProps((fp) =>
          toCss({
            height: fp.headerHeight,
            background: fp.headerBackground,
            borderBottom: borderPropsToCssValue(fp.headerBorderWidth, fp.headerBorderColor),
          })
        )}

      ${LayoutSectionS} {
          display: flex;
          flex-flow: column nowrap;
          align-items: stretch;
          justify-content: stretch;
          ${withLayoutFinalProps((fp) =>
            toCss({
              height: fp.headerHeight,
            })
          )}
        }
      }
    }

    ${ModalS} {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: stretch;
      width: 100%;
      z-index: 1100;
      overflow-y: auto;
      position: fixed;
      ${(sp) =>
        toCss({
          ...(sp.$modalOpened ? { marginTop: 0 } : { marginTop: -99_999 }),
        })}
      ${withLayoutFinalProps((fp, sp) =>
        toCss({
          background: fp.modalBackground,
          height: `calc(100% - ${maybeNumberToPx(sp.$headerFixed ? fp.headerHeight : 0)})`,
          top: maybeNumberToPx(sp.$headerFixed ? fp.headerHeight : 0),
        })
      )}

    ${LayoutSectionS} {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: stretch;
        ${withLayoutFinalProps((fp) =>
          toCss({
            paddingTop: fp.modalPaddingTop,
            paddingBottom: fp.modalPaddingBottom,
            borderTop: borderPropsToCssValue(fp.modalBorderWidth, fp.modalBorderColor),
          })
        )}
      }
    }

    ${SidebarAndContentS} {
      flex: 1 1 100%;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: stretch;

      ${LayoutSectionS} {
        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        justify-content: stretch;
        height: 100%;

        ${SidebarPlaceS} {
          display: flex;
          flex-flow: column nowrap;
          align-items: stretch;
          justify-content: stretch;
          ${withLayoutFinalProps((fp) =>
            toCss({
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: fp.sidebarWidth,
              width: fp.sidebarWidth,
              marginRight: fp.sidebarMarginEnd,
              borderRight: borderPropsToCssValue(fp.sidebarBorderWidth, fp.sidebarBorderColor),
            })
          )}

          ${!uinityConfig.layout.general.hideSidebarOnScreenWidth
            ? ''
            : css`
                @media (max-width: ${maybeNumberToPx(uinityConfig.layout.general.hideSidebarOnScreenWidth)}) {
                  display: none;
                }
              `}


          ${SidebarS} {
            ${withLayoutFinalProps((fp) =>
              toCss({
                width: fp.sidebarWidth,
                paddingTop: fp.sidebarPaddingTop,
                paddingBottom: fp.sidebarPaddingBottom,
                containerType: 'inline-size',
              })
            )}
            ${withLayoutFinalProps((fp, sp) =>
              !sp.$sidebarFixed
                ? ''
                : toCss({
                    overflowY: 'auto',
                    position: 'fixed',
                    zIndex: 900,
                    height: `calc(100% - ${maybeNumberToPx(sp.$headerFixed ? fp.headerHeight : 0)})`,
                  })
            )}
          }
        }

        ${ContentS} {
          display: flex;
          flex-flow: column nowrap;
          align-items: flex-start;
          justify-content: stretch;
          ${withLayoutFinalProps((fp) =>
            toCss({
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: '100%',
              maxWidth: fp.contentMaxWidth,
              paddingTop: fp.contentPaddingTop,
              paddingBottom: fp.contentPaddingBottom,
              containerType: 'inline-size',
            })
          )}
        }
      }
    }

    ${FooterS} {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      z-index: 950;
      ${withLayoutFinalProps((fp) =>
        toCss({
          background: fp.footerBackground,
          paddingTop: fp.footerPaddingTop,
          paddingBottom: fp.footerPaddingBottom,
          borderTop: borderPropsToCssValue(fp.footerBorderWidth, fp.footerBorderColor),
        })
      )}

      ${LayoutSectionS} {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: stretch;
      }
    }
  `

  const Layout = ({
    children,
    size,
    headerFixed,
    sidebarFixed,
    headerRender,
    sidebarRender,
    footerRender,
    modalRender,
    fullWidth,
    modalOpened,
  }: LayoutProps) => {
    const sp = {
      $size: size,
      $headerFixed: headerFixed,
      $sidebarFixed: sidebarFixed,
      $fullWidth: fullWidth,
      $headerExists: !!headerRender,
      $modalOpened: modalOpened,
    }
    useEffect(() => {
      if (modalOpened) {
        bodyScrollLock.disableBodyScroll(document.body)
      } else {
        bodyScrollLock.enableBodyScroll(document.body)
      }
    }, [modalOpened])
    return (
      <LayoutS {...sp}>
        {headerRender && (
          <HeaderPlaceS {...sp}>
            <HeaderS {...sp}>
              <LayoutSectionS {...sp}>{headerRender}</LayoutSectionS>
            </HeaderS>
          </HeaderPlaceS>
        )}
        {!!modalRender && (
          <ModalS {...sp}>
            <LayoutSectionS {...sp}>{modalRender}</LayoutSectionS>
          </ModalS>
        )}
        <SidebarAndContentS {...sp}>
          <LayoutSectionS {...sp}>
            {sidebarRender && (
              <SidebarPlaceS {...sp}>
                <SidebarS {...sp}>{sidebarRender}</SidebarS>
              </SidebarPlaceS>
            )}
            <ContentS {...sp}>{children}</ContentS>
          </LayoutSectionS>
        </SidebarAndContentS>
        {footerRender && (
          <FooterS {...sp}>
            <LayoutSectionS {...sp}>{footerRender}</LayoutSectionS>
          </FooterS>
        )}
      </LayoutS>
    )
  }
  return {
    Layout: Layout as LayoutType<TUinityConfig>,
  }
}
