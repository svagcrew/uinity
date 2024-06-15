import { createDivider,type DividerConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Divider } = createDivider({ uinityConfig })

const DividerDemo = ({ variant, size, color }: DividerConfiguredMainProps) => {
  return (
    <Divider variant={variant} size={size} color={color}>
      Divider
    </Divider>
  )
}

const meta = {
  title: 'Divider Configured',
  component: DividerDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.divider.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.divider.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.divider.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof DividerDemo>

export default meta
type Story = StoryObj<typeof DividerDemo>

export const Default: Story = {}
