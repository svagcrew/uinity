import {
  defaultButtonUinityConfigInput,
  normalizeButtonUinityConfig,
  zButtonUinityConfigInput,
} from '@/components/button.js'
import {
  defaultColorUinityConfigInput,
  normalizeColorUinityConfig,
  zColorUinityConfigInput,
} from '@/components/color.js'
import {
  defaultControlUinityConfigInput,
  normalizeControlUinityConfig,
  zControlUinityConfigInput,
} from '@/components/control.js'
import {
  defaultFieldUinityConfigInput,
  normalizeFieldUinityConfig,
  zFieldUinityConfigInput,
} from '@/components/field.js'
import { defaultIconUinityConfigInput, normalizeIconUinityConfig, zIconUinityConfigInput } from '@/components/icon.js'
import {
  defaultLayoutUinityConfigInput,
  normalizeLayoutUinityConfig,
  zLayoutUinityConfigInput,
} from '@/components/layout.js'
import { defaultTextUinityConfigInput, normalizeTextUinityConfig, zTextUinityConfigInput } from '@/components/text.js'
import { getVariableValue, isVariableName } from '@/utils/variables.js'
import { deepMap } from 'svag-deep-map'
import { z } from 'zod'

export const zUinityConfigInput = z.object({
  color: zColorUinityConfigInput.optional(),
  text: zTextUinityConfigInput.optional(),
  icon: zIconUinityConfigInput.optional(),
  layout: zLayoutUinityConfigInput.optional(),
  control: zControlUinityConfigInput.optional(),
  field: zFieldUinityConfigInput.optional(),
  button: zButtonUinityConfigInput.optional(),
})
export type UinityConfigInput = z.infer<typeof zUinityConfigInput>

export const defaultUinityConfigInput: UinityConfigInput = {
  color: defaultColorUinityConfigInput,
  text: defaultTextUinityConfigInput,
  icon: defaultIconUinityConfigInput,
  layout: defaultLayoutUinityConfigInput,
  control: defaultControlUinityConfigInput,
  field: defaultFieldUinityConfigInput,
  button: defaultButtonUinityConfigInput,
}

export const normalizeUinityConfig = (input: UinityConfigInput) => {
  const color = normalizeColorUinityConfig(input.color)
  const text = normalizeTextUinityConfig(input.text)
  const icon = normalizeIconUinityConfig(input.icon)
  const layout = normalizeLayoutUinityConfig(input.layout)
  const control = normalizeControlUinityConfig(input.control)
  const field = normalizeFieldUinityConfig(input.field)
  const button = normalizeButtonUinityConfig(input.button)
  const config = {
    general: {
      colorModes: ['light', 'dark'] as const,
    },
    color,
    text,
    icon,
    layout,
    control,
    field,
    button,
  }
  const configWithVariablesAsStringsReferences = deepMap(
    config,
    ({ value }) => {
      if (isVariableName(value)) {
        const variableValue = (value as any)?.toVariableName ? (value as any).toVariableName() : value
        return variableValue
      }
      return value
    },
    {
      clone: false,
      maxSeenCount: 0,
    }
  ) as typeof config
  return configWithVariablesAsStringsReferences
}

export type UinityConfig = ReturnType<typeof normalizeUinityConfig>

export const variablifyUinityConfig = (config: UinityConfig) => {
  const configWithVariablesAsValues = deepMap(
    config,
    ({ value }) => {
      if (isVariableName(value)) {
        const variableValue = getVariableValue(config, value, true)
        return variableValue
      }
      return value
    },
    {
      clone: false,
      maxSeenCount: 0,
    }
  ) as typeof config
  return configWithVariablesAsValues
}

export const parseUinityConfig = (config: Record<string, any> = {}) => {
  const parseResult = zUinityConfigInput.safeParse(config)
  if (!parseResult.success) {
    throw new Error(`Invalid uinity config: ${JSON.stringify(parseResult.error.errors[0])}`)
  }
  const configControlParsed = parseResult.data
  return variablifyUinityConfig(normalizeUinityConfig(configControlParsed))
}
