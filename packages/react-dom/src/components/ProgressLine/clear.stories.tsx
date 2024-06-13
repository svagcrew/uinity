import type { ProgressLineStyleRootProps } from './clear.js'
import { NProgress, ProgressLine } from '@/components/ProgressLine/clear.js'
import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const ProgressLineDemo = (props: ProgressLineStyleRootProps) => {
  useEffect(() => {
    setInterval(() => {
      NProgress.start()
      setTimeout(() => {
        NProgress.done()
      }, 3_000)
    }, 4_000)
  }, [])
  return <ProgressLine $style={props} />
}

const meta = {
  title: 'ProgressLine Clear',
  component: ProgressLineDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
    },
  },
  args: {
    color: '#000',
  },
} satisfies Meta<typeof ProgressLineDemo>

export default meta
type Story = StoryObj<typeof ProgressLineDemo>

export const Default: Story = {}
