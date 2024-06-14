import '@/lib/cssContainerQueryPolyfill.js'
import type { As, AsProps, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'
import { pick } from 'svag-utils/dist/utils/pick.js'

type BlockStyleCore = {
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
}
type BlockStyleCoreKey = keyof BlockStyleCore
type BlockStyleCoreConfig = BlockStyleCoreKey | BlockStyleCore | Array<BlockStyleCoreKey | BlockStyleCore>
type BlockSpecialProps<TAs extends As = BlockDefaultAs> = {
  /** properties by window size: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  ws?: Array<[number, BlockStyleCoreConfig]>
  /** properties by container size: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  cs?: Array<[number, BlockStyleCoreConfig]>
  /** properties by window size in reverse order: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  wsr?: Array<[number, BlockStyleCoreConfig]>
  /** properties by container size in reverse order: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  csr?: Array<[number, BlockStyleCoreConfig]>
  /** [blockProps1, blockProps2] & > * { ... }  */
  cp?: BlockStyleCoreConfig
  /** as which element */
  as?: TAs
  /** children */
  children?: React.ReactNode
}

type BlockStyleFinal = BlockStyleCore & {
  ws?: Array<[number, BlockStyleCore]>
  cs?: Array<[number, BlockStyleCore]>
  wsr?: Array<[number, BlockStyleCore]>
  csr?: Array<[number, BlockStyleCore]>
  cp?: BlockStyleCore
}

type CheckKeys<T, U extends readonly string[]> = U[number] extends keyof T
  ? keyof T extends U[number]
    ? true
    : never
  : never
const blockSpecialPropsKeys = ['ws', 'cs', 'wsr', 'csr', 'cp', 'as', 'children'] as const
const blockStyleCoreKeys = [
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
] satisfies BlockStyleCoreKey[]
// Just check that all keys exists in this array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkBlockSpecialPropsKeys: CheckKeys<BlockSpecialProps, typeof blockSpecialPropsKeys> = true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkBlockStyleCoreKeys: CheckKeys<BlockStyleCore, typeof blockStyleCoreKeys> = true

export type BlockDefaultAs = 'div'
export type BlockMainProps<TAs extends As = BlockDefaultAs> = BlockStyleCore & BlockSpecialProps<TAs>
export type BlockPropsWithRef<TAs extends As = BlockDefaultAs> = BlockMainProps<TAs> & AsPropsWithRef<TAs>
export type BlockPropsWithoutRef<TAs extends As = BlockDefaultAs> = WithoutRef<BlockPropsWithRef<TAs>>
export type BlockType = <TAs extends As = BlockDefaultAs>(props: BlockPropsWithRef<TAs>) => React.ReactNode

const normalizeBlockCorePropsConfig = (corePropsConfig: BlockStyleCoreConfig): BlockStyleCore => {
  if (isString(corePropsConfig)) {
    return { [corePropsConfig]: true } as BlockStyleCore
  }
  if (!isArray(corePropsConfig)) {
    return corePropsConfig
  }
  const result = {} as BlockStyleCore
  for (const keyOrProps of corePropsConfig) {
    if (isString(keyOrProps)) {
      ;(result as any)[keyOrProps] = true
    } else {
      Object.assign(result, keyOrProps)
    }
  }
  return result
}

const getBlockFinalCss = ($sf: BlockStyleFinal): RuleSet => {
  return css`
    ${toCss({
      display: $sf.df ? 'flex' : $sf.db ? 'block' : $sf.di ? 'inline' : $sf.dn ? 'none' : 'flex',
      flexFlow: $sf.frnw
        ? 'row nowrap'
        : $sf.frw
          ? 'row wrap'
          : $sf.fcnw
            ? 'column nowrap'
            : $sf.fcw
              ? 'column wrap'
              : undefined,
      alignItems: $sf.ac ? 'center' : $sf.afs ? 'flex-start' : $sf.afe ? 'flex-end' : $sf.ast ? 'stretch' : undefined,
      justifyContent: $sf.jc
        ? 'center'
        : $sf.jfs
          ? 'flex-start'
          : $sf.jfe
            ? 'flex-end'
            : $sf.jsb
              ? 'space-between'
              : $sf.jsa
                ? 'space-around'
                : $sf.jst
                  ? 'stretch'
                  : undefined,
      flexGrow: $sf.f11 ? 1 : $sf.f10 ? 1 : $sf.f01 ? 0 : $sf.f00 ? 0 : undefined,
      flexShrink: $sf.f11 ? 1 : $sf.f10 ? 0 : $sf.f01 ? 1 : $sf.f00 ? 0 : undefined,
      flexBasis: $sf.fb
        ? $sf.fb
        : $sf.fb100
          ? '100%'
          : $sf.fba
            ? 'auto'
            : $sf.fb2
              ? '50%'
              : $sf.fb3
                ? '33.3333%'
                : $sf.fb4
                  ? '25%'
                  : $sf.fb5
                    ? '20%'
                    : $sf.fb6
                      ? '16.6667%'
                      : $sf.fb7
                        ? '14.2857%'
                        : $sf.fb8
                          ? '12.5%'
                          : $sf.fb9
                            ? '11.1111%'
                            : $sf.fb10
                              ? '10%'
                              : undefined,
      gap: $sf.g ? $sf.g : undefined,
      rowGap: $sf.rg ? $sf.rg : undefined,
      columnGap: $sf.cg ? $sf.cg : undefined,
      containerType: $sf.ce ? 'inline-size' : undefined,
    })}
    ${toCss($sf.s || {})};
    ${!$sf.cp
      ? ''
      : css`
          & > * {
            ${getBlockFinalCss($sf.cp)}
          }
        `}
    ${($sf.ws || []).map(([, props], index): RuleSet => {
      const prevWindowSize = $sf.ws?.[index - 1]?.[0] ?? 0
      if (prevWindowSize === 0) {
        return css`
          ${getBlockFinalCss(props)}
        `
      } else {
        return css`
          @media (min-width: ${prevWindowSize + 1}px) {
            ${getBlockFinalCss(props)}
          }
        `
      }
    })}
    ${($sf.cs || []).map(([, props], index): RuleSet => {
      const prevContainerSize = $sf.cs?.[index - 1]?.[0] ?? 0
      if (prevContainerSize === 0) {
        return css`
          ${getBlockFinalCss(props)}
        `
      } else {
        return css`
          @container (min-width: ${prevContainerSize + 1}px) {
            & {
              ${getBlockFinalCss(props)}
            }
          }
        `
      }
    })}
    ${($sf.wsr || []).map(([windowSize, props]): RuleSet => {
      if (windowSize === Infinity) {
        return css`
          ${getBlockFinalCss(props)}
        `
      } else {
        return css`
          @media (max-width: ${windowSize}px) {
            ${getBlockFinalCss(props)}
          }
        `
      }
    })}
    ${($sf.csr || []).map(([containerSize, props]): RuleSet => {
      if (containerSize === Infinity) {
        return css`
          ${getBlockFinalCss(props)}
        `
      } else {
        return css`
          @container (max-width: ${containerSize}px) {
            & {
              ${getBlockFinalCss(props)}
            }
          }
        `
      }
    })}
  `
}

const BlockS = styled.div.attrs(mark('BlockS'))<{ $sf: BlockStyleFinal }>`
  ${({ $sf }) => getBlockFinalCss($sf)}
`
export const Block: BlockType = forwardRefIgnoreTypes(
  ({ children, as, ...restProps }: BlockPropsWithoutRef, ref: any) => {
    const $sf = pick(restProps, blockStyleCoreKeys) as BlockStyleFinal
    const htmlElementProps = Object.fromEntries(
      Object.entries(restProps).filter(
        ([k]) => !blockStyleCoreKeys.includes(k as any) && !blockSpecialPropsKeys.includes(k as any)
      )
    ) as AsProps<BlockDefaultAs>

    const normalizedWs = (restProps.ws || [])
      .sort(([a], [b]) => a - b)
      .map(([maxWidth, props]) => {
        return [maxWidth, normalizeBlockCorePropsConfig(props)]
      }) as Array<[number, BlockStyleCore]>
    $sf.ws = normalizedWs

    const normalizedEs = (restProps.cs || [])
      .sort(([a], [b]) => a - b)
      .map(([maxWidth, props]) => {
        return [maxWidth, normalizeBlockCorePropsConfig(props)]
      }) as Array<[number, BlockStyleCore]>
    $sf.cs = normalizedEs

    const normalizedWsr = (restProps.wsr || [])
      .sort(([a], [b]) => b - a)
      .map(([maxWidth, props]) => {
        return [maxWidth, normalizeBlockCorePropsConfig(props)]
      }) as Array<[number, BlockStyleCore]>
    $sf.wsr = normalizedWsr

    const normalizedEsr = (restProps.csr || [])
      .sort(([a], [b]) => b - a)
      .map(([maxWidth, props]) => {
        return [maxWidth, normalizeBlockCorePropsConfig(props)]
      }) as Array<[number, BlockStyleCore]>
    $sf.csr = normalizedEsr

    const normalizedCp = restProps.cp && normalizeBlockCorePropsConfig(restProps.cp)
    $sf.cp = normalizedCp

    return (
      <BlockS {...(htmlElementProps as any)} as={as} ref={ref} $sf={$sf}>
        {children}
      </BlockS>
    )
  }
)
