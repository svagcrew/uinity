import type { LabeledValueMainProps, LabeledValueStyleRoot } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LabeledValueDemo = ({ as, ...restProps }: LabeledValueStyleRoot & LabeledValueMainProps) => {
  return null
  // <LabeledValue $style={restProps} as={as}>
  //   LabeledValue
  // </LabeledValue>
}

const meta = {
  title: 'LabeledValue Clear',
  component: LabeledValueDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // background: { control: 'color' },
    // childrenBackground: { control: 'color' },
  },
  args: {
    // background: '#f00',
    // childrenBackground: '#0f0',
  },
} satisfies Meta<typeof LabeledValueDemo>

export default meta
type Story = StoryObj<typeof LabeledValueDemo>

export const Default: Story = {}
