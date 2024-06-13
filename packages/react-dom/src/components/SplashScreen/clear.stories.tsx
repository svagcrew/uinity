import type { SplashScreenMainProps } from '@/components/SplashScreen/clear.js'
import { SplashScreen } from '@/components/SplashScreen/clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const SplashScreenDemo = (props: SplashScreenMainProps<'div'>) => {
  return <SplashScreen {...props}>123</SplashScreen>
}

const meta = {
  title: 'SplashScreen Clear',
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
