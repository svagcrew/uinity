import type { LinkConfiguredMainProps } from './configured.js'
import { createLink } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Link } = createLink({ uinityConfig, Icon })

const LinkDemo = ({ ...restProps }: LinkConfiguredMainProps) => {
  return <Link {...(restProps as any)} />
}

const meta = {
  title: 'Link Configured',
  component: LinkDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.link.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.link.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.link.size),
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
} satisfies Meta<typeof LinkDemo>

export default meta
type Story = StoryObj<typeof LinkDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Link',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Link',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    children: 'Link',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    children: 'Link',
  },
}
