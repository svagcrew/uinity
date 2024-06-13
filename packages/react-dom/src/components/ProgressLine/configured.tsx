import { NProgress, ProgressLine } from '@/components/ProgressLine/clear.js'
import type { UinityConfig } from '@uinity/core'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createProgressLine = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  return {
    ProgressLine,
    NProgress,
  }
}
