import type { IconStyleRootClear } from '@/components/Icon/config.js'
import type { IconClearMainProps } from '@/components/Icon/react.clear.js'
import SvgIcon from '@/stories/icon1.svg?react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './react.clear.js'

const IconClearDemo = (
  props: IconStyleRootClear &
    IconClearMainProps & {
      mode: 'element' | 'src' | 'component'
    }
) => {
  return (
    <Icon
      $style={{
        color: props.color,
        size: props.size,
      }}
      src={
        props.mode === 'element' ? (
          <SvgIcon />
        ) : props.mode === 'component' ? (
          SvgIcon
        ) : (
          'https://www.svgrepo.com/show/19461/url-link.svg'
        )
      }
    />
  )
}

const meta = {
  title: 'Icon Clear',
  component: IconClearDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['element', 'component', 'src'],
    },
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
  args: {
    mode: 'element',
    size: 24,
    color: '#00f',
  },
} satisfies Meta<typeof IconClearDemo>

export default meta
type Story = StoryObj<typeof IconClearDemo>

export const Default: Story = {
  args: {},
}
