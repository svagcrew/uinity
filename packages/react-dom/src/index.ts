import { createAssignedElement } from '@/components/AssignedElement/configured.js'
import { createAvatar } from '@/components/Avatar/configured.js'
import { createBadge } from '@/components/Badge/configured.js'
import { createBlank } from '@/components/Blank/configured.js'
import { createBlock } from '@/components/Block/configured.js'
import { createButonLikeSelect } from '@/components/ButonLikeSelect/configured.js'
import { createButton } from '@/components/Button/configured.js'
import { createCard } from '@/components/Card/configured.js'
import { createCheckbox } from '@/components/Checkbox/configured.js'
import { createContextMenuItem } from '@/components/ContextMenuItem/configured.js'
import { createControlIcon } from '@/components/ControlIcon/configured.js'
import { createDelimitedLine } from '@/components/DelimitedLine/configured.js'
import { createDisabler } from '@/components/Disabler/configured.js'
import { createDivider } from '@/components/Divider/configured.js'
import { createFormItem } from '@/components/FormItem/configured.js'
import { createGrid } from '@/components/Grid/configured.js'
import type { IconSrc } from '@/components/Icon/clear.js'
import type { IconsSources } from '@/components/Icon/configured.js'
import { createIcon } from '@/components/Icon/configured.js'
import { createIndicator } from '@/components/Indicator/configured.js'
import { createInformer } from '@/components/Informer/configured.js'
import { createLabeledValue } from '@/components/LabeledValue/configured.js'
import { createLayout } from '@/components/Layout/configured.js'
import { createLink } from '@/components/Link/configured.js'
import { createLoader } from '@/components/Loader/configured.js'
import { createModal } from '@/components/Modal/configured.js'
import { createPopover } from '@/components/Popover/configured.js'
import { createProgressLine } from '@/components/ProgressLine/configured.js'
import { createRadiobutton } from '@/components/Radiobutton/configured.js'
import { createRichText } from '@/components/RichText/configured.js'
import { createSegment } from '@/components/Segment/configured.js'
import { createSelect } from '@/components/Select/configured.js'
import { createSplashScreen } from '@/components/SplashScreen/configured.js'
import { createTab } from '@/components/Tab/configured.js'
import { createTable } from '@/components/Table/configured.js'
import { createText } from '@/components/Text/configured.js'
import { createTextarea } from '@/components/Textarea/configured.js'
import { createTextfield } from '@/components/Textfield/configured.js'
import { createToast } from '@/components/Toast/configured.js'
import { createToggleButton } from '@/components/ToggleButton/configured.js'
import { createToggleSwitch } from '@/components/ToggleSwitch/configured.js'
import type { UinityConfig } from '@uinity/core'

export const createComponents = <TIconName extends string>({
  uinityConfig,
  iconsSources,
  blankAvatarSrc,
}: {
  uinityConfig: UinityConfig
  iconsSources?: IconsSources<TIconName>
  blankAvatarSrc?: IconSrc
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
    ...createLink({ uinityConfig, Icon }),
    ...createText({ uinityConfig }),
    ...createRichText({ uinityConfig }),
    ...createLoader({ uinityConfig }),
    ...createButonLikeSelect({ uinityConfig }),
    ...createTextfield({ uinityConfig }),
    ...createContextMenuItem({ uinityConfig, Icon }),
    ...createSelect({ uinityConfig }),
    ...createTextarea({ uinityConfig }),
    ...createFormItem({ uinityConfig }),
    ...createControlIcon({ uinityConfig, Icon }),
    ...createAssignedElement({ uinityConfig }),
    ...createInformer({ uinityConfig }),
    ...createToast({ uinityConfig }),
    ...createCard({ uinityConfig }),
    ...createSegment({ uinityConfig }),
    ...createTable({ uinityConfig }),
    ...createLabeledValue({ uinityConfig }),
    ...createToggleButton({ uinityConfig }),
    ...createTab({ uinityConfig }),
    ...createToggleSwitch({ uinityConfig }),
    ...createCheckbox({ uinityConfig }),
    ...createRadiobutton({ uinityConfig }),
    ...createDivider({ uinityConfig }),
    ...createBadge({ uinityConfig }),
    ...createIndicator({ uinityConfig }),
    ...createAvatar({ uinityConfig, blankAvatarSrc }),
    ...createDelimitedLine({ uinityConfig }),
    ...createBlank({ uinityConfig }),
  }
}
