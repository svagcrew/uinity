import { createUinityButton } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const Button = createUinityButton({ uinityConfig, Icon }).Button

const meta = {
  title: 'Button Configured',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('type', uinityConfig.button.type),
    ...getArgTypeConfigFromObject('size', uinityConfig.button.size),
    iconStart: {
      control: 'radio',
      options: ['icon1', 'icon2', undefined],
    },
  },
  args: {
    type: uinityConfig.button.general.defaultType,
    size: uinityConfig.button.general.defaultSize,
    iconStart: undefined,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    type: 'primary',
    children: 'Button',
  },
}
