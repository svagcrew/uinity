import type { ColorModeName } from '@/lib/color.js'
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

export type AnyConfiguredCommonProps<TConfig extends AnyConfig<TStyleRoot>, TStyleRoot extends {}> = {
  variant?: keyof TConfig['variants']
} & {
  [key in AnyConfigSettingsItemName<TConfig>]?: AnyConfigSettingsItemValue<TConfig, key>
} & { $style?: TStyleRoot }

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
    styleRootConfiguredOverrides,
  }: {
    uinityConfig: TPartialUinityConfig
    variantName: string | undefined | null
    settings: Record<string, any> | undefined | null
    styleRootConfiguredOverrides: TStyleRootConfigured | undefined | null
  }): TStyleRootConfigured => {
    const c = uinityConfig[componentName]
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
  const getStyleRootClear = ({
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
  }): TStyleRootClearNormalized => {
    const styleRootConfigured = getStyleRootConfigured({
      uinityConfig,
      variantName,
      settings,
      styleRootConfiguredOverrides,
    })
    return getStyleRootClearByConfigured({ uinityConfig, styleRootConfigured, colorMode })
  }
  return {
    getStyleRootConfigured,
    getStyleRootClearByConfigured,
    getStyleRootClear,
  }
}

export const getZAnyConfig = <TZodSchema extends z.ZodObject<any, any, any>>({
  zStyleRootConfigured,
}: {
  zStyleRootConfigured: TZodSchema
}) => {
  return z.object({
    general: zStyleRootConfigured.optional().nullable(),
    settings: z.record(z.record(zStyleRootConfigured)).optional().nullable(),
    variants: z
      .record(
        z.object({
          // seme keys as settings above
          settings: z.record(z.string()).optional().nullable(),
          overrides: z.record(zStyleRootConfigured).optional().nullable(),
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

export const extractSettingsFromProps = <TConfig extends AnyConfig<any, any>, TProps extends {}>({
  config,
  restProps,
}: {
  config: TConfig
  restProps: TProps
}): {
  settings: Record<string, string>
  restPropsWithoutSettings: Omit<TProps, keyof TConfig['settings']>
} => {
  const settings: Record<string, string> = {}
  const restPropsWithoutSettings = { ...restProps }
  for (const settingName of Object.keys(config.settings ?? {})) {
    if (settingName in restProps) {
      settings[settingName] = (restProps as any)[settingName] as string
      delete (restPropsWithoutSettings as any)[settingName]
    }
  }
  return { settings, restPropsWithoutSettings }
}
