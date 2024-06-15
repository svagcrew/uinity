import type { ButonLikeSelectMainProps, ButonLikeSelectStyleRoot } from './clear.js'
import { ButonLikeSelect } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const ButonLikeSelectDemo = ({ as, ...restProps }: ButonLikeSelectStyleRoot & ButonLikeSelectMainProps) => {
  return (
    <ButonLikeSelect $style={restProps} as={as}>
      ButonLikeSelect
    </ButonLikeSelect>
  )
}

const meta = {
  title: 'ButonLikeSelect Clear',
  component: ButonLikeSelectDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    background: { control: 'color' },
    childrenBackground: { control: 'color' },
  },
  args: {
    background: '#f00',
    childrenBackground: '#0f0',
  },
} satisfies Meta<typeof ButonLikeSelectDemo>

export default meta
type Story = StoryObj<typeof ButonLikeSelectDemo>

export const Default: Story = {}
