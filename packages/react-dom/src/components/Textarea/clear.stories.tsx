import type { TextareaMainProps, TextareaStyleRoot } from './clear.js'
import { Textarea } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const TextareaDemo = ({ as, ...restProps }: TextareaStyleRoot & TextareaMainProps) => {
  return (
    <Textarea $style={restProps} as={as}>
      Textarea
    </Textarea>
  )
}

const meta = {
  title: 'Textarea Clear',
  component: TextareaDemo,
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
} satisfies Meta<typeof TextareaDemo>

export default meta
type Story = StoryObj<typeof TextareaDemo>

export const Default: Story = {}
