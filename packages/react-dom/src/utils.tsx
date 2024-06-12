import React from 'react'
import { getHash } from 'svag-utils'

export type As = keyof JSX.IntrinsicElements
export type AsProps<T extends As | undefined> = T extends As ? JSX.IntrinsicElements[T] : { [key: string]: any }
export type AsElement<T extends As | undefined> = React.ReactElement<AsProps<T>>
export type AsComponent<T extends As | undefined> = React.FC<AsProps<T>>
export type AsRef<T extends As | undefined> = React.ForwardedRef<AsProps<T>>
export type AsRefAttributes<T extends As | undefined> = { ref?: AsRef<T> }
export type AsPropsWithoutRef<T extends As | undefined> = Omit<AsProps<T> & AsRefAttributes<T>, 'ref'>
export type AsPropsWithRef<T extends As | undefined> = AsProps<T> & AsRefAttributes<T>

export type RC<TProps> = (props: TProps) => React.ReactElement | null
export type RCWithForwardedRef<TProps, TAs extends As | undefined> = (
  props: React.PropsWithoutRef<TProps> & AsRefAttributes<TAs>
) => React.ReactElement | null
export type RCWithAsAndForwardedRef<TProps extends { as?: As }> = RCWithForwardedRef<
  AsPropsWithoutRef<TProps['as']> & TProps,
  TProps['as']
>

export const forwardRefWithTypes = <TProps extends Record<string, any>>(
  Component: (props: TProps, ref: React.ForwardedRef<any>) => React.ReactElement | null
): ((props: TProps) => React.ReactElement | null) => {
  return React.forwardRef(Component) as any
}

export const mark = (componentName: string): {} => {
  // eslint-disable-next-line n/no-process-env
  return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development'
    ? {
        'data-x': componentName,
      }
    : {}
}

export const getGlobalClassName = (src: any) => {
  return 'c' + getHash(src)
}
