import type { BadgeMainProps, BadgeStyleRoot } from './clear.js'
import { Badge } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const BadgeDemo = ({ as, ...restProps }: BadgeStyleRoot & BadgeMainProps) => {
  return (
    <Badge $style={restProps} as={as}>
      Badge
    </Badge>
  )
}

const meta = {
  title: 'Badge Clear',
  component: BadgeDemo,
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
} satisfies Meta<typeof BadgeDemo>

export default meta
type Story = StoryObj<typeof BadgeDemo>

export const Default: Story = {}
