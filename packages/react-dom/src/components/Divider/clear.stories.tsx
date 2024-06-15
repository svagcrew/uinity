import type { DividerMainProps, DividerStyleRoot } from './clear.js'
import { Divider } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const DividerDemo = ({ as, ...restProps }: DividerStyleRoot & DividerMainProps) => {
  return (
    <Divider $style={restProps} as={as}>
      Divider
    </Divider>
  )
}

const meta = {
  title: 'Divider Clear',
  component: DividerDemo,
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
} satisfies Meta<typeof DividerDemo>

export default meta
type Story = StoryObj<typeof DividerDemo>

export const Default: Story = {}
