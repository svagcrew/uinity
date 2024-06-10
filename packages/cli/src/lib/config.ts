import type { UinityConfig } from '@uinity/core'
import fg from 'fast-glob'
import _ from 'lodash'
import path from 'path'
import { getDataFromFile } from 'svag-cli-utils'
import { z } from 'zod'

const zCliConfigInput = z.object({
  uinityConfig: z.record(z.string(), z.any()),
  scssDir: z.string().optional(),
})
export type CliConfigInput = Omit<z.input<typeof zCliConfigInput>, 'uinityConfig'> & {
  uinityConfig?: UinityConfig
}
const defaultCliConfigInput: CliConfigInput = {}
export type CliConfig = {
  uinityConfig: UinityConfig
  scssDir?: string | undefined
}

export const findCliConfigPath = async ({ cwd }: { cwd: string }) => {
  let dirPath = path.resolve('/', cwd)
  for (let i = 0; i < 777; i++) {
    const maybeCliConfigGlobs = [`${dirPath}/(uinity.cli.|uinity.cli.*.)(js|mjs|ts)`]
    const maybeCliConfigPath = (
      await fg(maybeCliConfigGlobs, {
        onlyFiles: true,
        absolute: true,
      })
    )[0]
    if (maybeCliConfigPath) {
      return { cliConfigPath: maybeCliConfigPath }
    }
    const parentDirPath = path.resolve(dirPath, '..')
    if (dirPath === parentDirPath) {
      return { cliConfigPath: null }
    }
    dirPath = parentDirPath
  }
  return { cliConfigPath: null }
}

export const getCliConfig = async ({
  cwd,
}: {
  cwd: string
}): Promise<{ cliConfig: CliConfig; cliConfigPath: string; cliConfigDir: string }> => {
  const { cliConfigPath } = await findCliConfigPath({ cwd })
  if (!cliConfigPath) {
    throw new Error('CliConfig file not found')
  }
  const cliConfigInputMerged = _.cloneDeep(defaultCliConfigInput)

  const cliConfigInputFromFile = await getDataFromFile({ filePath: cliConfigPath })
  Object.assign(cliConfigInputMerged, cliConfigInputFromFile)
  const cliConfigMergedValidated = zCliConfigInput.safeParse(cliConfigInputMerged)
  if (!cliConfigMergedValidated.success) {
    throw new Error(`Invalid cliConfig file: "${cliConfigPath}": ${JSON.stringify(cliConfigMergedValidated.error)}`)
  }
  const cliConfigDir = path.dirname(cliConfigPath)
  return { cliConfig: cliConfigMergedValidated.data as CliConfig, cliConfigPath, cliConfigDir }
}
