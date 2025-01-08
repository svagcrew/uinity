import type { ColorModeName } from '@/lib/color.js'
import { getHash } from '@/lib/getHash.js'
import isNil from 'lodash/isNil.js'
import kebabify from 'lodash/kebabCase.js'
import lodashOmit from 'lodash/omit.js'
import lodashPick from 'lodash/pick.js'
import type React from 'react'
import type { CSSProperties, JSX } from 'react'
import { z } from 'zod'

export const omit = <TObject extends {}, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
): Omit<TObject, TKeys> => {
  return lodashOmit(obj, keys)
}

export const pick = <TObject extends {}, TKeys extends keyof TObject>(
  obj: TObject,
  keys: TKeys[]
): Pick<TObject, TKeys> => {
  return lodashPick(obj, keys)
}

// TODO: split to files
// TODO: remove unused code

export type As = keyof JSX.IntrinsicElements
// export type AsProps<T extends As | undefined> = T extends As ? JSX.IntrinsicElements[T] : { [key: string]: any }
export type AsProps<T extends As | undefined> = T extends undefined
  ? {}
  : {
      onClick?: React.MouseEventHandler<any>
      className?: string
      style?: React.CSSProperties
    } & (T extends 'a'
      ? {
          href?: string
          target?: string
          rel?: string
        }
      : {})
export type AsElement<T extends As | undefined> = React.ReactElement<AsProps<T>>
export type AsComponent<T extends As | undefined> = React.FC<AsProps<T>>
export type AsRef<T extends keyof JSX.IntrinsicElements | undefined> = T extends keyof JSX.IntrinsicElements
  ? React.RefObject<
      | (JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<React.HTMLAttributes<infer E>, infer E> ? E : never)
      | null
      | undefined
    >
  : React.RefObject<any>
export type AsPropsRefOnly<T extends As | undefined> = { ref?: AsRef<T> }
export type AsPropsWithoutRef<T extends As | undefined> = Omit<AsProps<T> & AsPropsRefOnly<T>, 'ref'>
export type AsPropsWithRef<T extends As | undefined> = AsProps<T> & AsPropsRefOnly<T>
export type WithoutRef<T extends { ref?: any }> = Omit<T, 'ref'>
export const setRef = <T>(ref: React.Ref<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value) // Call ref function
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    ;(ref as any).current = value // Assign to current
  }
}
export const syncRefs = <T>(...refs: Array<React.Ref<T>>) => {
  return (node: T) => {
    refs.forEach((ref) => {
      setRef(ref, node)
    })
  }
}

export const mark = (componentName: string): {} => {
  // eslint-disable-next-line n/no-process-env, @typescript-eslint/no-unnecessary-condition
  return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development'
    ? {
        'data-x': componentName,
      }
    : {}
}

export const getGlobalClassName = (src: any) => {
  return 'c' + getHash(src)
}

export const parseSpacing = (
  spacing?: string | number | undefined | null,
  spacingTop?: string | number | undefined | null,
  spacingEnd?: string | number | undefined | null,
  spacingBottom?: string | number | undefined | null,
  spacingStart?: string | number | undefined | null
) => {
  if (!isNil(spacing)) {
    if (typeof spacing === 'number') {
      return {
        top: spacing,
        end: spacing,
        bottom: spacing,
        start: spacing,
      }
    }
    const spacingParts = spacing.split(' ')
    if (spacingParts.length === 1) {
      return {
        top: spacingParts[0],
        end: spacingParts[0],
        bottom: spacingParts[0],
        start: spacingParts[0],
      }
    }
    if (spacingParts.length === 2) {
      return {
        top: spacingParts[0],
        end: spacingParts[1],
        bottom: spacingParts[0],
        start: spacingParts[1],
      }
    }
    if (spacingParts.length === 3) {
      return {
        top: spacingParts[0],
        end: spacingParts[1],
        bottom: spacingParts[2],
        start: spacingParts[1],
      }
    }
    if (spacingParts.length === 4) {
      return {
        top: spacingParts[0],
        end: spacingParts[1],
        bottom: spacingParts[2],
        start: spacingParts[3],
      }
    }
  }
  return {
    top: spacingTop,
    end: spacingEnd,
    bottom: spacingBottom,
    start: spacingStart,
  }
}

export const zStringOptionalNullable = z.string().min(1).optional().nullable()
export const zStringRequired = z.string().min(1)
export const zNumberOptionalNullable = z.number().optional().nullable()
export const zNumberRequired = z.number().min(1)
export const zNumberOrStringOptionalNullable = z
  .union([z.number(), z.string().min(1)])
  .optional()
  .nullable()
export const zNumberOrStringRequired = z.union([z.number(), z.string().min(1)])
export const zRecordOfStringsOptionalNullable = z.record(z.string().min(1)).optional().nullable()

