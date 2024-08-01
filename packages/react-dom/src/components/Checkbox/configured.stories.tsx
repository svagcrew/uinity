import { type CheckboxConfiguredMainProps, createCheckbox } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Checkbox } = createCheckbox({ uinityConfig })

const CheckboxDemo = ({ variant, size, color }: CheckboxConfiguredMainProps) => {
  return <Checkbox variant={variant} size={size} color={color} label="Checkbox" />
}

const meta = {
  title: 'Checkbox Configured',
  component: CheckboxDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.checkbox.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.checkbox.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.checkbox.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof CheckboxDemo>

export const Default: Story = {}
