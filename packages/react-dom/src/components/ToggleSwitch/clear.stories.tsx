import type { ToggleSwitchMainProps, ToggleSwitchStyleRoot } from './clear.js'
import { ToggleSwitch } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const ToggleSwitchDemo = ({ as, ...restProps }: ToggleSwitchStyleRoot & ToggleSwitchMainProps) => {
  return (
    <ToggleSwitch $style={restProps} as={as}>
      ToggleSwitch
    </ToggleSwitch>
  )
}

const meta = {
  title: 'ToggleSwitch Clear',
  component: ToggleSwitchDemo,
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
} satisfies Meta<typeof ToggleSwitchDemo>

export default meta
type Story = StoryObj<typeof ToggleSwitchDemo>

export const Default: Story = {}
