import type { DisablerProps } from './index.js'
import { createUinityDisabler } from './index.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Disabler } = createUinityDisabler({ uinityConfig })

const DisablerDemo = (props: DisablerProps) => {
  return <Disabler {...props}>Some Content</Disabler>
}

const meta = {
  title: 'Disabler',
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
  args: {},
} satisfies Meta<typeof DisablerDemo>

export default meta
type Story = StoryObj<typeof DisablerDemo>

export const Default: Story = {}
