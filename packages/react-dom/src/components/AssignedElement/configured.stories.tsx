import { type AssignedElementConfiguredMainProps, createAssignedElement } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { AssignedElement } = createAssignedElement({ uinityConfig })

const AssignedElementDemo = ({ variant, size, color }: AssignedElementConfiguredMainProps) => {
  return (
    <AssignedElement variant={variant} size={size} color={color}>
      AssignedElement
    </AssignedElement>
  )
}

const meta = {
  title: 'AssignedElement Configured',
  component: AssignedElementDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.assignedElement.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.assignedElement.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.assignedElement.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof AssignedElementDemo>

export default meta
type Story = StoryObj<typeof AssignedElementDemo>

export const Default: Story = {}
