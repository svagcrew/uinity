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

export type ModalStyleCoreRawProps = {
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
  /** byWindowSize */
  ws?: Array<[number, ModalStyleCoreRawProps]>
  byWindowSize?: Array<[number, ModalStyleCoreRawProps]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, ModalStyleCoreRawProps]>
  byWindowSizeReverse?: Array<[number, ModalStyleCoreRawProps]>
}
export type ModalStyleCoreProps = Required<
  Pick<
    ModalStyleCoreRawProps,
    | 'scrollContainer'
    | 'overlayColor'
    | 'overlayVisible'
    | 'closeOnOutsideClick'
    | 'overlayClickableThrough'
    | 'lockScroll'
    | 'placementVertical'
    | 'placementHorizontal'
  >
> &
  Pick<
    ModalStyleCoreRawProps,
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
    byWindowSize: Array<[number, ModalStyleCoreProps]>
    byWindowSizeReverse: Array<[number, ModalStyleCoreProps]>
  }
type UseModalProps = {
  opened?: boolean
  setOpened?: (opened: boolean) => void
  closeOnOutsideClick?: boolean
}
type ModalSpecialProps = {
  children: ReactElement
  opened?: boolean
  setOpened?: (opened: boolean) => void
}
type ModalGlobalStylesProps = ModalStyleCoreProps & {
  overlayClassName: string
  contentClassName: string
  supportingSafeJustifyContentFinished: boolean
}
export type ModalMainProps = ModalSpecialProps & { $style?: ModalStyleCoreRawProps }
export type ModalDefaultAs = 'div'
export type ModalPropsWithRef = ModalMainProps & AsPropsWithRef<ModalDefaultAs>
export type ModalPropsWithoutRef = WithoutRef<ModalPropsWithRef>
export type ModalType = (props: ModalPropsWithRef) => React.ReactElement | null

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

const ModalGlobalStyles = createGlobalStyle<ModalGlobalStylesProps>`
  ${(props) => {
    const getCssString = ({
      supportingSafeJustifyContentFinished,
      scrollContainer,
      overlayClassName,
      contentClassName,
      overlayColor,
      overlayClickableThrough,
      placementVertical,
      placementHorizontal,
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
    }: ModalGlobalStylesProps) => {
      return css`
        .${overlayClassName} {
          ${toCss({
            opacity: supportingSafeJustifyContentFinished ? 1 : 0,
            zIndex: 9_000,
            boxSizing: 'border-box',
            background: overlayColor,
            pointerEvents: overlayClickableThrough ? 'none' : 'auto',
            display: 'flex',
            flexFlow: 'column',
            paddingTop: marginTop,
            paddingRight: marginEnd,
            paddingBottom: marginBottom,
            paddingLeft: marginStart,
            justifyContent:
              placementVertical === 'center'
                ? 'safe center'
                : placementVertical === 'top'
                  ? 'safe flex-start'
                  : placementVertical === 'bottom'
                    ? 'safe flex-end'
                    : 'safe stretch',
            alignItems:
              placementHorizontal === 'center'
                ? 'center'
                : placementHorizontal === 'start'
                  ? 'flex-start'
                  : placementHorizontal === 'end'
                    ? 'flex-end'
                    : 'stretch',
          })}

          .${contentClassName} {
            ${toCss({
              opacity: supportingSafeJustifyContentFinished ? 1 : 0,
              pointerEvents: 'auto',
              boxSizing: 'border-box',
              flex: placementVertical === 'stretch' ? '1 1 100%' : '0 0 auto',
              maxWidth: `100%`,
              maxHeight: scrollContainer === 'overlay' ? undefined : '100%',
              width,
              height,
              overflow: scrollContainer === 'content' ? 'auto' : 'visible',
              backgroundColor: 'white',
              paddingTop,
              paddingRight: paddingEnd,
              paddingBottom,
              paddingLeft: paddingStart,
            })}
          }
        }
      `
    }
    return css`
      ${getCssString(props)}
      ${props?.byWindowSize?.map(([, modalGeneralProps], index) => {
        const nextWindowSize = props?.byWindowSize?.[index - 1]?.[0] ?? 0
        const cssString = getCssString({
          ...modalGeneralProps,
          supportingSafeJustifyContentFinished: props.supportingSafeJustifyContentFinished,
          overlayClassName: props.overlayClassName,
          contentClassName: props.contentClassName,
        })
        if (nextWindowSize === 0) {
          return cssString
        }
        return css`
          @media (min-width: ${nextWindowSize + 1}px) {
            ${cssString}
          }
        `
      })}
      ${props?.byWindowSizeReverse?.map(([windowSize, modalGeneralProps]) => {
        const cssString = getCssString({
          ...modalGeneralProps,
          supportingSafeJustifyContentFinished: props.supportingSafeJustifyContentFinished,
          overlayClassName: props.overlayClassName,
          contentClassName: props.contentClassName,
        })
        if (windowSize === Infinity) {
          return cssString
        }
        return css`
          @media (max-width: ${windowSize}px) {
            ${cssString}
          }
        `
      })}
    `
  }}
`

