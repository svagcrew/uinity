import { controlSizeNames, zControlSizeProps } from '@/components/control.js'
import { zTextFontName, zTextLineHeightName, zTextSizeName, zTextTypeName } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import { z } from 'zod'

export const buttonSizesNames = controlSizeNames
export const zButtonSizeName = z.enum(buttonSizesNames)
export type ButtonSizeName = z.infer<typeof zButtonSizeName>

export const buttonTypesNames = ['primary', 'secondary'] as const
export const zButtonTypeName = z.enum(buttonTypesNames)
export type ButtonTypeName = z.infer<typeof zButtonTypeName>

export const buttonStatesNames = ['rest', 'hover', 'active', 'focus', 'disabled'] as const
export const zButtonStateName = z.enum(buttonStatesNames)
export type ButtonStateName = z.infer<typeof zButtonStateName>

export const zButtonSizeProps = zControlSizeProps.extend({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  borderWidth: zOptionalNumberOrString,
  minHeight: zOptionalNumberOrString,
})
export type ButtonSizeProps = z.infer<typeof zButtonSizeProps>
export const zButtonAppearenceProps = z.object({
  textFont: zTextFontName.optional(),
  textType: zTextTypeName.optional(),
  textSize: zTextSizeName.optional(),
  textLineHeight: zTextLineHeightName.optional(),
  background: zColorValue.optional(),
  borderColor: zColorValue.optional(),
  textColor: zColorValue.optional(),
  iconColor: zColorValue.optional(),
})
export type ButtonAppearenceProps = z.infer<typeof zButtonFinalProps>
export const zButtonFinalProps = zButtonSizeProps.merge(zButtonAppearenceProps)
export type ButtonFinalProps = z.infer<typeof zButtonFinalProps>

export const zButtonGeneralProps = z.object({
  defaultFinalProps: zButtonFinalProps.optional(),
  defaultType: zButtonTypeName.optional(),
  defaultSize: zButtonSizeName.optional(),
})
export type ButtonGeneralProps = z.infer<typeof zButtonGeneralProps>

export const zButtonComplexProps = z.record(
  z.union([zButtonTypeName, z.literal('any')]),
  z
    .record(
      z.union([zButtonSizeName, z.literal('any')]),
      z.record(z.union([zButtonStateName, z.literal('any')]), zButtonFinalProps).optional()
    )
    .optional()
)
export type ButtonComplexProps = z.infer<typeof zButtonComplexProps>
export const zButtonUinityConfigInput = z.object({
  general: zButtonGeneralProps.optional(),
  type: z.record(zButtonTypeName, zButtonAppearenceProps).optional(),
  size: z.record(zButtonSizeName, zButtonSizeProps).optional(),
  state: z.record(zButtonStateName, zButtonAppearenceProps).optional(),
  complex: zButtonComplexProps.optional(),
})
export type ButtonUinityConfigInput = z.infer<typeof zButtonUinityConfigInput>

const getDefaultSpecificSizeProps = (size: ButtonSizeName) => ({
  borderRadius: $.control.size[size].borderRadius,
  horizontalPaddingEdgeAccessory: $.control.size[size].horizontalPaddingEdgeAccessory,
  horizontalPaddingEdgeText: $.control.size[size].horizontalPaddingEdgeText,
  horizontalPaddingAccessoryText: $.control.size[size].horizontalPaddingAccessoryText,
  minHeight: $.control.size[size].minHeight,
  iconSize: $.control.size[size].iconSize,
})
export const defaultButtonUinityConfigInput: ButtonUinityConfigInput = {
  general: {
    defaultType: 'primary',
    defaultSize: $.control.general.defaultSize,
    defaultFinalProps: {
      textFont: $.text.general.defaultFont,
      textSize: $.text.general.defaultSize,
      textType: $.text.general.defaultType,
      textLineHeight: $.text.general.defaultLineHeight,
    },
  },
  type: {
    primary: {
      background: {
        light: $.color.core.brand[60],
        dark: $.color.core.brand[60],
      },
      iconColor: {
        dark: $.color.core.neutral[0],
        light: $.color.core.neutral[250],
      },
    },
    secondary: {
      background: $.color.semantic.symbol.secondary,
    },
  },
  // size: {
  //   l: getDefaultSpecificSizeProps('l'),
  //   m: getDefaultSpecificSizeProps('m'),
  //   s: getDefaultSpecificSizeProps('s'),
  //   xs: getDefaultSpecificSizeProps('xs'),
  // },
  size: Object.fromEntries(buttonSizesNames.map((size) => [size, getDefaultSpecificSizeProps(size)])),
  state: {
    rest: {},
    hover: {},
    active: {},
    focus: {},
    disabled: {},
  },
  complex: {
    primary: {
      xs: {
        hover: {
          textColor: '$.color.core.green.60',
          iconColor: '$.color.core.green.60',
        },
      },
    },
  },
}

