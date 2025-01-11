import cloneDeep from 'lodash/cloneDeep.js'

export type ComponentStructureItem = {
  desc?: string
  htmlTag: string
  className: string
  children?: ComponentStructureItem[]
}

export type ComponentStructure = ComponentStructureItem[]

export const getConfiguredComponentStructure = (structureClear: ComponentStructure): ComponentStructure => {
  const structureConfigured: ComponentStructure = cloneDeep(structureClear)
  const mainClassName = structureConfigured[0].className
  const mainClassNameWithVariantAndSettings = `${mainClassName} ${mainClassName}--variant_{variantName} ${mainClassName}--setting-{settingKey}_{settingValue}`
  structureConfigured[0].className = mainClassNameWithVariantAndSettings
  return structureConfigured
}

export const getComponentStructures = (
  structureClear: ComponentStructure
): {
  structureClear: ComponentStructure
  structureConfigured: ComponentStructure
} => {
  const structureConfigured = getConfiguredComponentStructure(structureClear)
  return { structureClear, structureConfigured }
}
