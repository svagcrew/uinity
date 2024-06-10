import '@/lib/cssContainerQueryPolyfill.js'
import { mark } from '@/utils.js'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'
import { camelCaseObjectToCss } from '@uinity/core/dist/utils/other.js'

type BlockGeneralProps = {
  /** display: flex; */
  df?: boolean
  /** display: block; */
  db?: boolean
  /** display: inline; */
  di?: boolean
  /** display: none; */
  dn?: boolean

  /** flex-flow: row nowrap; */
  frnw?: boolean
  /** flex-flow: row wrap; */
  frw?: boolean
  /** flex-flow: column nowrap; */
  fcnw?: boolean
  /** flex-flow: column wrap; */
  fcw?: boolean

  /** align-items: center; */
  ac?: boolean
  /** align-items: flex-start; */
  afs?: boolean
  /** align-items: flex-end; */
  afe?: boolean
  /** align-items: stretch; */
  ast?: boolean

  /** justify-content: center; */
  jc?: boolean
  /** justify-content: flex-start; */
  jfs?: boolean
  /** justify-content: flex-end; */
  jfe?: boolean
  /** justify-content: space-between; */
  jsb?: boolean
  /** justify-content: space-around; */
  jsa?: boolean
  /** justify-content: stretch; */
  jst?: boolean

  /** flex-grow: 1; flex-shrink: 1; */
  f11?: boolean
  /** flex-grow: 1; flex-shrink: 0; */
  f10?: boolean
  /** flex-grow: 0; flex-shrink: 1; */
  f01?: boolean
  /** flex-grow: 0; flex-shrink: 0; */
  f00?: boolean

  /** flex-basis: {value}; */
  fb?: string | number
  /** flex-basis: 100% */
  fb100?: boolean
  /** flex-basis: auto */
  fba?: boolean
  /** flex-basis: 50% */
  fb2?: boolean
  /** flex-basis: 33.3333% */
  fb3?: boolean
  /** flex-basis: 25% */
  fb4?: boolean
  /** flex-basis: 20% */
  fb5?: boolean
  /** flex-basis: 16.6667% */
  fb6?: boolean
  /** flex-basis: 14.2857% */
  fb7?: boolean
  /** flex-basis: 12.5% */
  fb8?: boolean
  /** flex-basis: 11.1111% */
  fb9?: boolean
  /** flex-basis: 10% */
  fb10?: boolean

  /** gap: {value}; */
  g?: string | number
  /** row-gap: {value}; */
  rg?: string | number
  /** column-gap: {value}; */
  cg?: string | number

  /** container-type: inline-size; // ce — container element */
  ce?: boolean

  /** style: {{ ...cssProperties }}; */
  s?: React.CSSProperties

  /** [blockProps1, blockProps2] & > * { ... }  */
  cp?: BlockGeneralProps
}
type ShortGeneralProps = BlockGeneralPropsKey | BlockGeneralProps | Array<BlockGeneralPropsKey | BlockGeneralProps>
type BlockGeneralPropsKey = keyof BlockGeneralProps
type As = keyof JSX.IntrinsicElements
type BlockSpecialProps = {
  /** properties by window size: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  ws?: Array<[number, ShortGeneralProps]>
  /** properties by container size: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  cs?: Array<[number, ShortGeneralProps]>
  /** properties by window size in reverse order: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  wsr?: Array<[number, ShortGeneralProps]>
  /** properties by container size in reverse order: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  csr?: Array<[number, ShortGeneralProps]>
  /** [blockProps1, blockProps2] & > * { ... }  */
  cp?: ShortGeneralProps
  /** as which element */
  as?: As
  /** children */
  children?: React.ReactNode
}
// type BlockSpecialPropsKey = keyof BlockSpecialProps

// add $ to each key
type BlockStyledProps = {
  [K in BlockGeneralPropsKey as `$${string & K}`]: BlockGeneralProps[K]
} & {
  $ws?: Array<[number, BlockGeneralProps]>
  $cs?: Array<[number, BlockGeneralProps]>
  $wsr?: Array<[number, BlockGeneralProps]>
  $csr?: Array<[number, BlockGeneralProps]>
}

type HtmlElementProps<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T]

type BlockProps<TAs extends As> = BlockGeneralProps & BlockSpecialProps & HtmlElementProps<TAs>

