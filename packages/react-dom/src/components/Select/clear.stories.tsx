import type { SelectMainProps, SelectStyleRoot } from './clear.js'
import { Select } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const SelectDemo = ({ as, ...restProps }: SelectStyleRoot & SelectMainProps) => {
  return (
    <Select $style={restProps} as={as}>
      Select
    </Select>
  )
}

const meta = {
  title: 'Select Clear',
  component: SelectDemo,
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
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof SelectDemo>

export const Default: Story = {}
