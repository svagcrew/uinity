import { z } from 'zod'

export const zStringOptionalNullable = z.string().min(1).optional().nullable()
export const zStringRequired = z.string().min(1)
export const zNumberOptionalNullable = z.number().optional().nullable()
export const zNumberRequired = z.number().min(1)
export const zNumberOrStringOptionalNullable = z
  .union([z.number(), z.string().min(1)])
  .optional()
  .nullable()
export const zNumberOrStringRequired = z.union([z.number(), z.string().min(1)])
export const zRecordOfStringsOptionalNullable = z.record(z.string().min(1)).optional().nullable()
