import { getTextConfigFinalProps, zTextGetterProps } from '@/components/text.js'
import type { UinityConfig } from '@/config/index.js'
import { zColorValue } from '@/utils/color.js'
import { zOptionalNumberOrString, zOptionalString } from '@/utils/other.js'
import { z } from 'zod'

export const segmentConfigSizesNames = ['xs', 's', 'm', 'l'] as const
export const zSegmentConfigSizeName = z.enum(segmentConfigSizesNames)
export type SegmentConfigSizeName = z.output<typeof zSegmentConfigSizeName>

export const segmentConfigVariantNames = ['primary', 'secondary', 'trietary'] as const
export const zSegmentConfigVariantName = z.enum(segmentConfigVariantNames)
export type SegmentConfigVariantName = z.output<typeof zSegmentConfigVariantName>

export const segmentConfigColorNames = ['brand', 'green', 'red'] as const
export const zSegmentConfigColorName = z.enum(segmentConfigColorNames)
export type SegmentConfigColorName = z.output<typeof zSegmentConfigColorName>

export const zSegmentConfigFinalProps = z.object({
  titleText: zTextGetterProps.optional(),
  titleFontFamily: zOptionalString,
  titleFontWeight: zOptionalString,
  titleFontSize: zOptionalNumberOrString,
  titleLineHeight: zOptionalNumberOrString,
  titleColor: zColorValue.optional(),
  gapTitleDesc: zOptionalNumberOrString,
  gapHeadingContent: zOptionalNumberOrString,
  siblingsGapHorizontal: zOptionalNumberOrString,
  siblingsGapVertical: zOptionalNumberOrString,
  descText: zTextGetterProps.optional(),
  descFontFamily: zOptionalString,
  descFontWeight: zOptionalString,
  descFontSize: zOptionalNumberOrString,
  descLineHeight: zOptionalNumberOrString,
  descColor: zColorValue.optional(),
})
export type SegmentConfigFinalProps = z.output<typeof zSegmentConfigFinalProps>

export const zSegmentConfigGeneralProps = z.object({})
export type SegmentConfigGeneralProps = z.output<typeof zSegmentConfigGeneralProps>

export const zSegmentConfigVariantProps = z.object({
  color: zSegmentConfigColorName.optional(),
})
export type SegmentConfigVariantProps = z.output<typeof zSegmentConfigVariantProps>

export const zSegmentConfigInput = z.object({
  general: zSegmentConfigGeneralProps.optional(),
  variant: z.record(zSegmentConfigVariantName, zSegmentConfigVariantProps).optional(),
  color: z.record(zSegmentConfigColorName, zSegmentConfigFinalProps).optional(),
  size: z.record(zSegmentConfigSizeName, zSegmentConfigFinalProps).optional(),
})
export type SegmentConfigInput = z.output<typeof zSegmentConfigInput>

export const defaultSegmentConfigInput: SegmentConfigInput = {
  general: {},
  variant: {},
  color: {},
  size: {
    xs: {
      titleText: {
        variant: 'heading-xs',
      },
      gapHeadingContent: 6,
    },
    s: {
      titleText: {
        variant: 'heading-s',
      },
      gapHeadingContent: 6,
    },
    m: {
      titleText: {
        variant: 'heading-m',
      },
      gapHeadingContent: 10,
    },
    l: {
      titleText: {
        variant: 'heading-l',
      },
      gapHeadingContent: 16,
    },
  },
}

