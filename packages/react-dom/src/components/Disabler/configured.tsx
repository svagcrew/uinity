import { Disabler } from './clear.js'
import type { UinityConfig } from '@uinity/core'

// TODO: extend from Block
export const createDisabler = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uinityConfig,
}: {
  uinityConfig: UinityConfig
}) => {
  return {
    Disabler,
  }
}
