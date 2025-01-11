import { getGetClassName } from '@/lib/classes.js'
import { getComponentStructures } from '@/lib/componentStructure.js'

const { getMainClassName, getSubClassName } = getGetClassName({ componentName: 'button' })
export const { structureClear: buttonStructureClear, structureConfigured: buttonStructureConfigured } =
  getComponentStructures([
    {
      htmlTag: 'button',
      className: getMainClassName(),
      children: [
        {
          htmlTag: 'svg',
          className: getSubClassName({ subComponentName: ['icon', 'icon-start'] }),
        },
        {
          htmlTag: 'span',
          className: getSubClassName({ subComponentName: 'content' }),
        },
        {
          htmlTag: 'svg',
          className: getSubClassName({ subComponentName: ['icon', 'icon-end'] }),
        },
      ],
    },
  ])
