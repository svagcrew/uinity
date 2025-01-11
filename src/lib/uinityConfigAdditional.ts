import {
  infinitifyUinityConfig,
  validateUinityConfig,
  variablifyUinityConfigSource,
} from '@/lib/uinityConfigGeneral.js'
import * as fs from 'fs'
import * as yaml from 'js-yaml'

export const generateUinityConfigFromSource = ({ srcPath, distPath }: { srcPath: string; distPath: string }): void => {
  const srcContent = fs.readFileSync(srcPath, 'utf8')
  const srcExt = srcPath.split('.').pop()
  const isSrcYml = srcExt === 'yml' || srcExt === 'yaml'
  const isSrcJson = srcExt === 'json'
  if (!isSrcYml && !isSrcJson) {
    throw new Error('Only YAML and JSON files are supported for source file')
  }
  const isDistJson = distPath.split('.').pop() === 'json'
  if (!isDistJson) {
    throw new Error('Only JSON files are supported for destination file')
  }
  const uinityConfigSource: Record<string, any> = (isSrcYml ? yaml.load(srcContent) : JSON.parse(srcContent)) as Record<
    string,
    any
  >
  const uinityConfigRaw = variablifyUinityConfigSource({ uinityConfigSource })
  const uinityConfigInfinitified = infinitifyUinityConfig({ uinityConfigRaw })
  validateUinityConfig({ uinityConfig: uinityConfigInfinitified })
  fs.writeFileSync(distPath, JSON.stringify(uinityConfigRaw, null, 2))
}
