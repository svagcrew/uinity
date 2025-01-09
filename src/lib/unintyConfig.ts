import { zButtonConfig, type ButtonUinityConfig } from '@/components/Button/config.js'
import { zIconConfig, type IconUinityConfig } from '@/components/Icon/config.js'

export type UinityConfigFull = IconUinityConfig & ButtonUinityConfig

export const zUinityConfigFull = zIconConfig.merge(zButtonConfig)
