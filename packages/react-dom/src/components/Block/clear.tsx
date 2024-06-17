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
  /** display: {value}; */
  d?: string
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

  /** height: 100%; // hf — height-full */
  hf?: boolean
  /** width: 100%; // wf — width-full */
  wf?: boolean

  /** max-width: {value}; */
  mw?: string | number
  /** max-height: {value}; */
  mh?: string | number

  /** margin: {value}; */
  m?: string | number
  /** margin-top: {value} */
  mt?: string | number
  /** margin-right: {value}; (ltr) margin-left: {value}; me — margin-end */
  me?: string | number
  /** margin-bottom: {value}; */
  mb?: string | number
  /** margin-left: {value}; (ltr) margin-right: {value}; ms — margin-start */
  ms?: string | number

  /** padding: {value}; */
  p?: string | number
  /** padding-top: {value} */
  pt?: string | number
  /** padding-right: {value}; (ltr) padding-left: {value}; pe — padding-end */
  pe?: string | number
  /** padding-bottom: {value}; */
  pb?: string | number
  /** padding-left: {value}; (ltr) padding-right: {value}; ps — padding-start */
  ps?: string | number

  /** style: {{ ...cssProperties }}; */
  s?: React.CSSProperties

  /** [blockProps1, blockProps2] & > * { ... }  */
  cp?: BlockStyleCoreConfig
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
}

type CheckKeys<T, U extends readonly string[]> = U[number] extends keyof T
  ? keyof T extends U[number]
    ? true
    : never
  : never
const blockSpecialPropsKeys = ['ws', 'cs', 'wsr', 'csr', 'as', 'children'] as const
const blockStyleCoreKeys = [
  'd',
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
  'hf',
  'wf',
  'mw',
  'mh',
  'm',
  'mt',
  'me',
  'mb',
  'ms',
  'p',
  'pt',
  'pe',
  'pb',
  'ps',
  'ce',
  's',
  'cp',
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
    return { [corePropsConfig]: true } as never as BlockStyleCore
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

const isArrayIncludesSome = <T,>(array1: T[], array2: T[]): boolean => {
  return array2.some((item) => array1.includes(item))
}

const getBlockFinalCss = ($sf: BlockStyleFinal): RuleSet => {
  const keys = Object.keys($sf) as BlockStyleCoreKey[]
  return css`
    ${toCss({
      display: $sf.d
        ? $sf.d
        : $sf.df
          ? 'flex'
          : $sf.db
            ? 'block'
            : $sf.di
              ? 'inline'
              : $sf.dn
                ? 'none'
                : isArrayIncludesSome(
                      [
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
                      ],
                      keys
                    )
                  ? 'flex'
                  : undefined,
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
      height: $sf.hf ? '100%' : undefined,
      width: $sf.wf ? '100%' : undefined,
      maxHeight: $sf.mh ? $sf.mh : undefined,
      maxWidth: $sf.mw ? $sf.mw : undefined,
      margin: $sf.m ? $sf.m : undefined,
      marginTop: $sf.mt ? $sf.mt : undefined,
      marginRight: $sf.me ? $sf.me : undefined,
      marginBottom: $sf.mb ? $sf.mb : undefined,
      marginLeft: $sf.ms ? $sf.ms : undefined,
      padding: $sf.p ? $sf.p : undefined,
      paddingTop: $sf.pt ? $sf.pt : undefined,
      paddingRight: $sf.pe ? $sf.pe : undefined,
      paddingBottom: $sf.pb ? $sf.pb : undefined,
      paddingLeft: $sf.ps ? $sf.ps : undefined,
    })}
    ${toCss($sf.s || {})};
    ${!$sf.cp
      ? ''
      : css`
          & > * {
            ${getBlockFinalCss(normalizeBlockCorePropsConfig($sf.cp))}
          }
        `}
    ${($sf.ws || []).map(([windowSize, props]): RuleSet => {
      if (windowSize === 0) {
        return css`
          ${getBlockFinalCss(props)}
        `
      } else {
        return css`
          @media (min-width: ${windowSize + 1}px) {
            ${getBlockFinalCss(props)}
          }
        `
      }
    })}
    ${($sf.cs || []).map(([containerSize, props]): RuleSet => {
      if (containerSize === 0) {
        return css`
          ${getBlockFinalCss(props)}
        `
      } else {
        return css`
          @container (min-width: ${containerSize + 1}px) {
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
