import { type LabeledValuesConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

// const { LabeledValue } = createLabeledValue({ uinityConfig })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LabeledValueDemo = ({ variant, size, color }: LabeledValuesConfiguredMainProps) => {
  return null
  // <LabeledValue variant={variant} size={size} color={color}>
  //   LabeledValue
  // </LabeledValue>
}

const meta = {
  title: 'LabeledValue Configured',
  component: LabeledValueDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.labeledValue.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.labeledValue.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.labeledValue.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof LabeledValueDemo>

export default meta
type Story = StoryObj<typeof LabeledValueDemo>

export const Default: Story = {}
