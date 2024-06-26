import type { ButtonConfiguredMainProps } from './configured.js'
import { createButton } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Button } = createButton({ uinityConfig, Icon })

const ButtonDemo = ({ ...restProps }: ButtonConfiguredMainProps) => {
  return <Button {...(restProps as any)} />
}

const meta = {
  title: 'Button Configured',
  component: ButtonDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.button.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.button.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.button.size),
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
} satisfies Meta<typeof ButtonDemo>

export default meta
type Story = StoryObj<typeof ButtonDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    children: 'Button',
  },
}
