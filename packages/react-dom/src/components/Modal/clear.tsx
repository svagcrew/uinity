/* eslint-disable prefer-const */
/* eslint-disable react/forbid-component-props */
import { itIsSupportsSafeJustifyContent } from '@/lib/cssSafeJustifyContent.js'
import type { AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, getGlobalClassName, parseSpacing } from '@/utils.js'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'
import { toCss } from '@uinity/core/dist/utils/other.js'
import isBoolean from 'lodash/isBoolean.js'
import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import { createGlobalStyle, css } from 'styled-components'

export type ModalStyleRootCore = {
  scrollContainer?: 'overlay' | 'content' | undefined | null
  overlayColor?: string | undefined | null
  overlayVisible?: boolean | undefined | null
  closeOnOutsideClick?: boolean | undefined | null
  overlayClickableThrough?: boolean | undefined | null
  lockScroll?: boolean | undefined | null
  placementVertical?: 'top' | 'center' | 'bottom' | 'stretch' | undefined | null
  placementHorizontal?: 'start' | 'center' | 'end' | 'stretch' | undefined | null
  placement?:
    | 'top-center'
    | 'top-start'
    | 'top-end'
    | 'top-stretch'
    | 'center-center'
    | 'center-start'
    | 'center-end'
    | 'center-stretch'
    | 'bottom-center'
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom-stretch'
    | 'stretch-center'
    | 'stretch-start'
    | 'stretch-end'
    | 'stretch-stretch'
    | undefined
    | null
  width?: string | number | undefined | null
  height?: string | number | undefined | null
  margin?: string | number | undefined | null
  marginTop?: string | number | undefined | null
  marginEnd?: string | number | undefined | null
  marginBottom?: string | number | undefined | null
  marginStart?: string | number | undefined | null
  padding?: string | number | undefined | null
  paddingTop?: string | number | undefined | null
  paddingEnd?: string | number | undefined | null
  paddingBottom?: string | number | undefined | null
  paddingStart?: string | number | undefined | null
}
export type ModalStyleRoot = ModalStyleRootCore & {
  /** byWindowSize */
  ws?: Array<[number, ModalStyleRootCore]>
  byWindowSize?: Array<[number, ModalStyleRootCore]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, ModalStyleRootCore]>
  byWindowSizeReverse?: Array<[number, ModalStyleRootCore]>
}
export type ModalStyleFinalCore = Required<
  Pick<
    ModalStyleRoot,
    | 'scrollContainer'
    | 'overlayColor'
    | 'closeOnOutsideClick'
    | 'overlayClickableThrough'
    | 'lockScroll'
    | 'placementVertical'
    | 'placementHorizontal'
  >
> &
  Pick<
    ModalStyleRoot,
    | 'width'
    | 'height'
    | 'marginTop'
    | 'marginEnd'
    | 'marginBottom'
    | 'marginStart'
    | 'paddingTop'
    | 'paddingEnd'
    | 'paddingBottom'
    | 'paddingStart'
  > & {
    overlayClassName: string
    contentClassName: string
    supportingSafeJustifyContentFinished: boolean
  }
export type ModalStyleFinal = ModalStyleFinalCore & {
  byWindowSize: Array<[number, ModalStyleFinalCore]>
  byWindowSizeReverse: Array<[number, ModalStyleFinalCore]>
}
type UseModalProps = {
  opened?: boolean
  setOpened?: (opened: boolean) => void
  closeOnOutsideClick?: boolean
}
export type ModalMainProps = {
  $style?: ModalStyleRoot
  children: ReactElement
  opened?: boolean
  setOpened?: (opened: boolean) => void
}
export type ModalDefaultAs = 'div'
export type ModalPropsWithRef = ModalMainProps & AsPropsWithRef<ModalDefaultAs>
export type ModalPropsWithoutRef = WithoutRef<ModalPropsWithRef>
export type ModalType = (props: ModalPropsWithRef) => React.ReactNode

const useModal = ({ opened, setOpened, closeOnOutsideClick }: UseModalProps = {}) => {
  closeOnOutsideClick = isBoolean(closeOnOutsideClick) ? closeOnOutsideClick : true
  const data = useFloating({
    open: opened,
    onOpenChange: setOpened,
  })
  const context = data.context
  const dismiss = useDismiss(
    context,
    closeOnOutsideClick
      ? { outsidePressEvent: 'mousedown', outsidePress: true }
      : { outsidePressEvent: undefined, outsidePress: false }
  )
  const role = useRole(context)
  const interactions = useInteractions([dismiss, role])
  return React.useMemo(
    () => ({
      opened,
      setOpened,
      ...interactions,
      ...data,
    }),
    [opened, setOpened, interactions, data]
  )
}

