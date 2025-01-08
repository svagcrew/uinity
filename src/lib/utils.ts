import stringify from 'json-stable-stringify'
import lodashOmit from 'lodash/omit.js'
import lodashPick from 'lodash/pick.js'
import getUuid from 'uuid-by-string'

export const omit = <TObject extends {}, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
): Omit<TObject, TKeys> => {
  return lodashOmit(obj, keys)
}

export const pick = <TObject extends {}, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
): Pick<TObject, TKeys> => {
  return lodashPick(obj, keys)
}

type SerializablePrimitive = string | number | boolean | null | undefined
type SerializableRecord = { [key: string]: Serializable }
type SerializableArray = Serializable[]
type Serializable = SerializablePrimitive | SerializableRecord | SerializableArray
export const getHash = (value: Serializable) => {
  return getUuid(stringify(value) || '')
}

export const objectAssignExceptUndefined = (
  ...objects: Array<Record<string, any> | undefined | null>
): Record<string, any> => {
  const result = objects[0] || {}
  for (const object of objects.slice(1)) {
    if (object === undefined) {
      continue
    }
    if (object === null) {
      // result = {}
      Object.keys(result).forEach((key) => {
        if (result[key] === undefined) {
          delete result[key]
        }
      })
      continue
    }
    for (const [key, value] of Object.entries(object)) {
      if (value !== undefined) {
        result[key] = value
      }
    }
  }
  return result
}
