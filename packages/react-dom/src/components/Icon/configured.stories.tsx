// import { fn } from '@storybook/test'
import type { IconConfiguredMainProps } from './configured.js'
import { createIcon } from './configured.js'
import { iconsSources, uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

export const { Icon } = createIcon({
  uinityConfig,
  iconsSources,
})

const IconDemo = (props: IconConfiguredMainProps) => {
  return <Icon {...(props as any)} />
}

const meta = {
  title: 'Icon Configured',
  component: IconDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('size', uinityConfig.icon.size),
  },
  args: {
    size: 'm',
    name: 'icon1',
  },
} satisfies Meta<typeof IconDemo>

export default meta
type Story = StoryObj<typeof IconDemo>

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
