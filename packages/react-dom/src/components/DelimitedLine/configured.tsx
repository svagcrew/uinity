import type { DelimitedLineDefaultAs, DelimitedLineMainProps, DelimitedLineStyleRoot } from './clear.js'
import { DelimitedLine as DelimitedLineClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getDelimitedLineConfigFinalProps } from '@uinity/core/dist/components/delimitedLine.js'

export type DelimitedLineConfiguredSettingsProps = {
  variant?: keyof UinityConfig['delimitedLine']['variant'] | undefined | null
  color?: keyof UinityConfig['delimitedLine']['color'] | undefined | null
  size?: keyof UinityConfig['delimitedLine']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type DelimitedLineConfiguredSpecialProps = {}
export type DelimitedLineConfiguredMainProps<TAs extends As = DelimitedLineDefaultAs> = DelimitedLineConfiguredSettingsProps &
  DelimitedLineConfiguredSpecialProps &
  DelimitedLineMainProps<TAs>
export type DelimitedLineConfiguredPropsWithRef<TAs extends As = DelimitedLineDefaultAs> = DelimitedLineConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type DelimitedLineConfiguredPropsWithoutRef<TAs extends As = DelimitedLineDefaultAs> = WithoutRef<
  DelimitedLineConfiguredPropsWithRef<TAs>
>
export type DelimitedLineConfigured = <TAs extends As = DelimitedLineDefaultAs>(
  props: DelimitedLineConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createDelimitedLine = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const DelimitedLine: DelimitedLineConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: DelimitedLineConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getDelimitedLineConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: DelimitedLineStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <DelimitedLineClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    DelimitedLine,
  }
}
