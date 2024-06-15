import { createInformer,type InformerConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Informer } = createInformer({ uinityConfig })

const InformerDemo = ({ variant, size, color }: InformerConfiguredMainProps) => {
  return (
    <Informer variant={variant} size={size} color={color}>
      Informer
    </Informer>
  )
}

const meta = {
  title: 'Informer Configured',
  component: InformerDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.informer.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.informer.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.informer.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof InformerDemo>

export default meta
type Story = StoryObj<typeof InformerDemo>

export const Default: Story = {}
