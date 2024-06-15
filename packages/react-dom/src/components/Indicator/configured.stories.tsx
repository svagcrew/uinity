import { createIndicator,type IndicatorConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Indicator } = createIndicator({ uinityConfig })

const IndicatorDemo = ({ variant, size, color }: IndicatorConfiguredMainProps) => {
  return (
    <Indicator variant={variant} size={size} color={color}>
      Indicator
    </Indicator>
  )
}

const meta = {
  title: 'Indicator Configured',
  component: IndicatorDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.indicator.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.indicator.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.indicator.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof IndicatorDemo>

export default meta
type Story = StoryObj<typeof IndicatorDemo>

export const Default: Story = {}
