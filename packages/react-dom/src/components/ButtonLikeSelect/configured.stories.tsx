import type { ButtonLikeSelectConfiguredMainProps } from './configured.js'
import { createButtonLikeSelect } from './configured.js'
import { Icon } from '@/components/Icon/configured.stories.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { ButtonLikeSelect } = createButtonLikeSelect({ uinityConfig, Icon, dropdownIconSrc: '' })

const ButtonLikeSelectDemo = ({ ...restProps }: ButtonLikeSelectConfiguredMainProps) => {
  return <ButtonLikeSelect {...(restProps as any)} />
}

const meta = {
  title: 'ButtonLikeSelect Configured',
  component: ButtonLikeSelectDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.select.variant),
    ...getArgTypeConfigFromObject('color', uinityConfig.select.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.select.size),
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
} satisfies Meta<typeof ButtonLikeSelectDemo>

export default meta
type Story = StoryObj<typeof ButtonLikeSelectDemo>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ButtonLikeSelect',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ButtonLikeSelect',
  },
}

export const Large: Story = {
  args: {
    size: 'l',
    children: 'ButtonLikeSelect',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
    children: 'ButtonLikeSelect',
  },
}
