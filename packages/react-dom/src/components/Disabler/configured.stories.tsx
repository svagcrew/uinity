import { createDisabler } from '../Disabler/configured.js'
import type { DisablerMainProps } from './clear.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Disabler } = createDisabler({ uinityConfig })

const DisablerDemo = (props: DisablerMainProps) => {
  return <Disabler {...props}>Some Content</Disabler>
}

const meta = {
  title: 'Disabler Configured',
  component: DisablerDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    disabled: true,
  },
} satisfies Meta<typeof DisablerDemo>

export default meta
type Story = StoryObj<typeof DisablerDemo>

export const Default: Story = {}
