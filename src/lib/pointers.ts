import get from 'lodash/get.js'

export const isPointer = (value: unknown): value is string => {
  return typeof value === 'string' && value.startsWith('$.')
}

export const getValueByPointer = ({
  uinityConfigSource,
  pointer,
  touchedPointers = [pointer],
  maxDeep = 100,
  throwIfUndefined = true,
  recursive = true,
}: {
  uinityConfigSource: Record<string, any>
  pointer: string
  touchedPointers?: string[]
  maxDeep?: number
  throwIfUndefined?: boolean
  recursive?: boolean
}): any => {
  const touchedPointersString = touchedPointers.join(' -> ')
  if (!isPointer(pointer)) {
    throw new Error(`Provided pointer is not a pointer ${touchedPointersString}`)
  }
  if (touchedPointers.length > maxDeep) {
    throw new Error(`Max deep exceeded for pointer ${touchedPointersString}`)
  }
  const pointerPath = pointer.slice(2)
  const maybeValue = get(uinityConfigSource, pointerPath) as string | undefined // undefiend mean it is not string, but anything else
  if (!recursive) {
    return maybeValue
  }
  if (maybeValue === undefined) {
    throw new Error(`Value not found for pointer ${touchedPointersString}`)
  }
  if (!isPointer(maybeValue)) {
    return maybeValue
  }
  const nextPointer = maybeValue
  if (touchedPointers.includes(nextPointer)) {
    throw new Error(`Circular dependency in pointer ${touchedPointersString} -> ${nextPointer}`)
  }
  touchedPointers.push(nextPointer)
  return getValueByPointer({
    uinityConfigSource,
    pointer: nextPointer,
    touchedPointers,
    maxDeep,
    throwIfUndefined,
    recursive,
  })
}
