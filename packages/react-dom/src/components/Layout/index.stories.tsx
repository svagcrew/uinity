import { createUinityLayout } from './index.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Layout: LayoutOriginal } = createUinityLayout({ uinityConfig })

const Layout: any = () => {
  return (
    <LayoutOriginal
      headerRender={<div>Header</div>}
      sidebarRender={<div>Sidebar</div>}
      footerRender={<div>Footer</div>}
    >
      <div>Children</div>
    </LayoutOriginal>
  )
}

const meta = {
  title: 'Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  args: {
    size: 's',
  },
}
