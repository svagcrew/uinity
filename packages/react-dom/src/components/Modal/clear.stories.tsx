import type { ModalMainProps, ModalStyleRoot } from './clear.js'
import { Modal } from './clear.js'
import { Button } from '@/components/Button/clear.js'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const ModalDemo = ({ initialOpened, ...props }: { initialOpened: boolean } & ModalStyleRoot & ModalMainProps) => {
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
  title: 'Modal Clear',
  component: ModalDemo,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialOpened: {
      control: 'boolean',
    },
    placement: {
      control: {
        type: 'radio',
      },
      options: [
        'top-center',
        'top-start',
        'top-end',
        'top-stretch',
        'center-center',
        'center-start',
        'center-end',
        'center-stretch',
        'bottom-center',
        'bottom-start',
        'bottom-end',
        'bottom-stretch',
        'stretch-center',
        'stretch-start',
        'stretch-end',
        'stretch-stretch',
      ],
    },
    scrollContainer: {
      control: 'radio',
      options: ['overlay', 'content'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    margin: {
      control: 'text',
    },
    padding: {
      control: 'text',
    },
    closeOnOutsideClick: {
      control: 'boolean',
    },
    overlayColor: {
      control: 'color',
    },
    overlayVisible: {
      control: 'boolean',
    },
    overlayClickableThrough: {
      control: 'boolean',
    },
    lockScroll: {
      control: 'boolean',
    },
  },
  args: {
    initialOpened: true,
    placement: 'center-center',
    scrollContainer: 'overlay',
    width: '500px',
    height: '',
    margin: '15px',
    padding: '30px',
    closeOnOutsideClick: true,
    overlayColor: 'rgba(0, 0, 0, 0.8)',
    overlayVisible: true,
    overlayClickableThrough: false,
    lockScroll: true,
  },
} satisfies Meta<typeof ModalDemo>

export default meta
type Story = StoryObj<typeof ModalDemo>

export const Default: Story = {}
