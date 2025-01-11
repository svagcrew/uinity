import { zBreakSizesUinityConfig, type BreakSizesUinityConfig } from '@/components/breakSizes/config.js'
import { zButtonUinityConfig, type ButtonUinityConfig } from '@/components/button/config.js'
import { zColorsUinityConfig, type ColorsUinityConfig } from '@/components/colors/config.js'
import { zIconUinityConfig, type IconUinityConfig } from '@/components/icon/config.js'
import { getValueByPointer, isPointer } from '@/lib/pointers.js'
import { deepMap } from 'svag-deep-map'
import type { z } from 'zod'

export const zUinityConfig = zBreakSizesUinityConfig
  .merge(zColorsUinityConfig)
  .merge(zIconUinityConfig)
  .merge(zButtonUinityConfig)
export type UinityConfig = BreakSizesUinityConfig & ColorsUinityConfig & IconUinityConfig & ButtonUinityConfig

export const variablifyUinityConfigSource = ({
  uinityConfigSource,
  throwOnError = true,
}: {
  uinityConfigSource: Record<string, any>
  throwOnError?: boolean
}): {
  uinityConfigVariablified: Record<string, any>
  errors: ConfigValidationError[]
} => {
  const errors: ConfigValidationError[] = []
  const uinityConfigVariablified = deepMap(
    uinityConfigSource,
    ({ value, path }) => {
      if (isPointer(value)) {
        try {
          return getValueByPointer({ uinityConfigSource, pointer: value })
        } catch (error: any) {
          errors.push({
            pathString: path,
            pathArray: path.split('.'), // TODO: do only pathString, if it will be enough for vs extension validations // or let svag-deep-map return pathArray
            message: error.message,
          })
        }
      }
      return value
    },
    {
      clone: false,
      maxSeenCount: 100,
    }
  )
  if (throwOnError && errors.length > 0) {
    throw new Error(
      `Config variablification failed:\n${errors.map(({ pathString, message }) => `${pathString}: ${message}`).join('\n')}`
    )
  }
  return {
    uinityConfigVariablified: uinityConfigVariablified as Record<string, any>,
    errors,
  }
}

export const infinitifyUinityConfig = ({
  uinityConfigRaw,
}: {
  uinityConfigRaw: Record<string, any>
}): Record<string, any> => {
  return deepMap(
    uinityConfigRaw,
    ({ value }) => {
      if (value === 'Infinity') {
        return Infinity
      }
      return value
    },
    {
      clone: false,
      maxSeenCount: 100,
    }
  )
}

export type ConfigValidationError = {
  pathString: string
  pathArray: Array<string | number>
  message: string
}
export const validateUinityConfig = <TUinityConfig extends UinityConfig>({
  uinityConfig,
  throwOnError = true,
}: {
  uinityConfig: TUinityConfig
  throwOnError?: boolean
}): {
  uinityConfig: TUinityConfig
  ok: boolean
  zodError: z.ZodError | null
  errors: ConfigValidationError[]
} => {
  // Zod validation
  const parseResult = zUinityConfig.safeParse(uinityConfig)
  const errors: ConfigValidationError[] = []
  if (!parseResult.success) {
    for (const error of parseResult.error.errors) {
      const pathArray = error.path
      const pathString = pathArray.join('.')
      errors.push({
        pathString,
        pathArray,
        message: error.message,
      })
    }
  }

  // Variant settings validation
  // if (parseResult.success && config?.variants) {
  //   for (const [variantName, variant] of Object.entries(config.variants)) {
  //     for (const [settingName] of Object.entries(variant.settings || {})) {
  //       const pathArray = [componentName, 'variants', variantName, 'settings', settingName]
  //       const pathString = pathArray.join('.')
  //       if (!(settingName in config.settings)) {
  //         errors.push({
  //           pathString,
  //           pathArray,
  //           message: `Setting "${settingName}" not found in "${componentName}" settings, but used in variant "${variantName}"`,
  //         })
  //       }
  //     }
  //   }
  // }

  if (throwOnError && errors.length > 0) {
    throw new Error(
      `Config validation failed:\n${errors.map(({ pathString, message }) => `${pathString}: ${message}`).join('\n')}`
    )
  }
  return {
    uinityConfig: parseResult.data as TUinityConfig,
    ok: parseResult.success,
    zodError: parseResult.error || null,
    errors,
  }
}

export const parseUinityConfig = <TUinityConfig extends UinityConfig>({
  uinityConfigRaw,
}: {
  uinityConfigRaw: TUinityConfig
}): TUinityConfig => {
  const uinityConfigInfinitified = infinitifyUinityConfig({ uinityConfigRaw })
  const { uinityConfig } = validateUinityConfig({ uinityConfig: uinityConfigInfinitified })
  return uinityConfig as TUinityConfig
}
