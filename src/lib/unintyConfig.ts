import { zBreakSizesUinityConfig, type BreakSizesUinityConfig } from '@/components/breakSizes/config.js'
import { zButtonUinityConfig, type ButtonUinityConfig } from '@/components/button/config.js'
import { type ColorsUinityConfig, zColorsUinityConfig } from '@/components/colors/config.js'
import { zIconUinityConfig, type IconUinityConfig } from '@/components/icon/config.js'
import {
  type DeepWithoutVariablesPointers,
  getVariableValue,
  isVariablePointer,
  type DeepWithVariablesPointers,
} from '@/lib/variables.js'
import { deepMap } from 'svag-deep-map'

export const zUinityConfigFull = zBreakSizesUinityConfig
  .merge(zColorsUinityConfig)
  .merge(zIconUinityConfig)
  .merge(zButtonUinityConfig)
export type UinityConfigFull = BreakSizesUinityConfig & ColorsUinityConfig & IconUinityConfig & ButtonUinityConfig
export type UinityConfigFullWithVariables = DeepWithVariablesPointers<UinityConfigFull>
export type UinityConfigFullWithoutVariables = DeepWithoutVariablesPointers<UinityConfigFull>

export const zUinityConfigPartial = zUinityConfigFull.partial()
export type UinityConfigPartial = Partial<UinityConfigFull>
export type UinityConfigPartialWithVariables = DeepWithVariablesPointers<UinityConfigPartial>
export type UinityConfigPartialWithoutVariables = DeepWithoutVariablesPointers<UinityConfigPartial>

export const variablifyUinityConfig = <TUinityConfigPartialWithVariables extends UinityConfigPartialWithVariables>(
  config: TUinityConfigPartialWithVariables
): DeepWithoutVariablesPointers<TUinityConfigPartialWithVariables> => {
  const configWithVariablesAsValues = deepMap(
    config,
    ({ value }) => {
      if (isVariablePointer(value)) {
        const variableValue = getVariableValue(config, value)
        return variableValue
      }
      return value
    },
    {
      clone: false,
      maxSeenCount: 0,
    }
  )
  return configWithVariablesAsValues as DeepWithoutVariablesPointers<TUinityConfigPartialWithVariables>
}

export const validateUinityConfig = <TUinityConfigPartial extends UinityConfigPartial>(
  config: TUinityConfigPartial
): TUinityConfigPartial => {
  return zUinityConfigPartial.parse(config) as TUinityConfigPartial
}

export const parseUinityConfig = <TUinityConfigPartialWithVariables extends UinityConfigPartialWithVariables>(
  config: TUinityConfigPartialWithVariables
): DeepWithoutVariablesPointers<TUinityConfigPartialWithVariables> => {
  const variablifiedUinityConfig = variablifyUinityConfig(config)
  const validatedUinityConfig = validateUinityConfig(variablifiedUinityConfig as UinityConfigPartial)
  return validatedUinityConfig as DeepWithoutVariablesPointers<TUinityConfigPartialWithVariables>
}
