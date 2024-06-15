import { createTextfield, type TextfieldConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Textfield } = createTextfield({ uinityConfig })

const TextfieldDemo = ({ variant, size, color }: TextfieldConfiguredMainProps) => {
  return (
    <Textfield variant={variant} size={size} color={color}>
      Textfield
    </Textfield>
  )
}

const meta = {
  title: 'Textfield Configured',
  component: TextfieldDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.textfield.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.textfield.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.textfield.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof TextfieldDemo>

export default meta
type Story = StoryObj<typeof TextfieldDemo>

export const Default: Story = {}
