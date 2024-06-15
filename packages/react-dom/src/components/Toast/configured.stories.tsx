import { createToast, type ToastConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Toast } = createToast({ uinityConfig })

const ToastDemo = ({ variant, size, color }: ToastConfiguredMainProps) => {
  return (
    <Toast variant={variant} size={size} color={color}>
      Toast
    </Toast>
  )
}

const meta = {
  title: 'Toast Configured',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.toast.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.toast.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.toast.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof ToastDemo>

export const Default: Story = {}
