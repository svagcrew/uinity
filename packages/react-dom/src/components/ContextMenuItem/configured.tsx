import type { ContextMenuItemDefaultAs, ContextMenuItemMainProps, ContextMenuItemStyleRoot } from './clear.js'
import { ContextMenuItem as ContextMenuItemClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getContextMenuItemConfigFinalProps } from '@uinity/core/dist/components/contextMenuItem.js'

export type ContextMenuItemConfiguredSettingsProps = {
  variant?: keyof UinityConfig['contextMenuItem']['variant'] | undefined | null
  color?: keyof UinityConfig['contextMenuItem']['color'] | undefined | null
  size?: keyof UinityConfig['contextMenuItem']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type ContextMenuItemConfiguredSpecialProps = {}
export type ContextMenuItemConfiguredMainProps<TAs extends As = ContextMenuItemDefaultAs> = ContextMenuItemConfiguredSettingsProps &
  ContextMenuItemConfiguredSpecialProps &
  ContextMenuItemMainProps<TAs>
export type ContextMenuItemConfiguredPropsWithRef<TAs extends As = ContextMenuItemDefaultAs> = ContextMenuItemConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type ContextMenuItemConfiguredPropsWithoutRef<TAs extends As = ContextMenuItemDefaultAs> = WithoutRef<
  ContextMenuItemConfiguredPropsWithRef<TAs>
>
export type ContextMenuItemConfigured = <TAs extends As = ContextMenuItemDefaultAs>(
  props: ContextMenuItemConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createContextMenuItem = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const ContextMenuItem: ContextMenuItemConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: ContextMenuItemConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getContextMenuItemConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: ContextMenuItemStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <ContextMenuItemClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    ContextMenuItem,
  }
}
