import type { UinityConfig } from '@/config/index.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { z } from 'zod'

export const iconSizes = ['xs', 's', 'm', 'l', 'xl'] as const
export const zIconSizeName = z.enum(iconSizes)
export type IconSizeName = z.infer<typeof zIconSizeName>
export const zIconSizeProps = z.object({
  size: zOptionalNumberOrString,
})

export const zIconFinalProps = zIconSizeProps
export type IconFinalProps = z.infer<typeof zIconFinalProps>

export const zIconGeneralProps = z.object({
  defaultSize: zIconSizeName.optional(),
})
export type IconGeneralProps = z.infer<typeof zIconGeneralProps>

export const zIconUinityConfigInput = z.object({
  general: zIconGeneralProps.optional(),
  size: z.record(zIconSizeName, zIconSizeProps).optional(),
})
export type IconUinityConfigInput = z.infer<typeof zIconUinityConfigInput>

export const defaultIconUinityConfigInput: IconUinityConfigInput = {
  general: {
    defaultSize: 'm',
  },
  size: {
    xs: {
      size: 12,
    },
    s: {
      size: 16,
    },
    m: {
      size: 24,
    },
    l: {
      size: 32,
    },
    xl: {
      size: 48,
    },
  },
}

export const normalizeIconUinityConfig = (input: IconUinityConfigInput | undefined) => {
  return {
    general: {
      defaultSize: input?.general?.defaultSize ?? defaultIconUinityConfigInput.general?.defaultSize,
    },
    size: {
      xs: {
        ...defaultIconUinityConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultIconUinityConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultIconUinityConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultIconUinityConfigInput.size?.l,
        ...input?.size?.l,
      },
      xl: {
        ...defaultIconUinityConfigInput.size?.xl,
        ...input?.size?.xl,
      },
    },
  }
}
export type IconUinityConfig = ReturnType<typeof normalizeIconUinityConfig>

export const normalizeIconSizeName = (uinityConfig: UinityConfig, size?: IconSizeName | null | undefined) => {
  if (size && uinityConfig.icon.size[size]) {
    return size
  }
  return uinityConfig.icon.general.defaultSize
}

export const getIconFinalProps = (uinityConfig: UinityConfig, size?: IconSizeName | undefined | null) => {
  const c = uinityConfig.icon
  size = normalizeIconSizeName(uinityConfig, size)
  const result = {
    ...(size && c.size?.[size]),
  } as IconFinalProps
  return result
}
