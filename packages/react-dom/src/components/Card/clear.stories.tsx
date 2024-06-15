import type { CardMainProps, CardStyleRoot } from './clear.js'
import { Card } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const CardDemo = ({ as, ...restProps }: CardStyleRoot & CardMainProps) => {
  return (
    <Card $style={restProps} as={as}>
      Card
    </Card>
  )
}

const meta = {
  title: 'Card Clear',
  component: CardDemo,
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
} satisfies Meta<typeof CardDemo>

export default meta
type Story = StoryObj<typeof CardDemo>

export const Default: Story = {}
