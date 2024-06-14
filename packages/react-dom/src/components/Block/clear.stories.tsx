/* eslint-disable unicorn/numeric-separators-style */
import { Block } from './clear.js'
import type { Meta, StoryObj } from '@storybook/react'

const BlockDemo = () => {
  return (
    <Block ce db s={{ maxWidth: 500, width: '100%' }}>
      <Block frnw jc>
        <div>flexx</div>
        <div>row</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
        <div>nowrap</div>
      </Block>
      <hr />
      <Block frw>
        <div>flex</div>
        <div>row</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
      </Block>
      <hr />
      <Block frw g="3px 30px">
        <div>flex</div>
        <div>row</div>
        <div>with</div>
        <div>gap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
        <div>wrap</div>
      </Block>
      <hr />
      <Block frnw ac jc>
        <div>flex</div>
        <div>row</div>
        <div>align-items: center</div>
        <div>justify-content: center</div>
      </Block>
      <hr />
      <Block frnw ac jsb>
        <div>flex</div>
        <div>row</div>
        <div>align-items: center</div>
        <div>justify-content: space-between</div>
      </Block>
      <hr />
      <Block frnw ac jsb s={{ background: '#dfffff' }}>
        <div>flex</div>
        <div>row</div>
        <div>with style</div>
      </Block>
      <hr />
      <Block
        frnw
        ac
        jsb
        ws={[
          [600, 'fcnw'],
          [800, ['frnw', { s: { background: 'red' } }, 'jc']],
          [1000, { s: { background: 'green' } }],
          [Infinity, { s: { background: 'blue' } }],
        ]}
      >
        <div>flex</div>
        <div>row</div>
        <div>with style by window width</div>
      </Block>
      <hr />
      <Block
        frnw
        ac
        jsb
        wsr={[
          [Infinity, { s: { background: 'blue' } }],
          [1000, { s: { background: 'green' } }],
          [800, [{ s: { background: 'red' } }, 'jc']],
          [600, 'fcnw'],
        ]}
      >
        <div>flex</div>
        <div>row</div>
        <div>with style by window width</div>
      </Block>
      <hr />
      <Block
        ac
        jsb
        cs={[
          [400, 'fcnw'],
          [430, ['frnw', { s: { background: 'red' } }, 'jc']],
          [460, { s: { background: 'green' } }],
          [Infinity, { s: { background: 'blue' } }],
        ]}
      >
        <div>flex</div>
        <div>row</div>
        <div>with style by container width reverse</div>
      </Block>
      <hr />
      <Block
        ac
        jsb
        frnw
        csr={[
          [Infinity, { s: { background: 'blue' } }],
          [460, { s: { background: 'green' } }],
          [430, [{ s: { background: 'red' } }, 'jc']],
          [400, 'fcnw'],
        ]}
      >
        <div>flex</div>
        <div>row</div>
        <div>with style by container width reverse</div>
      </Block>
      <hr />
      <Block frw as="div" cp={['fb3', { s: { border: '1px solid #ddd', boxSizing: 'border-box' } }]}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </Block>
      <hr />
      <hr />
      <Block as="a" href="#" frw>
        Link
      </Block>
      <hr />
    </Block>
  )
}

const meta = {
  title: 'Block Clear',
  component: BlockDemo,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BlockDemo>

export default meta
type Story = StoryObj<typeof BlockDemo>

export const Default: Story = {}
