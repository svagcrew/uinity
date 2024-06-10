import { getCliConfig } from '@/lib/config.js'
import { createScssIndexFile } from '@/lib/scssIndex.js'
import { createScssMixinsFiles } from '@/lib/scssMixins.js'
import { createScssVariablesFiles } from '@/lib/scssVariables.js'
import dedent from 'dedent'
import path from 'path'
import { defineCliApp, log, spawn } from 'svag-cli-utils'

defineCliApp(async ({ args, command, cwd, flags }) => {
  switch (command) {
    case 's':
    case 'scss': {
      const { cliConfig, cliConfigDir } = await getCliConfig({ cwd })
      const scssDirRaw = cliConfig.scssDir
      if (!scssDirRaw) {
        log.red('scssMixinsDir not found in cliConfig')
        break
      }
      const scssDir = path.resolve(cliConfigDir, scssDirRaw)
      await createScssMixinsFiles({ scssDir, uinityConfig: cliConfig.uinityConfig })
      await createScssVariablesFiles({ scssDir, uinityConfig: cliConfig.uinityConfig })
      await createScssIndexFile({ scssDir })
      break
    }
    case 'ping':
      log.black(JSON.stringify({ args, command, cwd, flags }, null, 2))
      await spawn({ cwd, command: 'echo pong' })
      break
    case 'h':
    case 'help':
      log.black(dedent`Commands:
        scss | s — create scss mixins and variables files
        ping — pong
        help | h — show help
      `)
      break
    default:
      log.red('Unknown command:', command)
      break
  }
})
