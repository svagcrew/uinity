import type { As, AsPropsWithRef, WithoutRef } from '@/utils.js'
import { forwardRefIgnoreTypes, mark } from '@/utils.js'
import { toCss } from '@uinity/core/dist/utils/other.js'
import { css, styled } from 'styled-components'

export type TextareaStyleRoot = {
  width?: number | string | null | undefined
  maxWidth?: number | string | null | undefined
  height?: number | string | null | undefined
  background?: string | null | undefined
  childrenBackground?: string | null | undefined
  disabled?: boolean
}
export type TextareaStyleFinal = TextareaStyleRoot
export type TextareaDefaultAs = 'input'
export type TextareaMainProps<TAs extends As = TextareaDefaultAs> = {
  as?: TAs
  children?: React.ReactNode
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
  onBlur?: () => any
  onJustEnter?: () => any
  type?: 'text' | 'password'
  placeholder?: string
  labelInner?: string
  labelPlaceholder?: string
  disabled?: boolean
  $style?: TextareaStyleRoot
}
export type TextareaPropsWithRef<TAs extends As = TextareaDefaultAs> = TextareaMainProps<TAs> & AsPropsWithRef<TAs>
export type TextareaPropsWithoutRef<TAs extends As = TextareaDefaultAs> = WithoutRef<TextareaPropsWithRef<TAs>>
export type TextareaType = <TAs extends As = TextareaDefaultAs>(props: TextareaPropsWithRef<TAs>) => React.ReactNode

const getTextareaCoreCss = ($sf: TextareaStyleFinal) => {
  return css`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    min-height: 120px;
    ${toCss({
      width: $sf.width,
      maxWidth: $sf.maxWidth,
    })}

    ${$sf.disabled && toCss({ opacity: 0.5, pointerEvents: 'none' })}

    & ${ChildrenS} {
      ${toCss({})}
    }
  `
}
const getTextareaFinalCss = ($sf: TextareaStyleFinal) => {
  return css`
    ${getTextareaCoreCss($sf)}
  `
}

const ChildrenS = styled.div.attrs(mark('ChildrenS'))``
const TextareaS = styled.textarea.attrs(mark('TextareaS'))<{ $sf: TextareaStyleFinal }>`
  ${({ $sf }) => getTextareaFinalCss($sf)}
`

export const Textarea: TextareaType = forwardRefIgnoreTypes(
  (
    { $style = {}, disabled, placeholder, onJustEnter, type = 'text', ...restProps }: TextareaPropsWithoutRef,
    ref: any
  ) => {
    const $sf: TextareaStyleFinal = {
      ...$style,
      disabled: !!disabled,
    }
    return (
      <TextareaS
        onKeyDown={(e) => {
          if (onJustEnter && e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault()
            onJustEnter()
          }
        }}
        disabled={disabled}
        {...restProps}
        type={type}
        ref={ref}
        $sf={$sf}
        placeholder={placeholder}
      />
    )
  }
)
