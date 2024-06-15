import type { AssignedElementDefaultAs, AssignedElementMainProps, AssignedElementStyleRoot } from './clear.js'
import { AssignedElement as AssignedElementClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getAssignedElementConfigFinalProps } from '@uinity/core/dist/components/assignedElement.js'

export type AssignedElementConfiguredSettingsProps = {
  variant?: keyof UinityConfig['assignedElement']['variant'] | undefined | null
  color?: keyof UinityConfig['assignedElement']['color'] | undefined | null
  size?: keyof UinityConfig['assignedElement']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type AssignedElementConfiguredSpecialProps = {}
export type AssignedElementConfiguredMainProps<TAs extends As = AssignedElementDefaultAs> = AssignedElementConfiguredSettingsProps &
  AssignedElementConfiguredSpecialProps &
  AssignedElementMainProps<TAs>
export type AssignedElementConfiguredPropsWithRef<TAs extends As = AssignedElementDefaultAs> = AssignedElementConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type AssignedElementConfiguredPropsWithoutRef<TAs extends As = AssignedElementDefaultAs> = WithoutRef<
  AssignedElementConfiguredPropsWithRef<TAs>
>
export type AssignedElementConfigured = <TAs extends As = AssignedElementDefaultAs>(
  props: AssignedElementConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createAssignedElement = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const AssignedElement: AssignedElementConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: AssignedElementConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getAssignedElementConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: AssignedElementStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <AssignedElementClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    AssignedElement,
  }
}
