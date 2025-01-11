import {
  bySizeKeys,
  getClearBySizeByConfigured,
  type BySizeKey,
  type ClearBySizePartial,
  type OmitBySize,
} from '@/lib/bySize.js'
import type { ColorModeName, ColorsClearPartial, OmitColors } from '@/lib/color.js'
import omitLodash from 'lodash/omit.js'
import { z } from 'zod'

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

export type AnyConfiguredCommonProps<
  TConfig extends AnyConfig<TStyleRoot> | undefined | null,
  TStyleRoot extends {},
> = {
  variant?: keyof NonNullable<TConfig>['variants']
} & {
  [key in AnyConfigSettingsItemName<NonNullable<TConfig>>]?: AnyConfigSettingsItemValue<NonNullable<TConfig>, key>
} & { $style?: TStyleRoot }

export type PartialUinityConfig = Record<string, AnyConfig<any, any> | undefined>

export const getGetAnyStyleRoot = <
  TPartialUinityConfig extends PartialUinityConfig,
  TStyleRootConfigured extends {},
  TStyleRootClear extends {} = {},
>({
  componentName,
  assignStyleRootConfigured,
  getStyleRootClearByConfiguredWithoutBySize,
}: {
  componentName: string
  assignStyleRootConfigured: (...stylesRoot: Array<TStyleRootConfigured | undefined | null>) => TStyleRootConfigured
  getStyleRootClearByConfiguredWithoutBySize: (props: {
    uinityConfig: TPartialUinityConfig
    styleRootConfigured: TStyleRootConfigured | undefined | null
    colorMode?: ColorModeName
  }) => TStyleRootClear
}) => {
  const getStyleRootConfiguredWithBySize = ({
    uinityConfig,
    variantName,
    settings,
    styleRootConfiguredOverrides,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    styleRootConfiguredOverrides: TStyleRootConfigured | undefined | null
  }): TStyleRootConfigured => {
    const c = uinityConfig[componentName] || {}
    const result: TStyleRootConfigured = {} as never
    assignStyleRootConfigured(result, c.general)
    // get only thouse settings which exists in config
    const providedSettings = Object.fromEntries(
      Object.entries(settings || {}).filter(([settingName]) => c.settings && settingName in c.settings)
    )
    const variantOverrides: TStyleRootConfigured = {} as never
    const validVariantSettings: Record<string, string> = {}
    if (variantName) {
      const variant = c.variants?.[variantName]
      if (!variant) {
        console.error(`Variant "${variantName}" not found in "${componentName}" config`)
      } else {
        assignStyleRootConfigured(variantOverrides, variant.overrides)
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
          validVariantSettings[settingName] = settingValue as string
        }
      }
    }
    const validProvidedSettings: Record<string, string> = {}
    for (const [settingName, settingValue] of Object.entries(providedSettings)) {
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
      validProvidedSettings[settingName] = settingValue as string
    }
    const providedSettingsOverrides: TStyleRootConfigured = {} as never
    for (const [settingName, settingValue] of Object.entries(validProvidedSettings)) {
      const settingStyleRoot = c.settings[settingName][settingValue]
      assignStyleRootConfigured(providedSettingsOverrides, settingStyleRoot)
    }
    const variantSettingsOverrides: TStyleRootConfigured = {} as never
    for (const [settingName, settingValue] of Object.entries(validVariantSettings)) {
      const settingStyleRoot = c.settings[settingName][settingValue]
      assignStyleRootConfigured(variantSettingsOverrides, settingStyleRoot)
    }
    assignStyleRootConfigured(
      result,
      variantSettingsOverrides,
      providedSettingsOverrides,
      variantOverrides,
      styleRootConfiguredOverrides
    )
    return result
  }

  const getStyleRootConfiguredWithoutBySize = ({
    uinityConfig,
    variantName,
    settings,
    styleRootConfiguredOverrides,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    styleRootConfiguredOverrides: TStyleRootConfigured | undefined | null
  }): OmitBySize<TStyleRootConfigured> => {
    const styleRootConfigured = getStyleRootConfiguredWithBySize({
      uinityConfig,
      variantName,
      settings,
      styleRootConfiguredOverrides,
    })
    return omitLodash(styleRootConfigured, [...bySizeKeys]) as never
  }

  const getStyleRootClearWithoutBySize = ({
    uinityConfig,
    variantName,
    settings,
    styleRootConfiguredOverrides,
    colorMode,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    styleRootConfiguredOverrides: TStyleRootConfigured | undefined | null
    colorMode?: ColorModeName
  }): OmitBySize<TStyleRootClear> => {
    const styleRootConfigured = getStyleRootConfiguredWithoutBySize({
      uinityConfig,
      variantName,
      settings,
      styleRootConfiguredOverrides,
    }) as never
    return getStyleRootClearByConfiguredWithoutBySize({ uinityConfig, styleRootConfigured, colorMode })
  }

  const getStyleRootClearWithBySize = ({
    uinityConfig,
    variantName,
    settings,
    styleRootConfiguredOverrides,
    colorMode,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    styleRootConfiguredOverrides: TStyleRootConfigured | undefined | null
    colorMode?: ColorModeName
  }): TStyleRootClear => {
    const styleRootConfigured = getStyleRootConfiguredWithBySize({
      uinityConfig,
      variantName,
      settings,
      styleRootConfiguredOverrides,
    })
    const styleRootClearWithoutBySize = getStyleRootClearByConfiguredWithoutBySize({
      uinityConfig,
      styleRootConfigured,
      colorMode,
    })
    return {
      ...styleRootClearWithoutBySize,
      ...getClearBySizeByConfigured({
        uinityConfig,
        styleRootConfigured,
        colorMode,
        getStyleRootClearByConfiguredWithoutBySize: getStyleRootClearByConfiguredWithoutBySize as never,
      }),
    }
  }
  return {
    getStyleRootConfiguredWithBySize,
    getStyleRootConfiguredWithoutBySize,
    getStyleRootClearByConfiguredWithoutBySize,
    getStyleRootClearWithoutBySize,
    getStyleRootClearWithBySize,
  }
}

