import cn from 'classnames'

export type ComponentStructureFlatItem = {
  elementName: string
  desc?: string
  htmlTag?: string
  className?: string
  config?: Record<string, any>
}
export type ComponentStructureDeepItem = {
  elementName: string | string[]
  htmlTag: string
  className: string
  children?: ComponentStructureDeepItem[]
}
export type ComponentStructureFlat = Record<string, ComponentStructureFlatItem>
export type ComponentStructureDeep = ComponentStructureDeepItem[]

export const mergeComponentStructureItems = (...items: ComponentStructureFlatItem[]): ComponentStructureDeepItem => {
  return items.reduce((acc, item) => {
    return {
      elementName: [acc.elementName, item.elementName].filter(Boolean) as string[],
      htmlTag: acc.htmlTag || item.htmlTag || 'div',
      className: cn(acc.className, item.className),
    }
  }, {} as ComponentStructureDeepItem)
}
