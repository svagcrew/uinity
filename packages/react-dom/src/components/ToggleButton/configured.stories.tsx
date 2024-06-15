import { createToggleButton, type ToggleButtonConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ToggleButton } = createToggleButton({ uinityConfig })

const ToggleButtonDemo = ({ variant, size, color }: ToggleButtonConfiguredMainProps) => {
  return (
    <ToggleButton variant={variant} size={size} color={color}>
      ToggleButton
    </ToggleButton>
  )
}

const meta = {
  title: 'ToggleButton Configured',
  component: ToggleButtonDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.toggleButton.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.toggleButton.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.toggleButton.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof ToggleButtonDemo>

export default meta
type Story = StoryObj<typeof ToggleButtonDemo>

export const Default: Story = {}
