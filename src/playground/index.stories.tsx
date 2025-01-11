/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from '@/components/button/react.styled.clear.js'
import { createButton } from '@/components/button/react.styled.configured.js'
import { Buttons } from '@/components/buttons/react.clear.js'
import { Icon } from '@/components/icon/react.styled.clear.js'
import { createIcon } from '@/components/icon/react.styled.configured.js'
import SvgIcon from '@/examples/icons/icon1.svg?react'
import { iconsSources } from '@/examples/icons/sources.js'
import { parseUinityConfig } from '@/lib/uinityConfigGeneral.js'
import type { Meta, StoryObj } from '@storybook/react'
import { forwardRef, useEffect, useRef } from 'react'

const { default: uinityConfigRaw } = await import('@/examples/config/uinity.config.json')

const SimpleIcon = forwardRef<SVGSVGElement>((props, ref) => (
  <svg ref={ref} {...props}>
    <circle cx="50" cy="50" r="50" fill="blue" />
  </svg>
))

const uinityConfig = parseUinityConfig({ uinityConfigRaw })

const x = uinityConfig.colors.semantic.y.medium
const y = uinityConfig.colors.semantic.y.weak
const z = uinityConfig.colors.semantic.y.strong

const Playground = () => {
  const ref = useRef(null)
  useEffect(() => {
    console.info('REF', ref.current)
  }, [ref])
  const { Icon: IconConfigured } = createIcon({
    uinityConfig,
    iconsSources,
  })
  const { Button: ButtonConfigured } = createButton({
    uinityConfig,
    Icon: IconConfigured,
  })
  // return (
  //   <ButtonConfigured iconStart="icon2" variant="bigRedWithBlueSmallIcon">
  //     bigRedWithBlueSmallIcon
  //   </ButtonConfigured>
  // )
  return (
    <>
      <IconConfigured name="icon1" xsize="small" />
      <IconConfigured name="icon1" xsize="big" />
      <IconConfigured
        name="icon1"
        variant="redBig"
        // $style={{
        //   byWindowWidthReverse: [
        //     [Infinity, { size: 200 }],
        //     [1200, { size: 50 }],
        //   ],
        // }}
      />
      <Buttons direction="column" ref={ref}>
        {/* <button ref={}>Button0</button> */}
        <Button $style={{ rest: { backgroundColor: 'red' } }} as="button">
          Button1
        </Button>
        <ButtonConfigured iconStart="icon1" xxcolor="blue" xxsize="small">
          ButtonX
        </ButtonConfigured>
        <ButtonConfigured iconStart="icon2" variant="bigRedWithBlueSmallIcon">
          bigRedWithBlueSmallIcon
        </ButtonConfigured>
        <ButtonConfigured iconStart="icon1" variant="smallBlueWithRedBigIcon">
          smallBlueWithRedBigIcon
        </ButtonConfigured>
        <Button $style={{ rest: { backgroundColor: 'blue' } }}>Button2</Button>
      </Buttons>
      <Buttons direction="row">
        <Button $style={{ rest: { backgroundColor: 'red' } }}>Button1</Button>
        <Button $style={{ rest: { backgroundColor: 'blue' } }}>Button2</Button>
      </Buttons>
      <Icon
        $style={{
          color: '#0000ff',
          size: 50,
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
