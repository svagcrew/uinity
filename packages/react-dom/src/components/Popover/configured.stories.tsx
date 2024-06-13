import { createPopover } from './configured.js'
import { Button } from '@/components/Button/clear.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { WithPopover } = createPopover({ uinityConfig })

const PopoverDemo = (props: any) => {
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
  title: 'Popover Configured',
  component: PopoverDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PopoverDemo>

export default meta
type Story = StoryObj<typeof PopoverDemo>

export const Default: Story = {}