export const Modal: ModalType = forwardRefIgnoreTypes(
  (
    {
      children,
      opened,
      setOpened,
      $style = {},
      style,

      ...restProps
    }: ModalPropsWithRef,
    propRef: any
  ) => {
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
    const overlayVisibleNormalized = overlayVisible ?? true
    const overlayColorNormalized = overlayVisibleNormalized ? overlayColor ?? 'rgba(0, 0, 0, 0.8)' : 'transparent'
    const overlayClickableThroughNormalized = overlayClickableThrough ?? false
    const closeOnOutsideClickNormalized = closeOnOutsideClick ?? true
    const modal = useModal({ opened, setOpened, closeOnOutsideClick: closeOnOutsideClickNormalized })
    const ref = useMergeRefs([modal.refs.setFloating, propRef])
    const floatingProps = modal.getFloatingProps(restProps)
    const lockScrollNormalized = lockScroll ?? true
    const scrollContainerNormalized = scrollContainer ?? 'overlay'
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
    const normalizedProps: ModalStyleCoreProps = {
      scrollContainer: scrollContainerNormalized,
      overlayColor: overlayColorNormalized,
      overlayVisible: overlayVisibleNormalized,
      closeOnOutsideClick: closeOnOutsideClickNormalized,
      overlayClickableThrough: overlayClickableThroughNormalized,
      lockScroll: lockScrollNormalized,
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
      byWindowSize: [], // will be added below
      byWindowSizeReverse: [], // will be added below
    }
    normalizedProps.byWindowSize = (byWindowSize || ws || [])
      .sort(([a], [b]) => a - b)
      .map(([windowSize, propsHere], index) => {
        const prevPropsHere = byWindowSize?.[index - 1]?.[1] ?? normalizedProps
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
          overlayVisible: propsHere.overlayVisible ?? prevPropsHere.overlayVisible,
          closeOnOutsideClick: propsHere.closeOnOutsideClick ?? prevPropsHere.closeOnOutsideClick,
          overlayClickableThrough: propsHere.overlayClickableThrough ?? prevPropsHere.overlayClickableThrough,
          lockScroll: propsHere.lockScroll ?? prevPropsHere.lockScroll,
          placementVertical: propsHere.placementVertical ?? prevPropsHere.placementVertical,
          placementHorizontal: propsHere.placementHorizontal ?? prevPropsHere.placementHorizontal,
          width: propsHere.width ?? prevPropsHere.width,
          height: propsHere.height ?? prevPropsHere.height,
          scrollContainer: propsHere.scrollContainer ?? prevPropsHere.scrollContainer,
        } as ModalStyleCoreProps
        return [windowSize, propsHereNormalized]
      }) as Array<[number, ModalStyleCoreProps]>
    normalizedProps.byWindowSizeReverse = (byWindowSizeReverse || wsr || [])
      .sort(([a], [b]) => b - a)
      .map(([windowSize, propsHere], index) => {
        const prevPropsHere = byWindowSize?.[index - 1]?.[1] ?? normalizedProps
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
          overlayVisible: propsHere.overlayVisible ?? prevPropsHere.overlayVisible,
          closeOnOutsideClick: propsHere.closeOnOutsideClick ?? prevPropsHere.closeOnOutsideClick,
          overlayClickableThrough: propsHere.overlayClickableThrough ?? prevPropsHere.overlayClickableThrough,
          lockScroll: propsHere.lockScroll ?? prevPropsHere.lockScroll,
          placementVertical: propsHere.placementVertical ?? prevPropsHere.placementVertical,
          placementHorizontal: propsHere.placementHorizontal ?? prevPropsHere.placementHorizontal,
          width: propsHere.width ?? prevPropsHere.width,
          height: propsHere.width ?? prevPropsHere.height,
          scrollContainer: propsHere.scrollContainer ?? prevPropsHere.scrollContainer,
        } as ModalStyleCoreProps
        return [windowSize, propsHereNormalized]
      }) as Array<[number, ModalStyleCoreProps]>

    const uniqueMark = getGlobalClassName(normalizedProps)
    const overlayClassName = `uinity-modal-overlay-${uniqueMark}`
    const contentClassName = `uinity-modal-content-${uniqueMark}`

    // polyfill for justify-content: safe
    const originalOverlaySafeJustifyContentRef = React.useRef<string | null>(null)
    const [supportingSafeJustifyContentFinished, setSupportingSafeJustifyContentFinished] =
      React.useState(itIsSupportsSafeJustifyContent)
    useEffect(() => {
      if (itIsSupportsSafeJustifyContent) {
        return
      }
      const makeItSupportsSafeJustifyContent = () => {
        const overlayEl = document.querySelector(`.${overlayClassName}`)
        const contentEl = document.querySelector(`.${contentClassName}`)
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
        <ModalGlobalStyles
          {...{
            ...normalizedProps,
            overlayClassName,
            contentClassName,
            supportingSafeJustifyContentFinished,
            floatingProps,
          }}
        />
        <FloatingPortal>
          <FloatingOverlay
            lockScroll={normalizedProps.lockScroll ?? true}
            className={`${overlayClassName} uinity-modal-overlay`}
          >
            <FloatingFocusManager context={modal.context}>
              <div
                ref={ref}
                {...floatingProps}
                style={{
                  ...(floatingProps as any).style,
                  ...style,
                }}
                className={`${contentClassName} uinity-modal-content`}
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
