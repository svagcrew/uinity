import { createText, type TextConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Text } = createText({ uinityConfig })

const TextDemo = ({ variant, size, color }: TextConfiguredMainProps) => {
  return (
    <Text variant={variant} size={size} color={color}>
      Text
    </Text>
  )
}

const meta = {
  title: 'Text Configured',
  component: TextDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // ...getArgTypeConfigFromObject('variant', uinityConfig.text.variant, 'radio', true),
    // ...getArgTypeConfigFromObject('color', uinityConfig.text.color, 'radio', true),
    // ...getArgTypeConfigFromObject('size', uinityConfig.text.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof TextDemo>

export default meta
type Story = StoryObj<typeof TextDemo>

export const Default: Story = {}
