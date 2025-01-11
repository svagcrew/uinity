import { zBreakSizesUinityConfig, type BreakSizesUinityConfig } from '@/components/breakSizes/config.js'
import { zButtonUinityConfig, type ButtonUinityConfig } from '@/components/button/config.js'
import { zColorsUinityConfig, type ColorsUinityConfig } from '@/components/colors/config.js'
import { zIconUinityConfig, type IconUinityConfig } from '@/components/icon/config.js'
import { getValueByPointer, isPointer } from '@/lib/pointers.js'
import { deepMap } from 'svag-deep-map'

export const zUinityConfig = zBreakSizesUinityConfig
  .merge(zColorsUinityConfig)
  .merge(zIconUinityConfig)
  .merge(zButtonUinityConfig)
export type UinityConfig = BreakSizesUinityConfig & ColorsUinityConfig & IconUinityConfig & ButtonUinityConfig

export const variablifyUinityConfigSource = ({
  uinityConfigSource,
}: {
  uinityConfigSource: Record<string, any>
}): Record<string, any> => {
  return deepMap(
    uinityConfigSource,
    ({ value }) => {
      if (isPointer(value)) {
        return getValueByPointer({ uinityConfigSource, pointer: value })
      }
      return value
    },
    {
      clone: false,
      maxSeenCount: 100,
    }
  )
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

export const validateUinityConfig = <TUinityConfig extends UinityConfig>({
  uinityConfig,
}: {
  uinityConfig: TUinityConfig
}): TUinityConfig => {
  return zUinityConfig.parse(uinityConfig) as TUinityConfig
}

export const parseUinityConfig = <TUinityConfig extends UinityConfig>({
  uinityConfigRaw,
}: {
  uinityConfigRaw: TUinityConfig
}): TUinityConfig => {
  const uinityConfigInfinitified = infinitifyUinityConfig({ uinityConfigRaw })
  const uinityConfig = validateUinityConfig({ uinityConfig: uinityConfigInfinitified })
  return uinityConfig as TUinityConfig
}
