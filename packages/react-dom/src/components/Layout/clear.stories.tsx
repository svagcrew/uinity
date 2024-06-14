import { Layout } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const LayoutDemo = () => {
  return (
    <Layout headerRender={<div>Header</div>} sidebarRender={<div>Sidebar</div>} footerRender={<div>Footer</div>}>
      <div>Children</div>
    </Layout>
  )
}

const meta = {
  title: 'Layout Clear',
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
  args: {},
}
