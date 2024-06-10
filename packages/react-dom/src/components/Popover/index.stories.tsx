import type { WithPopoverProps } from './index.js';
import { createUinityPopover } from './index.js'
import { createUinityButtons } from '@/components/Button/index.js'
import { createUinityIcon } from '@/components/Icon/index.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Icon } = createUinityIcon({
  uinityConfig,
})
const { Button } = createUinityButtons({
  uinityConfig,
  Icon,
})
const { WithPopover } = createUinityPopover()

const PopoverDemo = (props: WithPopoverProps) => {
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
  title: 'Popover',
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
