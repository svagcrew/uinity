import '@/lib/cssGridPolyfill.js'
import { Grid } from './clear.js'
import type { UinityConfig } from '@uinity/core'

export const createGrid = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uinityConfig,
}: {
  uinityConfig: UinityConfig
}) => {
  return {
    Grid,
  }
}
