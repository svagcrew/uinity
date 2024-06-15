import { type ButonLikeSelectConfiguredMainProps, createButonLikeSelect } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ButonLikeSelect } = createButonLikeSelect({ uinityConfig })

const ButonLikeSelectDemo = ({ variant, size, color }: ButonLikeSelectConfiguredMainProps) => {
  return (
    <ButonLikeSelect variant={variant} size={size} color={color}>
      ButonLikeSelect
    </ButonLikeSelect>
  )
}

const meta = {
  title: 'ButonLikeSelect Configured',
  component: ButonLikeSelectDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.select.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.select.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.select.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof ButonLikeSelectDemo>

export default meta
type Story = StoryObj<typeof ButonLikeSelectDemo>

export const Default: Story = {}
