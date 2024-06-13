import { createBlock } from '@/components/Block/configured.js'
import { createButton } from '@/components/Button/configured.js'
import { createDisabler } from '@/components/Disabler/configured.js'
import { createGrid } from '@/components/Grid/configured.js'
import type { IconsComponents } from '@/components/Icon/configured.js'
import { createIcon } from '@/components/Icon/configured.js'
import { createLayout } from '@/components/Layout/index.js'
import { createModal } from '@/components/Modal/index.js'
import { createNProgress } from '@/components/NProgress/index.js'
import { createPopover } from '@/components/Popover/index.js'
import { createSplashScreen } from '@/components/SplashScreen/index.js'
import type { UinityConfig } from '@uinity/core'

export const createComponents = <TUinityConfig extends UinityConfig, TIconName extends string>({
  uinityConfig,
  iconsComponents,
}: {
  uinityConfig: TUinityConfig
  iconsComponents?: IconsComponents<TIconName>
}) => {
  const { Icon } = createIcon({ uinityConfig, iconsComponents })
  return {
    ...createIcon({ uinityConfig, iconsComponents }),
    ...createButton({ uinityConfig, Icon }),
    ...createLayout({ uinityConfig }),
    ...createSplashScreen(),
    ...createNProgress({ uinityConfig }),
    ...createDisabler({ uinityConfig }),
    ...createBlock({ uinityConfig }),
    ...createGrid({ uinityConfig }),
    ...createPopover(),
    ...createModal(),
  }
}