const getModalCoreCss = (sc: ModalStyleFinalCore) => {
  return css`
    .${sc.overlayClassName} {
      ${toCss({
        opacity: sc.supportingSafeJustifyContentFinished ? 1 : 0,
        zIndex: 9_000,
        boxSizing: 'border-box',
        background: sc.overlayColor,
        pointerEvents: sc.overlayClickableThrough ? 'none' : 'auto',
        display: 'flex',
        flexFlow: 'column',
        paddingTop: sc.marginTop,
        paddingRight: sc.marginEnd,
        paddingBottom: sc.marginBottom,
        paddingLeft: sc.marginStart,
        justifyContent:
          sc.placementVertical === 'center'
            ? 'safe center'
            : sc.placementVertical === 'top'
              ? 'safe flex-start'
              : sc.placementVertical === 'bottom'
                ? 'safe flex-end'
                : 'safe stretch',
        alignItems:
          sc.placementHorizontal === 'center'
            ? 'center'
            : sc.placementHorizontal === 'start'
              ? 'flex-start'
              : sc.placementHorizontal === 'end'
                ? 'flex-end'
                : 'stretch',
      })}

      .${sc.contentClassName} {
        ${toCss({
          opacity: sc.supportingSafeJustifyContentFinished ? 1 : 0,
          pointerEvents: 'auto',
          boxSizing: 'border-box',
          flex: sc.placementVertical === 'stretch' ? '1 1 100%' : '0 0 auto',
          maxWidth: `100%`,
          maxHeight: sc.scrollContainer === 'overlay' ? undefined : '100%',
          width: sc.width,
          height: sc.height,
          overflow: sc.scrollContainer === 'content' ? 'auto' : 'visible',
          backgroundColor: 'white',
          paddingTop: sc.paddingTop,
          paddingRight: sc.paddingEnd,
          paddingBottom: sc.paddingBottom,
          paddingLeft: sc.paddingStart,
        })}
      }
    }
  `
}
const getModalFinalCss = ($sf: ModalStyleFinal) => {
  return css`
    ${getModalCoreCss($sf)}
    ${$sf.byWindowSize.map(([, modalStyleFinalCore], index) => {
      const nextWindowSize = $sf.byWindowSize[index - 1]?.[0] ?? 0
      const coreCss = getModalCoreCss({
        ...modalStyleFinalCore,
        overlayClassName: $sf.overlayClassName,
        contentClassName: $sf.contentClassName,
        supportingSafeJustifyContentFinished: $sf.supportingSafeJustifyContentFinished,
      })
      if (nextWindowSize === 0) {
        return coreCss
      } else {
        return css`
          @media (min-width: ${nextWindowSize + 1}px) {
            ${coreCss}
          }
        `
      }
    })}
  ${$sf.byWindowSizeReverse.map(([windowSize, modalStyleFinalCore]) => {
      const coreCss = getModalCoreCss({
        ...modalStyleFinalCore,
        overlayClassName: $sf.overlayClassName,
        contentClassName: $sf.contentClassName,
        supportingSafeJustifyContentFinished: $sf.supportingSafeJustifyContentFinished,
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
const ModalGlobalStyles = createGlobalStyle<{ $sf: ModalStyleFinal }>`
  ${({ $sf }) => getModalFinalCss($sf)}
`

export const Modal: ModalType = forwardRefIgnoreTypes(
  ({ children, opened, setOpened, $style = {}, style, ...restProps }: ModalPropsWithoutRef, propRef: any) => {
    let {
      overlayColor,
      overlayVisible,
      closeOnOutsideClick,
      overlayClickableThrough,
      lockScroll,
      placement,
      placementVertical,
      placementHorizontal,
      scrollContainer,
      width,
      height,
      margin,
      marginTop,
      marginEnd,
      marginBottom,
      marginStart,
      padding,
      paddingTop,
      paddingEnd,
      paddingBottom,
      paddingStart,
      ws,
      byWindowSize,
      wsr,
      byWindowSizeReverse,
    } = $style
    const {
      top: marginTop1,
      end: marginEnd1,
      bottom: marginBottom1,
      start: marginStart1,
    } = parseSpacing(margin, marginTop, marginEnd, marginBottom, marginStart)
    marginTop = marginTop1
    marginEnd = marginEnd1
    marginBottom = marginBottom1
    marginStart = marginStart1
    const {
      top: paddingTop1,
      end: paddingEnd1,
      bottom: paddingBottom1,
      start: paddingStart1,
    } = parseSpacing(padding, paddingTop, paddingEnd, paddingBottom, paddingStart)
    paddingTop = paddingTop1
    paddingEnd = paddingEnd1
    paddingBottom = paddingBottom1
    paddingStart = paddingStart1
    const placementParts = placement ? placement?.split('-') : [placementVertical, placementHorizontal]
    const placementVerticalNormalized = (placementParts?.[0] ?? 'center') as 'top' | 'center' | 'bottom' | 'stretch'
    const placementHorizontalNormalized = (placementParts?.[1] ?? 'center') as 'start' | 'center' | 'end' | 'stretch'
    const [supportingSafeJustifyContentFinished, setSupportingSafeJustifyContentFinished] =
      React.useState(itIsSupportsSafeJustifyContent)
    const $sf: ModalStyleFinal = {
      scrollContainer: scrollContainer ?? 'overlay',
      overlayColor: overlayVisible ?? true ? overlayColor ?? 'rgba(0, 0, 0, 0.8)' : 'transparent',
      closeOnOutsideClick: closeOnOutsideClick ?? true,
      overlayClickableThrough: overlayClickableThrough ?? false,
      lockScroll: lockScroll ?? true,
      placementVertical: placementVerticalNormalized,
      placementHorizontal: placementHorizontalNormalized,
      width,
      height,
      marginTop,
      marginEnd,
      marginBottom,
      marginStart,
      paddingTop,
      paddingEnd,
      paddingBottom,
      paddingStart,
      supportingSafeJustifyContentFinished,
      byWindowSize: [], // will be added below
      byWindowSizeReverse: [], // will be added below
      contentClassName: '', // will be added below
      overlayClassName: '', // will be added below
    }
    $sf.byWindowSize = (byWindowSize || ws || [])
      .sort(([a], [b]) => a - b)
      .map(([windowSize, propsHere], index) => {
        const prevPropsHere = byWindowSize?.[index - 1]?.[1] ?? $sf
        const {
          top: marginTop1,
          end: marginEnd1,
          bottom: marginBottom1,
          start: marginStart1,
        } = parseSpacing(
          propsHere.margin,
          propsHere.marginTop,
          propsHere.marginEnd,
          propsHere.marginBottom,
          propsHere.marginStart
        )
        const {
          top: paddingTop1,
          end: paddingEnd1,
          bottom: paddingBottom1,
          start: paddingStart1,
        } = parseSpacing(
          propsHere.padding,
          propsHere.paddingTop,
          propsHere.paddingEnd,
          propsHere.paddingBottom,
          propsHere.paddingStart
        )
        const propsHereNormalized = {
          marginTop: marginTop1 ?? prevPropsHere.marginTop,
          marginEnd: marginEnd1 ?? prevPropsHere.marginEnd,
          marginBottom: marginBottom1 ?? prevPropsHere.marginBottom,
          marginStart: marginStart1 ?? prevPropsHere.marginStart,
          paddingTop: paddingTop1 ?? prevPropsHere.paddingTop,
          paddingEnd: paddingEnd1 ?? prevPropsHere.paddingEnd,
          paddingBottom: paddingBottom1 ?? prevPropsHere.paddingBottom,
          paddingStart: paddingStart1 ?? prevPropsHere.paddingStart,
          overlayColor: propsHere.overlayColor ?? prevPropsHere.overlayColor,
          closeOnOutsideClick: propsHere.closeOnOutsideClick ?? prevPropsHere.closeOnOutsideClick,
          overlayClickableThrough: propsHere.overlayClickableThrough ?? prevPropsHere.overlayClickableThrough,
          lockScroll: propsHere.lockScroll ?? prevPropsHere.lockScroll,
          placementVertical: propsHere.placementVertical ?? prevPropsHere.placementVertical,
          placementHorizontal: propsHere.placementHorizontal ?? prevPropsHere.placementHorizontal,
          width: propsHere.width ?? prevPropsHere.width,
          height: propsHere.height ?? prevPropsHere.height,
          scrollContainer: propsHere.scrollContainer ?? prevPropsHere.scrollContainer,
        } as ModalStyleFinalCore
        return [windowSize, propsHereNormalized]
      }) as Array<[number, ModalStyleFinalCore]>
    $sf.byWindowSizeReverse = (byWindowSizeReverse || wsr || [])
      .sort(([a], [b]) => b - a)
      .map(([windowSize, propsHere], index) => {
        const prevPropsHere = byWindowSize?.[index - 1]?.[1] ?? $sf
        const {
          top: marginTop1,
          end: marginEnd1,
          bottom: marginBottom1,
          start: marginStart1,
        } = parseSpacing(
          propsHere.margin,
          propsHere.marginTop,
          propsHere.marginEnd,
          propsHere.marginBottom,
          propsHere.marginStart
        )
        const {
          top: paddingTop1,
          end: paddingEnd1,
          bottom: paddingBottom1,
          start: paddingStart1,
        } = parseSpacing(
          propsHere.padding,
          propsHere.paddingTop,
          propsHere.paddingEnd,
          propsHere.paddingBottom,
          propsHere.paddingStart
        )
        const propsHereNormalized = {
          marginTop: marginTop1 ?? prevPropsHere.marginTop,
          marginEnd: marginEnd1 ?? prevPropsHere.marginEnd,
          marginBottom: marginBottom1 ?? prevPropsHere.marginBottom,
          marginStart: marginStart1 ?? prevPropsHere.marginStart,
          paddingTop: paddingTop1 ?? prevPropsHere.paddingTop,
          paddingEnd: paddingEnd1 ?? prevPropsHere.paddingEnd,
          paddingBottom: paddingBottom1 ?? prevPropsHere.paddingBottom,
          paddingStart: paddingStart1 ?? prevPropsHere.paddingStart,
          overlayColor: propsHere.overlayColor ?? prevPropsHere.overlayColor,
          closeOnOutsideClick: propsHere.closeOnOutsideClick ?? prevPropsHere.closeOnOutsideClick,
          overlayClickableThrough: propsHere.overlayClickableThrough ?? prevPropsHere.overlayClickableThrough,
          lockScroll: propsHere.lockScroll ?? prevPropsHere.lockScroll,
          placementVertical: propsHere.placementVertical ?? prevPropsHere.placementVertical,
          placementHorizontal: propsHere.placementHorizontal ?? prevPropsHere.placementHorizontal,
          width: propsHere.width ?? prevPropsHere.width,
          height: propsHere.width ?? prevPropsHere.height,
          scrollContainer: propsHere.scrollContainer ?? prevPropsHere.scrollContainer,
        } as ModalStyleFinalCore
        return [windowSize, propsHereNormalized]
      }) as Array<[number, ModalStyleFinalCore]>

    const uniqueMark = getGlobalClassName($sf)
    $sf.overlayClassName = `uinity-modal-overlay-${uniqueMark}`
    $sf.contentClassName = `uinity-modal-content-${uniqueMark}`

    const lockScrollHere = !!$sf.lockScroll
    const closeOnOutsideClickHere = !!$sf.closeOnOutsideClick
    // TODO: modify lockScrollHere and closeOnOutsideClickHere by windowSize
    const modal = useModal({ opened, setOpened, closeOnOutsideClick: closeOnOutsideClickHere })
    const ref = useMergeRefs([modal.refs.setFloating, propRef])
    const floatingProps = modal.getFloatingProps(restProps)

    // polyfill for justify-content: safe
    const originalOverlaySafeJustifyContentRef = React.useRef<string | null>(null)
    useEffect(() => {
      if (itIsSupportsSafeJustifyContent) {
        return
      }
      const makeItSupportsSafeJustifyContent = () => {
        const overlayEl = document.querySelector(`.${$sf.overlayClassName}`)
        const contentEl = document.querySelector(`.${$sf.contentClassName}`)
        if (!(overlayEl instanceof HTMLElement) || !(contentEl instanceof HTMLElement)) {
          return
        }
        const overlayStyle = getComputedStyle(overlayEl)
        const overlayHeight =
          overlayEl.getBoundingClientRect().height -
          parseFloat(overlayStyle.paddingTop) -
          parseFloat(overlayStyle.paddingBottom)
        const contentHeight = contentEl.getBoundingClientRect().height
        originalOverlaySafeJustifyContentRef.current =
          originalOverlaySafeJustifyContentRef.current || overlayStyle.justifyContent
        if (contentHeight <= overlayHeight) {
          overlayEl.style.justifyContent = originalOverlaySafeJustifyContentRef.current.replace('safe ', '')
        } else {
          overlayEl.style.justifyContent = 'flex-start'
        }
        if (!supportingSafeJustifyContentFinished) {
          setSupportingSafeJustifyContentFinished(true)
        }
      }
      if (modal.context.open) {
        makeItSupportsSafeJustifyContent()
        const interval = setInterval(() => {
          makeItSupportsSafeJustifyContent()
        }, 100)
        // eslint-disable-next-line consistent-return
        return () => {
          clearInterval(interval)
        }
      } else {
        setSupportingSafeJustifyContentFinished(itIsSupportsSafeJustifyContent)
      }
    }, [modal.context.open])
    if (!modal.context.open) {
      return null
    }

    return (
      <>
        <ModalGlobalStyles $sf={$sf} />
        <FloatingPortal>
          <FloatingOverlay lockScroll={lockScrollHere} className={$sf.overlayClassName}>
            <FloatingFocusManager context={modal.context}>
              <div
                ref={ref}
                {...floatingProps}
                style={{
                  ...(floatingProps as any).style,
                  ...style,
                }}
                className={$sf.contentClassName}
              >
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      </>
    )
  }
)
