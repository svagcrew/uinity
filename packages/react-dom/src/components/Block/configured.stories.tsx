import { createBlock } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

export const { Block } = createBlock({ uinityConfig })
const BlockDemo = () => {
  return (
    <Block ce db s={{ maxWidth: 500, width: '100%' }}>
      <Block frw g="3px 30px">
        <div>flex</div>
        <div>row</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
      </Block>
      <hr />
      TODO
    </Block>
  )
}

const meta = {
  title: 'Block Configured',
  component: BlockDemo,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BlockDemo>

export default meta
type Story = StoryObj<typeof BlockDemo>

export const Default: Story = {}
