import type { ControlIconMainProps, ControlIconStyleRoot } from './clear.js'
import { ControlIcon } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const ControlIconDemo = ({ as, ...restProps }: ControlIconStyleRoot & ControlIconMainProps) => {
  return (
    <ControlIcon $style={restProps} as={as}>
      ControlIcon
    </ControlIcon>
  )
}

const meta = {
  title: 'ControlIcon Clear',
  component: ControlIconDemo,
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
} satisfies Meta<typeof ControlIconDemo>

export default meta
type Story = StoryObj<typeof ControlIconDemo>

export const Default: Story = {}
