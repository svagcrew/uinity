import '@/lib/cssContainerQueryPolyfill.js'
import { Modal } from '@/components/Modal/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { borderPropsToCssValue, maybeNumberToPx, toCss } from '@uinity/core/dist/utils/other.js'
import isNil from 'lodash/isNil.js'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'

export type LayoutStyleCoreProps = {
  layoutMaxWidth?: number | string | null | undefined
  contentMaxWidth?: number | string | null | undefined
  textMaxWidth?: number | string | null | undefined
  layoutPaddingHorizontal?: number | string | null | undefined
  headerHeight?: number | string | null | undefined
  sidebarWidth?: number | string | null | undefined
  contentPaddingTop?: number | string | null | undefined
  contentPaddingBottom?: number | string | null | undefined
  footerPaddingTop?: number | string | null | undefined
  footerPaddingBottom?: number | string | null | undefined
  sidebarPaddingTop?: number | string | null | undefined
  sidebarPaddingBottom?: number | string | null | undefined
  sidebarMarginEnd?: number | string | null | undefined
  modalPaddingTop?: number | string | null | undefined
  modalPaddingBottom?: number | string | null | undefined
  headerBorderWidth?: number | string | null | undefined
  footerBorderWidth?: number | string | null | undefined
  sidebarBorderWidth?: number | string | null | undefined
  modalBorderWidth?: number | string | null | undefined

  bodyBackground?: string | null | undefined
  headerBackground?: string | null | undefined
  footerBackground?: string | null | undefined
  modalBackground?: string | null | undefined
  headerBorderColor?: string | null | undefined
  footerBorderColor?: string | null | undefined
  sidebarBorderColor?: string | null | undefined
  modalBorderColor?: string | null | undefined

  headerFixed?: boolean
  sidebarFixed?: boolean
  /** Should be setted to true or false to work! */
  sidebarHidden?: boolean
  fullWidth?: boolean
}
export type LayoutStyleRootProps = LayoutStyleCoreProps & {
  /** byWindowSize */
  ws?: Array<[number, LayoutStyleCoreProps]>
  byWindowSize?: Array<[number, LayoutStyleCoreProps]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, LayoutStyleCoreProps]>
  byWindowSizeReverse?: Array<[number, LayoutStyleCoreProps]>
}
export type LayoutDefaultAs = 'div'
export type LayoutMainProps<TAs extends As = LayoutDefaultAs> = {
  as?: TAs
  $style?: LayoutStyleRootProps
  modalOpened?: boolean
  setModalOpened?: (opened: boolean) => void
  headerRender?: React.ReactNode
  modalRender?: React.ReactNode
  sidebarRender?: React.ReactNode
  footerRender?: React.ReactNode
  children?: React.ReactNode
}
export type LayoutPropsWithRef<TAs extends As = LayoutDefaultAs> = LayoutMainProps<TAs> & AsPropsWithRef<TAs>
export type LayoutPropsWithoutRef<TAs extends As = LayoutDefaultAs> = WithoutRef<LayoutPropsWithRef<TAs>>
export type LayoutType = <TAs extends As = LayoutDefaultAs>(props: LayoutPropsWithRef<TAs>) => React.ReactNode

