import type { IndicatorMainProps, IndicatorStyleRoot } from './clear.js'
import { Indicator } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const IndicatorDemo = ({ as, ...restProps }: IndicatorStyleRoot & IndicatorMainProps) => {
  return (
    <Indicator $style={restProps} as={as}>
      Indicator
    </Indicator>
  )
}

const meta = {
  title: 'Indicator Clear',
  component: IndicatorDemo,
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
} satisfies Meta<typeof IndicatorDemo>

export default meta
type Story = StoryObj<typeof IndicatorDemo>

export const Default: Story = {}
