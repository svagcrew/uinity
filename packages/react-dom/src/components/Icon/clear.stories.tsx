import { Icon } from './clear.js'
import type { IconMainProps, IconStyleRoot } from '@/components/Icon/clear.js'
import SvgIcon from '@/stories/icon1.svg?react'
import type { Meta, StoryObj } from '@storybook/react'

const IconClearDemo = (
  props: IconStyleRoot &
    IconMainProps & {
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
