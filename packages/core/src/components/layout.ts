import type { UinityConfig } from '@/config/index.js'
import { zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { $ } from '@/utils/variables.js'
import camelCasify from 'lodash/camelCase.js'
import { z } from 'zod'

export const layoutConfigSizesNames = ['mobile', 'tablet', 'desktop'] as const
export const zLayoutConfigSizeName = z.enum(layoutConfigSizesNames)
export type LayoutConfigSizeName = z.output<typeof zLayoutConfigSizeName>
export const zLayoutConfigSizeProps = z.object({
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
export type LayoutConfigSizeProps = z.output<typeof zLayoutConfigSizeProps>

export const zLayoutConfigAppearenceProps = z.object({
  bodyBackground: zOptionalString,
  headerBackground: zOptionalString,
  footerBackground: zOptionalString,
  modalBackground: zOptionalString,
  headerBorderColor: zOptionalString,
  footerBorderColor: zOptionalString,
  sidebarBorderColor: zOptionalString,
  modalBorderColor: zOptionalString,
})
export type LayoutConfigAppearenceProps = z.output<typeof zLayoutConfigAppearenceProps>

export const zLayoutConfigFinalProps = zLayoutConfigSizeProps.merge(zLayoutConfigAppearenceProps)
export type LayoutConfigFinalProps = z.output<typeof zLayoutConfigFinalProps>

export const zLayoutConfigGeneralProps = z.object({
  sizeByScreenWidth: z.record(zLayoutConfigSizeName, z.number()).optional(),
  hideSidebarOnScreenWidth: z.number(),
})
export type LayoutConfigGeneralProps = z.output<typeof zLayoutConfigGeneralProps>

export const zLayoutConfigInput = z.object({
  general: zLayoutConfigGeneralProps.optional(),
  size: z.record(zLayoutConfigSizeName, zLayoutConfigSizeProps).optional(),
  appearence: zLayoutConfigAppearenceProps.optional(),
})
export type LayoutConfigInput = z.output<typeof zLayoutConfigInput>

export const defaultLayoutConfigInput: LayoutConfigInput = {
  general: {
    sizeByScreenWidth: {
      desktop: Infinity,
      tablet: 1_200,
      mobile: 420,
    },
    hideSidebarOnScreenWidth: 1_200,
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
    desktop: {
      layoutMaxWidth: 1_440,
      contentMaxWidth: 1_440,
      textMaxWidth: 800,
      sidebarWidth: 240,
      sidebarMarginEnd: 32,
      headerBorderWidth: 1,
      footerBorderWidth: 1,
      sidebarBorderWidth: 1,
      modalBorderWidth: null,
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
    tablet: {
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
    mobile: {
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
  },
}

export const normalizeLayoutConfig = (input: LayoutConfigInput | undefined) => {
  return {
    general: {
      sizeByScreenWidth: input?.general?.sizeByScreenWidth ?? defaultLayoutConfigInput.general?.sizeByScreenWidth,
      hideSidebarOnScreenWidth:
        input?.general?.hideSidebarOnScreenWidth ?? defaultLayoutConfigInput.general?.hideSidebarOnScreenWidth,
    },
    appearence: {
      ...defaultLayoutConfigInput.appearence,
      ...input?.appearence,
    },
    size: {
      mobile: {
        ...defaultLayoutConfigInput.size?.mobile,
        ...input?.size?.mobile,
      },
      tablet: {
        ...defaultLayoutConfigInput.size?.tablet,
        ...input?.size?.tablet,
      },
      desktop: {
        ...defaultLayoutConfigInput.size?.desktop,
        ...input?.size?.desktop,
      },
    },
  }
}
export type LayoutConfig = ReturnType<typeof normalizeLayoutConfig>

export const normalizeLayoutSizeName = (uinityConfig: UinityConfig, size?: LayoutConfigSizeName | null | undefined) => {
  if (size && uinityConfig.layout.size[size]) {
    return size
  }
  return 'mobile'
}

export const getLayoutConfigFinalProps = (
  uinityConfig: UinityConfig,
  size?: LayoutConfigSizeName | undefined | null
) => {
  const c = uinityConfig.layout
  size = normalizeLayoutSizeName(uinityConfig, size)
  const result = {
    ...(size && c.size?.[size]),
    ...c.appearence,
  } as LayoutConfigFinalProps
  return result
}

export const getLayoutScssVariables = (uinityConfig: UinityConfig) => {
  const variables: Record<string, string> = {}
  for (const size of layoutConfigSizesNames) {
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
