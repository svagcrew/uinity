import { createUinityButtons } from './index.js'
import { Icon } from '@/components/Icon/index.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getOptionsFormKeysArgType } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const Button = createUinityButtons({ uinityConfig, Icon }).Button

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getOptionsFormKeysArgType('type', uinityConfig.button.type),
    ...getOptionsFormKeysArgType('size', uinityConfig.button.size),
    icon: {
      control: 'radio',
      options: ['icon1', 'icon2', undefined],
    },
  },
  args: {
    type: uinityConfig.button.general.defaultType,
    size: uinityConfig.button.general.defaultSize,
    icon: undefined,
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
