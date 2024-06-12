export const getArgTypeConfig = (
  propName: string,
  options: Array<string | number>,
  control: 'radio' | 'select' = 'radio',
  withUndefined: boolean = false
) => ({
  [propName]: {
    options: withUndefined ? [undefined, ...options] : options,
    control: { type: control },
  },
})

export const getArgTypeConfigFromObject = (
  propName: string,
  obj: Record<string, any>,
  control: 'radio' | 'select' = 'radio',
  withUndefined: boolean = false
) => {
  return getArgTypeConfig(propName, Object.keys(obj), control, withUndefined)
}
