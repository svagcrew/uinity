import type { UinityConfigFull } from '@/lib/unintyConfig.js'
import get from 'lodash/get.js'

export type VariablePointer = {
  pointer: string
}

export const isVariablePointer = (value: unknown): value is VariablePointer => {
  return typeof value === 'object' && value !== null && 'pointer' in value
}

// export type DeepWithVariablesPointers<T> = {
//   [P in keyof T]: T[P] extends object ? DeepWithVariablesPointers<T[P]> : T[P] | VariablePointer
// }

// export type DeepWithoutVariablesPointers<T> = {
//   [P in keyof T]: T[P] extends object ? DeepWithoutVariablesPointers<T[P]> : Exclude<T[P], VariablePointer>
// }

// Helper to extract the path from the pointer string
type ExtractPath<P extends string> = P extends `$.${infer Rest}` ? Rest : never

// Helper to get the type from a nested object based on a dot-separated path
type GetTypeFromPath<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetTypeFromPath<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never

export type DeepWithVariablesPointers<T, Path extends string = '$'> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? DeepWithVariablesPointers<T[K], ExtractPath<`${Path}.${K}`>>
      : GetTypeFromPath<UinityConfigFull, ExtractPath<`${Path}.${K}`>> | VariablePointer
    : never
}

export type DeepWithoutVariablesPointers<T> = {
  [P in keyof T]: T[P] extends VariablePointer
    ? GetTypeFromPath<UinityConfigFull, ExtractPath<T[P]['pointer']>>
    : T[P] extends object
      ? DeepWithoutVariablesPointers<T[P]>
      : T[P]
}

export const getVariableValue = (
  uinityConfig: any,
  variablePointer: VariablePointer,
  throwIfUndefined: boolean = true,
  recursive: boolean = true
): any => {
  if (!isVariablePointer(variablePointer)) {
    return variablePointer
  }
  const variableName = variablePointer.pointer
  const variablePath = variableName.slice(2)
  const takenVariablesNames: string[] = []
  let maybeValue = get(uinityConfig, variablePath) as VariablePointer | undefined
  if (!recursive) {
    return maybeValue
  }

  // eslint-disable-next-line no-empty-pattern
  for (const {} of Array.from({ length: 100 }).keys()) {
    if (maybeValue === undefined) {
      throw new Error(`Variable "${variableName}" not found`)
    }
    if (!isVariablePointer(maybeValue)) {
      return maybeValue
    }
    if (takenVariablesNames.includes(maybeValue.pointer)) {
      throw new Error(`Circular dependency in variable "${variableName}"`)
    }
    takenVariablesNames.push(maybeValue.pointer)
    maybeValue = getVariableValue(uinityConfig, maybeValue, throwIfUndefined, false)
  }
  throw new Error(`Too deep recursion in variable "${variableName}"`)
}
