import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type SegmentStyleRoot = {
  titleFontFamily?: string | null | undefined
  titleFontWeight?: string | null | undefined
  titleFontSize?: number | string | null | undefined
  titleLineHeight?: number | string | null | undefined
  titleColor?: string | null | undefined
  gapTitleDesc?: number | string | null | undefined
  gapHeadingContent?: number | string | null | undefined
  siblingsGapHorizontal?: number | string | null | undefined
  siblingsGapVertical?: number | string | null | undefined
  descFontFamily?: string | null | undefined
  descFontWeight?: string | null | undefined
  descFontSize?: number | string | null | undefined
  descLineHeight?: number | string | null | undefined
  descColor?: string | null | undefined
}
export type SegmentStyleFinal = SegmentStyleRoot
export type SegmentDefaultAs = 'div'
export type SegmentMainProps<TAs extends As = SegmentDefaultAs> = {
  as?: TAs
  title?: React.ReactNode
  desc?: React.ReactNode
  h?: 1 | 2 | 3 | 4 | 5 | 6
  children?: React.ReactNode
  $style?: SegmentStyleRoot
}
export type SegmentPropsWithRef<TAs extends As = SegmentDefaultAs> = SegmentMainProps<TAs> & AsPropsWithRef<TAs>
export type SegmentPropsWithoutRef<TAs extends As = SegmentDefaultAs> = WithoutRef<SegmentPropsWithRef<TAs>>
export type SegmentType = <TAs extends As = SegmentDefaultAs>(props: SegmentPropsWithRef<TAs>) => React.ReactNode

const getSegmentFinalCss = ($sf: SegmentStyleFinal) => {
  return css`
    display: flex;
    flex-flow: column nowrap;
    ${toCss({
      gap: $sf.gapHeadingContent,
    })}

    & > ${HeadingS} {
      display: flex;
      flex-flow: column nowrap;
      ${toCss({
        gap: $sf.gapTitleDesc,
      })}

      & > ${TitleS} {
        ${toCss({
          fontFamily: $sf.titleFontFamily,
          fontWeight: $sf.titleFontWeight,
          fontSize: $sf.titleFontSize,
          lineHeight: $sf.titleLineHeight,
          color: $sf.titleColor,
        })}
      }

      & > ${DescS} {
        ${toCss({
          fontFamily: $sf.descFontFamily,
          fontWeight: $sf.descFontWeight,
          fontSize: $sf.descFontSize,
          lineHeight: $sf.descLineHeight,
          color: $sf.descColor,
        })}
      }
    }

    & > ${ContentS} {
      display: flex;
      flex-flow: column nowrap;
    }
  `
}

const TitleS = styled.div.attrs(mark('TitleS'))``
const DescS = styled.div.attrs(mark('DescS'))``
const HeadingS = styled.h1.attrs(mark('HeadingS'))``
const ContentS = styled.div.attrs(mark('ContentS'))``
const SegmentS = styled.div.attrs(mark('SegmentS'))<{ $sf: SegmentStyleFinal }>`
  ${({ $sf }) => getSegmentFinalCss($sf)}
`

export const Segment: SegmentType = forwardRefIgnoreTypes(
  ({ $style = {}, title, h = 1, desc, children, ...restProps }: SegmentPropsWithoutRef, ref: any) => {
    const $sf: SegmentStyleFinal = {
      ...$style,
    }
    return (
      <SegmentS {...restProps} ref={ref} $sf={$sf}>
        {(title || desc) && (
          <HeadingS as={`h${h}`}>
            {title && <TitleS>{title}</TitleS>}
            {desc && <DescS>{desc}</DescS>}
          </HeadingS>
        )}
        {children && <ContentS>{children}</ContentS>}
      </SegmentS>
    )
  }
)

const SegmentsS = styled.div.attrs(mark('SegmentsS'))<{ $sf: SegmentsStyleFinal }>`
  ${({ $sf }) => css`
    ${toCss({
      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: $sf.direction === 'row' ? 'row nowrap' : 'column nowrap',
      gap: '30px',
    })}

    & > ${SegmentS} {
    }
  `}
`
export type SegmentsStyleFinal = {
  direction: 'row' | 'column'
}
export type SegmentsDefaultAs = 'div'
export type SegmentsMainProps<TAs extends As = SegmentsDefaultAs> = {
  as?: TAs
  direction?: 'row' | 'column'
  children?: React.ReactNode
}
export type SegmentsPropsWithRef<TAs extends As = SegmentsDefaultAs> = SegmentsMainProps<TAs> & AsPropsWithRef<TAs>
export type SegmentsPropsWithoutRef<TAs extends As = SegmentsDefaultAs> = WithoutRef<SegmentsPropsWithRef<TAs>>
export type SegmentsType = <TAs extends As = SegmentsDefaultAs>(props: SegmentsPropsWithRef<TAs>) => React.ReactNode
export const Segments: SegmentsType = forwardRefIgnoreTypes(
  ({ direction, children, ...restProps }: SegmentsPropsWithoutRef, ref: any) => {
    const $sf: SegmentsStyleFinal = {
      direction: direction ?? 'column',
    }
    return (
      <SegmentsS {...(restProps as {})} ref={ref} $sf={$sf}>
        {children}
      </SegmentsS>
    )
  }
)
