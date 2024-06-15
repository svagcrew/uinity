import type { ToggleButtonMainProps, ToggleButtonStyleRoot } from './clear.js'
import { ToggleButton } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const ToggleButtonDemo = ({ as, ...restProps }: ToggleButtonStyleRoot & ToggleButtonMainProps) => {
  return (
    <ToggleButton $style={restProps} as={as}>
      ToggleButton
    </ToggleButton>
  )
}

const meta = {
  title: 'ToggleButton Clear',
  component: ToggleButtonDemo,
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
} satisfies Meta<typeof ToggleButtonDemo>

export default meta
type Story = StoryObj<typeof ToggleButtonDemo>

export const Default: Story = {}
