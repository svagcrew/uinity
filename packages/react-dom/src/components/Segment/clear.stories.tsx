import type { SegmentMainProps, SegmentStyleRoot } from './clear.js'
import { Segment } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const SegmentDemo = ({ as, ...restProps }: SegmentStyleRoot & SegmentMainProps) => {
  return (
    <Segment $style={restProps} as={as}>
      Segment
    </Segment>
  )
}

const meta = {
  title: 'Segment Clear',
  component: SegmentDemo,
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
} satisfies Meta<typeof SegmentDemo>

export default meta
type Story = StoryObj<typeof SegmentDemo>

export const Default: Story = {}
