import type { ToastMainProps, ToastStyleRoot } from './clear.js'
import { Toast } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const ToastDemo = ({ as, ...restProps }: ToastStyleRoot & ToastMainProps) => {
  return (
    <Toast $style={restProps} as={as}>
      Toast
    </Toast>
  )
}

const meta = {
  title: 'Toast Clear',
  component: ToastDemo,
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
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof ToastDemo>

export const Default: Story = {}
