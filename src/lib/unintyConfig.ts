import { zButtonConfig, type ButtonUinityConfig } from '@/components/button/config.js'
import { zIconConfig, type IconUinityConfig } from '@/components/icon/config.js'

export type UinityConfigFull = IconUinityConfig & ButtonUinityConfig

export const zUinityConfigFull = zIconConfig.merge(zButtonConfig)
