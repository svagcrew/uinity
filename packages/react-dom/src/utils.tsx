import type { RuleSet } from 'styled-components'

export type RC<T = {}> = (props: T) => JSX.Element

export const mark = (componentName: string): {} => {
  // eslint-disable-next-line n/no-process-env
  return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development'
    ? {
        'data-x': componentName,
      }
    : {}
}

export const elseEmptyString = (condition: any, result: string | RuleSet) => {
  if (condition) {
    return result
  } else {
    return ''
  }
}
