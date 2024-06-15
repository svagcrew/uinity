import type { DelimitedLineMainProps, DelimitedLineStyleRoot } from './clear.js'
import { DelimitedLine } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const DelimitedLineDemo = ({ as, ...restProps }: DelimitedLineStyleRoot & DelimitedLineMainProps) => {
  return (
    <DelimitedLine $style={restProps} as={as}>
      DelimitedLine
    </DelimitedLine>
  )
}

const meta = {
  title: 'DelimitedLine Clear',
  component: DelimitedLineDemo,
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
} satisfies Meta<typeof DelimitedLineDemo>

export default meta
type Story = StoryObj<typeof DelimitedLineDemo>

export const Default: Story = {}
