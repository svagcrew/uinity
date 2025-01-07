/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { Button } from '@/components/Button/react.clear.js'
import { Buttons } from '@/components/Buttons/react.clear.js'
import { Icon } from '@/components/Icon/react.clear.js'
import { createIcon } from '@/components/Icon/react.configured.js'
import SvgIcon from '@/stories/icon1.svg?react'
import { iconsSources } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'
import { forwardRef, useEffect, useRef } from 'react'

const SimpleIcon = forwardRef<SVGSVGElement>((props, ref) => (
  <svg ref={ref} {...props}>
    <circle cx="50" cy="50" r="50" fill="blue" />
  </svg>
))

const Playground = () => {
  const ref = useRef(null)
  useEffect(() => {
    console.log('REF', ref.current)
  }, [ref])
  const { Icon: IconConfigured } = createIcon({
    uinityConfig: {
      icon: {
        general: {
          size: 48,
          color: '#00ff00',
        },
        settings: {
          xcolor: {
            red: {
              color: '#ff0000',
            },
            blue: {
              color: '#0000ff',
            },
          },
          xsize: {
            small: {
              size: 24,
            },
            big: {
              size: 96,
            },
          },
        },
        variants: {
          redBig: {
            settings: {
              xcolor: 'red',
              xsize: 'big',
            },
          },
          blueSmall: {
            settings: {
              xcolor: 'blue',
              xsize: 'small',
            },
          },
        },
      },
    },
    iconsSources,
  })
  return (
    <>
      <IconConfigured name="icon1" variant="redBig" />
      <Buttons direction="column" ref={ref}>
        {/* <button ref={}>Button0</button> */}
        <Button $style={{ rest: { background: 'red' } }} as="button">
          Button1
        </Button>
        <Button $style={{ rest: { background: 'blue' } }}>Button2</Button>
      </Buttons>
      <Buttons direction="row">
        <Button $style={{ rest: { background: 'red' } }}>Button1</Button>
        <Button $style={{ rest: { background: 'blue' } }}>Button2</Button>
      </Buttons>
      <Icon
        $style={{
          color: '#0000ff',
          size: 100,
        }}
        ref={ref}
        src={SvgIcon}
        // src={<SvgIcon />}
        // src={SimpleIcon}
        // src={<SimpleIcon />}
        // src={'https://www.svgrepo.com/show/19461/url-link.svg'}
        // ref={ref}
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
