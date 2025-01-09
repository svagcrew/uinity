/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from '@/components/button/react.clear.js'
import { createButton } from '@/components/button/react.configured.js'
import { Buttons } from '@/components/buttons/react.clear.js'
import { Icon } from '@/components/icon/react.clear.js'
import { createIcon } from '@/components/icon/react.configured.js'
import { parseUinityConfig, type UinityConfigFull } from '@/lib/unintyConfig.js'
import SvgIcon from '@/stories/icon1.svg?react'
import { iconsSources } from '@/stories/uinity.config.js'
import type { Meta, StoryObj } from '@storybook/react'
import { forwardRef, useEffect, useRef } from 'react'

const SimpleIcon = forwardRef<SVGSVGElement>((props, ref) => (
  <svg ref={ref} {...props}>
    <circle cx="50" cy="50" r="50" fill="blue" />
  </svg>
))

const uinityConfig = parseUinityConfig({
  breakSizes: {
    big: 1200,
    small: 1000,
  },
  colors: {
    base: {
      neutral: {
        50: { light: '#999999', dark: '#dddddd' },
        70: { light: '#cccccc', dark: '#eeeeee' },
        100: { light: '#000000', dark: '#ffffff' },
      },
      red: {
        50: '#990000',
        70: '#cc0000',
        100: '#ff0000',
      },
      blue: {
        50: '#000099',
        70: '#0000cc',
        100: '#0000ff',
      },
      green: {
        50: '#009900',
        70: '#00cc00',
        100: '#00ff00',
      },
    },
    semantic: {
      x: {
        nice: '#ff0000',
        bad: '#00ff00',
      },
      y: {
        strong: { pointer: '$.colors.base.red.100' as const },
        medium: { pointer: '$.colors.base.neutral.100' as const },
        weak: '#ff00ff',
      },
    },
  },
  icon: {
    general: {
      // size: 48,
      // color: '#00ff00',
    },
    settings: {
      xcolor: {
        red: {
          color: '#ff0000',
        },
        blue: {
          color: '#0000ff',
        },
        green: {
          color: '#00ff00',
        },
      },
      xsize: {
        small: {
          size: 24,
          // byWindowWidth: [
          //   [0, { size: 12 }],
          //   [1000, { size: 24 }],
          //   [1200, { size: 32 }],
          // ],
        },
        big: {
          size: 150,
          // byWindowWidthReverse: [
          //   [Infinity, { size: 96 }],
          //   // [1200, { size: 48 }],
          //   ['big', { size: 48 }],
          //   [1000, { size: 12 }],
          // ],
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
      greenBig: {
        settings: {
          xcolor: 'green',
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
  button: {
    general: {
      rest: {
        textColor: '#fff',
      },
    },
    settings: {
      xxcolor: {
        red: {
          rest: {
            backgroundColor: '#ff0000',
          },
          hover: {
            backgroundColor: '#aa0000',
          },
        },
        blue: {
          rest: {
            backgroundColor: '#0000ff',
          },
          hover: {
            backgroundColor: '#0000aa',
          },
        },
      },
      xxsize: {
        small: {
          rest: {
            textSize: 24,
            iconSize: 24,
          },
        },
        big: {
          rest: {
            textSize: 96,
            iconSize: 96,
          },
          byWindowWidthReverse: [
            [Infinity, { rest: { textSize: 96, iconSize: 96 } }],
            // [1200, { size: 48 }],
            ['big', { rest: { textSize: 48, iconSize: 48 } }],
            [1000, { rest: { textSize: 12, iconSize: 12 } }],
          ],
        },
      },
    },
    variants: {
      bigRedWithBlueSmallIcon: {
        // settings: {
        //   xxcolor: 'red',
        //   xxsize: 'big',
        // },
        overrides: {
          rest: {
            iconVariant: 'blueSmall',
            backgroundColor: '#ff0000',
            textSize: 98,
          },
          byWindowWidthReverse: [
            [Infinity, { rest: { textSize: 97, iconSize: 96 } }],
            // [1200, { size: 48 }],
            ['big', { rest: { iconVariant: 'greenBig', textSize: 48 } }],
            [1000, { rest: { textSize: 12, iconSize: 12 } }],
          ],
        },
      },
      smallBlueWithRedBigIcon: {
        // settings: {
        //   xxcolor: 'blue',
        //   xxsize: 'small',
        // },
        overrides: {
          rest: {
            iconVariant: 'redBig',
            backgroundColor: '#0000ff',
            textSize: 24,
          },
          hover: {
            iconVariant: 'greenBig',
          },
        },
      },
    },
  },
})

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
