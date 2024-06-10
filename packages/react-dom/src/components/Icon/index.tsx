import type { RC } from '@/utils.js'
import { createElement } from 'react'
import { css, styled } from 'styled-components'
import type { UinityConfig } from '@uinity/core'
import { getIconFinalProps } from '@uinity/core/dist/components/icon.js'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'

type IconGeneralProps = { className?: string; style?: React.CSSProperties }
export type IconComponentType = (props: IconGeneralProps) => React.ReactNode
export type IconsComponents<TIconName extends string> = Record<TIconName, IconComponentType>
type IconSize<TUinityConfig extends UinityConfig> = keyof TUinityConfig['icon']['size']
type IconSettingsProps<TIconName extends string> = {
  name: TIconName
}
type IconStyledProps<TUinityConfig extends UinityConfig = UinityConfig> = {
  size?: IconSize<TUinityConfig> | undefined | null
}
type IconProps<
  TUinityConfig extends UinityConfig = UinityConfig,
  TIconName extends string = string,
> = IconStyledProps<TUinityConfig> & IconGeneralProps & IconSettingsProps<TIconName>
export type IconType<TUinityConfig extends UinityConfig, TIconName extends string> = RC<
  IconProps<TUinityConfig, TIconName>
>

export const createUinityIcon = <TUinityConfig extends UinityConfig, TIconName extends string>({
  uinityConfig,
  iconsComponents,
}: {
  uinityConfig: TUinityConfig
  iconsComponents?: IconsComponents<TIconName>
}): {
  Icon: IconType<TUinityConfig, TIconName>
} => {
  const Icon = ({ name, size, ...restProps }: IconProps) => {
    if (!(iconsComponents as any)?.[name]) {
      // throw new Error(`Icon component "${name}" not found`)
      console.error(`Uinity: Icon component "${name}" not found`)
      return null
    }
    return createElement((iconsComponents as any)[name], {
      ...(size ? { width: size, height: size } : {}),
      ...restProps,
    })
  }
  const getIconStyle = (props: IconStyledProps) => {
    const iconFinalProps = getIconFinalProps(uinityConfig, props.size)
    const result = css`
      ${camelCaseObjectToCss({
        width: iconFinalProps.size,
        height: iconFinalProps.size,
      })}
    `
    return result
  }
  const IconStyled = styled(Icon)<IconStyledProps>`
    ${(props) => getIconStyle(props)}
  `
  return {
    Icon: IconStyled as IconType<TUinityConfig, TIconName>,
  }
}
