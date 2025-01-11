import {
  generateUinityConfigFromSource,
  generateUinityConfigFromSourceWithWatch,
} from '@/lib/uinityConfigAdditional.js'

import { Command } from 'commander'

// eslint-disable-next-line @typescript-eslint/require-await
void (async () => {
  try {
    const program = new Command()

    program.usage('<command> [args]')

    program
      .command('config-generate')
      .description('Generate a uinity config file from a source file')
      .argument('<src-path>', 'Path to the source file')
      .argument('<dist-path>', 'Path to the output file')
      .option('-w, --watch', 'Watch the input file for changes')
      .action((srcPath, distPath, options) => {
        const watch = !!options.watch
        try {
          generateUinityConfigFromSource({ srcPath, distPath, verbose: true })
        } catch (error: any) {
          console.error(error.message)
        }
        if (watch) {
          generateUinityConfigFromSourceWithWatch({ srcPath, distPath, verbose: true })
        }
      })

    program
      .command('ping')
      .description('Log "pong" to the console')
      .action(() => {
        console.info('pong')
      })

    program.helpCommand(true)

    program.parse(process.argv)
  } catch (error: any) {
    console.error(error.message)
    process.exit(1)
  }
})()
