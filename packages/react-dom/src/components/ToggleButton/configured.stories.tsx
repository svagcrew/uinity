import type { ToggleButtonConfiguredMainProps } from './configured.js'
import { createToggleButton } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ToggleButton } = createToggleButton({ uinityConfig, Icon })

const ToggleButtonDemo = ({ ...restProps }: ToggleButtonConfiguredMainProps) => {
  return <ToggleButton {...(restProps as any)} />
}

const meta = {
  title: 'ToggleButton Configured',
  component: ToggleButtonDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.toggleButton.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.toggleButton.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.toggleButton.size),
    iconStart: {
      control: 'radio',
      options: ['icon1', 'icon2', undefined],
    },
  },
  args: {
    variant: 'primary',
    color: undefined,
    size: undefined,
    iconStart: undefined,
  },
} satisfies Meta<typeof ToggleButtonDemo>

export default meta
type Story = StoryObj<typeof ToggleButtonDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ToggleButton',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ToggleButton',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    children: 'ToggleButton',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    children: 'ToggleButton',
  },
}
