import { type BlankConfiguredMainProps, createBlank } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Blank } = createBlank({ uinityConfig })

const BlankDemo = ({ variant, size, color }: BlankConfiguredMainProps) => {
  return (
    <Blank variant={variant} size={size} color={color}>
      Blank
    </Blank>
  )
}

const meta = {
  title: 'Blank Configured',
  component: BlankDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.blank.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.blank.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.blank.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof BlankDemo>

export default meta
type Story = StoryObj<typeof BlankDemo>

export const Default: Story = {}
