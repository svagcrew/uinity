import { infinitifyUinityConfig, validateUinityConfig, variablifyUinityConfigSource } from '@/lib/unintyConfig.js'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import yargs from 'yargs'

void (async () => {
  try {
    // Set up the CLI argument parsing
    const argv = await yargs(process.argv.slice(2))
      .usage('Usage: $0 <input-file-path> <output-file-path>')
      .demandCommand(2, 'You need to provide both input and output file paths.')
      .parse()

    const inputFilePath = argv._[0].toString()
    const outputFilePath = argv._[1].toString()

    const fileContent = fs.readFileSync(inputFilePath, 'utf8')
    const uinityConfigSource: Record<string, any> = yaml.load(fileContent) as Record<string, any>
    const uinityConfigRaw = variablifyUinityConfigSource({ uinityConfigSource })
    const uinityConfigInfinitified = infinitifyUinityConfig({ uinityConfigRaw })
    validateUinityConfig({ uinityConfig: uinityConfigInfinitified })

    // Save the result to the output file
    fs.writeFileSync(outputFilePath, JSON.stringify(uinityConfigRaw, null, 2))

    console.info(`Result saved to ${outputFilePath}`)
  } catch (error: any) {
    console.error(error.message)
    process.exit(1)
  }
})()
