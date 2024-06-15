import { defaultAnimationConfigInput, normalizeAnimationConfig, zAnimationConfigInput } from '@/components/animation.js'
import {
  defaultAssignedElementConfigInput,
  normalizeAssignedElementConfig,
  zAssignedElementConfigInput,
} from '@/components/assignedElement.js'
import { defaultAvatarConfigInput, normalizeAvatarConfig, zAvatarConfigInput } from '@/components/avatar.js'
import { defaultBadgeConfigInput, normalizeBadgeConfig, zBadgeConfigInput } from '@/components/badge.js'
import { defaultBlankConfigInput, normalizeBlankConfig, zBlankConfigInput } from '@/components/blank.js'
import { defaultButtonConfigInput, normalizeButtonConfig, zButtonConfigInput } from '@/components/button.js'
import {
  defaultButtonAndFieldConfigInput,
  normalizeButtonAndFieldConfig,
  zButtonAndFieldConfigInput,
} from '@/components/buttonAndField.js'
import { defaultCardConfigInput, normalizeCardConfig, zCardConfigInput } from '@/components/card.js'
import { defaultCheckboxConfigInput, normalizeCheckboxConfig, zCheckboxConfigInput } from '@/components/checkbox.js'
import {
  defaultColorUinityConfigInput,
  normalizeColorUinityConfig,
  zColorUinityConfigInput,
} from '@/components/color.js'
import {
  defaultContextMenuItemConfigInput,
  normalizeContextMenuItemConfig,
  zContextMenuItemConfigInput,
} from '@/components/contextMenuItem.js'
import {
  defaultControlUinityConfigInput,
  normalizeControlUinityConfig,
  zControlUinityConfigInput,
} from '@/components/control.js'
import {
  defaultControlIconConfigInput,
  normalizeControlIconConfig,
  zControlIconConfigInput,
} from '@/components/controlIcon.js'
import {
  defaultDelimitedLineConfigInput,
  normalizeDelimitedLineConfig,
  zDelimitedLineConfigInput,
} from '@/components/delimitedLine.js'
import { defaultDividerConfigInput, normalizeDividerConfig, zDividerConfigInput } from '@/components/divider.js'
import { defaultEffectConfigInput, normalizeEffectConfig, zEffectConfigInput } from '@/components/effect.js'
import {
  defaultFieldUinityConfigInput,
  normalizeFieldUinityConfig,
  zFieldUinityConfigInput,
} from '@/components/field.js'
import { defaultFormItemConfigInput, normalizeFormItemConfig, zFormItemConfigInput } from '@/components/formItem.js'
import { defaultIconConfigInput, normalizeIconConfig, zIconConfigInput } from '@/components/icon.js'
import { defaultIndicatorConfigInput, normalizeIndicatorConfig, zIndicatorConfigInput } from '@/components/indicator.js'
import { defaultInformerConfigInput, normalizeInformerConfig, zInformerConfigInput } from '@/components/informer.js'
import {
  defaultLabeledValueConfigInput,
  normalizeLabeledValueConfig,
  zLabeledValueConfigInput,
} from '@/components/labeledValue.js'
import { defaultLayoutConfigInput, normalizeLayoutConfig, zLayoutConfigInput } from '@/components/layout.js'
import { defaultLinkConfigInput, normalizeLinkConfig, zLinkConfigInput } from '@/components/link.js'
import { defaultLoaderConfigInput, normalizeLoaderConfig, zLoaderConfigInput } from '@/components/loader.js'
import { defaultModalConfigInput, normalizeModalConfig, zModalConfigInput } from '@/components/modal.js'
import { defaultOverlayConfigInput, normalizeOverlayConfig, zOverlayConfigInput } from '@/components/overlay.js'
import {
  defaultRadiobuttonConfigInput,
  normalizeRadiobuttonConfig,
  zRadiobuttonConfigInput,
} from '@/components/radiobutton.js'
import { defaultRichTextConfigInput, normalizeRichTextConfig, zRichTextConfigInput } from '@/components/richText.js'
import { defaultSegmentConfigInput, normalizeSegmentConfig, zSegmentConfigInput } from '@/components/segment.js'
import { defaultSelectConfigInput, normalizeSelectConfig, zSelectConfigInput } from '@/components/select.js'
import { defaultSizingConfigInput, normalizeSizingConfig, zSizingConfigInput } from '@/components/sizing.js'
import { defaultTabConfigInput, normalizeTabConfig, zTabConfigInput } from '@/components/tab.js'
import { defaultTableConfigInput, normalizeTableConfig, zTableConfigInput } from '@/components/table.js'
import { defaultTextUinityConfigInput, normalizeTextUinityConfig, zTextUinityConfigInput } from '@/components/text.js'
import { defaultTextareaConfigInput, normalizeTextareaConfig, zTextareaConfigInput } from '@/components/textarea.js'
import { defaultTextfieldConfigInput, normalizeTextfieldConfig, zTextfieldConfigInput } from '@/components/textfield.js'
import { defaultToastConfigInput, normalizeToastConfig, zToastConfigInput } from '@/components/toast.js'
import {
  defaultToggleButtonConfigInput,
  normalizeToggleButtonConfig,
  zToggleButtonConfigInput,
} from '@/components/toggleButton.js'
import {
  defaultToggleSwitchConfigInput,
  normalizeToggleSwitchConfig,
  zToggleSwitchConfigInput,
} from '@/components/toggleSwitch.js'
import { getVariableValue, isVariableName } from '@/utils/variables.js'
import { deepMap } from 'svag-deep-map'
import { z } from 'zod'

