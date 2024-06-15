import { createTable, type TableConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Table } = createTable({ uinityConfig })

const TableDemo = ({ variant, size, color }: TableConfiguredMainProps) => {
  return (
    <Table variant={variant} size={size} color={color}>
      Table
    </Table>
  )
}

const meta = {
  title: 'Table Configured',
  component: TableDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.table.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.table.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.table.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof TableDemo>

export default meta
type Story = StoryObj<typeof TableDemo>

export const Default: Story = {}
