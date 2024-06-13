import {
  appendFile,
  blankCoreFilePath,
  blankReactDomComponentDir,
  copyDir,
  copyFile,
  coreComponentsDir,
  coreConfigDefinitionFilePath,
  reactDomComponentsDir,
  reactDomIndexFilePath,
  replaceInFile,
} from '@/utils.js'
import _ from 'lodash'
import path from 'path'
import { log } from 'svag-cli-utils'

export const createComponent = async ({
  name,
  as = 'div',
  preventIndexFilesModifications,
  preventCoreFilesModifications,
  preventReactDomFilesModifications,
}: {
  name: string
  as?: string
  preventIndexFilesModifications?: boolean
  preventCoreFilesModifications?: boolean
  preventReactDomFilesModifications?: boolean
}) => {
  if (!name) {
    throw new Error('Component name is required')
  }
  const nameCamelCaseLowercase = _.camelCase(name)
  const nameCamelCaseCapitalized = _.upperFirst(nameCamelCaseLowercase)
  log.black(`Creating component "${nameCamelCaseCapitalized}", as:${JSON.stringify(as)}`)
  log.green('createComponent.ts', { name, as, nameCamelCaseLowercase, nameCamelCaseCapitalized })
  const newReactDomComponentDir = path.resolve(reactDomComponentsDir, nameCamelCaseCapitalized)
  const newReactDomClearComponentFilePath = path.resolve(newReactDomComponentDir, 'clear.tsx')
  const newReactDomConfiguredComponentFilePath = path.resolve(newReactDomComponentDir, 'configured.tsx')
  const newReactDomClearStoriesFilePath = path.resolve(newReactDomComponentDir, 'clear.stories.tsx')
  const newReactDomConfiguredStoriesFilePath = path.resolve(newReactDomComponentDir, 'configured.stories.tsx')
  const newCoreFilePath = path.resolve(coreComponentsDir, `${nameCamelCaseLowercase}.ts`)
  await copyDir(blankReactDomComponentDir, newReactDomComponentDir)
  if (!preventReactDomFilesModifications) {
    await replaceInFile({
      filePath: newReactDomClearComponentFilePath,
      strings: [
        ['Blank', nameCamelCaseCapitalized],
        ['blank', nameCamelCaseLowercase],
        [`BlankDefaultAs = 'div'`, `${nameCamelCaseCapitalized}DefaultAs = '${as}'`],
      ],
    })
    await replaceInFile({
      filePath: newReactDomConfiguredComponentFilePath,
      strings: [
        ['Blank', nameCamelCaseCapitalized],
        ['blank', nameCamelCaseLowercase],
      ],
    })
    await replaceInFile({
      filePath: newReactDomClearStoriesFilePath,
      strings: [
        ['Blank', nameCamelCaseCapitalized],
        ['blank', nameCamelCaseLowercase],
      ],
    })
    await replaceInFile({
      filePath: newReactDomConfiguredStoriesFilePath,
      strings: [
        ['Blank', nameCamelCaseCapitalized],
        ['blank', nameCamelCaseLowercase],
      ],
    })
  }
  if (!preventCoreFilesModifications) {
    await copyFile(blankCoreFilePath, newCoreFilePath)
    await replaceInFile({
      filePath: newCoreFilePath,
      strings: [
        ['Blank', nameCamelCaseCapitalized],
        ['blank', nameCamelCaseLowercase],
      ],
    })
  }
  if (!preventIndexFilesModifications) {
    await appendFile({
      filePath: coreConfigDefinitionFilePath,
      search: `import { defaultBlankConfigInput, normalizeBlankConfig, zBlankConfigInput } from '@/components/blank.js'`,
      append: `import { default${nameCamelCaseCapitalized}ConfigInput, normalize${nameCamelCaseCapitalized}Config, z${nameCamelCaseCapitalized}ConfigInput } from '@/components/${nameCamelCaseLowercase}.js'`,
    })
    await appendFile({
      filePath: coreConfigDefinitionFilePath,
      search: `blank: zBlankConfigInput.optional()`,
      append: `${nameCamelCaseLowercase}: z${nameCamelCaseCapitalized}ConfigInput.optional(),`,
    })
    await appendFile({
      filePath: coreConfigDefinitionFilePath,
      search: `blank: defaultBlankConfigInput,`,
      append: `${nameCamelCaseLowercase}: default${nameCamelCaseCapitalized}ConfigInput,`,
    })
    await appendFile({
      filePath: coreConfigDefinitionFilePath,
      search: `const blank = normalizeBlankConfig(input.blank)`,
      append: `const ${nameCamelCaseLowercase} = normalize${nameCamelCaseCapitalized}Config(input.${nameCamelCaseLowercase})`,
    })
    await appendFile({
      filePath: coreConfigDefinitionFilePath,
      search: `    blank,`,
      append: `${nameCamelCaseLowercase},`,
    })
    await appendFile({
      filePath: reactDomIndexFilePath,
      search: `import { createBlank } from '@/components/Blank/configured.js'`,
      append: `import { create${nameCamelCaseCapitalized} } from '@/components/${nameCamelCaseCapitalized}/configured.js'`,
    })
    await appendFile({
      filePath: reactDomIndexFilePath,
      search: `...createBlank({ uinityConfig }),`,
      append: `...create${nameCamelCaseCapitalized}({ uinityConfig }),`,
    })
  }
}
