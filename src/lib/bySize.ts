import type { ColorModeName } from '@/lib/color.js'
import { css, type RuleSet } from 'styled-components'
import { z } from 'zod'

// byUsual: if >= size, then apply. We scale screen width from small to big, and when we reach size, we apply
// byReverse: if <= size, then apply. We scale screen width from big to small, and when we reach size, we apply

// TODO:ASAP remove unused fns
export const getZBySize = <TZodSchema extends z.ZodObject<any, any, any>>({ zStyle }: { zStyle: TZodSchema }) => {
  return z.array(z.tuple([z.number(), zStyle]))
}

export const getZBySizeOptionalNullable = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyle,
}: {
  zStyle: TZodSchema
}) => {
  return z
    .array(z.tuple([z.number(), zStyle]))
    .optional()
    .nullable()
}

export const getZPartByAllSizesOptionalNullable = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyle,
}: {
  zStyle: TZodSchema
}) => {
  return {
    byWindowWidth: getZBySizeOptionalNullable({ zStyle }),
    byWindowWidthReverse: getZBySizeOptionalNullable({ zStyle }),
    byWindowHeight: getZBySizeOptionalNullable({ zStyle }),
    byWindowHeightReverse: getZBySizeOptionalNullable({ zStyle }),
    byContainerWidth: getZBySizeOptionalNullable({ zStyle }),
    byContainerWidthReverse: getZBySizeOptionalNullable({ zStyle }),
    byContainerHeight: getZBySizeOptionalNullable({ zStyle }),
    byContainerHeightReverse: getZBySizeOptionalNullable({ zStyle }),
  }
}

export const bySizeKeys = [
  'byWindowWidth',
  'byWindowWidthReverse',
  'byWindowHeight',
  'byWindowHeightReverse',
  'byContainerHeight',
  'byContainerHeightReverse',
  'byContainerWidth',
  'byContainerWidthReverse',
]
export type BySizeKey = keyof ReturnType<typeof getZPartByAllSizesOptionalNullable>
export type ClearBySizePartial<TClearStyle extends {}> = Partial<Record<BySizeKey, [number, TClearStyle][] | null>>

export const getClearBySizeByConfigured = <TClearStyle extends {}>({
  getStyleRootClearByConfiguredWithoutBySize,
  uinityConfig,
  styleRootConfigured,
  colorMode,
}: {
  getStyleRootClearByConfiguredWithoutBySize: (props: {
    uinityConfig: any
    styleRootConfigured: Record<string, any> | undefined | null
    colorMode?: ColorModeName
  }) => TClearStyle
  uinityConfig: any
  styleRootConfigured: Record<string, any> | undefined | null
  colorMode?: ColorModeName
}) => {
  const result = {} as ClearBySizePartial<TClearStyle>
  for (const bySizeKey of bySizeKeys) {
    const bySizeValue = styleRootConfigured?.[bySizeKey] as [number, Record<string, any>][] | undefined | null
    if (!bySizeValue) {
      continue
    }
    ;(result as any)[bySizeKey] = bySizeValue.map(([size, styleRootConfiguredBySizePart]) => [
      size,
      getStyleRootClearByConfiguredWithoutBySize({
        uinityConfig,
        styleRootConfigured: styleRootConfiguredBySizePart,
        colorMode,
      }),
    ])
  }
  return result
}

export const getBySizeCss = <TSF extends ClearBySizePartial<any>>({
  $sf,
  getCssBase,
}: {
  $sf: TSF
  getCssBase: ($sf: TSF) => RuleSet
}) => {
  return css`
    ${$sf.byWindowWidth?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === 0
        ? cssBase
        : css`
            @media (min-width: ${size}px) {
              ${cssBase}
            }
          `
    })}

    ${$sf.byWindowWidthReverse?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === Infinity
        ? cssBase
        : css`
            @media (max-width: ${size}px) {
              ${cssBase}
            }
          `
    })}

    ${$sf.byWindowHeight?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === 0
        ? cssBase
        : css`
            @media (min-height: ${size}px) {
              ${cssBase}
            }
          `
    })}

    ${$sf.byWindowHeightReverse?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === Infinity
        ? cssBase
        : css`
            @media (max-height: ${size}px) {
              ${cssBase}
            }
          `
    })}

    ${$sf.byContainerWidth?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === 0
        ? cssBase
        : css`
            @container (min-width: ${size}px) {
              & {
                ${cssBase}
              }
            }
          `
    })}

    ${$sf.byContainerWidthReverse?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === Infinity
        ? cssBase
        : css`
            @container (max-width: ${size}px) {
              & {
                ${cssBase}
              }
            }
          `
    })}

    ${$sf.byContainerHeight?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === 0
        ? cssBase
        : css`
            @container (min-height: ${size}px) {
              & {
                ${cssBase}
              }
            }
          `
    })}

    ${$sf.byContainerHeightReverse?.map(([size, $style]) => {
      const cssBase = getCssBase($style)
      return size === Infinity
        ? cssBase
        : css`
            @container (max-height: ${size}px) {
              & {
                ${cssBase}
              }
            }
          `
    })}
  `
}
