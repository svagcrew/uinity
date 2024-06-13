import type { BlankMainProps, BlankStyleRootProps } from './clear.js'
import { Blank } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const BlankDemo = ({ as, ...restProps }: BlankStyleRootProps & BlankMainProps) => {
  return (
    <Blank $style={restProps} as={as}>
      Blank
    </Blank>
  )
}

const meta = {
  title: 'Blank Clear',
  component: BlankDemo,
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
} satisfies Meta<typeof BlankDemo>

export default meta
type Story = StoryObj<typeof BlankDemo>

export const Default: Story = {}
