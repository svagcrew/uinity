import { generateUinityConfigFromSource } from '@/lib/uinityConfigAdditional.js'
import chokidar from 'chokidar'
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
        const handler = () => {
          try {
            generateUinityConfigFromSource({ srcPath, distPath })
            console.info(`Config saved to ${distPath}`)
          } catch (error: any) {
            console.error(error.message)
          }
        }

        handler()

        if (watch) {
          const watcher = chokidar.watch(srcPath, { persistent: true })
          watcher.on('change', (path) => {
            console.info(`File ${path} has changed, regenerating config...`)
            handler()
          })
          console.info(`Watching for changes on ${srcPath}`)
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
