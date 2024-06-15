import { createTab, type TabConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Tab } = createTab({ uinityConfig })

const TabDemo = ({ variant, size, color }: TabConfiguredMainProps) => {
  return (
    <Tab variant={variant} size={size} color={color}>
      Tab
    </Tab>
  )
}

const meta = {
  title: 'Tab Configured',
  component: TabDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.tab.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.tab.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.tab.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof TabDemo>

export default meta
type Story = StoryObj<typeof TabDemo>

export const Default: Story = {}
