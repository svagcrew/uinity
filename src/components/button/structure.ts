import { getGetClassName } from '@/lib/classes.js'
import {
  mergeComponentStructureItems,
  type ComponentStructureDeep,
  type ComponentStructureFlat,
} from '@/lib/componentStructure.js'
import { zNumberOrStringOptionalNullable } from '@/lib/zod.js'
import { z } from 'zod'

const { getComponentClassName: getMainClassName, getElementClassName: getSubClassName } = getGetClassName({
  componentName: 'button',
})
export const buttonStructureFlat = {
  button: {
    elementName: 'button' as const,
    htmlTag: 'button',
    className: getMainClassName(),
  },
  icon: {
    elementName: 'icon' as const,
    htmlTag: 'svg',
    className: getSubClassName({ elementName: 'icon' }),
  },
  iconStart: {
    elementName: 'iconStart' as const,
    htmlTag: 'svg',
    className: getSubClassName({ elementName: 'iconStart' }),
  },
  content: {
    elementName: 'content' as const,
    htmlTag: 'span',
    className: getSubClassName({ elementName: 'content' }),
  },
  iconEnd: {
    elementName: 'iconEnd' as const,
    htmlTag: 'svg',
    className: getSubClassName({ elementName: 'iconEnd' }),
  },
} satisfies ComponentStructureFlat
export const buttonStructureDeep = [
  {
    ...buttonStructureFlat.button,
    children: [
      mergeComponentStructureItems(buttonStructureFlat.icon, buttonStructureFlat.iconStart),
      buttonStructureFlat.content,
      mergeComponentStructureItems(buttonStructureFlat.icon, buttonStructureFlat.iconEnd),
    ],
  },
] satisfies ComponentStructureDeep
