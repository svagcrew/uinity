/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { getHash } from 'svag-utils'

export type As = keyof JSX.IntrinsicElements
// export type AsProps<T extends As | undefined> = T extends As ? JSX.IntrinsicElements[T] : { [key: string]: any }
export type AsProps<T extends As | undefined> = { [key: string]: any }
export type AsElement<T extends As | undefined> = React.ReactElement<AsProps<T>>
export type AsComponent<T extends As | undefined> = React.FC<AsProps<T>>
// export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = T extends keyof JSX.IntrinsicElements
//   ? React.RefObject<
//       JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<React.HTMLAttributes<infer E>, any> ? E : never
//     >
//   : React.RefObject<any>
export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = React.RefObject<any>
export type AsRefAttributes<T extends As | undefined> = { ref?: AsRef<T> }
export type AsPropsWithoutRef<T extends As | undefined> = Omit<AsProps<T> & AsRefAttributes<T>, 'ref'>
export type AsPropsWithRef<T extends As | undefined> = AsProps<T> & AsRefAttributes<T>
export type RC<TProps> = (props: TProps) => React.ReactElement | null

export const forwardRefIgnoreTypes = (Component: any): any => {
  return React.forwardRef(Component as any) as any
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
