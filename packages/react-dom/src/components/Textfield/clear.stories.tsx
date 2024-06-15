import type { TextfieldMainProps, TextfieldStyleRoot } from './clear.js'
import { Textfield } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const TextfieldDemo = ({ as, ...restProps }: TextfieldStyleRoot & TextfieldMainProps) => {
  return (
    <Textfield $style={restProps} as={as}>
      Textfield
    </Textfield>
  )
}

const meta = {
  title: 'Textfield Clear',
  component: TextfieldDemo,
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
} satisfies Meta<typeof TextfieldDemo>

export default meta
type Story = StoryObj<typeof TextfieldDemo>

export const Default: Story = {}
