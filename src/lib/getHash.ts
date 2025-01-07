import stringify from 'json-stable-stringify'
import getUuid from 'uuid-by-string'

type SerializablePrimitive = string | number | boolean | null | undefined
type SerializableRecord = { [key: string]: Serializable }
type SerializableArray = Serializable[]
type Serializable = SerializablePrimitive | SerializableRecord | SerializableArray
export const getHash = (value: Serializable) => {
  return getUuid(stringify(value) || '')
}