export const normalizeButtonUinityConfig = (input: ButtonUinityConfigInput | undefined) => {
  const complex = {} as ButtonComplexProps
  for (const type of [...buttonTypesNames, 'any'] as const) {
    for (const size of [...buttonSizesNames, 'any'] as const) {
      for (const state of [...buttonStatesNames, 'any'] as const) {
        const defaultComplexItem = defaultButtonUinityConfigInput.complex?.[type]?.[size]?.[state]
        const inputComplexItem = input?.complex?.[type]?.[size]?.[state]
        const complexItem =
          !defaultComplexItem && !inputComplexItem ? undefined : { ...defaultComplexItem, ...inputComplexItem }
        if (complexItem) {
          complex[type] = {
            ...complex[type],
            [size]: {
              ...complex[type]?.[size],
              [state]: complexItem,
            },
          }
        }
      }
    }
  }

  return {
    general: {
      defaultType: input?.general?.defaultType ?? defaultButtonUinityConfigInput.general?.defaultType,
      defaultSize: input?.general?.defaultSize ?? defaultButtonUinityConfigInput.general?.defaultSize,
      defaultFinalProps: {
        ...defaultButtonUinityConfigInput.general?.defaultFinalProps,
        ...input?.general?.defaultFinalProps,
      },
    },
    size: {
      xs: {
        ...defaultButtonUinityConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultButtonUinityConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultButtonUinityConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultButtonUinityConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    type: {
      primary: {
        ...defaultButtonUinityConfigInput.type?.primary,
        ...input?.type?.primary,
      },
      secondary: {
        ...defaultButtonUinityConfigInput.type?.secondary,
        ...input?.type?.secondary,
      },
    },
    state: {
      rest: {
        ...defaultButtonUinityConfigInput.state?.rest,
        ...input?.state?.rest,
      },
      hover: {
        ...defaultButtonUinityConfigInput.state?.hover,
        ...input?.state?.hover,
      },
      active: {
        ...defaultButtonUinityConfigInput.state?.active,
        ...input?.state?.active,
      },
      focus: {
        ...defaultButtonUinityConfigInput.state?.focus,
        ...input?.state?.focus,
      },
      disabled: {
        ...defaultButtonUinityConfigInput.state?.disabled,
        ...input?.state?.disabled,
      },
    },
    complex,
  }
}
export type ButtonUinityConfig = ReturnType<typeof normalizeButtonUinityConfig>

export const normalizeButtonTypeName = (uinityConfig: UinityConfig, type?: ButtonTypeName | null | undefined) => {
  if (type && uinityConfig.button.type[type]) {
    return type
  }
  return uinityConfig.button.general.defaultType
}

export const normalizeButtonSizeName = (uinityConfig: UinityConfig, size?: ButtonSizeName | null | undefined) => {
  if (size && uinityConfig.button.size[size]) {
    return size
  }
  return uinityConfig.button.general.defaultSize
}

export const normalizeButtonStateName = (uinityConfig: UinityConfig, state?: ButtonStateName | null | undefined) => {
  if (state && uinityConfig.button.state[state]) {
    return state
  }
  return 'rest'
}

export const getButtonFinalProps = (
  uinityConfig: UinityConfig,
  type?: ButtonTypeName | undefined | null,
  size?: ButtonSizeName | undefined | null,
  state?: ButtonStateName | undefined | null
) => {
  const c = uinityConfig.button
  type = normalizeButtonTypeName(uinityConfig, type)
  size = normalizeButtonSizeName(uinityConfig, size)
  state = normalizeButtonStateName(uinityConfig, state)
  return {
    ...c.general.defaultFinalProps,
    ...(type && c.type?.[type]),
    ...(size && c.size?.[size]),
    ...c.state?.[state],
    ...c.complex?.any?.any?.any,
    ...c.complex?.any?.any?.[state],
    ...(size && c.complex?.any?.[size]?.any),
    ...(size && c.complex?.any?.[size]?.[state]),
    ...(type && c.complex?.[type]?.any?.any),
    ...(type && c.complex?.[type]?.any?.[state]),
    ...(size && type && c.complex?.[type]?.[size]?.any),
    ...(size && type && c.complex?.[type]?.[size]?.[state]),
  }
}