type CheckKeys<T, U extends readonly string[]> = U[number] extends keyof T
  ? keyof T extends U[number]
    ? true
    : never
  : never
const specialPropsKeys = ['ws', 'cs', 'wsr', 'csr', 'cp', 'as', 'children'] as const
const generalPropsKeys = [
  'df',
  'db',
  'di',
  'dn',
  'frnw',
  'frw',
  'fcnw',
  'fcw',
  'ac',
  'afs',
  'afe',
  'ast',
  'jc',
  'jfs',
  'jfe',
  'jsb',
  'jsa',
  'jst',
  'f11',
  'f10',
  'f01',
  'f00',
  'fb',
  'fb100',
  'fba',
  'fb2',
  'fb3',
  'fb4',
  'fb5',
  'fb6',
  'fb7',
  'fb8',
  'fb9',
  'fb10',
  'g',
  'rg',
  'cg',
  'ce',
  's',
  'cp',
] satisfies BlockGeneralPropsKey[]
// Just check that all keys exists in this array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkSpecialPropsKeys: CheckKeys<BlockSpecialProps, typeof specialPropsKeys> = true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkGeneralPropsKeys: CheckKeys<BlockGeneralProps, typeof generalPropsKeys> = true

export type BlockType = <TAs extends As>(props: BlockProps<TAs>) => JSX.Element

const generalPropsToStyledProps = (gp: BlockGeneralProps) => {
  return Object.fromEntries(Object.entries(gp).map(([k, v]) => [`$${k}`, v])) as never as BlockStyledProps
}

const shortGeneralPropsToGeneralProps = (
  props: BlockGeneralProps | BlockGeneralPropsKey | Array<BlockGeneralPropsKey | BlockGeneralProps>
): BlockGeneralProps => {
  if (isString(props)) {
    return { [props]: true } as BlockGeneralProps
  }
  if (!isArray(props)) {
    return props
  }
  const result = {} as BlockGeneralProps
  for (const keyOrProps of props) {
    if (isString(keyOrProps)) {
      ;(result as any)[keyOrProps] = true
    } else {
      Object.assign(result, keyOrProps)
    }
  }
  return result
}

const createCssByStyledProps = (sp: BlockStyledProps): RuleSet => {
  return css`
    ${camelCaseObjectToCss({
      display: sp.$df ? 'flex' : sp.$db ? 'block' : sp.$di ? 'inline' : sp.$dn ? 'none' : 'flex',
      flexFlow: sp.$frnw
        ? 'row nowrap'
        : sp.$frw
          ? 'row wrap'
          : sp.$fcnw
            ? 'column nowrap'
            : sp.$fcw
              ? 'column wrap'
              : undefined,
      alignItems: sp.$ac ? 'center' : sp.$afs ? 'flex-start' : sp.$afe ? 'flex-end' : sp.$ast ? 'stretch' : undefined,
      justifyContent: sp.$jc
        ? 'center'
        : sp.$jfs
          ? 'flex-start'
          : sp.$jfe
            ? 'flex-end'
            : sp.$jsb
              ? 'space-between'
              : sp.$jsa
                ? 'space-around'
                : sp.$jst
                  ? 'stretch'
                  : undefined,
      flexGrow: sp.$f11 ? 1 : sp.$f10 ? 1 : sp.$f01 ? 0 : sp.$f00 ? 0 : undefined,
      flexShrink: sp.$f11 ? 1 : sp.$f10 ? 0 : sp.$f01 ? 1 : sp.$f00 ? 0 : undefined,
      flexBasis: sp.$fb
        ? sp.$fb
        : sp.$fb100
          ? '100%'
          : sp.$fba
            ? 'auto'
            : sp.$fb2
              ? '50%'
              : sp.$fb3
                ? '33.3333%'
                : sp.$fb4
                  ? '25%'
                  : sp.$fb5
                    ? '20%'
                    : sp.$fb6
                      ? '16.6667%'
                      : sp.$fb7
                        ? '14.2857%'
                        : sp.$fb8
                          ? '12.5%'
                          : sp.$fb9
                            ? '11.1111%'
                            : sp.$fb10
                              ? '10%'
                              : undefined,
      gap: sp.$g ? sp.$g : undefined,
      rowGap: sp.$rg ? sp.$rg : undefined,
      columnGap: sp.$cg ? sp.$cg : undefined,
      containerType: sp.$ce ? 'inline-size' : undefined,
    })}
    ${camelCaseObjectToCss(sp.$s || {})};
    ${!sp.$cp
      ? ''
      : css`
          & > * {
            ${createCssByStyledProps(generalPropsToStyledProps(sp.$cp))}
          }
        `}
    ${(sp.$ws || []).map(([, props], index): RuleSet => {
      const prevWindowSize = sp.$ws?.[index - 1]?.[0] ?? 0
      if (prevWindowSize === 0) {
        return css`
          ${createCssByStyledProps(generalPropsToStyledProps(props))}
        `
      } else {
        return css`
          @media (min-width: ${prevWindowSize + 1}px) {
            ${createCssByStyledProps(generalPropsToStyledProps(props))}
          }
        `
      }
    })}
    ${(sp.$cs || []).map(([, props], index): RuleSet => {
      const prevContainerSize = sp.$cs?.[index - 1]?.[0] ?? 0
      if (prevContainerSize === 0) {
        return css`
          ${createCssByStyledProps(generalPropsToStyledProps(props))}
        `
      } else {
        return css`
          @container (min-width: ${prevContainerSize + 1}px) {
            & {
              ${createCssByStyledProps(generalPropsToStyledProps(props))}
            }
          }
        `
      }
    })}
    ${(sp.$wsr || []).map(([windowSize, props]): RuleSet => {
      if (windowSize === Infinity) {
        return css`
          ${createCssByStyledProps(generalPropsToStyledProps(props))}
        `
      } else {
        return css`
          @media (max-width: ${windowSize}px) {
            ${createCssByStyledProps(generalPropsToStyledProps(props))}
          }
        `
      }
    })}
    ${(sp.$csr || []).map(([containerSize, props]): RuleSet => {
      if (containerSize === Infinity) {
        return css`
          ${createCssByStyledProps(generalPropsToStyledProps(props))}
        `
      } else {
        return css`
          @container (max-width: ${containerSize}px) {
            & {
              ${createCssByStyledProps(generalPropsToStyledProps(props))}
            }
          }
        `
      }
    })}
  `
}

