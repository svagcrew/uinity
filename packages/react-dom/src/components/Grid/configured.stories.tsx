import { createGrid } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'

export const { Grid } = createGrid({
  uinityConfig,
})
const GridDemo = () => {
  return (
    <div style={{ maxWidth: 800, width: '100%', containerType: 'inline-size' }}>
      <Grid itemsInRow={3} columnGap={10} gap={30}>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>1</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>2</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>3</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>4</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>5</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>6</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>7</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>8</div>
      </Grid>
      <hr />
      TODO
    </div>
  )
}

const meta = {
  title: 'Grid Configure',
  component: GridDemo,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof GridDemo>

export default meta
type Story = StoryObj<typeof GridDemo>

export const Default: Story = {}