export const getFirst = <TProp extends string, TObj extends Partial<Record<TProp, TObj[TProp]>>>(
  objs: TObj[],
  prop: TProp
): TObj[TProp] | null => {
  for (const obj of objs) {
    if (obj[prop] !== undefined) {
      return obj[prop]
    }
  }
  return null
}

export const getFirstOrThrow = <TProp extends string, TObj extends Partial<Record<TProp, TObj[TProp]>>>(
  objs: TObj[],
  prop: TProp,
  message: string
): NonNullable<TObj[TProp]> => {
  const result = getFirst(objs, prop)
  if (result === null || result === undefined) {
    throw new Error(message)
  }
  return result as NonNullable<TObj[TProp]>
}

type CssPropertiesNullable = {
  [K in keyof CSSProperties]: CSSProperties[K] | null | undefined
}

export const toCss = (
  // obj: Record<string, string | number | null | undefined>,
  obj: CssPropertiesNullable,
  indent: number = 2
): string => {
  return Object.entries(obj)
    .map(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value === null || value === undefined) {
        return null
      }
      if (key === 'fontFamily' && typeof value === 'string') {
        value = `'${value}'`
      }
      const keysWhereNumberIsReal = ['lineHeight']
      const keysWhereNumberIsPixel = [
        'fontSize',
        'padding',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'margin',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
        'borderRadius',
        'minHeight',
        'maxHeight',
        'minWidth',
        'maxWidth',
        'width',
        'height',
        'top',
        'right',
        'bottom',
        'left',
        'borderWidth',
        'gap',
        'columnGap',
        'rowGap',
        'flexBasis',
      ]
      if (typeof value === 'number') {
        if (value === 0) {
          value = `${value}`
        } else if (keysWhereNumberIsReal.includes(key)) {
          value = `${value}`
        } else if (keysWhereNumberIsPixel.includes(key)) {
          value = `${value}px`
        } else {
          value = `${value}`
        }
      }
      const kebab = kebabify(key)
      const indentString = ' '.repeat(indent)
      return `${indentString}${kebab}: ${value};`
    })
    .filter(Boolean)
    .join('\n')
}

export const maybeNumberToPx = (value: string | number | undefined | null): string | null => {
  if (typeof value === 'number') {
    if (value === 0) {
      return '0px'
    } else {
      return `${value}px`
    }
  }
  return `${value}`
}

export const borderPropsToCssValue = (
  borderWidth: string | number | undefined | null,
  borderColor: string | undefined | null,
  borderStyle: 'solid' | 'dashed' | 'dotted' = 'solid'
): string | null => {
  if (!borderWidth || !borderColor) {
    return null
  }
  return `${borderWidth}px ${borderStyle} ${borderColor}`
}

export type AnyConfigSettings<TStyleRoot extends {}> = Record<string, Record<string, TStyleRoot>>
export type AnyConfigSettingsItemName<TConfig extends AnyConfig<any, any>> = keyof TConfig['settings']
export type AnyConfigSettingsItemValue<
  TConfig extends AnyConfig<any, any>,
  TItemName extends AnyConfigSettingsItemName<TConfig>,
> = keyof TConfig['settings'][TItemName]
export type AnyConfigVariants<TStyleRoot extends {}, TSettings extends AnyConfigSettings<TStyleRoot>> = Record<
  string,
  {
    settings?: {
      [Key in keyof TSettings]: keyof TSettings[Key]
    }
    overrides?: TStyleRoot
  }
>
export type AnyConfigVariantsItemName<TStyleRoot extends {} = {}> = keyof AnyConfigVariants<TStyleRoot, any>
export type AnyConfigVariantsItemValue<
  TStyleRoot extends {},
  TItemName extends AnyConfigVariantsItemName<TStyleRoot>,
> = AnyConfigVariants<TStyleRoot, any>[TItemName]
export type AnyConfig<
  TStyleRoot extends {} = {},
  TSettings extends AnyConfigSettings<TStyleRoot> = AnyConfigSettings<TStyleRoot>,
> = {
  general?: TStyleRoot
  settings?: TSettings
  variants?: AnyConfigVariants<TStyleRoot, TSettings>
}
export type AnyConfiguredCommonProps<TConfig extends AnyConfig<TStyleRoot>, TStyleRoot extends {}> = {
  variant?: keyof TConfig['variants']
} & {
  [key in AnyConfigSettingsItemName<TConfig>]?: AnyConfigSettingsItemValue<TConfig, key>
} & { $style?: TStyleRoot }

export const objectAssignExceptUndefined = (
  ...objects: Array<Record<string, any> | undefined | null>
): Record<string, any> => {
  const result = objects[0] || {}
  for (const object of objects.slice(1)) {
    if (object === undefined) {
      continue
    }
    if (object === null) {
      // result = {}
      Object.keys(result).forEach((key) => {
        if (result[key] === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete result[key]
        }
      })
      continue
    }
    for (const [key, value] of Object.entries(object)) {
      if (value !== undefined) {
        result[key] = value
      }
    }
  }
  return result
}

