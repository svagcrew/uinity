import type { ProgressLineStyleRootProps } from './clear.js'
import { createProgressLine } from '@/components/ProgressLine/configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const { NProgress, ProgressLine } = createProgressLine({ uinityConfig })

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
  title: 'ProgressLine Configured',
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
