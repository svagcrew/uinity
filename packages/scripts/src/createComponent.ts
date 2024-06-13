import _ from 'lodash'
import { log } from 'svag-cli-utils'

export const createComponent = async ({ name, as }: { name: string; as?: string | null }) => {
  if (!name) {
    throw new Error('Component name is required')
  }
  const nameCamelCaseLowercase = _.camelCase(name)
  const nameKebabCase = _.kebabCase(name)
  const nameCamelCaseCapitalized = _.upperFirst(nameCamelCaseLowercase)
  log.black(`Creating component "${nameCamelCaseCapitalized}", as:${JSON.stringify(as)}`)
  log.green('createComponent.ts', { name, as, nameCamelCaseLowercase, nameKebabCase, nameCamelCaseCapitalized })
}
