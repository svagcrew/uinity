import type React from 'react'
import type { JSX } from 'react'

export type As = keyof JSX.IntrinsicElements
// export type AsProps<T extends As | undefined> = T extends As ? JSX.IntrinsicElements[T] : { [key: string]: any }
export type AsProps<T extends As | undefined> = T extends undefined
  ? {
      className?: string
      style?: React.CSSProperties
    }
  : {
      onClick?: React.MouseEventHandler<any>
      className?: string
      style?: React.CSSProperties
    } & (T extends 'a'
      ? {
          href?: string
          target?: string
          rel?: string
        }
      : {})
// export type AsElement<T extends As | undefined> = React.ReactElement<AsProps<T>>
// export type AsComponent<T extends As | undefined> = React.FC<AsProps<T>>
export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = T extends keyof JSX.IntrinsicElements
  ? React.RefObject<
      | (JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<React.HTMLAttributes<infer E>, infer E> ? E : never)
      | null
      | undefined
    >
  : React.RefObject<any>
export type AsPropsRefOnly<T extends As | undefined> = { ref?: AsRef<T> }
export type AsPropsWithoutRef<T extends As | undefined> = Omit<AsProps<T> & AsPropsRefOnly<T>, 'ref'>
export type AsPropsWithRef<T extends As | undefined> = AsProps<T> & AsPropsRefOnly<T>
export type WithoutRef<T extends { ref?: any }> = Omit<T, 'ref'>

export const setRef = <T>(ref: React.Ref<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value) // Call ref function
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    ;(ref as any).current = value // Assign to current
  }
}
export const syncRefs = <T>(...refs: Array<React.Ref<T>>) => {
  return (node: T) => {
    refs.forEach((ref) => {
      setRef(ref, node)
    })
  }
}
