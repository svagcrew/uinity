import { zControlSizeName, zControlSizeProps } from '@/components/control.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { z } from 'zod'

export const zFieldSizeName = zControlSizeName
export const zFieldSizeProps = zControlSizeProps.extend({
  borderWidth: zOptionalNumberOrString,
})
export const zFieldUinityConfigInput = z.object({
  size: z.record(zFieldSizeName, zFieldSizeProps).optional(),
})
export type FieldUinityConfigInput = z.infer<typeof zFieldUinityConfigInput>

export const defaultFieldUinityConfigInput: FieldUinityConfigInput = {
  size: {},
}

export const normalizeFieldUinityConfig = (input: FieldUinityConfigInput | undefined) => {
  return {
    size: {
      xs: {
        ...defaultFieldUinityConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultFieldUinityConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultFieldUinityConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultFieldUinityConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
  }
}
export type FieldUinityConfig = ReturnType<typeof normalizeFieldUinityConfig>
