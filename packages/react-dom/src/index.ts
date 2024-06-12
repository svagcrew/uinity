import { createUinityBlock } from '@/components/Block/index.js'
import { createUinityButton } from '@/components/Button/configured.js'
import { createUinityDisabler } from '@/components/Disabler/index.js'
import { createUinityGrid } from '@/components/Grid/index.js'
import type { IconsComponents } from '@/components/Icon/configured.js'
import { createUinityIcon } from '@/components/Icon/configured.js'
import { createUinityLayout } from '@/components/Layout/index.js'
import { createUinityModal } from '@/components/Modal/index.js'
import { createUinityNProgress } from '@/components/NProgress/index.js'
import { createUinityPopover } from '@/components/Popover/index.js'
import { createUinitySplashScreen } from '@/components/SplashScreen/index.js'
import type { UinityConfig } from '@uinity/core'

export const createUinityComponents = <TUinityConfig extends UinityConfig, TIconName extends string>({
  uinityConfig,
  iconsComponents,
}: {
  uinityConfig: TUinityConfig
  iconsComponents?: IconsComponents<TIconName>
}) => {
  const { Icon } = createUinityIcon({ uinityConfig, iconsComponents })
  return {
    ...createUinityIcon({ uinityConfig, iconsComponents }),
    ...createUinityButton({ uinityConfig, Icon }),
    ...createUinityLayout({ uinityConfig }),
    ...createUinitySplashScreen(),
    ...createUinityNProgress({ uinityConfig }),
    ...createUinityDisabler({ uinityConfig }),
    ...createUinityBlock(),
    ...createUinityGrid(),
    ...createUinityPopover(),
    ...createUinityModal(),
  }
}
