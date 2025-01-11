import {
  infinitifyUinityConfig,
  validateUinityConfig,
  variablifyUinityConfigSource,
} from '@/lib/uinityConfigGeneral.js'
import chokidar from 'chokidar'
import * as fs from 'fs'
import * as yaml from 'js-yaml'

export const generateUinityConfigFromSource = ({
  srcPath,
  distPath,
  verbose,
}: {
  srcPath: string
  distPath: string
  verbose?: boolean
}): void => {
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
  const { uinityConfigVariablified } = variablifyUinityConfigSource({ uinityConfigSource })
  const uinityConfigInfinitified = infinitifyUinityConfig({ uinityConfigRaw: uinityConfigVariablified })
  // we validate with Infinity values
  validateUinityConfig({ uinityConfig: uinityConfigInfinitified })
  // we save without Infinity values, because JSON.stringify does not support Infinity
  fs.writeFileSync(distPath, JSON.stringify(uinityConfigVariablified, null, 2))
  if (verbose) {
    console.info(`Config saved to ${distPath}`)
  }
}

export const generateUinityConfigFromSourceWithWatch = ({
  srcPath,
  distPath,
  verbose,
}: {
  srcPath: string
  distPath: string
  verbose?: boolean
}): void => {
  verbose && console.info(`Watching for changes on ${srcPath}`)
  const watcher = chokidar.watch(srcPath, { persistent: true })
  watcher.on('change', (path) => {
    try {
      verbose && console.info(`File ${path} has been changed`)
      generateUinityConfigFromSource({ srcPath, distPath, verbose })
    } catch (error: any) {
      console.error(error.message)
    }
  })
}
