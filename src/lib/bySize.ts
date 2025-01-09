import type { ColorModeName } from '@/lib/color.js'
import { zNumberOrStringRequired } from '@/lib/zod.js'
import { css, type RuleSet } from 'styled-components'
import { z } from 'zod'

// byUsual: if >= size, then apply. We scale screen width from small to big, and when we reach size, we apply
// byReverse: if <= size, then apply. We scale screen width from big to small, and when we reach size, we apply

export type BreakSizes = Record<string, number>

export const getZBySizeConfiguredOptionalNullable = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyle,
}: {
  zStyle: TZodSchema
}) => {
  return z
    .array(z.tuple([zNumberOrStringRequired, zStyle]))
    .optional()
    .nullable()
}

export const getZPartByAllSizesConfiguredOptionalNullable = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyle,
}: {
  zStyle: TZodSchema
}) => {
  return {
    byWindowWidth: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byWindowWidthReverse: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byWindowHeight: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byWindowHeightReverse: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byContainerWidth: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byContainerWidthReverse: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byContainerHeight: getZBySizeConfiguredOptionalNullable({ zStyle }),
    byContainerHeightReverse: getZBySizeConfiguredOptionalNullable({ zStyle }),
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
] as const
export type BySizeKey = (typeof bySizeKeys)[number]
export type ConfiguredBySizePartial<TConfiguredStyle extends {}, TBreakSizes extends BreakSizes> = Partial<
  Record<BySizeKey, [keyof TBreakSizes | number, TConfiguredStyle][] | null>
>
export type ClearBySizePartial<TClearStyle extends {}> = Partial<Record<BySizeKey, [number, TClearStyle][] | null>>
export type ByAllSizesConfiguredOptionalNullable<TStyleWithoutBySize extends {}> = TStyleWithoutBySize &
  Partial<Record<BySizeKey, [keyof BreakSizes | number, TStyleWithoutBySize][] | null | undefined>>
export type ByAllSizesClearOptionalNullable<TStyleWithoutBySize extends {}> = TStyleWithoutBySize &
  Partial<Record<BySizeKey, [number, TStyleWithoutBySize][] | null | undefined>>
export type OmitBySize<TStyle extends {}> = Omit<TStyle, BySizeKey>

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
    const bySizeConfiguredValue = styleRootConfigured?.[bySizeKey] as ConfiguredBySizePartial<any, any>[BySizeKey]
    if (!bySizeConfiguredValue) {
      continue
    }
    ;(result as any)[bySizeKey] = bySizeConfiguredValue
      .map(([configuredSize, styleRootConfiguredBySizePart]) => {
        if (typeof configuredSize === 'symbol') {
          return null
        }
        const clearSize: number | undefined =
          typeof configuredSize === 'number' ? configuredSize : uinityConfig.breakSizes[configuredSize]
        if (clearSize === undefined) {
          console.error(`Break size "${configuredSize}" is not defined in "uinityConfig.breakSizes"`)
          return null
        }
        return [
          clearSize,
          getStyleRootClearByConfiguredWithoutBySize({
            uinityConfig,
            styleRootConfigured: styleRootConfiguredBySizePart,
            colorMode,
          }),
        ]
      })
      .filter(Boolean)
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

// export const mapBySizeProps = <TClearStyle extends {}, TMappedClearStyle extends {}>({
//   bySizeProps,
//   mapFn,
// }: {
//   bySizeProps: ClearBySizePartial<TClearStyle>
//   mapFn: (props: TClearStyle) => TMappedClearStyle
// }) => {
//   const result = {} as ClearBySizePartial<TMappedClearStyle>
//   for (const bySizeKey of bySizeKeys) {
//     const bySizeValue = bySizeProps[bySizeKey]
//     if (!bySizeValue) {
//       continue
//     }
//     result[bySizeKey] = bySizeValue.map(([size, $style]) => [size, mapFn($style)])
//   }
//   return result
// }
