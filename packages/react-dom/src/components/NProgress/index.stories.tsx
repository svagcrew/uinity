import type { NProgressStylesProps } from './index.js'
import { createUinityNProgress } from './index.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const { NProgress, NProgressStyles } = createUinityNProgress({ uinityConfig })

const NProgressDemo = (props: NProgressStylesProps) => {
  useEffect(() => {
    setInterval(() => {
      NProgress.start()
      setTimeout(() => {
        NProgress.done()
      }, 3_000)
    }, 4_000)
  }, [])
  return <NProgressStyles {...props} />
}

const meta = {
  title: 'NProgress',
  component: NProgressDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NProgressDemo>

export default meta
type Story = StoryObj<typeof NProgressDemo>

export const Default: Story = {}
