import type { TableMainProps, TableStyleRoot } from './clear.js'
import { Table } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const TableDemo = ({ as, ...restProps }: TableStyleRoot & TableMainProps) => {
  return (
    <Table $style={restProps} as={as}>
      Table
    </Table>
  )
}

const meta = {
  title: 'Table Clear',
  component: TableDemo,
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
} satisfies Meta<typeof TableDemo>

export default meta
type Story = StoryObj<typeof TableDemo>

export const Default: Story = {}
