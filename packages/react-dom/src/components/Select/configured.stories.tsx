import { createSelect,type SelectConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Select } = createSelect({ uinityConfig })

const SelectDemo = ({ variant, size, color }: SelectConfiguredMainProps) => {
  return (
    <Select variant={variant} size={size} color={color}>
      Select
    </Select>
  )
}

const meta = {
  title: 'Select Configured',
  component: SelectDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.select.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.select.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.select.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof SelectDemo>

export const Default: Story = {}
