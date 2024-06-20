import type { SegmentDefaultAs, SegmentMainProps, SegmentStyleRoot } from './clear.js'
import { Segment as SegmentClear, Segments } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getSegmentConfigFinalProps } from '@uinity/core/dist/components/segment.js'

export type SegmentConfiguredSettingsProps = {
  variant?: keyof UinityConfig['segment']['variant'] | undefined | null
  color?: keyof UinityConfig['segment']['color'] | undefined | null
  size?: keyof UinityConfig['segment']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type SegmentConfiguredSpecialProps = {}
export type SegmentConfiguredMainProps<TAs extends As = SegmentDefaultAs> = SegmentConfiguredSettingsProps &
  SegmentConfiguredSpecialProps &
  SegmentMainProps<TAs>
export type SegmentConfiguredPropsWithRef<TAs extends As = SegmentDefaultAs> = SegmentConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type SegmentConfiguredPropsWithoutRef<TAs extends As = SegmentDefaultAs> = WithoutRef<
  SegmentConfiguredPropsWithRef<TAs>
>
export type SegmentConfigured = <TAs extends As = SegmentDefaultAs>(
  props: SegmentConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createSegment = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Segment: SegmentConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: SegmentConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getSegmentConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: SegmentStyleRoot = {
        ...cfp,
        ...$style,
        titleColor: getColorByMode(cm, $style.titleColor ?? cfp.titleColor),
        descColor: getColorByMode(cm, $style.descColor ?? cfp.descColor),
      }
      return <SegmentClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Segment,
    Segments,
  }
}
