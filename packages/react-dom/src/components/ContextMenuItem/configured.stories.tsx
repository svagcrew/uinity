import { type ContextMenuItemConfiguredMainProps, createContextMenuItem } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ContextMenuItem } = createContextMenuItem({ uinityConfig })

const ContextMenuItemDemo = ({ variant, size, color }: ContextMenuItemConfiguredMainProps) => {
  return (
    <ContextMenuItem variant={variant} size={size} color={color}>
      ContextMenuItem
    </ContextMenuItem>
  )
}

const meta = {
  title: 'ContextMenuItem Configured',
  component: ContextMenuItemDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.contextMenuItem.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.contextMenuItem.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.contextMenuItem.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof ContextMenuItemDemo>

export default meta
type Story = StoryObj<typeof ContextMenuItemDemo>

export const Default: Story = {}
