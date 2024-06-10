import path from 'path'
import { createDir, createFile, log } from 'svag-cli-utils'
import type { UinityConfig } from '@uinity/core'
import { getTextScssMixins } from '@uinity/core/dist/components/text.js'

export const createScssMixinsFiles = async ({
  scssDir,
  uinityConfig,
}: {
  scssDir: string
  uinityConfig: UinityConfig
}) => {
  log.black(`Creating SCSS mixins files in "${scssDir}"`)
  const getFullBasenameWithoutExt = (basename: string) => `uinity.mixins.${basename}`
  const getFullBasename = (basename: string) => `${getFullBasenameWithoutExt(basename)}.scss`
  const getFilePath = (basename: string) => path.resolve(scssDir, getFullBasename(basename))
  await createDir({ cwd: scssDir })

  const textScssMixinsContent = getTextScssMixins(uinityConfig)
  const textScssMixinsBasename = 'text'
  await createFile({
    cwd: getFilePath(textScssMixinsBasename),
    content: textScssMixinsContent,
  })

  const indexMixinsContent =
    [textScssMixinsBasename].map((basename) => `@import './${getFullBasenameWithoutExt(basename)}';`).join('\n') + '\n'
  const indexMixinsBasename = 'index'
  await createFile({
    cwd: getFilePath(indexMixinsBasename),
    content: indexMixinsContent,
  })

  log.green('Done')
}
