import type { RichTextMainProps, RichTextStyleRoot } from './clear.js'
import { RichText } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const RichTextDemo = ({ as, ...restProps }: RichTextStyleRoot & RichTextMainProps) => {
  return (
    <RichText $style={restProps} as={as}>
      RichText
    </RichText>
  )
}

const meta = {
  title: 'RichText Clear',
  component: RichTextDemo,
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
} satisfies Meta<typeof RichTextDemo>

export default meta
type Story = StoryObj<typeof RichTextDemo>

export const Default: Story = {}
