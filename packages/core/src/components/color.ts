import {
  defaultColorCoreUinityConfigInput,
  normalizeColorCoreUinityConfig,
  zColorCoreUinityConfigInput,
} from '@/components/colorCore.js'
import {
  defaultColorSemanticUinityConfigInput,
  normalizeColorSemanticUinityConfig,
  zColorSemanticUinityConfigInput,
} from '@/components/colorSematic.js'
import { z } from 'zod'

export const colorCollections = ['core', 'semantic'] as const
export const zColorCollectionName = z.enum(colorCollections)
export type ColorCollectionName = z.infer<typeof zColorCollectionName>

export const zColorUinityConfigInput = z.object({
  core: zColorCoreUinityConfigInput,
  semantic: zColorSemanticUinityConfigInput,
})
type ColorUinityConfigInput = z.infer<typeof zColorUinityConfigInput>

export const defaultColorUinityConfigInput: ColorUinityConfigInput = {
  core: defaultColorCoreUinityConfigInput,
  semantic: defaultColorSemanticUinityConfigInput,
}

export const normalizeColorUinityConfig = (input: ColorUinityConfigInput | undefined) => {
  return {
    core: normalizeColorCoreUinityConfig(input?.core),
    semantic: normalizeColorSemanticUinityConfig(input?.semantic),
  }
}
export type ColorUinityConfig = ReturnType<typeof normalizeColorUinityConfig>
