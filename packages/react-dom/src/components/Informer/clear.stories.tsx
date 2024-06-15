import type { InformerMainProps, InformerStyleRoot } from './clear.js'
import { Informer } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const InformerDemo = ({ as, ...restProps }: InformerStyleRoot & InformerMainProps) => {
  return (
    <Informer $style={restProps} as={as}>
      Informer
    </Informer>
  )
}

const meta = {
  title: 'Informer Clear',
  component: InformerDemo,
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
} satisfies Meta<typeof InformerDemo>

export default meta
type Story = StoryObj<typeof InformerDemo>

export const Default: Story = {}
