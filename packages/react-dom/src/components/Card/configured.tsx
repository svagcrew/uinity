import type { CardDefaultAs, CardMainProps, CardStyleRoot } from './clear.js'
import { Card as CardClear } from './clear.js'
import { useColorMode } from '@/lib/colorMode.js'
import { type As, type AsPropsWithRef, forwardRefIgnoreTypes, type WithoutRef } from '@/utils.js'
import { type ColorModeName, getColorByMode, type UinityConfig } from '@uinity/core'
import { getCardConfigFinalProps } from '@uinity/core/dist/components/card.js'

export type CardConfiguredSettingsProps = {
  variant?: keyof UinityConfig['card']['variant'] | undefined | null
  color?: keyof UinityConfig['card']['color'] | undefined | null
  size?: keyof UinityConfig['card']['size'] | undefined | null
  colorMode?: ColorModeName | undefined | null
}
export type CardConfiguredSpecialProps = {}
export type CardConfiguredMainProps<TAs extends As = CardDefaultAs> = CardConfiguredSettingsProps &
  CardConfiguredSpecialProps &
  CardMainProps<TAs>
export type CardConfiguredPropsWithRef<TAs extends As = CardDefaultAs> = CardConfiguredMainProps<TAs> &
  AsPropsWithRef<TAs>
export type CardConfiguredPropsWithoutRef<TAs extends As = CardDefaultAs> = WithoutRef<
  CardConfiguredPropsWithRef<TAs>
>
export type CardConfigured = <TAs extends As = CardDefaultAs>(
  props: CardConfiguredPropsWithRef<TAs>
) => React.ReactNode

export const createCard = ({ uinityConfig }: { uinityConfig: UinityConfig }) => {
  const Card: CardConfigured = forwardRefIgnoreTypes(
    ({ variant, color, size, colorMode, $style = {}, ...restProps }: CardConfiguredPropsWithoutRef, ref: any) => {
      const { cm } = useColorMode(colorMode)
      const cfp = getCardConfigFinalProps(uinityConfig, variant, color, size)
      const $styleConfigured: CardStyleRoot = {
        ...cfp,
        ...$style,
        background: getColorByMode(cm, $style.background ?? cfp.background),
        childrenBackground: getColorByMode(cm, $style.childrenBackground ?? cfp.childrenBackground),
      }
      return <CardClear {...(restProps as {})} $style={$styleConfigured} ref={ref} />
    }
  )
  return {
    Card,
  }
}