export const getGetAnyStyleRoot = <
  TPartialUinityConfig extends Record<string, AnyConfig<any, any>>,
  TStyleRootConfigured extends {},
  TStyleRootClearNormalized extends {} = {},
>({
  componentName,
  assignStyleRootConfigured,
  getStyleRootClearByConfigured,
}: {
  componentName: string
  assignStyleRootConfigured: (...stylesRoot: Array<TStyleRootConfigured | undefined | null>) => TStyleRootConfigured
  getStyleRootClearByConfigured: (props: {
    uinityConfig: TPartialUinityConfig
    styleRootConfigured: TStyleRootConfigured | undefined | null
    colorMode?: ColorModeName
  }) => TStyleRootClearNormalized
}) => {
  const getStyleRootConfigured = ({
    uinityConfig,
    variantName,
    settings,
    $style,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    $style: TStyleRootConfigured | undefined | null
  }): TStyleRootConfigured => {
    const c = uinityConfig[componentName]
    const result: TStyleRootConfigured = {} as never
    // get only thouse settings which exists in config
    settings = Object.fromEntries(
      Object.entries(settings || {}).filter(([settingName]) => c.settings && settingName in c.settings)
    )
    assignStyleRootConfigured(result, c.general)
    if (variantName) {
      const variant = c.variants?.[variantName]
      if (!variant) {
        console.error(`Variant "${variantName}" not found in "${componentName}" config`)
      } else {
        for (const [settingName, settingValue] of Object.entries(variant.settings ?? {})) {
          if (!c.settings) {
            console.error(`Settings not found in "${componentName}" config, but required by variant "${variantName}"`)
            continue
          }
          if (!(settingName in c.settings)) {
            console.error(
              `Setting "${settingName}" not found in "${componentName}" settings, but required by variant "${variantName}"`
            )
            continue
          }

          const settingStyleRoot = c.settings[settingName][settingValue as string]
          assignStyleRootConfigured(result, settingStyleRoot)
        }
        assignStyleRootConfigured(result, variant.overrides)
      }
    }
    for (const [settingName, settingValue] of Object.entries(settings)) {
      if (!c.settings) {
        console.error(`Settings not found in "${componentName}" config, but required by configured component settings`)
        continue
      }
      if (!(settingName in c.settings)) {
        console.error(
          `Setting "${settingName}" not found in "${componentName}" settings, but required by configured component settings`
        )
        continue
      }
      const settingStyleRoot = c.settings[settingName][settingValue]
      assignStyleRootConfigured(result, settingStyleRoot)
    }
    assignStyleRootConfigured(result, $style)
    return result
  }
  const getStyleRootClear = ({
    uinityConfig,
    variantName,
    settings,
    $style,
    colorMode,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    $style: TStyleRootConfigured | undefined | null
    colorMode?: ColorModeName
  }): TStyleRootClearNormalized => {
    const styleRootConfigured = getStyleRootConfigured({ uinityConfig, variantName, settings, $style })
    return getStyleRootClearByConfigured({ uinityConfig, styleRootConfigured, colorMode })
  }
  return {
    getStyleRootConfigured,
    getStyleRootClearByConfigured,
    getStyleRootClear,
  }
}

export const getZAnyConfig = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyleRoot,
}: {
  zStyleRoot: TZodSchema
}) => {
  return z.object({
    general: zStyleRoot.optional().nullable(),
    settings: z.record(z.record(zStyleRoot)).optional().nullable(),
    variants: z
      .record(
        z.object({
          // seme keys as settings above
          settings: z.record(z.string()).optional().nullable(),
          overrides: z.record(zStyleRoot).optional().nullable(),
        })
      )
      .optional()
      .nullable(),
  })
  // TODO: validate in another specific function where it needed
  // .superRefine((data, ctx) => {
  //   const settingsItemsNames = Object.keys(data.settings ?? {})
  //   const settingsItemsNamesAndValues: Record<string, [string, string[]]> = settingsItemsNames.reduce(
  //     (acc, settingName) => {
  //       return {
  //         ...acc,
  //         [settingName]: Object.keys(data.settings?.[settingName] ?? {}),
  //       }
  //     },
  //     {}
  //   )
  //   for (const variantName of Object.keys(data.variants ?? {})) {
  //     const variant = data.variants?.[variantName]
  //     if (!variant) {
  //       continue
  //     }
  //     const variantSettingsItemsNames = Object.keys(variant.settings ?? {})
  //     for (const variantSettingName of variantSettingsItemsNames) {
  //       if (!settingsItemsNamesAndValues[variantSettingName].includes(variantSettingName)) {
  //         ctx.addIssue({
  //           code: 'custom',
  //           message: `Variant "${variantName}" has setting "${variantSettingName}" which is not present in settings`,
  //         })
  //         return
  //       }
  //     }
  //   }
  // })
}
