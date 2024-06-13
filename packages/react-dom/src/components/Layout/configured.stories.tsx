import { createLayout } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Layout } = createLayout({ uinityConfig })

const LayoutDemo = () => {
  return (
    <Layout headerRender={<div>Header</div>} sidebarRender={<div>Sidebar</div>} footerRender={<div>Footer</div>}>
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
