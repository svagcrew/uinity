import { type CardConfiguredMainProps, createCard } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Card } = createCard({ uinityConfig })

const CardDemo = ({ variant, size, color }: CardConfiguredMainProps) => {
  return (
    <Card variant={variant} size={size} color={color}>
      Card
    </Card>
  )
}

const meta = {
  title: 'Card Configured',
  component: CardDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.card.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.card.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.card.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof CardDemo>

export default meta
type Story = StoryObj<typeof CardDemo>

export const Default: Story = {}
