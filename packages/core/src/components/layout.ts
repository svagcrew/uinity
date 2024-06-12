import type { UinityConfig } from '@/config/index.js'
import { zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import camelCasify from 'lodash/camelCase.js'
import { z } from 'zod'

export const layoutSizes = ['mobile', 'tablet', 'desktop'] as const
export const zLayoutSizeName = z.enum(layoutSizes)
export type LayoutSizeName = z.infer<typeof zLayoutSizeName>
export const zLayoutSizeProps = z.object({
  layoutMaxWidth: zOptionalNumberOrString,
  contentMaxWidth: zOptionalNumberOrString,
  textMaxWidth: zOptionalNumberOrString,
  layoutPaddingHorizontal: zOptionalNumberOrString,
  headerHeight: zOptionalNumberOrString,
  sidebarWidth: zOptionalNumberOrString,
  contentPaddingTop: zOptionalNumberOrString,
  contentPaddingBottom: zOptionalNumberOrString,
  footerPaddingTop: zOptionalNumberOrString,
  footerPaddingBottom: zOptionalNumberOrString,
  sidebarPaddingTop: zOptionalNumberOrString,
  sidebarPaddingBottom: zOptionalNumberOrString,
  sidebarMarginEnd: zOptionalNumberOrString,
  modalPaddingTop: zOptionalNumberOrString,
  modalPaddingBottom: zOptionalNumberOrString,
  headerBorderWidth: zOptionalNumberOrString,
  footerBorderWidth: zOptionalNumberOrString,
  sidebarBorderWidth: zOptionalNumberOrString,
  modalBorderWidth: zOptionalNumberOrString,
})
export type LayoutSizeProps = z.infer<typeof zLayoutSizeProps>

export const zLayoutAppearenceProps = z.object({
  bodyBackground: zOptionalString,
  headerBackground: zOptionalString,
  footerBackground: zOptionalString,
  modalBackground: zOptionalString,
  headerBorderColor: zOptionalString,
  footerBorderColor: zOptionalString,
  sidebarBorderColor: zOptionalString,
  modalBorderColor: zOptionalString,
})
export type LayoutAppearenceProps = z.infer<typeof zLayoutAppearenceProps>

export const zLayoutFinalProps = zLayoutSizeProps.merge(zLayoutAppearenceProps)
export type LayoutFinalProps = z.infer<typeof zLayoutFinalProps>

export const zLayoutGeneralProps = z.object({
  sizeByScreenWidth: z.record(zLayoutSizeName, z.number()).optional(),
  hideSidebarOnScreenWidth: z.number(),
  defaultSize: zLayoutSizeName.optional(),
  defaultSizeProps: zLayoutSizeProps.optional(),
})
export type LayoutGeneralProps = z.infer<typeof zLayoutGeneralProps>

export const zLayoutUinityConfigInput = z.object({
  general: zLayoutGeneralProps.optional(),
  size: z.record(zLayoutSizeName, zLayoutSizeProps).optional(),
  appearence: zLayoutAppearenceProps.optional(),
})
export type LayoutUinityConfigInput = z.infer<typeof zLayoutUinityConfigInput>

const defaultSpecificSizeProps = {
  layoutMaxWidth: $.layout.general.defaultSizeProps.layoutMaxWidth,
  contentMaxWidth: $.layout.general.defaultSizeProps.contentMaxWidth,
  textMaxWidth: $.layout.general.defaultSizeProps.textMaxWidth,
  sidebarWidth: $.layout.general.defaultSizeProps.sidebarWidth,
  sidebarMarginEnd: $.layout.general.defaultSizeProps.sidebarMarginEnd,
  headerBorderWidth: $.layout.general.defaultSizeProps.headerBorderWidth,
  footerBorderWidth: $.layout.general.defaultSizeProps.footerBorderWidth,
  sidebarBorderWidth: $.layout.general.defaultSizeProps.sidebarBorderWidth,
}
export const defaultLayoutUinityConfigInput: LayoutUinityConfigInput = {
  general: {
    defaultSize: 'mobile',
    sizeByScreenWidth: {
      mobile: 420,
      tablet: 1_200,
      desktop: Infinity,
    },
    hideSidebarOnScreenWidth: 1_200,
    defaultSizeProps: {
      layoutMaxWidth: 1_440,
      contentMaxWidth: 1_440,
      textMaxWidth: 800,
      sidebarWidth: 240,
      sidebarMarginEnd: 32,
      headerBorderWidth: 1,
      footerBorderWidth: 1,
      sidebarBorderWidth: 1,
      modalBorderWidth: 1,
    },
  },
  appearence: {
    bodyBackground: '#fff',
    headerBackground: '#eee',
    footerBackground: '#eee',
    modalBackground: '#ddd',
    headerBorderColor: '#ccc',
    footerBorderColor: '#ccc',
    sidebarBorderColor: '#ccc',
    modalBorderColor: '#ccc',
  },
  size: {
    mobile: {
      ...defaultSpecificSizeProps,
      layoutPaddingHorizontal: 20,
      headerHeight: 48,
      contentPaddingTop: 24,
      contentPaddingBottom: 48,
      footerPaddingTop: 24,
      footerPaddingBottom: 24,
      sidebarPaddingTop: $.layout.size.mobile.contentPaddingTop,
      sidebarPaddingBottom: $.layout.size.mobile.contentPaddingTop,
      modalPaddingTop: $.layout.size.mobile.contentPaddingTop,
      modalPaddingBottom: $.layout.size.mobile.contentPaddingTop,
    },
    tablet: {
      ...defaultSpecificSizeProps,
      layoutPaddingHorizontal: 32,
      headerHeight: 56,
      contentPaddingTop: 24,
      contentPaddingBottom: 48,
      footerPaddingTop: 24,
      footerPaddingBottom: 24,
      sidebarPaddingTop: $.layout.size.tablet.contentPaddingTop,
      sidebarPaddingBottom: $.layout.size.tablet.contentPaddingTop,
      modalPaddingTop: $.layout.size.tablet.contentPaddingTop,
      modalPaddingBottom: $.layout.size.tablet.contentPaddingTop,
    },
    desktop: {
      ...defaultSpecificSizeProps,
      layoutPaddingHorizontal: 48,
      headerHeight: 64,
      contentPaddingTop: 24,
      contentPaddingBottom: 48,
      footerPaddingTop: 24,
      footerPaddingBottom: 24,
      sidebarPaddingTop: $.layout.size.desktop.contentPaddingTop,
      sidebarPaddingBottom: $.layout.size.desktop.contentPaddingTop,
      modalPaddingTop: $.layout.size.desktop.contentPaddingTop,
      modalPaddingBottom: $.layout.size.desktop.contentPaddingTop,
    },
  },
}

export const normalizeLayoutUinityConfig = (input: LayoutUinityConfigInput | undefined) => {
  return {
    general: {
      defaultSize: input?.general?.defaultSize ?? defaultLayoutUinityConfigInput.general?.defaultSize,
      sizeByScreenWidth: {
        ...defaultLayoutUinityConfigInput.general?.sizeByScreenWidth,
        ...input?.general?.sizeByScreenWidth,
      },
      hideSidebarOnScreenWidth:
        input?.general?.hideSidebarOnScreenWidth ?? defaultLayoutUinityConfigInput.general?.hideSidebarOnScreenWidth,
      defaultSizeProps: {
        ...defaultLayoutUinityConfigInput.general?.defaultSizeProps,
        ...input?.general?.defaultSizeProps,
      },
    },
    appearence: {
      ...defaultLayoutUinityConfigInput.appearence,
      ...input?.appearence,
    },
    size: {
      mobile: {
        ...defaultLayoutUinityConfigInput.size?.mobile,
        ...input?.size?.mobile,
      },
      tablet: {
        ...defaultLayoutUinityConfigInput.size?.tablet,
        ...input?.size?.tablet,
      },
      desktop: {
        ...defaultLayoutUinityConfigInput.size?.desktop,
        ...input?.size?.desktop,
      },
    },
  }
}
export type LayoutUinityConfig = ReturnType<typeof normalizeLayoutUinityConfig>

export const normalizeLayoutSizeName = (uinityConfig: UinityConfig, size?: LayoutSizeName | null | undefined) => {
  if (size && uinityConfig.layout.size[size]) {
    return size
  }
  return uinityConfig.layout.general.defaultSize
}

export const getLayoutFinalProps = (uinityConfig: UinityConfig, size?: LayoutSizeName | undefined | null) => {
  const c = uinityConfig.layout
  size = normalizeLayoutSizeName(uinityConfig, size)
  const result = {
    ...(size && c.size?.[size]),
    ...c.appearence,
  } as LayoutFinalProps
  return result
}

export const getLayoutScssVariables = (uinityConfig: UinityConfig) => {
  const variables: Record<string, string> = {}
  for (const size of layoutSizes) {
    for (const [sizePropName, value] of Object.entries(uinityConfig.layout.size[size])) {
      const variableName = camelCasify(`$layout-${sizePropName}-${size}`)
      variables[variableName] = value as string
    }
  }
  for (const [appearancePropName, value] of Object.entries(
    uinityConfig.layout.appearence as any as Record<string, string>
  )) {
    const variableName = camelCasify(`$layout-${appearancePropName}`)
    variables[variableName] = value as string
  }
  const variablesString =
    Object.entries(variables)
      .map(([key, value]) => `$${key}: ${value};`)
      .join('\n') + '\n'
  return variablesString
}
