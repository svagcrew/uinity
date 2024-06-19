import { createFormItem, type FormItemConfiguredMainProps } from './configured.js'
import { uinityConfig } from '@/stories/uinity.config.js'
import { getArgTypeConfigFromObject } from '@/stories/utils.js'
import type { Meta, StoryObj } from '@storybook/react'

const { FormItem } = createFormItem({ uinityConfig })

const FormItemDemo = ({ variant, size, color }: FormItemConfiguredMainProps) => {
  return (
    <FormItem variant={variant} size={size} color={color}>
      FormItem
    </FormItem>
  )
}

const meta = {
  title: 'FormItem Configured',
  component: FormItemDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...getArgTypeConfigFromObject('variant', uinityConfig.formItem.variant, 'radio', true),
    ...getArgTypeConfigFromObject('color', uinityConfig.formItem.color, 'radio', true),
    ...getArgTypeConfigFromObject('size', uinityConfig.formItem.size, 'radio', true),
  },
  args: {
    variant: undefined,
    color: undefined,
    size: undefined,
  },
} satisfies Meta<typeof FormItemDemo>

export default meta
type Story = StoryObj<typeof FormItemDemo>

export const Default: Story = {}
