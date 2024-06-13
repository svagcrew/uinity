import { WithPopover, type WithPopoverMainProps } from './clear.js'
import { Button } from '@/components/Button/clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const PopoverDemo = (props: WithPopoverMainProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-start',
      }}
    >
      <WithPopover
        {...props}
        children={<Button>Trigger Button</Button>}
        popover={
          <div style={{ background: 'red' }}>
            Popover
            <br />
            Content
          </div>
        }
      />
    </div>
  )
}

const meta = {
  title: 'Popover Clear',
  component: PopoverDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: 'boolean',
    },
    placement: {
      control: {
        type: 'select',
        options: [
          'top',
          'top-start',
          'top-end',
          'right',
          'right-start',
          'right-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
        ],
      },
    },
    offset: {
      control: 'number',
    },
    shiftPadding: {
      control: 'number',
    },
    flipPadding: {
      control: 'number',
    },
  },
  args: {
    initialOpened: true,
    placement: 'bottom-start',
    offset: 5,
    shiftPadding: 0,
    flipPadding: 5,
  },
} satisfies Meta<typeof PopoverDemo>

export default meta
type Story = StoryObj<typeof PopoverDemo>

export const Default: Story = {}
