import { createComponent } from '@/createComponent.js'
import { defineCliApp, getFlagAsBoolean, getFlagAsString, getPackageJson, log, spawn } from 'svag-cli-utils'

defineCliApp(async ({ cwd, command, args, flags }) => {
  switch (command) {
    case 'create-component':
    case 'cc': {
      const name = args[0]
      const as = getFlagAsString({
        flags,
        keys: ['as', 'a'],
        coalesce: undefined,
      })
      const preventIndexFilesModifications = getFlagAsBoolean({
        flags,
        keys: ['I'],
        coalesce: false,
      })
      const preventCoreFilesModifications = getFlagAsBoolean({
        flags,
        keys: ['C'],
        coalesce: false,
      })
      const preventReactDomFilesModifications = getFlagAsBoolean({
        flags,
        keys: ['R'],
        coalesce: false,
      })
      const createOnlyReactDom = getFlagAsBoolean({
        flags,
        keys: ['r'],
        coalesce: false,
      })
      const createOnlyCore = getFlagAsBoolean({
        flags,
        keys: ['c'],
        coalesce: false,
      })
      await createComponent({
        as,
        name,
        preventIndexFilesModifications,
        preventCoreFilesModifications,
        preventReactDomFilesModifications,
        createOnlyReactDom,
        createOnlyCore,
      })
      break
    }
    case 'h': {
      log.black(`Commands:
create-component | cc:
  --as -a: as component type (default: div)
  --I: prevent modifications in index files
  --C: prevent modifications in core files
  --R: prevent modifications in react-dom files
`)
      break
    }
    case 'ping': {
      const { packageJsonDir } = await getPackageJson({ cwd })
      await spawn({ cwd: packageJsonDir, command: 'echo pong' })
      break
    }
    default: {
      log.red('Unknown command:', command)
      break
    }
  }
})
