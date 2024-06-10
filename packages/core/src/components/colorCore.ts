import type { UinityConfig } from '@/config/index.js'
import { zRequiredString } from '@/utils/other.js'
import camelCasify from 'lodash/camelCase.js'
import { z } from 'zod'

export const colorCoreNames = [
  'brand',
  'neutral',
  'blue',
  'red',
  'green',
  'orange',
  'yellow',
  'purple',
  'brown',
] as const
export const zColorCoreName = z.enum(colorCoreNames)
export type ColorCoreName = z.infer<typeof zColorCoreName>

// 10-240
export const coreColorContrasts = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250,
] as const
// eslint-disable-next-line zod/prefer-enum
export const zColorCoreContrastName = z.union([
  z.literal(0),
  z.literal(10),
  z.literal(20),
  z.literal(30),
  z.literal(40),
  z.literal(50),
  z.literal(60),
  z.literal(70),
  z.literal(80),
  z.literal(90),
  z.literal(100),
  z.literal(110),
  z.literal(120),
  z.literal(130),
  z.literal(140),
  z.literal(150),
  z.literal(160),
  z.literal(170),
  z.literal(180),
  z.literal(190),
  z.literal(200),
  z.literal(210),
  z.literal(220),
  z.literal(230),
  z.literal(240),
  z.literal(250),
])
export type ColorCoreContrastName = z.infer<typeof zColorCoreContrastName>

export const zColorCoreUinityConfigInput = z.record(zColorCoreName, z.record(zColorCoreContrastName, zRequiredString))
type ColorCoreUinityConfigInput = z.infer<typeof zColorCoreUinityConfigInput>

