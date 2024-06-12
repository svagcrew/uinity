import type { UinityConfig } from '@/config/index.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { z } from 'zod'

export const iconConfigSizeNames = ['xs', 's', 'm', 'l', 'xl'] as const
export const zIconConfigSizeName = z.enum(iconConfigSizeNames)
export type IconConfigSizeName = z.infer<typeof zIconConfigSizeName>

export const zIconConfigSizeProps = z.object({
  size: zOptionalNumberOrString,
})

export const zIconConfigStyleRootProps = zIconConfigSizeProps
export type IconConfigStyleRootProps = z.infer<typeof zIconConfigStyleRootProps>

export const zIconConfigGeneralProps = z.object({})
export type IconConfigGeneralProps = z.infer<typeof zIconConfigGeneralProps>

export const zIconConfigInput = z.object({
  general: zIconConfigGeneralProps.optional(),
  size: z.record(zIconConfigSizeName, zIconConfigSizeProps).optional(),
})
export type IconConfigInput = z.infer<typeof zIconConfigInput>

export const defaultIconConfigInput: IconConfigInput = {
  general: {},
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

export const normalizeIconConfig = (input: IconConfigInput | undefined) => {
  return {
    general: {},
    size: {
      xs: {
        ...defaultIconConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultIconConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultIconConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultIconConfigInput.size?.l,
        ...input?.size?.l,
      },
      xl: {
        ...defaultIconConfigInput.size?.xl,
        ...input?.size?.xl,
      },
    },
  }
}
export type IconConfig = ReturnType<typeof normalizeIconConfig>

export const normalizeIconSizeName = (uinityConfig: UinityConfig, size?: IconConfigSizeName | null | undefined) => {
  if (size && uinityConfig.icon.size[size]) {
    return size
  }
  return 'm'
}

export const getIconStyleRootProps = (uinityConfig: UinityConfig, size?: IconConfigSizeName | undefined | null) => {
  const c = uinityConfig.icon
  size = normalizeIconSizeName(uinityConfig, size)
  const result = {
    ...(size && c.size?.[size]),
  } as IconConfigStyleRootProps
  return result
}
