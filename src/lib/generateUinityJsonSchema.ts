import { zUinityConfig } from '@/lib/uinityConfigGeneral.js'
import fs from 'fs'
import path from 'path'
import { zodToJsonSchema } from 'zod-to-json-schema'

const uinityJsonSchema = zodToJsonSchema(zUinityConfig, 'uinity')
const __dirname = new URL('.', import.meta.url).pathname
const uinityJsonSchemaPath = path.resolve(__dirname, '../../uinity.schema.json')
fs.writeFileSync(uinityJsonSchemaPath, JSON.stringify(uinityJsonSchema, null, 2))
