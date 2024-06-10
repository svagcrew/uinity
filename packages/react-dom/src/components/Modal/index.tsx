/* eslint-disable react/forbid-component-props */
import { itIsSupportsSafeJustifyContent } from '@/lib/cssSafeJustifyContent.js'
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
import isBoolean from 'lodash/isBoolean.js'
import type { ForwardRefExoticComponent, HTMLProps, ReactElement, RefAttributes } from 'react'
import React, { useEffect } from 'react'
import { createGlobalStyle, css } from 'styled-components'
import { getHash } from 'svag-utils/dist/utils/hash.js'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'

export type ModalGeneralProps = {
  scrollContainer?: 'overlay' | 'content'
  overlayColor?: string
  overlayVisible?: boolean
  closeOnOutsideClick?: boolean
  overlayClickableThrough?: boolean
  lockScroll?: boolean
  verticalPlacement?: 'top' | 'center' | 'bottom' | 'stretch'
  horizontalPlacement?: 'start' | 'center' | 'end' | 'stretch'
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
  width?: string | number
  margin?: string | number
  marginTop?: string | number
  marginRight?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  padding?: string | number
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  /** byWindowSize */
  ws?: Array<[number, ModalGeneralProps]>
  byWindowSize?: Array<[number, ModalGeneralProps]>
  /** byWindowSizeReverse */
  wsr?: Array<[number, ModalGeneralProps]>
  byWindowSizeReverse?: Array<[number, ModalGeneralProps]>
}
type ModalGeneralPropsNormalized = Required<
  Pick<
    ModalGeneralProps,
    | 'scrollContainer'
    | 'overlayColor'
    | 'overlayVisible'
    | 'closeOnOutsideClick'
    | 'overlayClickableThrough'
    | 'lockScroll'
    | 'verticalPlacement'
    | 'horizontalPlacement'
  >