export const defaultColorCoreUinityConfigInput = {
  brand: {
    '0': '#ffffff',
    '10': '#f5f8ff',
    '20': '#edf3ff',
    '30': '#e3ecfc',
    '40': '#dce6fa',
    '50': '#d3def5',
    '60': '#5e7ed6',
    '70': '#526bc7',
    '80': '#4755b8',
    '90': '#2f42c2',
    '100': '#2332a5',
    '110': '#1d2991',
    '120': '#18217d',
    '130': '#141b6a',
    '140': '#111659',
    '150': '#0e1248',
    '160': '#0b0f3a',
    '170': '#090c2e',
    '180': '#070922',
    '190': '#050718',
    '200': '#04050f',
    '210': '#030406',
    '220': '#020203',
    '230': '#010101',
    '240': '#000000',
    '250': '#000000',
  },
  neutral: {
    '0': '#ffffff',
    '10': '#f7f9fc',
    '20': '#f2f5fa',
    '30': '#ebeef5',
    '40': '#e4e8f0',
    '50': '#dadfeb',
    '60': '#d3d9e5',
    '70': '#bcc2d1',
    '80': '#afb6c7',
    '90': '#a6adbd',
    '100': '#9aa1b2',
    '110': '#8d95a8',
    '120': '#828a9e',
    '130': '#5f677a',
    '140': '#51596b',
    '150': '#3f4657',
    '160': '#3b4252',
    '170': '#373f4d',
    '180': '#333a47',
    '190': '#303642',
    '200': '#2b313d',
    '210': '#262c38',
    '220': '#1c2029',
    '230': '#181c24',
    '240': '#0d1014',
    '250': '#000000',
  },
  blue: {
    '0': '#ffffff',
    '10': '#ebf5ff',
    '20': '#d6eaff',
    '30': '#c2e0ff',
    '40': '#a6d3ff',
    '50': '#8cc7ff',
    '60': '#66b3ff',
    '70': '#4fa3ff',
    '80': '#3993ff',
    '90': '#2383ff',
    '100': '#0072ff',
    '110': '#0066e6',
    '120': '#005acc',
    '130': '#004db3',
    '140': '#004199',
    '150': '#003580',
    '160': '#002966',
    '170': '#001d4d',
    '180': '#001133',
    '190': '#00081a',
    '200': '#00040d',
    '210': '#000207',
    '220': '#000103',
    '230': '#000001',
    '240': '#000000',
    '250': '#000000',
  },
  red: {
    '0': '#ffffff',
    '10': '#ffe6e6',
    '20': '#ffcccc',
    '30': '#ffb3b3',
    '40': '#ff9999',
    '50': '#ff8080',
    '60': '#ff6666',
    '70': '#ff4d4d',
    '80': '#ff3333',
    '90': '#ff0a2b',
    '100': '#e60000',
    '110': '#cc0000',
    '120': '#b30000',
    '130': '#990000',
    '140': '#800000',
    '150': '#660000',
    '160': '#4d0000',
    '170': '#330000',
    '180': '#1a0000',
    '190': '#0d0000',
    '200': '#070000',
    '210': '#030000',
    '220': '#020000',
    '230': '#010000',
    '240': '#000000',
    '250': '#000000',
  },
  green: {
    '0': '#ffffff',
    '10': '#e6fff0',
    '20': '#ccffdb',
    '30': '#b3ffc5',
    '40': '#99ffaf',
    '50': '#80ff99',
    '60': '#66ff80',
    '70': '#4dff66',
    '80': '#33ff4d',
    '90': '#00a171',
    '100': '#00cc66',
    '110': '#00b359',
    '120': '#00994d',
    '130': '#008040',
    '140': '#006633',
    '150': '#004d26',
    '160': '#00331a',
    '170': '#001a0d',
    '180': '#000d07',
    '190': '#000705',
    '200': '#000403',
    '210': '#000201',
    '220': '#000100',
    '230': '#000080',
    '240': '#000000',
    '250': '#000000',
  },
  orange: {
    '0': '#ffffff',
    '10': '#fff2e6',
    '20': '#ffe6cc',
    '30': '#ffd9b3',
    '40': '#ffcc99',
    '50': '#ffbf80',
    '60': '#ffb366',
    '70': '#ffa64d',
    '80': '#ff9933',
    '90': '#ff951f',
    '100': '#ff8000',
    '110': '#e67300',
    '120': '#cc6600',
    '130': '#b35900',
    '140': '#994d00',
    '150': '#804000',
    '160': '#663300',
    '170': '#4d2600',
    '180': '#331a00',
    '190': '#1a0d00',
    '200': '#0d0700',
    '210': '#070400',
    '220': '#030200',
    '230': '#020100',
    '240': '#010000',
    '250': '#000000',
  },
  yellow: {
    '0': '#ffffff',
    '10': '#fffbe6',
    '20': '#fff7cc',
    '30': '#fff2b3',
    '40': '#ffee99',
    '50': '#ffea80',
    '60': '#ffe666',
    '70': '#ffe34d',
    '80': '#ffdf33',
    '90': '#ffdb1a',
    '100': '#ffd700',
    '110': '#e6c300',
    '120': '#ccaf00',
    '130': '#b39b00',
    '140': '#998700',
    '150': '#807300',
    '160': '#665f00',
    '170': '#4d4b00',
    '180': '#333700',
    '190': '#1a2300',
    '200': '#0d1200',
    '210': '#070a00',
    '220': '#030500',
    '230': '#020300',
    '240': '#010100',
    '250': '#000000',
  },
  purple: {
    '0': '#ffffff',
    '10': '#f5e6ff',
    '20': '#ebccff',
    '30': '#e0b3ff',
    '40': '#d699ff',
    '50': '#cc80ff',
    '60': '#c266ff',
    '70': '#b84dff',
    '80': '#ae33ff',
    '90': '#a41aff',
    '100': '#9a00ff',
    '110': '#8a00e6',
    '120': '#7b00cc',
    '130': '#6c00b3',
    '140': '#5d0099',
    '150': '#4e0080',
    '160': '#3f0066',
    '170': '#30004d',
    '180': '#210033',
    '190': '#12001a',
    '200': '#0d000f',
    '210': '#07000a',
    '220': '#030005',
    '230': '#020003',
    '240': '#010001',
    '250': '#000000',
  },
  brown: {
    '0': '#ffffff',
    '10': '#f7f0e6',
    '20': '#efe0cc',
    '30': '#e6d1b3',
    '40': '#dcb399',
    '50': '#d39980',
    '60': '#cc8666',
    '70': '#b3744d',
    '80': '#996133',
    '90': '#805c1a',
    '100': '#665000',
    '110': '#594400',
    '120': '#4d3800',
    '130': '#402c00',
    '140': '#332100',
    '150': '#261600',
    '160': '#1a0d00',
    '170': '#0d0700',
    '180': '#070400',
    '190': '#030200',
    '200': '#020100',
    '210': '#010100',
    '220': '#010000',
    '230': '#000000',
    '240': '#000000',
    '250': '#000000',
  },
} satisfies ColorCoreUinityConfigInput

