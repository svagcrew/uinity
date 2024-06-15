import '@/lib/cssContainerQueryPolyfill.js'
import { Modal } from '@/components/Modal/clear.js'
import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { borderPropsToCssValue, maybeNumberToPx, toCss } from '@uinity/core/dist/utils/other.js'
import isNil from 'lodash/isNil.js'
import { css, styled } from 'styled-components'

export type LayoutStyleCore = {
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
export type LayoutStyleRoot = LayoutStyleCore & {
  /** byWindowSize */
  ws?: Array<[number, LayoutStyleCore]>
  byWindowSize?: Array<[number, LayoutStyleCore]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, LayoutStyleCore]>
  byWindowSizeReverse?: Array<[number, LayoutStyleCore]>
}
export type LayoutStyleFinal = LayoutStyleCore & {
  byWindowSize: Array<[number, LayoutStyleCore]>
  byWindowSizeReverse: Array<[number, LayoutStyleCore]>
}
export type LayoutDefaultAs = 'div'
export type LayoutMainProps<TAs extends As = LayoutDefaultAs> = {
  as?: TAs
  $style?: LayoutStyleRoot
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

const getLayoutCoreCss = (sc: LayoutStyleCore) => {
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
        maxWidth: sc.fullWidth ? null : sc.layoutMaxWidth,
        paddingLeft: sc.layoutPaddingHorizontal,
        paddingRight: sc.layoutPaddingHorizontal,
      })}
    }

    ${HeaderPlaceS} {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      justify-content: stretch;
      ${toCss({
        height: sc.headerHeight,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: sc.headerHeight,
      })}

      ${HeaderS} {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        ${!sc.headerFixed
          ? ''
          : toCss({
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1_000,
            })}
        ${toCss({
          height: sc.headerHeight,
          background: sc.headerBackground,
          borderBottom: borderPropsToCssValue(sc.headerBorderWidth, sc.headerBorderColor),
        })}

        ${LayoutSectionS} {
          display: flex;
          flex-flow: column nowrap;
          align-items: stretch;
          justify-content: stretch;
          ${toCss({
            height: sc.headerHeight,
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
            display: sc.sidebarHidden === true ? 'none' : sc.sidebarHidden === false ? 'flex' : undefined,
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: sc.sidebarWidth,
            width: sc.sidebarWidth,
            marginRight: sc.sidebarMarginEnd,
            borderRight: borderPropsToCssValue(sc.sidebarBorderWidth, sc.sidebarBorderColor),
          })}

          ${SidebarS} {
            ${toCss({
              width: sc.sidebarWidth,
              paddingTop: sc.sidebarPaddingTop,
              paddingBottom: sc.sidebarPaddingBottom,
              containerType: 'inline-size',
            })}
            ${!sc.sidebarFixed
              ? ''
              : toCss({
                  overflowY: 'auto',
                  position: 'fixed',
                  zIndex: 900,
                  height: `calc(100% - ${maybeNumberToPx(sc.headerFixed ? sc.headerHeight : 0)})`,
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
            maxWidth: sc.contentMaxWidth,
            paddingTop: sc.contentPaddingTop,
            paddingBottom: sc.contentPaddingBottom,
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
        background: sc.footerBackground,
        paddingTop: sc.footerPaddingTop,
        paddingBottom: sc.footerPaddingBottom,
        borderTop: borderPropsToCssValue(sc.footerBorderWidth, sc.footerBorderColor),
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
const getLayoutFinalCss = ($sf: LayoutStyleFinal) => {
  return css`
    ${getLayoutCoreCss($sf)}

    ${$sf.byWindowSize.map(([, coreStyleProps], index) => {
      const nextWindowSize = $sf.byWindowSize?.[index - 1]?.[0] ?? 0
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
  ${$sf.byWindowSizeReverse.map(([windowSize, coreStyleProps]) => {
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
}

const LayoutSectionS = styled.div.attrs(mark('LayoutSectionS'))``
const HeaderS = styled.div.attrs(mark('HeaderS'))``
const HeaderPlaceS = styled.div.attrs(mark('HeaderPlaceS'))``
const SidebarPlaceS = styled.div.attrs(mark('SidebarPlaceS'))``
const SidebarS = styled.div.attrs(mark('SidebarS'))``
const ContentS = styled.div.attrs(mark('ContentS'))``
const SidebarAndContentS = styled.div.attrs(mark('SidebarAndContentS'))``
const FooterS = styled.div.attrs(mark('FooterS'))``
const LayoutS = styled.div.attrs(mark('LayoutS'))<{ $sf: LayoutStyleFinal }>`
  ${({ $sf }) => {
    return getLayoutFinalCss($sf)
  }}
`

const getLayoutModalCoreCss = (sc: LayoutStyleCore) => {
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
        maxWidth: sc.fullWidth ? null : sc.layoutMaxWidth,
        paddingLeft: sc.layoutPaddingHorizontal,
        paddingRight: sc.layoutPaddingHorizontal,
        paddingTop: sc.modalPaddingTop,
        paddingBottom: sc.modalPaddingBottom,
        borderTop: borderPropsToCssValue(sc.modalBorderWidth, sc.modalBorderColor),
      })}
    }
  `
}
const getLayoutModalFinalCss = ($sf: LayoutStyleFinal) => {
  return css`
    ${getLayoutModalCoreCss($sf)}

    ${($sf.byWindowSize || []).map(([, coreStyleProps], index) => {
      const nextWindowSize = $sf.byWindowSize?.[index - 1]?.[0] ?? 0
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
      ${($sf.byWindowSizeReverse || []).map(([windowSize, coreStyleProps]) => {
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
}
const ModalS = styled.div.attrs(mark('ModalS'))<{
  $sf: LayoutStyleFinal
}>`
  ${({ $sf }) => {
    return getLayoutModalFinalCss($sf)
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
    const $sf: LayoutStyleFinal = {
      ...$style,
      byWindowSize: [], // will be assigned below
      byWindowSizeReverse: [], // will be assigned below
    }
    $sf.byWindowSize = ($style.byWindowSize || $style.ws || []).sort(([a], [b]) => a - b)
    $sf.byWindowSizeReverse = ($style.byWindowSizeReverse || $style.wsr || []).sort(([a], [b]) => b - a)
    return (
      <>
        <LayoutS {...(restProps as {})} $sf={$sf} ref={ref}>
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
              ws: $sf.byWindowSize
                .map(([size, cfp]) => (isNil(cfp.headerHeight) ? false : [size, { marginTop: cfp.headerHeight }]))
                .filter(Boolean) as any,
              wsr: $sf.byWindowSizeReverse
                .map(([size, cfp]) => (isNil(cfp.headerHeight) ? false : [size, { marginTop: cfp.headerHeight }]))
                .filter(Boolean) as any,
            }}
          >
            <ModalS $sf={$sf}>
              <LayoutSectionS>{modalRender}</LayoutSectionS>
            </ModalS>
          </Modal>
        )}
      </>
    )
  }
)
