import { Disabler } from './clear.js'
import type { UinityConfig } from '@uinity/core'

// TODO: extend from Block
export const createDisabler = <TUinityConfig extends UinityConfig>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uinityConfig,
}: {
  uinityConfig: TUinityConfig
}) => {
  return {
    Disabler,
  }
}
