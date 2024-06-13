import type { WithPopoverProps } from './index.js'
import { createPopover } from './index.js'
import { createButton } from '@/components/Button/configured.js'
import { createIcon } from '@/components/Icon/configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Icon } = createIcon({
  uinityConfig,
})
const { Button } = createButton({
  uinityConfig,
  Icon,
})
const { WithPopover } = createPopover()

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