export const normalizeSegmentConfig = (input: SegmentConfigInput | undefined) => {
  return {
    general: {},
    variant: {
      primary: {
        ...defaultSegmentConfigInput.variant?.primary,
        ...input?.variant?.primary,
      },
      secondary: {
        ...defaultSegmentConfigInput.variant?.secondary,
        ...input?.variant?.secondary,
      },
      trietary: {
        ...defaultSegmentConfigInput.variant?.trietary,
        ...input?.variant?.trietary,
      },
    },
    size: {
      xs: {
        ...defaultSegmentConfigInput.size?.xs,
        ...input?.size?.xs,
      },
      s: {
        ...defaultSegmentConfigInput.size?.s,
        ...input?.size?.s,
      },
      m: {
        ...defaultSegmentConfigInput.size?.m,
        ...input?.size?.m,
      },
      l: {
        ...defaultSegmentConfigInput.size?.l,
        ...input?.size?.l,
      },
    },
    color: {
      brand: {
        ...defaultSegmentConfigInput.color?.brand,
        ...input?.color?.brand,
      },
      green: {
        ...defaultSegmentConfigInput.color?.green,
        ...input?.color?.green,
      },
      red: {
        ...defaultSegmentConfigInput.color?.red,
        ...input?.color?.red,
      },
    },
  }
}
export type SegmentConfig = ReturnType<typeof normalizeSegmentConfig>

export const normalizeSegmentColorName = (
  uinityConfig: UinityConfig,
  color?: SegmentConfigColorName | null | undefined
) => {
  if (color && uinityConfig.segment.color[color]) {
    return color
  }
  return 'brand'
}

export const normalizeSegmentSizeName = (
  uinityConfig: UinityConfig,
  size?: SegmentConfigSizeName | null | undefined
) => {
  if (size && uinityConfig.segment.size[size]) {
    return size
  }
  return 'm'
}

export const normalizeSegmentVariantName = (
  uinityConfig: UinityConfig,
  variant?: SegmentConfigVariantName | null | undefined
) => {
  if (variant && uinityConfig.segment.variant[variant]) {
    return variant
  }
  return 'primary'
}

export const getSegmentVariantProps = (
  uinityConfig: UinityConfig,
  variant?: SegmentConfigVariantName | undefined | null
) => {
  variant = normalizeSegmentVariantName(uinityConfig, variant)
  const variantProps = uinityConfig.segment.variant[variant]
  return {
    variantColor: variantProps.color,
  }
}

export const getSegmentConfigFinalProps = (
  uinityConfig: UinityConfig,
  variant?: SegmentConfigVariantName | undefined | null,
  color?: SegmentConfigColorName | undefined | null,
  size?: SegmentConfigSizeName | undefined | null
) => {
  const { variantColor } = getSegmentVariantProps(uinityConfig, variant)
  color = normalizeSegmentColorName(uinityConfig, color || variantColor)
  size = normalizeSegmentSizeName(uinityConfig, size)
  const result = {
    ...uinityConfig.segment.color[color],
    ...uinityConfig.segment.size[size],
  }
  if (result.titleText) {
    const titleTextConfigFinalProps = getTextConfigFinalProps(
      uinityConfig,
      result.titleText.variant,
      result.titleText.font,
      result.titleText.weight,
      result.titleText.size,
      result.titleText.lineHeight,
      result.titleText.color
    )
    result.titleFontFamily = result.titleFontFamily ?? titleTextConfigFinalProps.fontFamily
    result.titleFontWeight = result.titleFontWeight ?? titleTextConfigFinalProps.fontWeight
    result.titleFontSize = result.titleFontSize ?? titleTextConfigFinalProps.fontSize
    result.titleLineHeight = result.titleLineHeight ?? titleTextConfigFinalProps.lineHeight
    result.titleColor = result.titleColor ?? titleTextConfigFinalProps.color
  }
  if (result.descText) {
    const descTextConfigFinalProps = getTextConfigFinalProps(
      uinityConfig,
      result.descText.variant,
      result.descText.font,
      result.descText.weight,
      result.descText.size,
      result.descText.lineHeight,
      result.descText.color
    )
    result.descFontFamily = result.descFontFamily ?? descTextConfigFinalProps.fontFamily
    result.descFontWeight = result.descFontWeight ?? descTextConfigFinalProps.fontWeight
    result.descFontSize = result.descFontSize ?? descTextConfigFinalProps.fontSize
    result.descLineHeight = result.descLineHeight ?? descTextConfigFinalProps.lineHeight
    result.descColor = result.descColor ?? descTextConfigFinalProps.color
  }
  return result
}
