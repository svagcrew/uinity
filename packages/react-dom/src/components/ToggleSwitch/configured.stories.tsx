import { createToggleSwitch, type ToggleSwitchConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ToggleSwitch } = createToggleSwitch({ uinityConfig })

const ToggleSwitchDemo = ({ variant, size, color }: ToggleSwitchConfiguredMainProps) => {
  return (
    <ToggleSwitch variant={variant} size={size} color={color}>
      ToggleSwitch
    </ToggleSwitch>
  )
}

const meta = {
  title: 'ToggleSwitch Configured',
  component: ToggleSwitchDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.toggleSwitch.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.toggleSwitch.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.toggleSwitch.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof ToggleSwitchDemo>

export default meta
type Story = StoryObj<typeof ToggleSwitchDemo>

export const Default: Story = {}
