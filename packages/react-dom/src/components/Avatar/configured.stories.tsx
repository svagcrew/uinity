import type { AvatarConfiguredMainProps } from './configured.js'
import { createAvatar } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Avatar } = createAvatar({ uinityConfig })

const AvatarDemo = ({ ...restProps }: AvatarConfiguredMainProps) => {
  return <Avatar {...(restProps as any)} />
}

const meta = {
  title: 'Avatar Configured',
  component: AvatarDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.avatar.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.avatar.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.avatar.size),
    // iconStart: {
    //   control: 'radio',
    //   options: ['icon1', 'icon2', undefined],
    // },
  },
  args: {
    variant: 'primary',
    color: undefined,
    size: undefined,
    // iconStart: undefined,
  },
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof AvatarDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    // children: 'Avatar',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    // children: 'Avatar',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    // children: 'Avatar',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    // children: 'Avatar',
  },
}
