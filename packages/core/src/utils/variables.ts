import { getColorCoreValueByVariableName } from '@/components/colorCore.js'
import type { UinityConfig } from '@/config/index.js'
import get from 'lodash/get.js'

export const isVariableName = (value: any) =>
  (typeof value === 'string' && value.startsWith('$.')) || value?.toVariableName

export const getVariableValue = (
  uinityConfig: any,
  variableName: any,
  throwIfUndefined: boolean = false,
  recursive: boolean = true
): any => {
  if (!isVariableName(variableName)) {
    return variableName
  }
  variableName = variableName.toVariableName ? variableName.toVariableName() : variableName
  if (variableName.startsWith('$.color.core')) {
    return getColorCoreValueByVariableName(uinityConfig, variableName, throwIfUndefined)
  }
  const variablePath = variableName.slice(2)
  const takenVariablesNames: string[] = []
  let maybeValue = get(uinityConfig, variablePath)
  if (!recursive) {
    return maybeValue
  }

  // eslint-disable-next-line no-empty-pattern
  for (const {} of Array.from({ length: 100 }).keys()) {
    if (maybeValue === undefined) {
      throw new Error(`Variable ${variableName} not found`)
    }
    if (!isVariableName(maybeValue)) {
      return maybeValue
    }
    if (takenVariablesNames.includes(maybeValue)) {
      throw new Error(`Circular dependency in variable ${variableName}`)
    }
    takenVariablesNames.push(maybeValue)
    maybeValue = getVariableValue(uinityConfig, maybeValue, throwIfUndefined, false)
  }
  throw new Error(`Too deep recursion in variable ${variableName}`)
}

type NonNullableRecordRecursive<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? {
        [K1 in keyof T[K]]: T[K][K1] extends Record<string, any>
          ? {
              [K2 in keyof T[K][K1]]: NonNullable<T[K][K1][K2]>
            }
          : NonNullable<T[K][K1]>
      }
    : NonNullable<T[K]>
}

const createVariableGetter = <T>(start: string): T => {
  const handler: ProxyHandler<any> = {
    get: (_, prop) => {
      if (prop === 'toString') {
        return () => start
      }
      if (prop === 'toVariableName') {
        return () => start
      }
      const string = `${start}.${String(prop)}`
      return createVariableGetter<any>(string)
    },
  }

  return new Proxy({}, handler) as T
}

export const $ = createVariableGetter<NonNullableRecordRecursive<UinityConfig>>('$')

type RecordPaths<T extends Record<string, any>, P extends string = '$.'> = {
  [K in keyof T]: K extends string
    ? T[K] extends Record<string, any>
      ? `${P}${K}` | RecordPaths<T[K], `${P}${K}.`>
      : `${P}${K}`
    : never
}[keyof T]

export type VariableName = RecordPaths<NonNullableRecordRecursive<UinityConfig>>