export const zUinityConfigInput = z.object({
  color: zColorUinityConfigInput.optional(),
  text: zTextUinityConfigInput.optional(),
  icon: zIconConfigInput.optional(),
  layout: zLayoutConfigInput.optional(),
  control: zControlUinityConfigInput.optional(),
  field: zFieldUinityConfigInput.optional(),
  button: zButtonConfigInput.optional(),
  link: zLinkConfigInput.optional(),
  effect: zEffectConfigInput.optional(),
  animation: zAnimationConfigInput.optional(),
  richText: zRichTextConfigInput.optional(),
  sizing: zSizingConfigInput.optional(),
  loader: zLoaderConfigInput.optional(),
  buttonAndField: zButtonAndFieldConfigInput.optional(),
  textfield: zTextfieldConfigInput.optional(),
  contextMenuItem: zContextMenuItemConfigInput.optional(),
  select: zSelectConfigInput.optional(),
  textarea: zTextareaConfigInput.optional(),
  formItem: zFormItemConfigInput.optional(),
  controlIcon: zControlIconConfigInput.optional(),
  assignedElement: zAssignedElementConfigInput.optional(),
  informer: zInformerConfigInput.optional(),
  toast: zToastConfigInput.optional(),
  card: zCardConfigInput.optional(),
  overlay: zOverlayConfigInput.optional(),
  modal: zModalConfigInput.optional(),
  segment: zSegmentConfigInput.optional(),
  table: zTableConfigInput.optional(),
  labeledValue: zLabeledValueConfigInput.optional(),
  toggleButton: zToggleButtonConfigInput.optional(),
  tab: zTabConfigInput.optional(),
  toggleSwitch: zToggleSwitchConfigInput.optional(),
  checkbox: zCheckboxConfigInput.optional(),
  radiobutton: zRadiobuttonConfigInput.optional(),
  divider: zDividerConfigInput.optional(),
  badge: zBadgeConfigInput.optional(),
  indicator: zIndicatorConfigInput.optional(),
  avatar: zAvatarConfigInput.optional(),
  delimitedLine: zDelimitedLineConfigInput.optional(),
  blank: zBlankConfigInput.optional(),
})
export type UinityConfigInput = z.output<typeof zUinityConfigInput>

