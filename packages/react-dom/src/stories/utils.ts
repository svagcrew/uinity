export const getArgTypeConfig = (
  propName: string,
  options: Array<string | number>,
  control: 'radio' | 'select' = 'radio'
) => ({
  [propName]: {
    options,
    control: { type: control },
  },
})

export const getArgTypeConfigFromObject = (
  propName: string,
  obj: Record<string, any>,
  control: 'radio' | 'select' = 'radio'
) => {
  return getArgTypeConfig(propName, Object.keys(obj), control)
}
