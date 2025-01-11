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

export const getComponentClassName = ({
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

export const getElementClassName = ({
  componentName,
  elementName,
  providedClassName,
  modKey,
  modValue,
  mods,
}: {
  componentName: string
  elementName: string | string[]
  providedClassName?: string | undefined
  modKey?: string
  modValue?: string
  mods?: Record<string, string | undefined>
}): string => {
  if (Array.isArray(elementName)) {
    return elementName
      .map((elementNameItem) =>
        getElementClassName({
          componentName,
          elementName: elementNameItem,
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
  const elementNameKebabed = kebabify(elementName)
  const elementNamePrefixed = `${componentNamePrefixed}__${elementNameKebabed}`
  let result = providedClassName
  result = cn(result, elementNamePrefixed)
  if (modKey && modValue) {
    result = cn(result, `${elementNamePrefixed}--${modKey}_${modValue}`)
  } else if (modKey) {
    result = cn(result, `${elementNamePrefixed}--${modKey}`)
  }
  if (mods) {
    for (const [key, value] of Object.entries(mods)) {
      if (value) {
        result = cn(result, `${elementNamePrefixed}--${key}_${value}`)
      } else {
        result = cn(result, `${elementNamePrefixed}--${key}`)
      }
    }
  }
  return result
}

export const getGetClassName = ({ componentName }: { componentName: string }) => {
  return {
    getComponentClassName: (props: Omit<Parameters<typeof getComponentClassName>[0], 'componentName'> = {}) =>
      getComponentClassName({ componentName, ...props }),
    getElementClassName: (props: Omit<Parameters<typeof getElementClassName>[0], 'componentName'>) =>
      getElementClassName({ componentName, ...props }),
  }
}
