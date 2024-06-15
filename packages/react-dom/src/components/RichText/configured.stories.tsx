import { createRichText,type RichTextConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { RichText } = createRichText({ uinityConfig })

const RichTextDemo = ({ variant, size, color }: RichTextConfiguredMainProps) => {
  return (
    <RichText variant={variant} size={size} color={color}>
      RichText
    </RichText>
  )
}

const meta = {
  title: 'RichText Configured',
  component: RichTextDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.richText.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.richText.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.richText.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof RichTextDemo>

export default meta
type Story = StoryObj<typeof RichTextDemo>

export const Default: Story = {}
