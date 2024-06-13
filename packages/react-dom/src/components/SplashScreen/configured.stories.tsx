import type { SplashScreenMainProps } from '@/components/SplashScreen/clear.js'
import { createSplashScreen } from '@/components/SplashScreen/configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

export const { SplashScreen } = createSplashScreen({ uinityConfig })

const SplashScreenDemo = (props: SplashScreenMainProps<'div'>) => {
  return <SplashScreen {...props}>123</SplashScreen>
}

const meta = {
  title: 'SplashScreen Configured',
  component: SplashScreenDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
    },
  },
  args: {
    visible: true,
  },
} satisfies Meta<typeof SplashScreenDemo>

export default meta
type Story = StoryObj<typeof SplashScreenDemo>

export const Default: Story = {}
