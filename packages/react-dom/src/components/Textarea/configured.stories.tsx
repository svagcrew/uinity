import { createTextarea, type TextareaConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Textarea } = createTextarea({ uinityConfig })

const TextareaDemo = ({ variant, size, color }: TextareaConfiguredMainProps) => {
  return (
    <Textarea variant={variant} size={size} color={color}>
      Textarea
    </Textarea>
  )
}

const meta = {
  title: 'Textarea Configured',
  component: TextareaDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.textarea.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.textarea.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.textarea.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof TextareaDemo>

export default meta
type Story = StoryObj<typeof TextareaDemo>

export const Default: Story = {}
