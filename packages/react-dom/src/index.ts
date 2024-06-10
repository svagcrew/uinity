import type { BlockType } from '@/components/Block/index.js'
import { createUinityBlock } from '@/components/Block/index.js'
import type { ButtonType } from '@/components/Button/index.js'
import { createUinityButtons } from '@/components/Button/index.js'
import type { DisablerType } from '@/components/Disabler/index.js'
import { createUinityDisabler } from '@/components/Disabler/index.js'
import { createUinityGrid, type GridType } from '@/components/Grid/index.js'
import type { IconsComponents, IconType } from '@/components/Icon/index.js'
import { createUinityIcon } from '@/components/Icon/index.js'
import type { LayoutType } from '@/components/Layout/index.js'
import { createUinityLayout } from '@/components/Layout/index.js'
import type { ModalType } from '@/components/Modal/index.js'
import { createUinityModal } from '@/components/Modal/index.js'
import type { NProgressStylesType, NProgressType } from '@/components/NProgress/index.js'
import { createUinityNProgress } from '@/components/NProgress/index.js'
import type { WithPopoverType } from '@/components/Popover/index.js'
import { createUinityPopover } from '@/components/Popover/index.js'
import type { SplashScreenType } from '@/components/SplashScreen/index.js'
import { createUinitySplashScreen } from '@/components/SplashScreen/index.js'
import type { UinityConfig } from '@uinity/core'

export const createUinityComponents = <TUinityConfig extends UinityConfig, TIconName extends string>({
  uinityConfig,
  iconsComponents,
}: {
  uinityConfig: TUinityConfig
  iconsComponents?: IconsComponents<TIconName>
}): {
  Button: ButtonType<TUinityConfig, TIconName>
  Icon: IconType<TUinityConfig, TIconName>
  Layout: LayoutType<TUinityConfig>
  SplashScreen: SplashScreenType
  NProgressStyles: NProgressStylesType
  NProgress: NProgressType
  Disabler: DisablerType
  Block: BlockType
  Grid: GridType
  WithPopover: WithPopoverType
  Modal: ModalType
} => {
  const { Icon } = createUinityIcon({ uinityConfig, iconsComponents })
  return {
    ...createUinityIcon({ uinityConfig, iconsComponents }),
    ...createUinityButtons({ uinityConfig, Icon }),
    ...createUinityLayout({ uinityConfig }),
    ...createUinitySplashScreen(),
    ...createUinityNProgress({ uinityConfig }),
    ...createUinityDisabler({ uinityConfig }),
    ...createUinityBlock(),
    ...createUinityGrid(),
    ...createUinityPopover(),
    ...createUinityModal(),
  } as any
}
