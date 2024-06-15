import { createRadiobutton,type RadiobuttonConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Radiobutton } = createRadiobutton({ uinityConfig })

const RadiobuttonDemo = ({ variant, size, color }: RadiobuttonConfiguredMainProps) => {
  return (
    <Radiobutton variant={variant} size={size} color={color}>
      Radiobutton
    </Radiobutton>
  )
}

const meta = {
  title: 'Radiobutton Configured',
  component: RadiobuttonDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.radiobutton.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.radiobutton.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.radiobutton.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof RadiobuttonDemo>

export default meta
type Story = StoryObj<typeof RadiobuttonDemo>

export const Default: Story = {}
