import { createLoader,type LoaderConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { Loader } = createLoader({ uinityConfig })

const LoaderDemo = ({ variant, size, color }: LoaderConfiguredMainProps) => {
  return (
    <Loader variant={variant} size={size} color={color}>
      Loader
    </Loader>
  )
}

const meta = {
  title: 'Loader Configured',
  component: LoaderDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.loader.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.loader.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.loader.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof LoaderDemo>

export default meta
type Story = StoryObj<typeof LoaderDemo>

export const Default: Story = {}