> &
  Pick<
    ModalGeneralProps,
    | 'width'
    | 'marginTop'
    | 'marginRight'
    | 'marginBottom'
    | 'marginLeft'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft'
  > & {
    byWindowSize: Array<[number, ModalGeneralPropsNormalized]>
    byWindowSizeReverse: Array<[number, ModalGeneralPropsNormalized]>
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
type ModalGlobalStylesProps = ModalGeneralPropsNormalized & {
  overlayClassName: string
  contentClassName: string
  supportingSafeJustifyContentFinished: boolean
}
type ModalProps = ModalGeneralProps & UseModalProps & ModalSpecialProps
export type ModalType = ForwardRefExoticComponent<
  HTMLProps<HTMLDivElement> & ModalProps & RefAttributes<HTMLDivElement>
>

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

const parseSpacing = (
  spacing?: string | number | undefined,
  spacingTop?: string | number,
  spacingRight?: string | number,
  spacingBottom?: string | number,
  spacingLeft?: string | number
) => {
  if (spacing !== undefined) {
    if (typeof spacing === 'number') {
      return {
        top: spacing,
        right: spacing,
        bottom: spacing,
        left: spacing,
      }
    }
    const spacingParts = spacing.split(' ')
    if (spacingParts.length === 1) {
      return {
        top: spacingParts[0],
        right: spacingParts[0],
        bottom: spacingParts[0],
        left: spacingParts[0],
      }
    }
    if (spacingParts.length === 2) {
      return {
        top: spacingParts[0],
        right: spacingParts[1],
        bottom: spacingParts[0],
        left: spacingParts[1],
      }
    }
    if (spacingParts.length === 3) {
      return {
        top: spacingParts[0],
        right: spacingParts[1],
        bottom: spacingParts[2],
        left: spacingParts[1],
      }
    }
    if (spacingParts.length === 4) {
      return {
        top: spacingParts[0],
        right: spacingParts[1],
        bottom: spacingParts[2],
        left: spacingParts[3],
      }
    }
  }
  return {
    top: spacingTop,
    right: spacingRight,
    bottom: spacingBottom,
    left: spacingLeft,
  }
}

const GlobalStyles = createGlobalStyle<ModalGlobalStylesProps>`
  ${(props) => {
    const getCssString = ({
      supportingSafeJustifyContentFinished,
      scrollContainer,
      overlayClassName,
      contentClassName,
      overlayColor,
      overlayClickableThrough,
      verticalPlacement,
      horizontalPlacement,
      width,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }: ModalGlobalStylesProps) => {
      return css`
        .${overlayClassName} {
          ${camelCaseObjectToCss({
            opacity: supportingSafeJustifyContentFinished ? 1 : 0,
            zIndex: 9_000,
            boxSizing: 'border-box',
            background: overlayColor,
            pointerEvents: overlayClickableThrough ? 'none' : 'auto',
            display: 'flex',
            flexFlow: 'column',
            paddingTop: marginTop,
            paddingRight: marginRight,
            paddingBottom: marginBottom,
            paddingLeft: marginLeft,
            justifyContent:
              verticalPlacement === 'center'
                ? 'safe center'
                : verticalPlacement === 'top'
                  ? 'safe flex-start'
                  : verticalPlacement === 'bottom'
                    ? 'safe flex-end'
                    : 'safe stretch',
            alignItems:
              horizontalPlacement === 'center'
                ? 'center'
                : horizontalPlacement === 'start'
                  ? 'flex-start'
                  : horizontalPlacement === 'end'
                    ? 'flex-end'
                    : 'stretch',
          })}

          .${contentClassName} {
            ${camelCaseObjectToCss({
              opacity: supportingSafeJustifyContentFinished ? 1 : 0,
              pointerEvents: 'auto',
              boxSizing: 'border-box',
              flex: verticalPlacement === 'stretch' ? '1 1 100%' : '0 0 auto',
              maxWidth: `100%`,
              maxHeight: scrollContainer === 'overlay' ? undefined : '100%',
              width,
              overflow: scrollContainer === 'content' ? 'auto' : 'visible',
              backgroundColor: 'white',
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
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

export const createUinityModal = (): {
  Modal: ModalType
} => {
  const Modal: ModalType = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & ModalProps>(
    (
      {
        children,
        opened,
        setOpened,

        overlayColor,
        overlayVisible,
        closeOnOutsideClick,
        overlayClickableThrough,
        lockScroll,
        placement,
        verticalPlacement,
        horizontalPlacement,
        scrollContainer,
        width,
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        padding,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        ws,
        byWindowSize,
        wsr,
        byWindowSizeReverse,

        style,
        ...restProps
      },
      propRef
    ) => {
      const modal = useModal({ opened, setOpened, closeOnOutsideClick })
      const ref = useMergeRefs([modal.refs.setFloating, propRef])
      const floatingProps = modal.getFloatingProps(restProps)

      const overlayVisibleNormalized = overlayVisible ?? true
      const overlayColorNormalized = overlayVisibleNormalized ? overlayColor ?? 'rgba(0, 0, 0, 0.8)' : 'transparent'
      const overlayClickableThroughNormalized = overlayClickableThrough ?? false
      const closeOnOutsideClickNormalized = closeOnOutsideClick ?? true
      const lockScrollNormalized = lockScroll ?? true
      const scrollContainerNormalized = scrollContainer ?? 'overlay'
      const {
        top: marginTop1,
        right: marginRight1,
        bottom: marginBottom1,
        left: marginLeft1,
      } = parseSpacing(margin, marginTop, marginRight, marginBottom, marginLeft)
      marginTop = marginTop1
      marginRight = marginRight1
      marginBottom = marginBottom1
      marginLeft = marginLeft1
      const {
        top: paddingTop1,
        right: paddingRight1,
        bottom: paddingBottom1,
        left: paddingLeft1,
      } = parseSpacing(padding, paddingTop, paddingRight, paddingBottom, paddingLeft)
      paddingTop = paddingTop1
      paddingRight = paddingRight1
      paddingBottom = paddingBottom1
      paddingLeft = paddingLeft1
      const placementParts = placement ? placement?.split('-') : [verticalPlacement, horizontalPlacement]
      const verticalPlacementNormalized = (placementParts?.[0] ?? 'center') as 'top' | 'center' | 'bottom' | 'stretch'
      const horizontalPlacementNormalized = (placementParts?.[1] ?? 'center') as 'start' | 'center' | 'end' | 'stretch'
      const normalizedProps: ModalGeneralPropsNormalized = {
        scrollContainer: scrollContainerNormalized,
        overlayColor: overlayColorNormalized,
        overlayVisible: overlayVisibleNormalized,
        closeOnOutsideClick: closeOnOutsideClickNormalized,
        overlayClickableThrough: overlayClickableThroughNormalized,
        lockScroll: lockScrollNormalized,
        verticalPlacement: verticalPlacementNormalized,
        horizontalPlacement: horizontalPlacementNormalized,
        width,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        byWindowSize: [], // will be added below
        byWindowSizeReverse: [], // will be added below
      }
      normalizedProps.byWindowSize = (byWindowSize || ws || [])
        .sort(([a], [b]) => a - b)
        .map(([windowSize, propsHere], index) => {
          const prevPropsHere = byWindowSize?.[index - 1]?.[1] ?? normalizedProps
          const {
            top: marginTop1,
            right: marginRight1,
            bottom: marginBottom1,
            left: marginLeft1,
          } = parseSpacing(
            propsHere.margin,
            propsHere.marginTop,
            propsHere.marginRight,
            propsHere.marginBottom,
            propsHere.marginLeft
          )
          const {
            top: paddingTop1,
            right: paddingRight1,
            bottom: paddingBottom1,
            left: paddingLeft1,
          } = parseSpacing(
            propsHere.padding,
            propsHere.paddingTop,
            propsHere.paddingRight,
            propsHere.paddingBottom,
            propsHere.paddingLeft
          )
          const propsHereNormalized = {
            marginTop: marginTop1 ?? prevPropsHere.marginTop,
            marginRight: marginRight1 ?? prevPropsHere.marginRight,
            marginBottom: marginBottom1 ?? prevPropsHere.marginBottom,
            marginLeft: marginLeft1 ?? prevPropsHere.marginLeft,
            paddingTop: paddingTop1 ?? prevPropsHere.paddingTop,
            paddingRight: paddingRight1 ?? prevPropsHere.paddingRight,
            paddingBottom: paddingBottom1 ?? prevPropsHere.paddingBottom,
            paddingLeft: paddingLeft1 ?? prevPropsHere.paddingLeft,
            overlayColor: propsHere.overlayColor ?? prevPropsHere.overlayColor,
            overlayVisible: propsHere.overlayVisible ?? prevPropsHere.overlayVisible,
            closeOnOutsideClick: propsHere.closeOnOutsideClick ?? prevPropsHere.closeOnOutsideClick,
            overlayClickableThrough: propsHere.overlayClickableThrough ?? prevPropsHere.overlayClickableThrough,
            lockScroll: propsHere.lockScroll ?? prevPropsHere.lockScroll,
            verticalPlacement: propsHere.verticalPlacement ?? prevPropsHere.verticalPlacement,
            horizontalPlacement: propsHere.horizontalPlacement ?? prevPropsHere.horizontalPlacement,
            width: propsHere.width ?? prevPropsHere.width,
            scrollContainer: propsHere.scrollContainer ?? prevPropsHere.scrollContainer,
          } as ModalGeneralPropsNormalized
          return [windowSize, propsHereNormalized]
        }) as Array<[number, ModalGeneralPropsNormalized]>
      normalizedProps.byWindowSizeReverse = (byWindowSizeReverse || wsr || [])
        .sort(([a], [b]) => b - a)
        .map(([windowSize, propsHere], index) => {
          const prevPropsHere = byWindowSize?.[index - 1]?.[1] ?? normalizedProps
          const {
            top: marginTop1,
            right: marginRight1,
            bottom: marginBottom1,
            left: marginLeft1,
          } = parseSpacing(
            propsHere.margin,
            propsHere.marginTop,
            propsHere.marginRight,
            propsHere.marginBottom,
            propsHere.marginLeft
          )
          const {
            top: paddingTop1,
            right: paddingRight1,
            bottom: paddingBottom1,
            left: paddingLeft1,
          } = parseSpacing(
            propsHere.padding,
            propsHere.paddingTop,
            propsHere.paddingRight,
            propsHere.paddingBottom,
            propsHere.paddingLeft
          )
          const propsHereNormalized = {
            marginTop: marginTop1 ?? prevPropsHere.marginTop,
            marginRight: marginRight1 ?? prevPropsHere.marginRight,
            marginBottom: marginBottom1 ?? prevPropsHere.marginBottom,
            marginLeft: marginLeft1 ?? prevPropsHere.marginLeft,
            paddingTop: paddingTop1 ?? prevPropsHere.paddingTop,
            paddingRight: paddingRight1 ?? prevPropsHere.paddingRight,
            paddingBottom: paddingBottom1 ?? prevPropsHere.paddingBottom,
            paddingLeft: paddingLeft1 ?? prevPropsHere.paddingLeft,
            overlayColor: propsHere.overlayColor ?? prevPropsHere.overlayColor,
            overlayVisible: propsHere.overlayVisible ?? prevPropsHere.overlayVisible,
            closeOnOutsideClick: propsHere.closeOnOutsideClick ?? prevPropsHere.closeOnOutsideClick,
            overlayClickableThrough: propsHere.overlayClickableThrough ?? prevPropsHere.overlayClickableThrough,
            lockScroll: propsHere.lockScroll ?? prevPropsHere.lockScroll,
            verticalPlacement: propsHere.verticalPlacement ?? prevPropsHere.verticalPlacement,
            horizontalPlacement: propsHere.horizontalPlacement ?? prevPropsHere.horizontalPlacement,
            width: propsHere.width ?? prevPropsHere.width,
            scrollContainer: propsHere.scrollContainer ?? prevPropsHere.scrollContainer,
          } as ModalGeneralPropsNormalized
          return [windowSize, propsHereNormalized]
        }) as Array<[number, ModalGeneralPropsNormalized]>

      const uniqueMark = getHash(normalizedProps)
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

      // TODO:ASAP cross
      return (
        <>
          <GlobalStyles
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
              lockScroll={normalizedProps.lockScroll}
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
  return {
    Modal: Modal as ModalType,
  }
}