export const defaultUinityConfigInput: UinityConfigInput = {
  color: defaultColorUinityConfigInput,
  text: defaultTextUinityConfigInput,
  icon: defaultIconConfigInput,
  layout: defaultLayoutConfigInput,
  control: defaultControlUinityConfigInput,
  field: defaultFieldUinityConfigInput,
  button: defaultButtonConfigInput,
  link: defaultLinkConfigInput,
  effect: defaultEffectConfigInput,
  animation: defaultAnimationConfigInput,
  richText: defaultRichTextConfigInput,
  sizing: defaultSizingConfigInput,
  loader: defaultLoaderConfigInput,
  buttonAndField: defaultButtonAndFieldConfigInput,
  textfield: defaultTextfieldConfigInput,
  contextMenuItem: defaultContextMenuItemConfigInput,
  select: defaultSelectConfigInput,
  textarea: defaultTextareaConfigInput,
  formItem: defaultFormItemConfigInput,
  controlIcon: defaultControlIconConfigInput,
  assignedElement: defaultAssignedElementConfigInput,
  informer: defaultInformerConfigInput,
  toast: defaultToastConfigInput,
  card: defaultCardConfigInput,
  overlay: defaultOverlayConfigInput,
  modal: defaultModalConfigInput,
  segment: defaultSegmentConfigInput,
  table: defaultTableConfigInput,
  labeledValue: defaultLabeledValueConfigInput,
  toggleButton: defaultToggleButtonConfigInput,
  tab: defaultTabConfigInput,
  toggleSwitch: defaultToggleSwitchConfigInput,
  checkbox: defaultCheckboxConfigInput,
  radiobutton: defaultRadiobuttonConfigInput,
  divider: defaultDividerConfigInput,
  badge: defaultBadgeConfigInput,
  indicator: defaultIndicatorConfigInput,
  avatar: defaultAvatarConfigInput,
  delimitedLine: defaultDelimitedLineConfigInput,
  blank: defaultBlankConfigInput,
}

export const normalizeUinityConfig = (input: UinityConfigInput) => {
  const color = normalizeColorUinityConfig(input.color)
  const text = normalizeTextUinityConfig(input.text)
  const icon = normalizeIconConfig(input.icon)
  const layout = normalizeLayoutConfig(input.layout)
  const control = normalizeControlUinityConfig(input.control)
  const field = normalizeFieldUinityConfig(input.field)
  const button = normalizeButtonConfig(input.button)
  const link = normalizeLinkConfig(input.link)
  const effect = normalizeEffectConfig(input.effect)
  const animation = normalizeAnimationConfig(input.animation)
  const richText = normalizeRichTextConfig(input.richText)
  const sizing = normalizeSizingConfig(input.sizing)
  const loader = normalizeLoaderConfig(input.loader)
  const buttonAndField = normalizeButtonAndFieldConfig(input.buttonAndField)
  const textfield = normalizeTextfieldConfig(input.textfield)
  const contextMenuItem = normalizeContextMenuItemConfig(input.contextMenuItem)
  const select = normalizeSelectConfig(input.select)
  const textarea = normalizeTextareaConfig(input.textarea)
  const formItem = normalizeFormItemConfig(input.formItem)
  const controlIcon = normalizeControlIconConfig(input.controlIcon)
  const assignedElement = normalizeAssignedElementConfig(input.assignedElement)
  const informer = normalizeInformerConfig(input.informer)
  const toast = normalizeToastConfig(input.toast)
  const card = normalizeCardConfig(input.card)
  const overlay = normalizeOverlayConfig(input.overlay)
  const modal = normalizeModalConfig(input.modal)
  const segment = normalizeSegmentConfig(input.segment)
  const table = normalizeTableConfig(input.table)
  const labeledValue = normalizeLabeledValueConfig(input.labeledValue)
  const toggleButton = normalizeToggleButtonConfig(input.toggleButton)
  const tab = normalizeTabConfig(input.tab)
  const toggleSwitch = normalizeToggleSwitchConfig(input.toggleSwitch)
  const checkbox = normalizeCheckboxConfig(input.checkbox)
  const radiobutton = normalizeRadiobuttonConfig(input.radiobutton)
  const divider = normalizeDividerConfig(input.divider)
  const badge = normalizeBadgeConfig(input.badge)
  const indicator = normalizeIndicatorConfig(input.indicator)
  const avatar = normalizeAvatarConfig(input.avatar)
  const delimitedLine = normalizeDelimitedLineConfig(input.delimitedLine)
  const blank = normalizeBlankConfig(input.blank)
  const config = {
    color,
    text,
    icon,
    layout,
    control,
    field,
    button,
    link,
    effect,
    animation,
    richText,
    sizing,
    loader,
    buttonAndField,
    textfield,
    contextMenuItem,
    select,
    textarea,
    formItem,
    controlIcon,
    assignedElement,
    informer,
    toast,
    card,
    overlay,
    modal,
    segment,
    table,
    labeledValue,
    toggleButton,
    tab,
    toggleSwitch,
    checkbox,
    radiobutton,
    divider,
    badge,
    indicator,
    avatar,
    delimitedLine,
    blank,
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
