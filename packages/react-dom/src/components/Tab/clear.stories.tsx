import type { TabMainProps, TabStyleRoot } from './clear.js'
import { Tab } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const TabDemo = ({ as, ...restProps }: TabStyleRoot & TabMainProps) => {
  return (
    <Tab $style={restProps} as={as}>
      Tab
    </Tab>
  )
}

const meta = {
  title: 'Tab Clear',
  component: TabDemo,
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
} satisfies Meta<typeof TabDemo>

export default meta
type Story = StoryObj<typeof TabDemo>

export const Default: Story = {}
