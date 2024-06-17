import type { TextMainProps, TextStyleRoot } from './clear.js'
import { Text } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const TextDemo = ({ as, ...restProps }: TextStyleRoot & TextMainProps) => {
  return (
    <Text $style={restProps} as={as}>
      Text
    </Text>
  )
}

const meta = {
  title: 'Text Clear',
  component: TextDemo,
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
} satisfies Meta<typeof TextDemo>

export default meta
type Story = StoryObj<typeof TextDemo>

export const Default: Story = {}
