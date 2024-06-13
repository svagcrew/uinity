import { createComponent } from '@/createComponent.js'
import { defineCliApp, getFlagAsString, getPackageJson, log, spawn } from 'svag-cli-utils'

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
      await createComponent({ as, name })
      break
    }
    case 'h': {
      log.black(`Commands:
create-component | cc`)
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
