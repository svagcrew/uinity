import '@/lib/cssContainerQueryPolyfill.js'
import type { As, AsProps, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'
import type { RuleSet } from 'styled-components'
import { css, styled } from 'styled-components'
import { pick } from 'svag-utils/dist/utils/pick.js'

type BlockStyleCoreProps = {
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
type BlockStyleCorePropsKey = keyof BlockStyleCoreProps
type BlockCorePropsConfig =
  | BlockStyleCorePropsKey
  | BlockStyleCoreProps
  | Array<BlockStyleCorePropsKey | BlockStyleCoreProps>
type BlockSpecialProps<TAs extends As = BlockDefaultAs> = {
  /** properties by window size: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  ws?: Array<[number, BlockCorePropsConfig]>
  /** properties by container size: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  cs?: Array<[number, BlockCorePropsConfig]>
  /** properties by window size in reverse order: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  wsr?: Array<[number, BlockCorePropsConfig]>
  /** properties by container size in reverse order: [[maxWidth1, blockProps], [maxWidth2, blockProps], ...] */
  csr?: Array<[number, BlockCorePropsConfig]>
  /** [blockProps1, blockProps2] & > * { ... }  */
  cp?: BlockCorePropsConfig
  /** as which element */
  as?: TAs
  /** children */
  children?: React.ReactNode
}

type BlockStyleRootProps = BlockStyleCoreProps & {
  ws?: Array<[number, BlockStyleCoreProps]>
  cs?: Array<[number, BlockStyleCoreProps]>
  wsr?: Array<[number, BlockStyleCoreProps]>
  csr?: Array<[number, BlockStyleCoreProps]>
  cp?: BlockStyleCoreProps
}

type CheckKeys<T, U extends readonly string[]> = U[number] extends keyof T
  ? keyof T extends U[number]
    ? true
    : never
  : never
const blockStyleSpecialPropsKeys = ['ws', 'cs', 'wsr', 'csr', 'cp', 'as', 'children'] as const
const blockStyleCorePropsKeys = [
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
] satisfies BlockStyleCorePropsKey[]
// Just check that all keys exists in this array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkBlockSpecialPropsKeys: CheckKeys<BlockSpecialProps, typeof blockStyleSpecialPropsKeys> = true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkBlockStyleCorePropsKeys: CheckKeys<BlockStyleCoreProps, typeof blockStyleCorePropsKeys> = true

export type BlockDefaultAs = 'div'
export type BlockMainProps<TAs extends As = BlockDefaultAs> = BlockStyleCoreProps & BlockSpecialProps<TAs>
export type BlockPropsWithRef<TAs extends As = BlockDefaultAs> = BlockMainProps<TAs> & AsPropsWithRef<TAs>
export type BlockPropsWithoutRef<TAs extends As = BlockDefaultAs> = WithoutRef<BlockPropsWithRef<TAs>>
export type BlockType = <TAs extends As = BlockDefaultAs>(props: BlockPropsWithRef<TAs>) => React.ReactElement | null

const normalizeBlockCorePropsConfig = (corePropsConfig: BlockCorePropsConfig): BlockStyleCoreProps => {
  if (isString(corePropsConfig)) {
    return { [corePropsConfig]: true } as BlockStyleCoreProps
  }
  if (!isArray(corePropsConfig)) {
    return corePropsConfig
  }
  const result = {} as BlockStyleCoreProps
  for (const keyOrProps of corePropsConfig) {
    if (isString(keyOrProps)) {
      ;(result as any)[keyOrProps] = true
    } else {
      Object.assign(result, keyOrProps)
    }
  }
  return result
}

const getBlockCoreCss = ($style: BlockStyleRootProps): RuleSet => {
  return css`
    ${toCss({
      display: $style.df ? 'flex' : $style.db ? 'block' : $style.di ? 'inline' : $style.dn ? 'none' : 'flex',
      flexFlow: $style.frnw
        ? 'row nowrap'
        : $style.frw
          ? 'row wrap'
          : $style.fcnw
            ? 'column nowrap'
            : $style.fcw
              ? 'column wrap'
              : undefined,
      alignItems: $style.ac
        ? 'center'
        : $style.afs
          ? 'flex-start'
          : $style.afe
            ? 'flex-end'
            : $style.ast
              ? 'stretch'
              : undefined,
      justifyContent: $style.jc
        ? 'center'
        : $style.jfs
          ? 'flex-start'
          : $style.jfe
            ? 'flex-end'
            : $style.jsb
              ? 'space-between'
              : $style.jsa
                ? 'space-around'
                : $style.jst
                  ? 'stretch'
                  : undefined,
      flexGrow: $style.f11 ? 1 : $style.f10 ? 1 : $style.f01 ? 0 : $style.f00 ? 0 : undefined,
      flexShrink: $style.f11 ? 1 : $style.f10 ? 0 : $style.f01 ? 1 : $style.f00 ? 0 : undefined,
      flexBasis: $style.fb
        ? $style.fb
        : $style.fb100
          ? '100%'
          : $style.fba
            ? 'auto'
            : $style.fb2
              ? '50%'
              : $style.fb3
                ? '33.3333%'
                : $style.fb4
                  ? '25%'
                  : $style.fb5
                    ? '20%'
                    : $style.fb6
                      ? '16.6667%'
                      : $style.fb7
                        ? '14.2857%'
                        : $style.fb8
                          ? '12.5%'
                          : $style.fb9
                            ? '11.1111%'
                            : $style.fb10
                              ? '10%'
                              : undefined,
      gap: $style.g ? $style.g : undefined,
      rowGap: $style.rg ? $style.rg : undefined,
      columnGap: $style.cg ? $style.cg : undefined,
      containerType: $style.ce ? 'inline-size' : undefined,
    })}
    ${toCss($style.s || {})};
    ${!$style.cp
      ? ''
      : css`
          & > * {
            ${getBlockCoreCss($style.cp)}
          }
        `}
    ${($style.ws || []).map(([, props], index): RuleSet => {
      const prevWindowSize = $style.ws?.[index - 1]?.[0] ?? 0
      if (prevWindowSize === 0) {
        return css`
          ${getBlockCoreCss(props)}
        `
      } else {
        return css`
          @media (min-width: ${prevWindowSize + 1}px) {
            ${getBlockCoreCss(props)}
          }
        `
      }
    })}
    ${($style.cs || []).map(([, props], index): RuleSet => {
      const prevContainerSize = $style.cs?.[index - 1]?.[0] ?? 0
      if (prevContainerSize === 0) {
        return css`
          ${getBlockCoreCss(props)}
        `
      } else {
        return css`
          @container (min-width: ${prevContainerSize + 1}px) {
            & {
              ${getBlockCoreCss(props)}
            }
          }
        `
      }
    })}
    ${($style.wsr || []).map(([windowSize, props]): RuleSet => {
      if (windowSize === Infinity) {
        return css`
          ${getBlockCoreCss(props)}
        `
      } else {
        return css`
          @media (max-width: ${windowSize}px) {
            ${getBlockCoreCss(props)}
          }
        `
      }
    })}
    ${($style.csr || []).map(([containerSize, props]): RuleSet => {
      if (containerSize === Infinity) {
        return css`
          ${getBlockCoreCss(props)}
        `
      } else {
        return css`
          @container (max-width: ${containerSize}px) {
            & {
              ${getBlockCoreCss(props)}
            }
          }
        `
      }
    })}
  `
}

const BlockS = styled.div.attrs(mark('BlockS'))<{ $style: BlockStyleRootProps }>`
  ${({ $style }) => getBlockCoreCss($style)}
`
export const Block: BlockType = forwardRefIgnoreTypes(({ children, as, ...restProps }: BlockPropsWithRef, ref: any) => {
  const $style = pick(restProps, blockStyleCorePropsKeys) as BlockStyleRootProps
  const htmlElementProps = Object.fromEntries(
    Object.entries(restProps).filter(
      ([k]) => !blockStyleCorePropsKeys.includes(k as any) && !blockStyleSpecialPropsKeys.includes(k as any)
    )
  ) as AsProps<BlockDefaultAs>

  const normalizedWs = (restProps.ws || [])
    .sort(([a], [b]) => a - b)
    .map(([maxWidth, props]) => {
      return [maxWidth, normalizeBlockCorePropsConfig(props)]
    }) as Array<[number, BlockStyleCoreProps]>
  $style.ws = normalizedWs

  const normalizedEs = (restProps.cs || [])
    .sort(([a], [b]) => a - b)
    .map(([maxWidth, props]) => {
      return [maxWidth, normalizeBlockCorePropsConfig(props)]
    }) as Array<[number, BlockStyleCoreProps]>
  $style.cs = normalizedEs

  const normalizedWsr = (restProps.wsr || [])
    .sort(([a], [b]) => b - a)
    .map(([maxWidth, props]) => {
      return [maxWidth, normalizeBlockCorePropsConfig(props)]
    }) as Array<[number, BlockStyleCoreProps]>
  $style.wsr = normalizedWsr

  const normalizedEsr = (restProps.csr || [])
    .sort(([a], [b]) => b - a)
    .map(([maxWidth, props]) => {
      return [maxWidth, normalizeBlockCorePropsConfig(props)]
    }) as Array<[number, BlockStyleCoreProps]>
  $style.csr = normalizedEsr

  const normalizedCp = restProps.cp && normalizeBlockCorePropsConfig(restProps.cp)
  $style.cp = normalizedCp

  return (
    <BlockS {...(htmlElementProps as any)} as={as} ref={ref} $style={$style}>
      {children}
    </BlockS>
  )
})
