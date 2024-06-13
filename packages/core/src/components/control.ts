import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const controlSizeNames = ['xs', 's', 'm', 'l'] as const
export const zControlSizeName = z.enum(controlSizeNames)
export type ControlSizeName = z.output<typeof zControlSizeName>

export const zControlSizeProps = z.object({
  borderRadius: zOptionalNumberOrString,
  horizontalPaddingEdgeAccessory: zOptionalNumberOrString,
  horizontalPaddingEdgeText: zOptionalNumberOrString,
  horizontalPaddingAccessoryText: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
  iconSize: zOptionalNumberOrString,
})
export type ControlSizeProps = z.output<typeof zControlSizeProps>

export const zControlGeneralProps = z.object({
  defaultSizeProps: zControlSizeProps.optional(),
  defaultSize: zControlSizeName.optional(),
})
export type ControlGeneralProps = z.output<typeof zControlGeneralProps>

export const zControlUinityConfigInput = z.object({
  general: zControlGeneralProps.optional(),
  size: z.record(zControlSizeName, zControlSizeProps).optional(),
})
export type ControlUinityConfigInput = z.output<typeof zControlUinityConfigInput>

const defaultSpecificSizeProps = {
  borderRadius: $.control.general.defaultSizeProps.borderRadius,
  horizontalPaddingEdgeAccessory: $.control.general.defaultSizeProps.horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.general.defaultSizeProps.horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.general.defaultSizeProps.horizontalPaddingAccessoryText,
}
export const defaultControlUinityConfigInput: ControlUinityConfigInput = {
  general: {
    defaultSize: 'm',
    defaultSizeProps: {
      borderRadius: 4,
      horizontalPaddingEdgeAccessory: 2,
      horizontalPaddingEdgeText: 2,
      horizontalPaddingAccessoryText: 2,
    },
  },
  size: {
    xs: {
      ...defaultSpecificSizeProps,
      iconSize: 16,
      minHeight: 24,
    },
    s: {
      ...defaultSpecificSizeProps,
      iconSize: 20,
      minHeight: 32,
    },
    m: {
      ...defaultSpecificSizeProps,
      iconSize: 24,
      minHeight: 40,
    },
    l: {
      ...defaultSpecificSizeProps,
      iconSize: 28,
      minHeight: 48,
    },
  },
}

export const normalizeControlUinityConfig = (input: ControlUinityConfigInput | undefined) => {
  return {
    general: {
      defaultSize: input?.general?.defaultSize ?? defaultControlUinityConfigInput.general?.defaultSize,
      defaultSizeProps: {
        ...defaultControlUinityConfigInput.general?.defaultSizeProps,
        ...input?.general?.defaultSizeProps,
      },
    },
    size: {
      xs: {
        ...defaultControlUinityConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultControlUinityConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultControlUinityConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultControlUinityConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
  }
}
export type ControlUinityConfig = ReturnType<typeof normalizeControlUinityConfig>