export const getZAnyConfig = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyleRootConfigured,
}: {
  zStyleRootConfigured: TZodSchema
}) => {
  return z.object({
    general: zStyleRootConfigured.optional().nullable(),
    settings: z.record(z.string(), z.record(z.string(), zStyleRootConfigured)).optional().nullable(),
    variants: z
      .record(
        z.string(),
        z.object({
          // seme keys as settings above
          settings: z.record(z.string(), z.string()).optional().nullable(),
          overrides: zStyleRootConfigured.optional().nullable(),
        })
      )
      .optional()
      .nullable(),
  })
}

export const extractSettingsFromProps = <TConfig extends AnyConfig<any, any> | undefined, TProps extends {}>({
  config,
  restProps,
}: {
  config: TConfig
  restProps: TProps
}): {
  settings: Record<string, string>
  restPropsWithoutSettings: Omit<TProps, keyof NonNullable<TConfig>['settings']>
} => {
  const settings: Record<string, string> = {}
  const restPropsWithoutSettings = { ...restProps }
  for (const settingName of Object.keys(config?.settings || {})) {
    if (settingName in restProps) {
      settings[settingName] = (restProps as any)[settingName] as string
      delete (restPropsWithoutSettings as any)[settingName]
    }
  }
  return { settings, restPropsWithoutSettings }
}

export type StyleConfiguredToClear<
  TStyleConfigured extends {},
  TOmitKeys extends keyof TStyleConfigured,
  TColorKeys extends keyof TStyleConfigured,
> = Omit<OmitColors<TStyleConfigured, TColorKeys>, TOmitKeys | BySizeKey> & ColorsClearPartial<TColorKeys>
export type StyleConfiguredToClearWithBySize<
  TStyleConfigured extends {},
  TOmitKeys extends keyof TStyleConfigured,
  TColorKeys extends keyof TStyleConfigured,
> = StyleConfiguredToClear<TStyleConfigured, TOmitKeys, TColorKeys> &
  ClearBySizePartial<StyleConfiguredToClear<TStyleConfigured, TOmitKeys, TColorKeys>>
