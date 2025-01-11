import { getGetClassName } from '@/lib/classes.js'
import { getComponentStructures } from '@/lib/componentStructure.js'

const { getComponentClassName: getMainClassName } = getGetClassName({ componentName: 'icon' })
export const { structureClear: iconStructureClear, structureConfigured: iconStructureConfigured } =
  getComponentStructures([
    {
      htmlTag: 'svg',
      className: getMainClassName(),
    },
  ])
