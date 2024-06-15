import { type BadgeConfiguredMainProps, createBadge } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Badge } = createBadge({ uinityConfig })

const BadgeDemo = ({ variant, size, color }: BadgeConfiguredMainProps) => {
  return (
    <Badge variant={variant} size={size} color={color}>
      Badge
    </Badge>
  )
}

const meta = {
  title: 'Badge Configured',
  component: BadgeDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.badge.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.badge.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.badge.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof BadgeDemo>

export default meta
type Story = StoryObj<typeof BadgeDemo>

export const Default: Story = {}
