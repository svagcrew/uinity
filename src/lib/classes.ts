import { getHash } from '@/lib/utils.js'

export const mark = (componentName: string): {} => {
  // eslint-disable-next-line n/no-process-env, @typescript-eslint/no-unnecessary-condition
  return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development'
    ? {
        'data-x': componentName,
      }
    : {}
}

export const getGlobalClassName = (src: any) => {
  return 'c' + getHash(src)
}
