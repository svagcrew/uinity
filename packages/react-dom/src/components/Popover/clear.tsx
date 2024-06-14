/* eslint-disable react/jsx-boolean-value */
import type { AsRefAttributes, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes } from '@/utils.js'
import type { Placement } from '@floating-ui/react'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'
import isBoolean from 'lodash/isBoolean.js'
import type { ReactElement } from 'react'
import React from 'react'

type PopoverGeneralProps = {}
type UsePopoverProps = {
  opened?: boolean
  setOpened?: (opened: boolean) => void
  initialOpened?: boolean
  placement?: Placement
  /** Distance between trigger and popover */
  offset?: number
  /** Additional distance between popover and viewport */
  shiftPadding?: number
  /** Distance between popover and viewport before flip */
  flipPadding?: number
}
export type WithPopoverMainProps = {
  popover: ReactElement
  children: ReactElement
} & PopoverGeneralProps &
  UsePopoverProps
export type WithPopoverPropsWithRef = WithPopoverMainProps & AsRefAttributes<undefined>
export type WithPopoverPropsWithoutRef = WithoutRef<WithPopoverPropsWithRef>
export type WithPopoverType = (props: WithPopoverPropsWithRef) => ReactElement | null

const usePopover = ({
  initialOpened = false,
  placement = 'bottom-start',
  opened: controlledOpened,
  setOpened: setControlledOpened,
  offset: offsetSize = 5,
  shiftPadding = 0,
  flipPadding = 5,
}: UsePopoverProps = {}) => {
  const [uncontrolledOpened, setUncontrolledOpened] = React.useState(initialOpened)
  const opened = controlledOpened ?? uncontrolledOpened
  const setOpened = setControlledOpened ?? setUncontrolledOpened

  const data = useFloating({
    placement,
    open: opened,
    onOpenChange: setOpened,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetSize),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: flipPadding,
      }),
      shift({ padding: shiftPadding }),
    ],
  })

  const context = data.context
  const click = useClick(context, {
    enabled: !isBoolean(controlledOpened),
  })
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const interactions = useInteractions([click, dismiss, role])

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

export const WithPopover: WithPopoverType = forwardRefIgnoreTypes(
  (
    {
      popover: renderPopover,
      children: renderChildren,
      placement,
      initialOpened,
      opened,
      setOpened,
      flipPadding,
      offset,
      shiftPadding,
    }: WithPopoverPropsWithoutRef,
    propRef: any
  ) => {
    const popover = usePopover({ initialOpened, placement, opened, setOpened, flipPadding, offset, shiftPadding })
    const ref = useMergeRefs([popover.refs.setReference, propRef, (renderChildren as any).ref])

    return (
      <>
        {React.cloneElement(
          renderChildren,
          popover.getReferenceProps({
            ref,
            ...renderChildren.props,
          })
        )}
        {popover.context.open && (
          <FloatingPortal>
            <FloatingFocusManager context={popover.context} modal={true}>
              <div ref={popover.refs.setFloating} style={{ ...popover.floatingStyles }} {...popover.getFloatingProps()}>
                {renderPopover}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </>
    )
  }
)
