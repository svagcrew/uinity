import { type ControlIconConfiguredMainProps, createControlIcon } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ControlIcon } = createControlIcon({ uinityConfig })

const ControlIconDemo = ({ variant, size, color }: ControlIconConfiguredMainProps) => {
  return (
    <ControlIcon variant={variant} size={size} color={color}>
      ControlIcon
    </ControlIcon>
  )
}

const meta = {
  title: 'ControlIcon Configured',
  component: ControlIconDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.controlIcon.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.controlIcon.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.controlIcon.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof ControlIconDemo>

export default meta
type Story = StoryObj<typeof ControlIconDemo>

export const Default: Story = {}
