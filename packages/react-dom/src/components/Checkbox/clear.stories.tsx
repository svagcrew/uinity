import type { CheckboxMainProps, CheckboxStyleRoot } from './clear.js'
import { Checkbox } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const CheckboxDemo = ({ as, ...restProps }: CheckboxStyleRoot & CheckboxMainProps) => {
  return (
    <Checkbox $style={restProps} as={as}>
      Checkbox
    </Checkbox>
  )
}

const meta = {
  title: 'Checkbox Clear',
  component: CheckboxDemo,
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
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof CheckboxDemo>

export const Default: Story = {}
