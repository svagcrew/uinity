import path from 'path'
import { createFile, log } from 'svag-cli-utils'

export const createScssIndexFile = async ({ scssDir }: { scssDir: string }) => {
  log.black(`Creating SCSS index file "${scssDir}"`)
  const indexFilePath = path.resolve(scssDir, 'uinity.index.scss')
  const mixinsFilesBasenames = ['text']
  const variablesFilesBasenames = ['color.core', 'color.semantic', 'layout']
  let indexFileContent = ''
  for (const basename of variablesFilesBasenames) {
    indexFileContent += `@import './uinity.vars.${basename}';\n`
  }
  for (const basename of mixinsFilesBasenames) {
    indexFileContent += `@import './uinity.mixins.${basename}';\n`
  }
  indexFileContent += '\n'
  await createFile({
    cwd: indexFilePath,
    content: indexFileContent,
  })

  log.green('Done')
}
