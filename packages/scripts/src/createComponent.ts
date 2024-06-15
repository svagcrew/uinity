import {
  appendFile,
  copyDir,
  copyFile,
  coreComponentsDir,
  coreConfigDefinitionFilePath,
  getRelativePath,
  reactDomComponentsDir,
  reactDomIndexFilePath,
  replaceInFile,
} from '@/utils.js'
import _ from 'lodash'
import path from 'path'
import { log } from 'svag-cli-utils'

export const createComponent = async ({
  srcName,
  destName,
  as = 'div',
  preventIndexFilesModifications,
  preventCoreFilesModifications,
  preventReactDomFilesModifications,
  createOnlyReactDom,
  createOnlyCore,
}: {
  srcName: string
  destName: string
  as?: string
  preventIndexFilesModifications?: boolean
  preventCoreFilesModifications?: boolean
  preventReactDomFilesModifications?: boolean
  createOnlyReactDom?: boolean
  createOnlyCore?: boolean
}) => {
  if (!destName) {
    throw new Error('Component name is required')
  }
  const srcNameLowercased = _.camelCase(srcName)
  const srcNameCapitalized = _.upperFirst(srcNameLowercased)
  const srcCoreFilePath = path.resolve(coreComponentsDir, `${srcNameLowercased}.ts`)
  const srcReactDomComponentDir = path.resolve(reactDomComponentsDir, srcNameCapitalized)
  const destNameLowercased = _.camelCase(destName)
  const destNameCapitalized = _.upperFirst(destNameLowercased)
  log.black(`Creating component "${destNameCapitalized}", as:${JSON.stringify(as)}`)
  const destReactDomComponentDir = path.resolve(reactDomComponentsDir, destNameCapitalized)
  const destReactDomClearComponentFilePath = path.resolve(destReactDomComponentDir, 'clear.tsx')
  const destReactDomConfiguredComponentFilePath = path.resolve(destReactDomComponentDir, 'configured.tsx')
  const destReactDomClearStoriesFilePath = path.resolve(destReactDomComponentDir, 'clear.stories.tsx')
  const destReactDomConfiguredStoriesFilePath = path.resolve(destReactDomComponentDir, 'configured.stories.tsx')
  const destCoreFilePath = path.resolve(coreComponentsDir, `${destNameLowercased}.ts`)
  if (!preventReactDomFilesModifications) {
    if (!createOnlyCore) {
      await copyDir(srcReactDomComponentDir, destReactDomComponentDir)
      log.black(`Created ${getRelativePath(destReactDomComponentDir)}`)
      await replaceInFile({
        filePath: destReactDomClearComponentFilePath,
        strings: [
          [srcNameCapitalized, destNameCapitalized],
          [srcNameLowercased, destNameLowercased],
          [`${srcNameCapitalized}DefaultAs = 'div'`, `${destNameCapitalized}DefaultAs = '${as}'`],
        ],
      })
      await replaceInFile({
        filePath: destReactDomConfiguredComponentFilePath,
        strings: [
          [srcNameCapitalized, destNameCapitalized],
          [srcNameLowercased, destNameLowercased],
        ],
      })
      await replaceInFile({
        filePath: destReactDomClearStoriesFilePath,
        strings: [
          [srcNameCapitalized, destNameCapitalized],
          [srcNameLowercased, destNameLowercased],
        ],
      })
      await replaceInFile({
        filePath: destReactDomConfiguredStoriesFilePath,
        strings: [
          [srcNameCapitalized, destNameCapitalized],
          [srcNameLowercased, destNameLowercased],
        ],
      })
    }
  }
  if (!preventCoreFilesModifications) {
    if (!createOnlyReactDom) {
      await copyFile(srcCoreFilePath, destCoreFilePath)
      log.black(`Created ${getRelativePath(destCoreFilePath)}`)
      await replaceInFile({
        filePath: destCoreFilePath,
        strings: [
          [srcNameCapitalized, destNameCapitalized],
          [srcNameLowercased, destNameLowercased],
        ],
      })
    }
  }
  if (!preventIndexFilesModifications) {
    if (!createOnlyReactDom) {
      log.black(`Modified ${getRelativePath(coreConfigDefinitionFilePath)}`)
      await appendFile({
        filePath: coreConfigDefinitionFilePath,
        search: `import { defaultBlankConfigInput, normalizeBlankConfig, zBlankConfigInput } from '@/components/blank.js'`,
        append: `import { default${destNameCapitalized}ConfigInput, normalize${destNameCapitalized}Config, z${destNameCapitalized}ConfigInput } from '@/components/${destNameLowercased}.js'`,
      })
      await appendFile({
        filePath: coreConfigDefinitionFilePath,
        search: `blank: zBlankConfigInput.optional()`,
        append: `${destNameLowercased}: z${destNameCapitalized}ConfigInput.optional(),`,
      })
      await appendFile({
        filePath: coreConfigDefinitionFilePath,
        search: `blank: defaultBlankConfigInput,`,
        append: `${destNameLowercased}: default${destNameCapitalized}ConfigInput,`,
      })
      await appendFile({
        filePath: coreConfigDefinitionFilePath,
        search: `const blank = normalizeBlankConfig(input.blank)`,
        append: `const ${destNameLowercased} = normalize${destNameCapitalized}Config(input.${destNameLowercased})`,
      })
      await appendFile({
        filePath: coreConfigDefinitionFilePath,
        search: `    blank,`,
        append: `${destNameLowercased},`,
      })
    }
    if (!createOnlyCore) {
      log.black(`Modified ${getRelativePath(reactDomIndexFilePath)}`)
      await appendFile({
        filePath: reactDomIndexFilePath,
        search: `import { createBlank } from '@/components/Blank/configured.js'`,
        append: `import { create${destNameCapitalized} } from '@/components/${destNameCapitalized}/configured.js'`,
      })
      await appendFile({
        filePath: reactDomIndexFilePath,
        search: `...createBlank({ uinityConfig }),`,
        append: `...create${destNameCapitalized}({ uinityConfig }),`,
      })
    }
  }
}
