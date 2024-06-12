// import { fn } from '@storybook/test'
import { createUinityIcon } from './configured.js'
import icon1 from './icon1.svg?react'
import icon2 from './icon2.svg?react'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

export const { Icon } = createUinityIcon({
  uinityConfig,
  iconsComponents: {
    icon1,
    icon2,
  },
})

const meta = {
  title: 'Icon Configured',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('size', uinityConfig.icon.size),
  },
  args: {
    size: uinityConfig.icon.general.defaultSize,
    name: 'icon1',
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof Icon>

export const Large: Story = {
  args: {
    size: 'l',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
  },
}
