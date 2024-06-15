import type { AssignedElementMainProps, AssignedElementStyleRoot } from './clear.js'
import { AssignedElement } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const AssignedElementDemo = ({ as, ...restProps }: AssignedElementStyleRoot & AssignedElementMainProps) => {
  return (
    <AssignedElement $style={restProps} as={as}>
      AssignedElement
    </AssignedElement>
  )
}

const meta = {
  title: 'AssignedElement Clear',
  component: AssignedElementDemo,
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
} satisfies Meta<typeof AssignedElementDemo>

export default meta
type Story = StoryObj<typeof AssignedElementDemo>

export const Default: Story = {}
