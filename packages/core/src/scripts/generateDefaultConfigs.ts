import { normalizeUinityConfig } from '@/config/index.js'
import fs from 'fs/promises'
import cloneDeep from 'lodash/cloneDeep.js'
import path from 'path'
import { deepMap } from 'svag-deep-map'
import { get__dirname } from 'svag-esm'
const __dirname = get__dirname(import.meta)

const removeUndefinedProperties = (obj: Record<string, any>): Record<string, any> => {
  const clean = (obj: Record<string, any>) => {
    for (const key in obj) {
      if (obj[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete obj[key]
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        clean(obj[key])
      }
    }
  }
  clean(obj)
  return obj
}

const removeEmptyObjectProperties = (obj: Record<string, any>): Record<string, any> => {
  const clean = (obj: Record<string, any>) => {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && obj[key] !== null) {
        if (Object.keys(obj[key]).length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete obj[key]
        } else {
          clean(obj[key])
        }
      }
    }
  }
  clean(obj)
  return obj
}

const removeAllTrash = (obj: Record<string, any>): Record<string, any> => {
  let cleanedObj = cloneDeep(obj)
  let prevObj = null

  while (JSON.stringify(cleanedObj) !== JSON.stringify(prevObj)) {
    prevObj = cloneDeep(cleanedObj)
    cleanedObj = removeUndefinedProperties(cleanedObj)
    cleanedObj = removeEmptyObjectProperties(cleanedObj)
  }

  return cleanedObj
}

void (async () => {
  const defaultConfigInputFull = normalizeUinityConfig({})
  const defaultConfigInputBase = removeAllTrash(
    deepMap(defaultConfigInputFull, ({ value }) => {
      if (typeof value === 'string' && value.startsWith('$')) {
        return undefined
      }
      return value
    })
  )
  const configsDir = path.resolve(__dirname, '../../configs')
  await fs.mkdir(configsDir, { recursive: true })

  const defaultConfigInputBasePath = path.resolve(configsDir, 'uinity.base.json')
  const defaultConfigInputBaseContent = JSON.stringify(defaultConfigInputBase, null, 2)
  await fs.writeFile(defaultConfigInputBasePath, defaultConfigInputBaseContent)

  const defaultConfigInputFullPath = path.resolve(configsDir, 'uinity.full.json')
  const defaultConfigInputFullContent = JSON.stringify(defaultConfigInputFull, null, 2)
  await fs.writeFile(defaultConfigInputFullPath, defaultConfigInputFullContent)
})()