export const createUinityBlock = (): {
  Block: BlockType
} => {
  const BlockS = styled.div.attrs(mark('BlockS'))<BlockStyledProps>`
    ${(sp) => createCssByStyledProps(sp)}
  `
  const Block: BlockType = ({ children, ...restProps }) => {
    const sp = generalPropsToStyledProps(restProps)
    const htmlElementProps = Object.fromEntries(
      Object.entries(restProps).filter(
        ([k]) => !generalPropsKeys.includes(k as any) && !specialPropsKeys.includes(k as any)
      )
    ) as HtmlElementProps<As>

    const normalizedWs = (restProps.ws || [])
      .sort(([a], [b]) => a - b)
      .map(([maxWidth, props]) => {
        return [maxWidth, shortGeneralPropsToGeneralProps(props)]
      }) as Array<[number, BlockGeneralProps]>
    sp.$ws = normalizedWs

    const normalizedEs = (restProps.cs || [])
      .sort(([a], [b]) => a - b)
      .map(([maxWidth, props]) => {
        return [maxWidth, shortGeneralPropsToGeneralProps(props)]
      }) as Array<[number, BlockGeneralProps]>
    sp.$cs = normalizedEs

    const normalizedWsr = (restProps.wsr || [])
      .sort(([a], [b]) => b - a)
      .map(([maxWidth, props]) => {
        return [maxWidth, shortGeneralPropsToGeneralProps(props)]
      }) as Array<[number, BlockGeneralProps]>
    sp.$wsr = normalizedWsr

    const normalizedEsr = (restProps.csr || [])
      .sort(([a], [b]) => b - a)
      .map(([maxWidth, props]) => {
        return [maxWidth, shortGeneralPropsToGeneralProps(props)]
      }) as Array<[number, BlockGeneralProps]>
    sp.$csr = normalizedEsr

    const normalizedCp = restProps.cp && shortGeneralPropsToGeneralProps(restProps.cp)
    sp.$cp = normalizedCp

    return (
      <BlockS as={restProps.as || 'div'} {...sp} {...(htmlElementProps as any)}>
        {children}
      </BlockS>
    )
  }
  return {
    Block: Block as BlockType,
  }
}