export const normalizeColorCoreUinityConfig = (input: ColorCoreUinityConfigInput | undefined) => {
  return {
    neutral: {
      ...defaultColorCoreUinityConfigInput.neutral,
      ...input?.neutral,
    },
    brand: {
      ...defaultColorCoreUinityConfigInput.brand,
      ...input?.brand,
    },
    blue: {
      ...defaultColorCoreUinityConfigInput.blue,
      ...input?.blue,
    },
    red: {
      ...defaultColorCoreUinityConfigInput.red,
      ...input?.red,
    },
    green: {
      ...defaultColorCoreUinityConfigInput.green,
      ...input?.green,
    },
    orange: {
      ...defaultColorCoreUinityConfigInput.orange,
      ...input?.orange,
    },
    yellow: {
      ...defaultColorCoreUinityConfigInput.yellow,
      ...input?.yellow,
    },
    purple: {
      ...defaultColorCoreUinityConfigInput.purple,
      ...input?.purple,
    },
    brown: {
      ...defaultColorCoreUinityConfigInput.brown,
      ...input?.brown,
    },
  }
}
export type ColorCoreUinityConfig = ReturnType<typeof normalizeColorCoreUinityConfig>

export const getColorCoreValue = (
  uinityConfig: UinityConfig,
  colorName: ColorCoreName,
  colorContrast: ColorCoreContrastName,
  colorOpacity: number = 100
) => {
  const value = uinityConfig.color.core[colorName]?.[colorContrast] || '#000000'
  if (colorOpacity === 100) {
    return value
  }
  return `rgba(${value}, ${colorOpacity / 100})`
}

export const getColorCoreValueByVariableName = (
  uinityConfig: UinityConfig,
  variableName: string,
  throwIfUndefined: boolean = false
) => {
  if (!variableName.startsWith('$.color.core.')) {
    throw new Error(`Invalid color core variable name: ${variableName}`)
  }
  const variableParts = variableName.split('.')
  const colorName = variableParts[3] as ColorCoreName
  // eslint-disable-next-line radix
  const colorContrast = parseInt(variableParts[4]) as ColorCoreContrastName
  // eslint-disable-next-line radix
  const colorOpacity = variableParts[5] ? parseInt(variableParts[5]) : 100
  if (throwIfUndefined && !uinityConfig.color.core[colorName]?.[colorContrast]) {
    throw new Error(`Color core variable not found: ${variableName}`)
  }
  return getColorCoreValue(uinityConfig, colorName, colorContrast, colorOpacity)
}

export const getColorCoreScssVariables = (uinityConfig: UinityConfig) => {
  const variables: Record<string, string> = {}
  for (const colorName of Object.keys(uinityConfig.color.core)) {
    for (const [colorContrast, value] of Object.entries((uinityConfig.color.core as any)[colorName])) {
      const variableName = camelCasify(`$color-core-${colorName}-${colorContrast}`)
      variables[variableName] = value as string
    }
  }
  const variablesString =
    Object.entries(variables)
      .map(([key, value]) => `$${key}: ${value};`)
      .join('\n') + '\n'
  return variablesString
}
