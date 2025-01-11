import { getHash } from '@/lib/utils.js'
import kebabify from 'lodash/kebabCase.js'
import cn from 'classnames'

export const mark = (componentName: string): {} => {
  // eslint-disable-next-line n/no-process-env, @typescript-eslint/no-unnecessary-condition
  return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development'
    ? {
        'data-uinity-styled-component': componentName,
      }
    : {}
}

export const getGlobalClassName = (src: any) => {
  return 'c' + getHash(src)
}

const isClassNameContains = (className: string | undefined, part: string) => {
  return className?.split(' ').includes(part) || false
}

export const getMainClassName = ({
  componentName,
  isConfigured,
  settings,
  variantName,
  providedClassName,
}: {
  componentName: string
  isConfigured?: boolean
  settings?: Record<string, string>
  variantName?: string | undefined
  providedClassName?: string | undefined
}): string => {
  const componentNameKebabed = kebabify(componentName)
  const componentNamePrefixed = `uinity-${componentNameKebabed}`
  let result = providedClassName || ''
  if (!isClassNameContains(result, componentNamePrefixed)) {
    result = cn(result, componentNamePrefixed)
  }
  if (isConfigured) {
    result = cn(result, `${componentNamePrefixed}--configured`)
  }
  if (variantName) {
    result = cn(result, `${componentNamePrefixed}--variant_${kebabify(variantName)}`)
  }
  if (settings) {
    for (const [key, value] of Object.entries(settings)) {
      result = cn(result, `${componentNamePrefixed}--setting-${kebabify(key)}_${kebabify(value)}`)
    }
  }
  return result
}

export const getSubClassName = ({
  componentName,
  subComponentName,
  providedClassName,
  modKey,
  modValue,
  mods,
}: {
  componentName: string
  subComponentName: string | string[]
  providedClassName?: string | undefined
  modKey?: string
  modValue?: string
  mods?: Record<string, string | undefined>
}): string => {
  if (Array.isArray(subComponentName)) {
    return subComponentName
      .map((subComponentNameItem) =>
        getSubClassName({
          componentName,
          subComponentName: subComponentNameItem,
          providedClassName,
          modKey,
          modValue,
          mods,
        })
      )
      .join(' ')
  }
  const componentNameKebabed = kebabify(componentName)
  const componentNamePrefixed = `uinity-${componentNameKebabed}`
  const subComponentNameKebabed = kebabify(subComponentName)
  const subComponentNamePrefixed = `${componentNamePrefixed}__${subComponentNameKebabed}`
  let result = providedClassName
  result = cn(result, subComponentNamePrefixed)
  if (modKey && modValue) {
    result = cn(result, `${subComponentNamePrefixed}--${modKey}_${modValue}`)
  } else if (modKey) {
    result = cn(result, `${subComponentNamePrefixed}--${modKey}`)
  }
  if (mods) {
    for (const [key, value] of Object.entries(mods)) {
      if (value) {
        result = cn(result, `${subComponentNamePrefixed}--${key}_${value}`)
      } else {
        result = cn(result, `${subComponentNamePrefixed}--${key}`)
      }
    }
  }
  return result
}

export const getGetClassName = ({ componentName }: { componentName: string }) => {
  return {
    getMainClassName: (props: Omit<Parameters<typeof getMainClassName>[0], 'componentName'> = {}) =>
      getMainClassName({ componentName, ...props }),
    getSubClassName: (props: Omit<Parameters<typeof getSubClassName>[0], 'componentName'>) =>
      getSubClassName({ componentName, ...props }),
  }
}
