import { createDelimitedLine,type DelimitedLineConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { DelimitedLine } = createDelimitedLine({ uinityConfig })

const DelimitedLineDemo = ({ variant, size, color }: DelimitedLineConfiguredMainProps) => {
  return (
    <DelimitedLine variant={variant} size={size} color={color}>
      DelimitedLine
    </DelimitedLine>
  )
}

const meta = {
  title: 'DelimitedLine Configured',
  component: DelimitedLineDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.delimitedLine.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.delimitedLine.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.delimitedLine.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof DelimitedLineDemo>

export default meta
type Story = StoryObj<typeof DelimitedLineDemo>

export const Default: Story = {}
