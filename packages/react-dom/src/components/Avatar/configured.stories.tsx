import { type AvatarConfiguredMainProps, createAvatar } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Avatar } = createAvatar({ uinityConfig })

const AvatarDemo = ({ variant, size, color }: AvatarConfiguredMainProps) => {
  return (
    <Avatar variant={variant} size={size} color={color}>
      Avatar
    </Avatar>
  )
}

const meta = {
  title: 'Avatar Configured',
  component: AvatarDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.avatar.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.avatar.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.avatar.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof AvatarDemo>

export const Default: Story = {}