const getLayoutCoreCss = (scp: LayoutStyleCoreProps): RuleSet | string => {
  return css`
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
      ${toCss({
        width: '100%',
        maxWidth: scp.fullWidth ? null : scp.layoutMaxWidth,
        paddingLeft: scp.layoutPaddingHorizontal,
        paddingRight: scp.layoutPaddingHorizontal,
      })}
    }

    ${HeaderPlaceS} {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      justify-content: stretch;
      ${toCss({
        height: scp.headerHeight,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: scp.headerHeight,
      })}

      ${HeaderS} {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        ${!scp.headerFixed
          ? ''
          : toCss({
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1_000,
            })}
        ${toCss({
          height: scp.headerHeight,
          background: scp.headerBackground,
          borderBottom: borderPropsToCssValue(scp.headerBorderWidth, scp.headerBorderColor),
        })}

        ${LayoutSectionS} {
          display: flex;
          flex-flow: column nowrap;
          align-items: stretch;
          justify-content: stretch;
          ${toCss({
            height: scp.headerHeight,
          })}
        }
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
          flex-flow: column nowrap;
          align-items: stretch;
          justify-content: stretch;
          ${toCss({
            display: scp.sidebarHidden === true ? 'none' : scp.sidebarHidden === false ? 'flex' : undefined,
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: scp.sidebarWidth,
            width: scp.sidebarWidth,
            marginRight: scp.sidebarMarginEnd,
            borderRight: borderPropsToCssValue(scp.sidebarBorderWidth, scp.sidebarBorderColor),
          })}

          ${SidebarS} {
            ${toCss({
              width: scp.sidebarWidth,
              paddingTop: scp.sidebarPaddingTop,
              paddingBottom: scp.sidebarPaddingBottom,
              containerType: 'inline-size',
            })}
            ${!scp.sidebarFixed
              ? ''
              : toCss({
                  overflowY: 'auto',
                  position: 'fixed',
                  zIndex: 900,
                  height: `calc(100% - ${maybeNumberToPx(scp.headerFixed ? scp.headerHeight : 0)})`,
                })}
          }
        }

        ${ContentS} {
          display: flex;
          flex-flow: column nowrap;
          align-items: flex-start;
          justify-content: stretch;
          ${toCss({
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: '100%',
            maxWidth: scp.contentMaxWidth,
            paddingTop: scp.contentPaddingTop,
            paddingBottom: scp.contentPaddingBottom,
            containerType: 'inline-size',
          })}
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
      ${toCss({
        background: scp.footerBackground,
        paddingTop: scp.footerPaddingTop,
        paddingBottom: scp.footerPaddingBottom,
        borderTop: borderPropsToCssValue(scp.footerBorderWidth, scp.footerBorderColor),
      })}

      ${LayoutSectionS} {
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: stretch;
      }
    }
  `
}

const LayoutSectionS = styled.div.attrs(mark('LayoutSectionS'))``
const HeaderS = styled.div.attrs(mark('HeaderS'))``
const HeaderPlaceS = styled.div.attrs(mark('HeaderPlaceS'))``
const SidebarPlaceS = styled.div.attrs(mark('SidebarPlaceS'))``
const SidebarS = styled.div.attrs(mark('SidebarS'))``
const ContentS = styled.div.attrs(mark('ContentS'))``
const SidebarAndContentS = styled.div.attrs(mark('SidebarAndContentS'))``
const FooterS = styled.div.attrs(mark('FooterS'))``
const LayoutS = styled.div.attrs(mark('LayoutS'))<{ $style: LayoutStyleRootProps }>`
  ${({ $style }) => {
    return css`
      ${getLayoutCoreCss($style)}

      ${($style.byWindowSize || []).map(([, coreStyleProps], index) => {
        const nextWindowSize = $style.byWindowSize?.[index - 1]?.[0] ?? 0
        const coreCss = getLayoutCoreCss({
          ...coreStyleProps,
        })
        if (nextWindowSize === 0) {
          return coreCss
        }
        return css`
          @media (min-width: ${nextWindowSize + 1}px) {
            ${coreCss}
          }
        `
      })}
      ${($style.byWindowSizeReverse || []).map(([windowSize, coreStyleProps]) => {
        const coreCss = getLayoutCoreCss({
          ...coreStyleProps,
        })
        if (windowSize === Infinity) {
          return coreCss
        }
        return css`
          @media (max-width: ${windowSize}px) {
            ${coreCss}
          }
        `
      })}
    `
  }}
`

