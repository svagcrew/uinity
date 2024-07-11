import type { RadiobuttonMainProps, RadiobuttonStyleRoot } from './clear.js'
import { Radiobutton } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const RadiobuttonDemo = ({ as, ...restProps }: RadiobuttonStyleRoot & RadiobuttonMainProps) => {
  return <Radiobutton $style={restProps} as={as} label="Radiobutton" />
}

const meta = {
  title: 'Radiobutton Clear',
  component: RadiobuttonDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // background: { control: 'color' },
    // childrenBackground: { control: 'color' },
  },
  args: {
    // background: '#f00',
    // childrenBackground: '#0f0',
  },
} satisfies Meta<typeof RadiobuttonDemo>

export default meta
type Story = StoryObj<typeof RadiobuttonDemo>

export const Default: Story = {}
