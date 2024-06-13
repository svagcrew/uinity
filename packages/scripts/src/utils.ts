import path from 'path'
import { get__dirname } from 'svag-esm'
const __dirname = get__dirname(import.meta)

export const reactDomComponentsDir = path.resolve(__dirname, '../../react-dom/src/components')
export const reactDomIndexFilePath = path.resolve(__dirname, '../../react-dom/src/index.ts')
export const coreComponentsDir = path.resolve(__dirname, '../../core/src/components')
export const coreConfigDefinitionFilePath = path.resolve(__dirname, '../../core/src/config/index.ts')
