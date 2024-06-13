import { createModal } from './configured.js'
import { Button } from '@/components/Button/clear.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const { Modal } = createModal({ uinityConfig })

const ModalDemo = ({ initialOpened, ...props }: { initialOpened: boolean }) => {
  const [opened, setOpened] = useState(initialOpened)
  return (
    <div>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <br />
      <br />
      <Button onClick={() => console.info('Just log')}>Log Something</Button>
      <Modal
        opened={opened}
        setOpened={setOpened}
        $style={{
          ...props,
          wsr: [
            [
              400,
              {
                padding: 0,
              },
            ],
            [
              500,
              {
                padding: 5,
              },
            ],
          ],
        }}
      >
        <div
          style={
            {
              // margin: '15px',
              // borderRadius: '4px',
            }
          }
        >
          {/* <hr />
          1
          <hr />
          2
          <hr />
          3
          <hr />
          4
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr /> */}
          <hr />
          <hr />
          <hr />
          <hr />
          Modal Content 123 123 123 123 123
          <br />
          <Button onClick={() => setOpened(false)}>Close Modal</Button>
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          {/* <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr /> */}
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </Modal>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  )
}

const meta = {
  title: 'Modal Configured',
  component: ModalDemo,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ModalDemo>

export default meta
type Story = StoryObj<typeof ModalDemo>

export const Default: Story = {}
