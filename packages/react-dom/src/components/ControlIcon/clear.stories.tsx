import { ControlIcon } from './clear.js'
import SvgIcon from '@/stories/icon1.svg?react'
import type { Meta, StoryObj } from '@storybook/react'

const ControlIconClearDemo = (props: {
  isDisabled?: boolean
  restBackground?: string
  restTextColor?: string
  restIconColor?: string
  hoverBackground?: string
  hoverTextColor?: string
  hoverIconColor?: string
  disabledBackground?: string
  disabledTextColor?: string
  disabledIconColor?: string
}) => {
  return (
    <ControlIcon
      as="a"
      href="#"
      disabled={props.isDisabled}
      $style={{
        rest: {
          background: props.restBackground,
          textColor: props.restTextColor,
          iconColor: props.restIconColor,
        },
        hover: {
          background: props.hoverBackground,
          textColor: props.hoverTextColor,
          iconColor: props.hoverIconColor,
        },
        disabled: {
          background: props.disabledBackground,
          textColor: props.disabledTextColor,
          iconColor: props.disabledIconColor,
        },
      }}
      src={<SvgIcon />}
    />
  )
}

const meta = {
  title: 'ControlIcon Clear',
  component: ControlIconClearDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    restBackground: {
      control: 'color',
    },
    restTextColor: {
      control: 'color',
    },
    restIconColor: {
      control: 'color',
    },
    hoverBackground: {
      control: 'color',
    },
    hoverTextColor: {
      control: 'color',
    },
    hoverIconColor: {
      control: 'color',
    },
    disabledBackground: {
      control: 'color',
    },
    disabledTextColor: {
      control: 'color',
    },
    disabledIconColor: {
      control: 'color',
    },
  },
  args: {
    isDisabled: false,
    restBackground: '#00f',
    restTextColor: '#fff',
    restIconColor: '#fff',
    hoverBackground: '#f00',
    hoverTextColor: '#0f0',
    hoverIconColor: '#0f0',
    disabledBackground: '#888',
    disabledTextColor: '#ccc',
    disabledIconColor: '#ccc',
  },
} satisfies Meta<typeof ControlIconClearDemo>

export default meta
type Story = StoryObj<typeof ControlIconClearDemo>

export const Default: Story = {
  args: {},
}
