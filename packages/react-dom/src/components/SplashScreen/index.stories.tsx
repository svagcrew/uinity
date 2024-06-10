import { createUinitySplashScreen } from './index.js'
import type { Meta, StoryObj } from '@storybook/react'

export const { SplashScreen } = createUinitySplashScreen()

const meta = {
  title: 'SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SplashScreen>

export default meta
type Story = StoryObj<typeof SplashScreen>

export const Default: Story = {}
