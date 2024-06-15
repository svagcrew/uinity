import type { AvatarMainProps, AvatarStyleRoot } from './clear.js'
import { Avatar } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const AvatarDemo = ({ as, ...restProps }: AvatarStyleRoot & AvatarMainProps) => {
  return (
    <Avatar $style={restProps} as={as}>
      Avatar
    </Avatar>
  )
}

const meta = {
  title: 'Avatar Clear',
  component: AvatarDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    background: { control: 'color' },
    childrenBackground: { control: 'color' },
  },
  args: {
    background: '#f00',
    childrenBackground: '#0f0',
  },
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof AvatarDemo>

export const Default: Story = {}