const getLayoutModalCoreCss = (scp: LayoutStyleCoreProps): RuleSet | string => {
  return css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: stretch;

    ${LayoutSectionS} {
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      justify-content: stretch;
      ${toCss({
        width: '100%',
        maxWidth: scp.fullWidth ? null : scp.layoutMaxWidth,
        paddingLeft: scp.layoutPaddingHorizontal,
        paddingRight: scp.layoutPaddingHorizontal,
        paddingTop: scp.modalPaddingTop,
        paddingBottom: scp.modalPaddingBottom,
        borderTop: borderPropsToCssValue(scp.modalBorderWidth, scp.modalBorderColor),
      })}
    }
  `
}
const ModalS = styled.div.attrs(mark('ModalS'))<{
  $style: LayoutStyleRootProps
}>`
  ${({ $style }) => {
    return css`
      ${getLayoutModalCoreCss($style)}

      ${($style.byWindowSize || []).map(([, coreStyleProps], index) => {
        const nextWindowSize = $style.byWindowSize?.[index - 1]?.[0] ?? 0
        const coreCss = getLayoutModalCoreCss({
          ...coreStyleProps,
        })
        if (nextWindowSize === 0) {
          return coreCss
        }
        return css`
          @media (min-width: ${nextWindowSize + 1}px) {
            ${coreCss}
          }
        `
      })}
      ${($style.byWindowSizeReverse || []).map(([windowSize, coreStyleProps]) => {
        const coreCss = getLayoutModalCoreCss({
          ...coreStyleProps,
        })
        if (windowSize === Infinity) {
          return coreCss
        }
        return css`
          @media (max-width: ${windowSize}px) {
            ${coreCss}
          }
        `
      })}
    `
  }}
`

export const Layout: LayoutType = forwardRefIgnoreTypes(
  (
    {
      children,
      headerRender,
      sidebarRender,
      footerRender,
      modalRender,
      modalOpened,
      setModalOpened,
      $style = {},
      ...restProps
    }: LayoutPropsWithoutRef<'div'>,
    ref: any
  ) => {
    $style.byWindowSize = ($style.byWindowSize || $style.ws || []).sort(([a], [b]) => a - b)
    $style.byWindowSizeReverse = ($style.byWindowSizeReverse || $style.wsr || []).sort(([a], [b]) => b - a)
    return (
      <>
        <LayoutS {...(restProps as {})} $style={$style} ref={ref}>
          {headerRender && (
            <HeaderPlaceS>
              <HeaderS>
                <LayoutSectionS>{headerRender}</LayoutSectionS>
              </HeaderS>
            </HeaderPlaceS>
          )}
          <SidebarAndContentS>
            <LayoutSectionS>
              {sidebarRender && (
                <SidebarPlaceS>
                  <SidebarS>{sidebarRender}</SidebarS>
                </SidebarPlaceS>
              )}
              <ContentS>{children}</ContentS>
            </LayoutSectionS>
          </SidebarAndContentS>
          {footerRender && (
            <FooterS>
              <LayoutSectionS>{footerRender}</LayoutSectionS>
            </FooterS>
          )}
        </LayoutS>
        {!!modalRender && (
          <Modal
            opened={modalOpened}
            setOpened={setModalOpened}
            $style={{
              placement: 'stretch-stretch',
              marginTop: $style.headerHeight,
              overlayVisible: false,
              closeOnOutsideClick: false,
              overlayClickableThrough: true,
              ws: ($style.byWindowSize || $style.ws || [])
                .map(([size, cfp]) => (isNil(cfp.headerHeight) ? false : [size, { marginTop: cfp.headerHeight }]))
                .filter(Boolean) as any,
              wsr: ($style.byWindowSizeReverse || $style.wsr || [])
                .map(([size, cfp]) => (isNil(cfp.headerHeight) ? false : [size, { marginTop: cfp.headerHeight }]))
                .filter(Boolean) as any,
            }}
          >
            <ModalS $style={$style}>
              <LayoutSectionS>{modalRender}</LayoutSectionS>
            </ModalS>
          </Modal>
        )}
      </>
    )
  }
)
