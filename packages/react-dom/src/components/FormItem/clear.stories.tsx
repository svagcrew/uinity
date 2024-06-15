import type { FormItemMainProps, FormItemStyleRoot } from './clear.js'
import { FormItem } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const FormItemDemo = ({ as, ...restProps }: FormItemStyleRoot & FormItemMainProps) => {
  return (
    <FormItem $style={restProps} as={as}>
      FormItem
    </FormItem>
  )
}

const meta = {
  title: 'FormItem Clear',
  component: FormItemDemo,
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
} satisfies Meta<typeof FormItemDemo>

export default meta
type Story = StoryObj<typeof FormItemDemo>

export const Default: Story = {}
