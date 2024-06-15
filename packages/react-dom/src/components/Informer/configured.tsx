import type { InformerDefaultAs, InformerMainProps, InformerStyleRoot } from './clear.js'
import { Informer as InformerClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getInformerConfigFinalProps } from '@uinity/core/dist/components/informer.js'

export type InformerConfiguredSettingsProps = {
  variant?: keyof UinityConfig['informer']['variant'] | undefined | null
  color?: keyof UinityConfig['informer']['color'] | undefined | null
  size?: keyof UinityConfig['informer']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type InformerConfiguredSpecialProps = {}
export type InformerConfiguredMainProps<TAs extends As = InformerDefaultAs> = InformerConfiguredSettingsProps &
  InformerConfiguredSpecialProps &
  InformerMainProps<TAs>
export type InformerConfiguredPropsWithRef<TAs extends As = InformerDefaultAs> = InformerConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type InformerConfiguredPropsWithoutRef<TAs extends As = InformerDefaultAs> = WithoutRef<
  InformerConfiguredPropsWithRef<TAs>
>
export type InformerConfigured = <TAs extends As = InformerDefaultAs>(
  props: InformerConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createInformer = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Informer: InformerConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: InformerConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getInformerConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: InformerStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <InformerClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Informer,
  }
}
