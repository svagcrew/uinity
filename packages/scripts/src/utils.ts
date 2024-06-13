import fs from 'fs/promises'
import path from 'path'
import { get__dirname } from 'svag-esm'

const __dirname = get__dirname(import.meta)
const packagesDir = path.resolve(__dirname, '../..')
export const reactDomSrcDir = path.resolve(packagesDir, 'react-dom/src')
export const reactDomComponentsDir = path.resolve(reactDomSrcDir, 'components')
export const reactDomIndexFilePath = path.resolve(reactDomSrcDir, 'index.ts')
export const coreSrcDir = path.resolve(packagesDir, 'core/src')
export const coreComponentsDir = path.resolve(coreSrcDir, 'components')
export const coreConfigDefinitionFilePath = path.resolve(coreSrcDir, 'config/index.ts')

export const blankReactDomComponentDir = path.resolve(reactDomComponentsDir, 'Blank')
export const blankReactDomClearComponentFilePath = path.resolve(blankReactDomComponentDir, 'clear.tsx')
export const blankReactDomConfiguredComponentFilePath = path.resolve(blankReactDomComponentDir, 'configured.tsx')
export const blankReactDomClearStoriesFilePath = path.resolve(blankReactDomComponentDir, 'clear.stories.tsx')
export const blankReactDomConfiguredStoriesFilePath = path.resolve(blankReactDomComponentDir, 'configured.stories.tsx')
export const blankCoreFilePath = path.resolve(coreComponentsDir, 'blank.ts')

export const copyDir = async (srcDir: string, destDir: string) => {
  // Create the destination directory
  await fs.mkdir(destDir, { recursive: true })

  // Read the contents of the source directory
  const entries = await fs.readdir(srcDir, { withFileTypes: true })

  // Loop through each entry in the source directory
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    // If entry is a directory, call copyDir recursively
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      // If entry is a file, copy it to the destination directory
      await fs.copyFile(srcPath, destPath)
    }
  }
}

export const copyFile = async (srcPath: string, destPath: string) => {
  await fs.copyFile(srcPath, destPath)
}

export const appendString = ({ content, search, append }: { content: string; search: string; append: string }) => {
  const lines = content.split('\n')
  const newLines = lines.map((line) => {
    if (line.includes(search)) {
      const tabsString = line.match(/^\s*/)?.[0] ?? ''
      return `${line}\n${tabsString}${append}`
    }
    return line
  })
  return newLines.join('\n')
}

export const appendFile = async ({
  filePath,
  search,
  append,
}: {
  filePath: string
  search: string
  append: string
}) => {
  const content = await fs.readFile(filePath, 'utf8')
  const newContent = appendString({ content, search, append })
  await fs.writeFile(filePath, newContent)
}

export const replaceString = ({ content, search, replace }: { content: string; search: string; replace: string }) => {
  return content.replaceAll(search, replace)
}

export const replaceInFile = async ({
  filePath,
  strings,
}: {
  filePath: string
  strings: Array<[string, string]> // <[search, replace]>
}) => {
  const content = await fs.readFile(filePath, 'utf8')
  let newContent = content
  for (const [search, replace] of strings) {
    newContent = replaceString({ content: newContent, search, replace })
  }
  await fs.writeFile(filePath, newContent)
}
