/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createLayout } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const { Layout } = createLayout({ uinityConfig })

const LayoutDemo = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <Layout
      modalOpened={modalOpened}
      setModalOpened={setModalOpened}
      headerRender={
        <div
          onClick={() => {
            setModalOpened(!modalOpened)
          }}
        >
          Header
        </div>
      }
      sidebarRender={<div>Sidebar</div>}
      footerRender={<div>Footer</div>}
      modalRender={
        <div>
          <div>Modal</div>
          <button
            onClick={() => {
              setModalOpened(false)
            }}
          >
            Close
          </button>
        </div>
      }
    >
      <div>Children</div>
    </Layout>
  )
}

const meta = {
  title: 'Layout Configured',
  component: LayoutDemo,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LayoutDemo>

export default meta
type Story = StoryObj<typeof LayoutDemo>

export const Default: Story = {
  args: {
    size: 's',
  },
}
