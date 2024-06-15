import type { ContextMenuItemConfiguredMainProps } from './configured.js'
import { createContextMenuItem } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ContextMenuItem } = createContextMenuItem({ uinityConfig, Icon })

const ContextMenuItemDemo = ({ ...restProps }: ContextMenuItemConfiguredMainProps) => {
  return <ContextMenuItem {...(restProps as any)} />
}

const meta = {
  title: 'ContextMenuItem Configured',
  component: ContextMenuItemDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.contextMenuItem.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.contextMenuItem.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.contextMenuItem.size),
    iconStart: {
      control: 'radio',
      options: ['icon1', 'icon2', undefined],
    },
  },
  args: {
    variant: 'primary',
    color: undefined,
    size: undefined,
    iconStart: undefined,
  },
} satisfies Meta<typeof ContextMenuItemDemo>

export default meta
type Story = StoryObj<typeof ContextMenuItemDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ContextMenuItem',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ContextMenuItem',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    children: 'ContextMenuItem',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    children: 'ContextMenuItem',
  },
}
