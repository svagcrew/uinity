import { createBlank } from '@/components/Blank/configured.js'
import { createBlock } from '@/components/Block/configured.js'
import { createButton } from '@/components/Button/configured.js'
import { createDisabler } from '@/components/Disabler/configured.js'
import { createGrid } from '@/components/Grid/configured.js'
import type { IconsSources } from '@/components/Icon/configured.js'
import { createIcon } from '@/components/Icon/configured.js'
import { createLayout } from '@/components/Layout/configured.js'
import { createModal } from '@/components/Modal/configured.js'
import { createPopover } from '@/components/Popover/configured.js'
import { createProgressLine } from '@/components/ProgressLine/configured.js'
import { createSplashScreen } from '@/components/SplashScreen/configured.js'
import type { UinityConfig } from '@uinity/core'

export const createComponents = <TIconName extends string>({
  uinityConfig,
  iconsSources,
}: {
  uinityConfig: UinityConfig
  iconsSources?: IconsSources<TIconName>
}) => {
  const { Icon } = createIcon({ uinityConfig, iconsSources })
  return {
    ...createIcon({ uinityConfig, iconsSources }),
    ...createButton({ uinityConfig, Icon }),
    ...createLayout({ uinityConfig }),
    ...createSplashScreen({ uinityConfig }),
    ...createProgressLine({ uinityConfig }),
    ...createDisabler({ uinityConfig }),
    ...createBlock({ uinityConfig }),
    ...createGrid({ uinityConfig }),
    ...createPopover({ uinityConfig }),
    ...createModal({ uinityConfig }),
    ...createBlank({ uinityConfig }),
  }
}
