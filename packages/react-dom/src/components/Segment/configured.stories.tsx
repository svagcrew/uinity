import { createSegment, type SegmentConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Segment } = createSegment({ uinityConfig })

const SegmentDemo = ({ variant, size, color }: SegmentConfiguredMainProps) => {
  return (
    <Segment variant={variant} size={size} color={color}>
      Segment
    </Segment>
  )
}

const meta = {
  title: 'Segment Configured',
  component: SegmentDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.segment.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.segment.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.segment.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof SegmentDemo>

export default meta
type Story = StoryObj<typeof SegmentDemo>

export const Default: Story = {}
