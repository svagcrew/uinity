import type { LoaderMainProps, LoaderStyleRoot } from './clear.js'
import { Loader } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const LoaderDemo = ({ as, ...restProps }: LoaderStyleRoot & LoaderMainProps) => {
  return (
    <Loader $style={restProps} as={as}>
      Loader
    </Loader>
  )
}

const meta = {
  title: 'Loader Clear',
  component: LoaderDemo,
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
} satisfies Meta<typeof LoaderDemo>

export default meta
type Story = StoryObj<typeof LoaderDemo>

export const Default: Story = {}
