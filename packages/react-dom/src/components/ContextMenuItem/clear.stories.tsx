import type { ContextMenuItemMainProps, ContextMenuItemStyleRoot } from './clear.js'
import { ContextMenuItem } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const ContextMenuItemDemo = ({ as, ...restProps }: ContextMenuItemStyleRoot & ContextMenuItemMainProps) => {
  return (
    <ContextMenuItem $style={restProps} as={as}>
      ContextMenuItem
    </ContextMenuItem>
  )
}

const meta = {
  title: 'ContextMenuItem Clear',
  component: ContextMenuItemDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    background: { control: 'color' },
    childrenBackground: { control: 'color' },
  },
  args: {
    background: '#f00',
    childrenBackground: '#0f0',
  },
} satisfies Meta<typeof ContextMenuItemDemo>

export default meta
type Story = StoryObj<typeof ContextMenuItemDemo>

export const Default: Story = {}
