import type { IconType } from '@/components/Icon/index.js'
import { mark } from '@/utils.js'
import type { UinityConfig } from '@uinity/core'
import { getButtonFinalProps } from '@uinity/core/dist/components/button.js'
import { getTextStyleCss } from '@uinity/core/dist/components/text.js'
import { getCssColorValue } from '@uinity/core/dist/utils/color.js'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'
import { forwardRef } from 'react'
import { css, styled } from 'styled-components'

type ButtonGeneralProps = React.HTMLAttributes<HTMLButtonElement>
type ButtonSettingsProps<TIconName extends string> = {
  icon?: TIconName
}
type ButtonStyledProps<TUinityConfig extends UinityConfig = UinityConfig> = {
  type?: keyof TUinityConfig['button']['type'] | undefined | null
  size?: keyof TUinityConfig['button']['size'] | undefined | null
  colorMode?: TUinityConfig['general']['colorModes'][number] | undefined | null
}
type ButtonPropsExceptGeneral<
  TUinityConfig extends UinityConfig = UinityConfig,
  TIconName extends string = string,
> = ButtonStyledProps<TUinityConfig> & ButtonSettingsProps<TIconName>
type ButtonProps<
  TUinityConfig extends UinityConfig = UinityConfig,
  TIconName extends string = string,
> = ButtonGeneralProps & ButtonPropsExceptGeneral<TUinityConfig, TIconName>
export type ButtonType<TUinityConfig extends UinityConfig, TIconName extends string> = React.FC<
  ButtonProps<TUinityConfig, TIconName>
>

export const createUinityButtons = <TUinityConfig extends UinityConfig, TIconName extends string>({
  uinityConfig,
  Icon,
}: {
  uinityConfig: TUinityConfig
  Icon: IconType<TUinityConfig, TIconName>
}): {
  Button: ButtonType<TUinityConfig, TIconName>
} => {
  const IconS = styled(Icon)`
    margin-right: 20px;
  `
  const ButtonS = styled.button.attrs(mark('ButtonS'))<ButtonStyledProps>`
    ${(props) => {
      const cRest = getButtonFinalProps(uinityConfig, props.type, props.size, 'rest')
      const cHover = getButtonFinalProps(uinityConfig, props.type, props.size, 'hover')
      return css`
        ${getTextStyleCss(uinityConfig, cRest.textFont, cRest.textType, cRest.textSize, cRest.textLineHeight)}
        ${camelCaseObjectToCss({
          background: getCssColorValue(cRest.background, props.colorMode),
          color: getCssColorValue(cRest.textColor, props.colorMode),
          minHeight: cRest.minHeight,
        })}

      & ${IconS} {
          width: ${cRest.iconSize}px;
          height: ${cRest.iconSize}px;

          path {
            fill: ${getCssColorValue(cRest.iconColor, props.colorMode)};
          }
        }

        &:hover {
          ${getTextStyleCss(uinityConfig, cHover.textFont, cHover.textType, cHover.textSize, cHover.textLineHeight)}
          ${camelCaseObjectToCss({
            background: getCssColorValue(cHover.background, props.colorMode),
            color: getCssColorValue(cHover.textColor, props.colorMode),
            minHeight: cHover.minHeight,
          })}

        & ${IconS} {
            path {
              fill: ${getCssColorValue(cHover.iconColor, props.colorMode)};
            }
          }
        }
      `
    }}
  `

  const Button = forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & ButtonProps>(
    ({ icon, children, ...restProps }, ref) => {
      return (
        <ButtonS ref={ref} {...(restProps as any)}>
          {!!icon && <IconS name={icon as TIconName} />}
          {children}
        </ButtonS>
      )
    }
  )
  return {
    Button: Button as ButtonType<TUinityConfig, TIconName>,
  }
}
