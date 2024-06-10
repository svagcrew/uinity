import path from 'path'
import { createDir, createFile, log } from 'svag-cli-utils'
import type { UinityConfig } from '@uinity/core'
import { getColorCoreScssVariables } from '@uinity/core/dist/components/colorCore.js'
import { getColorSemanticScssVariables } from '@uinity/core/dist/components/colorSematic.js'
import { getLayoutScssVariables } from '@uinity/core/dist/components/layout.js'

export const createScssVariablesFiles = async ({
  scssDir,
  uinityConfig,
}: {
  scssDir: string
  uinityConfig: UinityConfig
}) => {
  log.black(`Creating SCSS variables files in "${scssDir}"`)
  const getFullBasenameWithoutExt = (basename: string) => `uinity.vars.${basename}`
  const getFullBasename = (basename: string) => `${getFullBasenameWithoutExt(basename)}.scss`
  const getFilePath = (basename: string) => path.resolve(scssDir, getFullBasename(basename))
  await createDir({ cwd: scssDir })

  // color core
  const colorCoreScssVariablesContent = getColorCoreScssVariables(uinityConfig)
  const colorCoreScssVariablesBasename = 'color.core'
  await createFile({
    cwd: getFilePath(colorCoreScssVariablesBasename),
    content: colorCoreScssVariablesContent,
  })

  // color semantic
  const colorSemanticScssVariablesContent = `@import './${getFullBasenameWithoutExt(colorCoreScssVariablesBasename)}';

${getColorSemanticScssVariables(uinityConfig)}`
  const colorSemanticScssVariablesBasename = 'color.semantic'
  await createFile({
    cwd: getFilePath(colorSemanticScssVariablesBasename),
    content: colorSemanticScssVariablesContent,
  })

  // layout
  const layoutScssVariablesContent = `${getLayoutScssVariables(uinityConfig)}`
  const layoutScssVariablesBasename = 'layout'
  await createFile({
    cwd: getFilePath(layoutScssVariablesBasename),
    content: layoutScssVariablesContent,
  })

  // index
  const indexVariablesContent =
    [colorCoreScssVariablesBasename, colorSemanticScssVariablesBasename, layoutScssVariablesBasename]
      .map((basename) => `@import './${getFullBasenameWithoutExt(basename)}';`)
      .join('\n') + '\n'
  const indexVariablesBasename = 'index'
  await createFile({
    cwd: getFilePath(indexVariablesBasename),
    content: indexVariablesContent,
  })

  log.green('Done')
}
