import type { ControlIconConfiguredMainProps } from './configured.js'
import { createControlIcon } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ControlIcon } = createControlIcon({ uinityConfig, Icon })

const ControlIconDemo = ({ ...restProps }: ControlIconConfiguredMainProps) => {
  return <ControlIcon {...(restProps as any)} />
}

const meta = {
  title: 'ControlIcon Configured',
  component: ControlIconDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.controlIcon.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.controlIcon.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.controlIcon.size),
    // iconStart: {
    //   control: 'radio',
    //   options: ['icon1', 'icon2', undefined],
    // },
  },
  args: {
    variant: 'primary',
    color: undefined,
    size: undefined,
    // iconStart: undefined,
  },
} satisfies Meta<typeof ControlIconDemo>

export default meta
type Story = StoryObj<typeof ControlIconDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    // children: 'ControlIcon',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    // children: 'ControlIcon',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    // children: 'ControlIcon',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    // children: 'ControlIcon',
  },
}
