/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Icon } from '@/components/Icon/react.clear.js'
import SvgIcon from '@/stories/icon1.svg?react'
import type { Meta, StoryObj } from '@storybook/react'
import { forwardRef, useEffect, useRef } from 'react'

const SimpleIcon = forwardRef<SVGSVGElement>((props, ref) => (
  <svg ref={ref} {...props}>
    <circle cx="50" cy="50" r="50" fill="blue" />
  </svg>
))

const Playground = () => {
  const ref = useRef(undefined)
  useEffect(() => {
    console.log(ref.current)
  }, [ref])
  return (
    <>
      <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        src={SvgIcon}
        // src={<SvgIcon />}
        // src={SimpleIcon}
        // src={<SimpleIcon />}
        // src={'https://www.svgrepo.com/show/19461/url-link.svg'}
        ref={ref}
      />
      {/* <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        src={SvgIcon}
        ref={ref}
      />
      <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        src={<SvgIcon />}
        ref={ref}
      />
      <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        src={SimpleIcon}
        ref={ref}
      />
      <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        src={<SimpleIcon />}
        ref={ref}
      />
      <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        src={'https://www.svgrepo.com/show/19461/url-link.svg'}
        ref={ref}
      /> */}
    </>
  )
}

const meta = {
  title: 'Playground',
  component: Playground,
} satisfies Meta<typeof Playground>

export default meta
type Story = StoryObj<typeof Playground>

export const Default: Story = {
  args: {},
}
