import { Grid } from '../Grid/clear.js'
import type { Meta, StoryObj } from '@storybook/react'

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
      <Grid
        columnGap={10}
        rowGap={20}
        byContainerSize={[
          [500, 2],
          [600, 3],
          [Infinity, { itemsInRow: 4, columnGap: 20, rowGap: 40 }],
        ]}
      >
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
      <Grid
        byWindowSize={[
          [500, { itemsInRow: 2, columnGap: 10, rowGap: 30 }],
          [600, { itemsInRow: 3, columnGap: 10, rowGap: 30 }],
          [Infinity, { itemsInRow: 4, columnGap: 20, rowGap: 40 }],
        ]}
      >
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
      <Grid
        byWindowSizeReverse={[
          [Infinity, { itemsInRow: 4, columnGap: 20, rowGap: 40 }],
          [600, { itemsInRow: 3, columnGap: 10, rowGap: 30 }],
          [500, { itemsInRow: 2, columnGap: 10, rowGap: 30 }],
        ]}
      >
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>1</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>2</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>3</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>4</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>5</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>6</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>7</div>
        <div style={{ boxSizing: 'border-box', border: '1px solid #ddd' }}>8</div>
      </Grid>
    </div>
  )
}

const meta = {
  title: 'Grid Clear',
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
